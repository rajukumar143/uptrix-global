"use server";

import { headers } from "next/headers";
import { clientAddress } from "@/lib/admin-auth";
import { addLead, type Lead } from "@/lib/lead-store";

export type LeadResult = { ok: boolean; error?: string };

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

/** Saves an enquiry from a website form. It shows up in Admin → Leads with all details. */
export async function submitLead(formData: FormData): Promise<LeadResult> {
  if (clean(formData.get("website"), 100)) return { ok: true }; // honeypot for bots

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

  if (!name || !phone) {
    return { ok: false, error: "Please enter your name and mobile number." };
  }
  if (!/^[+\d][\d\s-]{6,}$/.test(phone)) {
    return { ok: false, error: "Please enter a valid mobile number." };
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Please enter a valid email address (e.g. name@gmail.com)." };
  }
  if (tooMany(await clientAddress())) {
    return { ok: false, error: "Too many requests. Please try again in a few minutes." };
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
    await addLead(lead);
  } catch {
    return { ok: false, error: "Something went wrong. Please try again." };
  }
  return { ok: true };
}
