import "server-only";

import { constants } from "node:fs";
import { promises as fs } from "node:fs";
import { accessSync, existsSync, lstatSync, readdirSync, readFileSync, realpathSync, statSync } from "node:fs";
import path from "node:path";

const queues = new Map<string, Promise<void>>();
const building = () => process.env.NEXT_PHASE === "phase-production-build";

function inside(root: string, target: string) {
  const relative = path.relative(root, target);
  return relative === "" || (!relative.startsWith(`..${path.sep}`) && relative !== ".." && !path.isAbsolute(relative));
}

export function contentRoot() {
  const configured = process.env.CONTENT_DIR;
  if (!configured && process.env.NODE_ENV === "production" && !building()) {
    throw new Error("CONTENT_DIR must be set to an absolute persistent directory before starting the app.");
  }
  if (configured && process.env.NODE_ENV === "production" && !path.isAbsolute(configured)) {
    throw new Error("CONTENT_DIR must be an absolute path outside the deployed application.");
  }

  const root = path.resolve(configured || path.join(process.cwd(), "content"));
  const repo = path.resolve(process.cwd());
  const publicDir = path.resolve(repo, "public");
  if (process.env.NODE_ENV === "production" && !building() && (inside(repo, root) || inside(publicDir, root))) {
    throw new Error("CONTENT_DIR must be outside the application repository and public directory.");
  }

  if (process.env.NODE_ENV === "production" && !building()) {
    if (!existsSync(root) || !statSync(root).isDirectory()) {
      throw new Error("CONTENT_DIR must exist and be accessible before the app starts.");
    }
    const actual = realpathSync(root);
    const publicHtmlPath = process.env.PUBLIC_HTML_DIR;
    if (!publicHtmlPath || !path.isAbsolute(publicHtmlPath)) {
      throw new Error("PUBLIC_HTML_DIR must be set to the absolute public_html path.");
    }
    if (!existsSync(publicHtmlPath) || !statSync(publicHtmlPath).isDirectory()) {
      throw new Error("PUBLIC_HTML_DIR must exist and be accessible.");
    }
    const actualPublicHtml = realpathSync(publicHtmlPath);
    if (inside(path.resolve(publicHtmlPath), root) || inside(actualPublicHtml, actual)) {
      throw new Error("CONTENT_DIR must be outside public_html.");
    }
    if (inside(repo, actual) || inside(publicDir, actual)) {
      throw new Error("CONTENT_DIR resolves inside the application repository or public directory.");
    }
    const permissions = statSync(actual).mode & 0o777;
    if (process.platform !== "win32" && ((permissions & 0o077) !== 0 || (permissions & 0o700) !== 0o700)) {
      throw new Error("CONTENT_DIR must have owner-only permissions (for example, chmod 700).");
    }
    const required = process.env.APP_MODE === "admin" ? constants.R_OK | constants.W_OK : constants.R_OK;
    try {
      accessSync(actual, required);
    } catch (error) {
      throw new Error(`CONTENT_DIR is not ${process.env.APP_MODE === "admin" ? "readable and writable" : "readable"}.`, { cause: error });
    }
  }
  return root;
}

function safeSegments(segments: string[]) {
  for (const segment of segments) {
    if (!/^[a-zA-Z0-9][a-zA-Z0-9._-]*$/.test(segment) || segment === "." || segment === "..") {
      throw new Error("Invalid content path segment.");
    }
  }
}

function requireWritableMode() {
  if (process.env.APP_MODE === "public") {
    throw new Error("The public app is read-only; content changes must be sent to the admin API.");
  }
}

function containedPath(segments: string[]) {
  safeSegments(segments);
  const root = contentRoot();
  const target = path.resolve(root, ...segments);
  if (!inside(root, target)) throw new Error("Content path escapes CONTENT_DIR.");
  const actualRoot = existsSync(root) ? realpathSync(root) : root;
  let current = root;
  for (let index = 0; index < segments.length; index += 1) {
    current = path.join(current, segments[index]);
    try {
      lstatSync(current);
    } catch (error) {
      if (error instanceof Error && "code" in error && error.code === "ENOENT") break;
      throw error;
    }
    const actual = realpathSync(current);
    if (!inside(actualRoot, actual)) throw new Error("Content path resolves outside CONTENT_DIR.");
  }
  return target;
}

export function readTextSync(segments: string[]) {
  return readFileSync(containedPath(segments), "utf8");
}

export async function readText(segments: string[]) {
  return fs.readFile(containedPath(segments), "utf8");
}

export function readBytesSync(segments: string[]) {
  return readFileSync(containedPath(segments));
}

export async function readBytes(segments: string[]) {
  return fs.readFile(containedPath(segments));
}

export function listFilesSync(segments: string[]) {
  return readdirSync(containedPath(segments));
}

export async function listFiles(segments: string[]) {
  return fs.readdir(containedPath(segments));
}

async function ensureParent(segments: string[]) {
  const root = contentRoot();
  const target = containedPath(segments);
  await fs.mkdir(root, { recursive: true, mode: 0o700 });
  const actualRoot = await fs.realpath(root);
  let current = root;
  for (const segment of segments.slice(0, -1)) {
    current = path.join(current, segment);
    try {
      const details = await fs.lstat(current);
      if (details.isSymbolicLink()) throw new Error("Content path may not traverse a symbolic link.");
      if (!details.isDirectory()) throw new Error("Content path parent is not a directory.");
    } catch (error) {
      if (!(error instanceof Error && "code" in error && error.code === "ENOENT")) throw error;
      await fs.mkdir(current, { mode: 0o700 });
    }
    if (!inside(actualRoot, await fs.realpath(current))) throw new Error("Content path resolves outside CONTENT_DIR.");
  }
  return { target, actualRoot };
}

function withLock<T>(key: string, action: () => Promise<T>, timeoutMs = 8000): Promise<T> {
  const previous = queues.get(key) ?? Promise.resolve();
  const timer = new Promise<never>((_, reject) => {
    const t = setTimeout(() => reject(new Error(`File lock timed out for ${key}`)), timeoutMs);
    t.unref?.();
  });

  const current = previous
    .catch(() => undefined)
    .then(() => Promise.race([action(), timer]));

  const tail = current.then(
    () => undefined,
    () => undefined
  );
  queues.set(key, tail);
  return current.finally(() => {
    if (queues.get(key) === tail) queues.delete(key);
  });
}

export function withFileLock<T>(segments: string[], action: () => Promise<T>) {
  return withLock(containedPath(segments), action);
}

export async function writeAtomic(segments: string[], data: string | Buffer) {
  requireWritableMode();
  const { target, actualRoot } = await ensureParent(segments);
  const actualTarget = path.join(actualRoot, path.relative(contentRoot(), target));
  return withLock(actualTarget, async () => {
    const temp = `${actualTarget}.${process.pid}.${Date.now()}.tmp`;
    const handle = await fs.open(temp, "wx", 0o600);
    try {
      await handle.writeFile(data);
      await handle.sync();
      await handle.close();
      await fs.rename(temp, actualTarget);
    } catch (error) {
      await handle.close().catch(() => undefined);
      await fs.rm(temp, { force: true }).catch(() => undefined);
      throw error;
    }
  });
}

export async function appendText(segments: string[], data: string) {
  requireWritableMode();
  const { target, actualRoot } = await ensureParent(segments);
  const actualTarget = path.join(actualRoot, path.relative(contentRoot(), target));
  return withLock(actualTarget, async () => {
    const handle = await fs.open(actualTarget, "a", 0o600);
    try {
      await handle.writeFile(data, "utf8");
      await handle.sync();
    } finally {
      await handle.close();
    }
  });
}

export async function removeFile(segments: string[]) {
  requireWritableMode();
  const target = containedPath(segments);
  await withLock(target, () => fs.rm(target, { force: true }));
}
