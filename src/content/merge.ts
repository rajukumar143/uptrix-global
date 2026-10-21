// Helpers shared by the admin editor (browser) and the content store (server).
// The default content is the schema: saved content is only accepted where it matches the
// shape and type of the defaults, so a bad or old save can never break a page.

export type Json = string | number | boolean | Json[] | { [k: string]: Json };

const MAX_TEXT = 10000;
const MAX_ITEMS = 200;

export function isLinkKey(key: string) {
  return /link$/i.test(key);
}

// Links may be site paths (/crm), anchors (#demo), web addresses, email or phone links. Anything
// else (e.g. "javascript:") is dropped so a link can never run code.
export function safeLink(v: string) {
  const s = v.trim();
  if (s === "") return "";
  if (/^(\/|#|https?:\/\/|mailto:|tel:)/i.test(s) && !/^\/\//.test(s)) return s;
  return "#";
}

/** The default item for an array, looked up through the first default item at each level. */
export function arrayTemplate(defaultArray: unknown[]): Json {
  if (!defaultArray.length) return "";
  const first = defaultArray[0];
  if (first && typeof first === "object" && !Array.isArray(first)) {
    const merged: Record<string, Json> = {};
    for (const item of defaultArray) {
      if (item && typeof item === "object" && !Array.isArray(item)) {
        for (const [k, v] of Object.entries(item as Record<string, Json>)) {
          if (!(k in merged)) {
            merged[k] = v;
          }
        }
      }
    }
    return merged;
  }
  return first as Json;
}

/** A blank copy of a default value, used when the admin adds a new item to a list. */
export function blankOf(template: Json): Json {
  if (typeof template === "string") return "";
  if (typeof template === "number") return 0;
  if (typeof template === "boolean") return false;
  if (Array.isArray(template)) return [];
  const out: { [k: string]: Json } = {};
  for (const [k, v] of Object.entries(template)) out[k] = blankOf(v);
  return out;
}

/** Overlay `value` on `def`, keeping only what matches the default's shape and type. */
export function mergeWithDefaults<T>(def: T, value: unknown, key = ""): T {
  const d = def as unknown;
  if (typeof d === "string") {
    if (typeof value !== "string") return def;
    const s = value.slice(0, MAX_TEXT);
    return (isLinkKey(key) ? safeLink(s) : s) as T;
  }
  if (typeof d === "number") {
    const n = typeof value === "number" ? value : typeof value === "string" ? Number(value) : NaN;
    return (Number.isFinite(n) ? n : def) as T;
  }
  if (typeof d === "boolean") return (typeof value === "boolean" ? value : def) as T;
  if (Array.isArray(d)) {
    if (!Array.isArray(value)) return def;
    const tpl = arrayTemplate(d);
    return value.slice(0, MAX_ITEMS).map((item) => mergeWithDefaults(tpl, item, key)) as T;
  }
  if (d && typeof d === "object") {
    const src = value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(d as Record<string, unknown>)) out[k] = mergeWithDefaults(v, src[k], k);
    return out as T;
  }
  return def;
}
