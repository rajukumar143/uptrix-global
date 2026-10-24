"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { clientAddress } from "@/lib/admin-auth";
import { addLead, type Lead } from "@/lib/lead-store";

export type LeadResult = { ok: boolean; success?: boolean; error?: string };

// A few submissions per visitor every 10 minutes, so bots can't flood the file
const recent = new Map<string, number[]>();
function tooMany(ip: string) {
  const now = Date.now();
  const list = (recent.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  list.push(now);
  recent.set(ip, list);
  return list.length > 12;
}

const clean = (v: FormDataEntryValue | null | undefined, max: number) =>
  String(v ?? "")
    .replace(/[\r\n\t]+/g, " ")
    .trim()
    .slice(0, max);

const formSchema = z.object({
  name: z.string().min(1).max(120),
  company: z.string().max(150),
  email: z.union([z.literal(""), z.string().email().max(150)]),
  phone: z.string().regex(/^[+\d][\d\s-]{6,}$/).max(40),
  businessType: z.string().max(120),
  solveProblem: z.string().max(600),
  pageUrl: z.string().max(400),
  source: z.string().max(150),
}).strict();

async function verifyTurnstile(formData: FormData, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  const token = clean(formData.get("cf-turnstile-response"), 2048);
  if (!secret || !token) return false;
  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) throw new Error(`Turnstile returned ${response.status}.`);
    const result = z.object({ success: z.boolean(), hostname: z.string().optional() }).safeParse(await response.json());
    if (!result.success || !result.data.success) return false;
    const host = process.env.SITE_URL ? new URL(process.env.SITE_URL).hostname : "";
    return !host || result.data.hostname === host;
  } catch (error) {
    console.error("Turnstile verification failed", error);
    return false;
  }
}

/** Saves an enquiry from a website form. It shows up in Admin → Leads with all details. */
export async function submitLead(formData: FormData): Promise<LeadResult> {
  if (clean(formData.get("website"), 100)) return { ok: true, success: true }; // honeypot for bots

  const h = await headers();
  const refererUrl = h.get("referer") || "";

  const name = clean(formData.get("name"), 120);
  const company = clean(formData.get("company"), 150);
  const email = clean(formData.get("email"), 150);
  const phone = clean(formData.get("phone"), 40);
  const businessType = clean(formData.get("businessType") || formData.get("type"), 120);
  const solveProblem = clean(
    formData.get("solveProblem") ||
      formData.get("requirement") ||
      formData.get("problem") ||
      formData.get("message") ||
      formData.get("req"),
    600
  );
  const pageUrl = clean(formData.get("pageUrl"), 400) || refererUrl;
  const source = clean(formData.get("source"), 150) || "Website Form";

  const parsed = formSchema.safeParse({ name, company, email, phone, businessType, solveProblem, pageUrl, source });
  if (!parsed.success) {
    return { ok: false, error: "Please check the form fields and try again." };
  }
  const ip = await clientAddress();
  if (tooMany(ip)) {
    return { ok: false, error: "Too many requests. Please try again in a few minutes." };
  }
  if (process.env.APP_MODE === "public" && !(await verifyTurnstile(formData, ip))) {
    return { ok: false, error: "Please complete the verification and try again." };
  }

  const lead: Omit<Lead, "createdAt"> = {
    source,
    name,
    company: company || "Not specified",
    email: email || "",
    phone,
    businessType: businessType || "General",
    solveProblem: solveProblem || "",
    pageUrl: pageUrl || "/",
  };

  try {
    if (process.env.APP_MODE === "public") {
      const apiUrl = process.env.API_URL;
      const apiSecret = process.env.ADMIN_API_SECRET;
      if (!apiUrl || !apiSecret || apiSecret.length < 32) {
        throw new Error("The public lead API is not configured.");
      }
      const response = await fetch(new URL("/api/admin/leads", apiUrl), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiSecret}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lead),
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
      });
      if (!response.ok) throw new Error(`Admin lead API returned ${response.status}.`);
    } else {
      await addLead(lead);
    }
  } catch (error) {
    console.error("Could not persist website enquiry", error);
    return { ok: false, error: "Something went wrong. Please try again." };
  }
  return { ok: true, success: true };
}
