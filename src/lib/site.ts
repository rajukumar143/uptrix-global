// The live web address, from SITE_URL in .env.local (e.g. https://uptrixglobal.com)
export function siteUrl(path = "") {
  const fallback = process.env.NODE_ENV === "production" ? "https://uptrixglobal.com" : "http://localhost:3000";
  const base = (process.env.SITE_URL || fallback).replace(/\/+$/, "");
  if (!path) return base;
  if (/^https?:\/\//i.test(path)) return path;
  return `${base}${path.startsWith("/") ? "" : "/"}${path}`;
}

export function formatDate(iso: string) {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" });
}
