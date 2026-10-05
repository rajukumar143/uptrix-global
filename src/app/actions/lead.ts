"use server";

import { clientAddress } from "@/lib/admin-auth";
import { addLead } from "@/lib/lead-store";

export type LeadResult = { ok: boolean; error?: string };

// A few submissions per visitor every 10 minutes, so bots can't flood the file
const recent = new Map<string, number[]>();
function tooMany(ip: string) {
  const now = Date.now();
  const list = (recent.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  list.push(now);
  recent.set(ip, list);
  return list.length > 8;
}

const clean = (v: FormDataEntryValue | null, max: number) => String(v ?? "").replace(/[\r\n\t]+/g, " ").trim().slice(0, max);

/** Saves an enquiry from a website form. It shows up in Admin → Leads. */
export async function submitLead(formData: FormData): Promise<LeadResult> {
  if (clean(formData.get("website"), 100)) return { ok: true }; // hidden field only bots fill in

  const lead = {
    source: clean(formData.get("source"), 120),
    name: clean(formData.get("name"), 100),
    phone: clean(formData.get("phone"), 30),
    email: clean(formData.get("email"), 150),
    company: clean(formData.get("company"), 120),
  };
  if (!lead.name || !lead.phone) return { ok: false, error: "Please enter your name and phone number." };
  if (!/^[+\d][\d\s-]{6,}$/.test(lead.phone)) return { ok: false, error: "Please enter a valid phone number." };
  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) return { ok: false, error: "Please enter a valid email address." };
  if (tooMany(await clientAddress())) return { ok: false, error: "Too many requests. Please try again in a few minutes." };

  try {
    await addLead(lead);
  } catch {
    return { ok: false, error: "Something went wrong. Please try again." };
  }
  return { ok: true };
}
