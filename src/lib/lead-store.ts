// Server-only: enquiries sent from the website's forms, one JSON line each in content/leads.jsonl
import "server-only";

import { z } from "zod";
import { appendText, readTextSync } from "@/lib/content-files";

export type Lead = {
  createdAt: string; // ISO date-time string
  source: string; // where the form was filled in, e.g. "Real Estate Demo", "College ERP Tour"
  name: string; // Lead's name
  company: string; // Company / Institution name
  email: string; // Gmail / Email address
  phone: string; // Mobile / WhatsApp number
  businessType?: string; // Business type (e.g. Real Estate Developer, College / Higher Ed, etc.)
  solveProblem?: string; // "What would you like to solve? Optional"
  pageUrl?: string; // Page URL where the form was submitted
};

const leadSchema = z.object({
  createdAt: z.string().datetime(),
  source: z.string().max(150),
  name: z.string().min(1).max(120),
  company: z.string().max(150),
  email: z.string().max(150),
  phone: z.string().min(1).max(40),
  businessType: z.string().max(120).optional(),
  solveProblem: z.string().max(600).optional(),
  pageUrl: z.string().max(400).optional(),
}).strict();

const leadInputSchema = leadSchema.omit({ createdAt: true });

export function parseLeadInput(value: unknown) {
  return leadInputSchema.parse(value);
}

export async function addLead(lead: Omit<Lead, "createdAt">) {
  if (process.env.APP_MODE === "public") throw new Error("The public app cannot write directly to CONTENT_DIR.");
  const clean = leadInputSchema.parse(lead);
  const entry: Lead = {
    createdAt: new Date().toISOString(),
    ...clean,
  };
  await appendText(["leads.jsonl"], `${JSON.stringify(entry)}\n`);
}

/** Every lead, newest first. */
export function getLeads(): Lead[] {
  let text = "";
  try {
    text = readTextSync(["leads.jsonl"]);
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") return [];
    console.error("Could not read lead records", error);
    throw error;
  }
  return text
    .split("\n")
    .filter(Boolean)
    .flatMap((line) => {
      try {
        return [leadSchema.parse(JSON.parse(line))];
      } catch (error) {
        console.error("Ignoring an invalid lead record", error);
        return [];
      }
    })
    .reverse();
}
