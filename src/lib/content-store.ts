// Server-only: reads and writes the editable website text in content/site.json.
// Do not import this file from client components.
import "server-only";

import { z, type ZodTypeAny } from "zod";
import { defaultContent, type PageKey, type SiteContent } from "@/content";
import { mergeWithDefaults } from "@/content/merge";
import { listFiles, readText, readTextSync, removeFile, writeAtomic } from "@/lib/content-files";

const MAX_BACKUPS = 20;

function schemaFor(value: unknown): ZodTypeAny {
  if (typeof value === "string") return z.string().max(10000);
  if (typeof value === "number") return z.number().finite();
  if (typeof value === "boolean") return z.boolean();
  if (Array.isArray(value)) {
    if (value.length === 0) return z.array(z.unknown()).max(200);
    const hasObjects = value.some((item) => item && typeof item === "object" && !Array.isArray(item));
    if (hasObjects) {
      const allKeys = new Map<string, unknown>();
      for (const item of value) {
        if (item && typeof item === "object" && !Array.isArray(item)) {
          for (const [k, v] of Object.entries(item as Record<string, unknown>)) {
            if (!allKeys.has(k) || (allKeys.get(k) === "" && v !== "")) {
              allKeys.set(k, v);
            }
          }
        }
      }
      const shape: Record<string, ZodTypeAny> = {};
      for (const [k, v] of allKeys.entries()) {
        shape[k] = schemaFor(v).optional();
      }
      return z.array(z.object(shape).passthrough()).max(200);
    }
    return z.array(schemaFor(value[0])).max(200);
  }
  if (value && typeof value === "object") {
    return z.object(Object.fromEntries(Object.entries(value).map(([key, item]) => [key, schemaFor(item).optional()]))).passthrough();
  }
  return z.unknown();
}

const pageSchemas = Object.fromEntries(Object.entries(defaultContent).map(([key, value]) => [key, schemaFor(value)]));
const savedSchema = z.object(pageSchemas).partial().passthrough();

let writeQueue: Promise<void> = Promise.resolve();
async function withSiteWriteLock<T>(write: () => Promise<T>, timeoutMs = 8000): Promise<T> {
  const previous = writeQueue;
  let release!: () => void;
  writeQueue = new Promise<void>((resolve) => {
    release = resolve;
  });

  const timer = new Promise<never>((_, reject) => {
    const t = setTimeout(() => reject(new Error("Site write lock timed out")), timeoutMs);
    t.unref?.();
  });

  // Ensure previous failure never permanently deadlocks subsequent operations
  await Promise.race([previous.catch(() => undefined), timer]);
  try {
    return await Promise.race([write(), timer]);
  } finally {
    release();
  }
}

function parseSaved(raw: string): Record<string, unknown> {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return {};
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return {};
  }

  try {
    return savedSchema.parse(parsed);
  } catch (error) {
    console.warn("Saved site content did not match strict schema; merging with defaults", error);
    try {
      const migrated = mergeWithDefaults(defaultContent, parsed);
      return savedSchema.parse(migrated);
    } catch (secondError) {
      console.warn("Failed to parse migrated site content, using default content", secondError);
      return {};
    }
  }
}

function readSaved(): Record<string, unknown> {
  let raw: string;
  try {
    raw = readTextSync(["site.json"]);
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") return {};
    console.warn("Could not read saved site content, using defaults", error);
    return {};
  }

  try {
    return parseSaved(raw);
  } catch (error) {
    console.warn("Saved site content is invalid; using defaults", error);
    return {};
  }
}

/** All page content: saved edits laid over the defaults. */
export function getContent(): SiteContent {
  return mergeWithDefaults(defaultContent, readSaved());
}

export function getPageContent<K extends PageKey>(key: K): SiteContent[K] {
  return mergeWithDefaults(defaultContent[key], readSaved()[key]);
}

let hasSeeded = false;
export async function seedSiteContent() {
  if (hasSeeded) return false;
  try {
    return await withSiteWriteLock(async () => {
      if (hasSeeded) return false;
      try {
        parseSaved(await readText(["site.json"]));
        hasSeeded = true;
        return false;
      } catch (error) {
        if (error instanceof Error && "code" in error && error.code === "ENOENT") {
          try {
            await writeAtomic(["site.json"], JSON.stringify(savedSchema.parse(defaultContent), null, 2));
          } catch (writeErr) {
            console.warn("Could not seed initial site.json", writeErr);
          }
          hasSeeded = true;
          return true;
        }
        console.warn("Existing site content could not be validated; preserving it without reseeding", error);
        hasSeeded = true;
        return false;
      }
    });
  } catch (lockErr) {
    console.warn("seedSiteContent write lock error, skipping:", lockErr);
    hasSeeded = true;
    return false;
  }
}

async function writeAll(data: Record<string, unknown>) {
  const validated = savedSchema.parse(data);
  // Keep the previous version so a save can be undone from the dashboard
  let previous: string | undefined;
  try {
    previous = await readText(["site.json"]);
  } catch (error) {
    if (!(error instanceof Error && "code" in error && error.code === "ENOENT")) {
      console.warn("Could not read previous site content for backup", error);
    }
  }
  if (previous !== undefined) {
    try {
      parseSaved(previous);
      const stamp = new Date().toISOString().replace(/[:.]/g, "-");
      await writeAtomic(["backups", `site-${stamp}.json`], previous);
      const old = (await listFiles(["backups"])).filter((f) => /^site-[a-zA-Z0-9.-]+\.json$/.test(f)).sort().reverse().slice(MAX_BACKUPS);
      await Promise.all(old.map((file) => removeFile(["backups", file])));
    } catch (error) {
      console.warn("Existing site content could not be backed up:", error);
    }
  }
  await writeAtomic(["site.json"], JSON.stringify(validated, null, 2));
}

export async function savePageContent(key: PageKey, value: unknown) {
  return withSiteWriteLock(async () => {
    const clean = pageSchemas[key].parse(value);
    const all = readSaved();
    all[key] = mergeWithDefaults(defaultContent[key], clean);
    await writeAll(all);
  });
}

export async function resetPageContent(key: PageKey) {
  return withSiteWriteLock(async () => {
    const all = readSaved();
    delete all[key];
    await writeAll(all);
  });
}

export type Backup = { id: string; savedAt: string };

export async function listBackups(): Promise<Backup[]> {
  let files: string[];
  try {
    files = (await listFiles(["backups"])).filter((f) => /^site-[a-zA-Z0-9.-]+\.json$/.test(f)).sort().reverse();
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") return [];
    console.warn("Could not list content backups", error);
    return [];
  }
  return files.map((f) => {
    const raw = f.slice(5, -5); // 2026-10-04T10-41-00-000Z
    const iso = raw.replace(/T(\d\d)-(\d\d)-(\d\d)-(\d+)Z$/, "T$1:$2:$3.$4Z");
    return { id: f, savedAt: iso };
  });
}

export async function restoreBackup(id: string) {
  if (!/^site-[a-zA-Z0-9.-]+\.json$/.test(id)) throw new Error("Invalid backup");
  return withSiteWriteLock(async () => {
    const parsed = parseSaved(await readText(["backups", id]));
    const clean: Record<string, unknown> = {};
    for (const k of Object.keys(defaultContent) as PageKey[]) {
      if (parsed[k] !== undefined) clean[k] = mergeWithDefaults(defaultContent[k], parsed[k]);
    }
    await writeAll(clean);
  });
}
