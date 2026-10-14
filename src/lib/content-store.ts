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
  if (Array.isArray(value)) return z.array(value.length ? schemaFor(value[0]) : z.unknown()).max(200);
  if (value && typeof value === "object") {
    return z.object(Object.fromEntries(Object.entries(value).map(([key, item]) => [key, schemaFor(item)]))).strict();
  }
  return z.unknown();
}

const pageSchemas = Object.fromEntries(Object.entries(defaultContent).map(([key, value]) => [key, schemaFor(value)]));
const savedSchema = z.object(pageSchemas).partial().strict();

let writeQueue: Promise<void> = Promise.resolve();
async function withSiteWriteLock<T>(write: () => Promise<T>): Promise<T> {
  const previous = writeQueue;
  let release!: () => void;
  writeQueue = new Promise<void>((resolve) => {
    release = resolve;
  });
  await previous;
  try {
    return await write();
  } finally {
    release();
  }
}

function parseSaved(raw: string): Record<string, unknown> {
  const parsed: unknown = JSON.parse(raw);
  return savedSchema.parse(parsed);
}

function readSaved(): Record<string, unknown> {
  let raw: string;
  try {
    raw = readTextSync(["site.json"]);
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") return {};
    console.error("Could not read saved site content", error);
    throw new Error("Could not read saved site content.", { cause: error });
  }

  try {
    return parseSaved(raw);
  } catch (error) {
    console.error("Saved site content is invalid; using defaults", error);
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

export async function seedSiteContent() {
  return withSiteWriteLock(async () => {
    try {
      parseSaved(await readText(["site.json"]));
      return false;
    } catch (error) {
      if (error instanceof Error && "code" in error && error.code === "ENOENT") {
        await writeAtomic(["site.json"], JSON.stringify(savedSchema.parse(defaultContent), null, 2));
        return true;
      }
      console.error("Existing site content could not be validated; preserving it without reseeding", error);
      return false;
    }
  });
}

async function writeAll(data: Record<string, unknown>) {
  const validated = savedSchema.parse(data);
  // Keep the previous version so a save can be undone from the dashboard
  let previous: string | undefined;
  try {
    previous = await readText(["site.json"]);
  } catch (error) {
    if (!(error instanceof Error && "code" in error && error.code === "ENOENT")) {
      console.error("Could not read previous site content for backup", error);
      throw error;
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
      if (error instanceof SyntaxError || error instanceof z.ZodError) {
        console.error("Existing site content is corrupt; overwriting it without creating a restorable backup", error);
      } else {
        throw error;
      }
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
    console.error("Could not list content backups", error);
    throw new Error("Could not list content backups.", { cause: error });
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
import "server-only";
