// Server-only: enquiries sent from the website's forms, one JSON line each in content/leads.jsonl
import { promises as fs, readFileSync } from "node:fs";
import path from "node:path";

const CONTENT_DIR = process.env.CONTENT_DIR || path.join(process.cwd(), "content");
const LEADS_FILE = path.join(CONTENT_DIR, "leads.jsonl");

export type Lead = {
  createdAt: string;
  source: string; // where the form was filled in, e.g. "Case study: real-estate-site-visits"
  name: string;
  phone: string;
  email: string;
  company: string;
};

export async function addLead(lead: Omit<Lead, "createdAt">) {
  await fs.mkdir(CONTENT_DIR, { recursive: true });
  await fs.appendFile(LEADS_FILE, JSON.stringify({ createdAt: new Date().toISOString(), ...lead }) + "\n", "utf8");
}

/** Every lead, newest first. */
export function getLeads(): Lead[] {
  let text = "";
  try {
    text = readFileSync(LEADS_FILE, "utf8");
  } catch {
    return [];
  }
  return text
    .split("\n")
    .filter(Boolean)
    .flatMap((line) => {
      try {
        return [JSON.parse(line) as Lead];
      } catch {
        return [];
      }
    })
    .reverse();
}
