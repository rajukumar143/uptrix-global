// Server-only: reads and writes the editable website text in content/site.json.
// Do not import this file from client components.
import { promises as fs, readFileSync } from "node:fs";
import path from "node:path";
import { defaultContent, type PageKey, type SiteContent } from "@/content";
import { mergeWithDefaults } from "@/content/merge";

const CONTENT_DIR = process.env.CONTENT_DIR || path.join(process.cwd(), "content");
const CONTENT_FILE = path.join(CONTENT_DIR, "site.json");
const BACKUP_DIR = path.join(CONTENT_DIR, "backups");
const MAX_BACKUPS = 30;

function readSaved(): Record<string, unknown> {
  let raw: string;
  try {
    raw = readFileSync(CONTENT_FILE, "utf8");
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") return {};
    console.error("Could not read saved site content", error);
    throw new Error("Could not read saved site content.", { cause: error });
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error("Saved site content is not valid JSON", error);
    throw new Error("Saved site content is invalid JSON. Restore a backup or repair content/site.json.", { cause: error });
  }
}

/** All page content: saved edits laid over the defaults. */
export function getContent(): SiteContent {
  return mergeWithDefaults(defaultContent, readSaved());
}

export function getPageContent<K extends PageKey>(key: K): SiteContent[K] {
  return mergeWithDefaults(defaultContent[key], readSaved()[key]);
}

async function writeAll(data: Record<string, unknown>) {
  await fs.mkdir(BACKUP_DIR, { recursive: true });
  // Keep the previous version so a save can be undone from the dashboard
  let previous: string | undefined;
  try {
    previous = await fs.readFile(CONTENT_FILE, "utf8");
  } catch (error) {
    if (!(error instanceof Error && "code" in error && error.code === "ENOENT")) {
      console.error("Could not read previous site content for backup", error);
      throw error;
    }
  }
  if (previous !== undefined) {
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    await fs.writeFile(path.join(BACKUP_DIR, `site-${stamp}.json`), previous);
    const old = (await fs.readdir(BACKUP_DIR)).filter((f) => f.endsWith(".json")).sort().reverse().slice(MAX_BACKUPS);
    await Promise.all(old.map((f) => fs.unlink(path.join(BACKUP_DIR, f))));
  }
  // Write to a temp file then rename, so a crash mid-save can't leave a half-written file
  const tmp = `${CONTENT_FILE}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 2));
  await fs.rename(tmp, CONTENT_FILE);
}

export async function savePageContent(key: PageKey, value: unknown) {
  const all = readSaved();
  all[key] = mergeWithDefaults(defaultContent[key], value);
  await writeAll(all);
}

export async function resetPageContent(key: PageKey) {
  const all = readSaved();
  delete all[key];
  await writeAll(all);
}

export type Backup = { id: string; savedAt: string };

export async function listBackups(): Promise<Backup[]> {
  let files: string[];
  try {
    files = (await fs.readdir(BACKUP_DIR)).filter((f) => /^site-.*\.json$/.test(f)).sort().reverse();
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
  if (!/^site-[\w-]+\.json$/.test(id)) throw new Error("Invalid backup");
  const raw = await fs.readFile(path.join(BACKUP_DIR, id), "utf8");
  const parsed = JSON.parse(raw);
  // Re-check the backup against today's page structure before restoring it
  const clean: Record<string, unknown> = {};
  for (const k of Object.keys(defaultContent) as PageKey[]) {
    if (parsed[k] !== undefined) clean[k] = mergeWithDefaults(defaultContent[k], parsed[k]);
  }
  await writeAll(clean);
}
