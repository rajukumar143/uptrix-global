import { isAdmin } from "@/lib/admin-auth";
import { getLeads } from "@/lib/lead-store";

// Download every lead as a CSV file (admins only). Cells Excel could run as a formula get a ' in front;
// phone numbers like +91 98765 43210 are left as they are.
const cell = (v: string) => `"${(/^([=@]|[+-](?![\d\s]*$))/.test(v) ? `'${v}` : v).replace(/"/g, '""')}"`;

export async function GET() {
  if (!(await isAdmin())) return new Response("Please sign in again.", { status: 401 });
  const rows = [["Date", "Name", "Phone", "Email", "Company", "From"], ...getLeads().map((l) => [l.createdAt, l.name, l.phone, l.email, l.company, l.source])];
  const csv = "﻿" + rows.map((r) => r.map(cell).join(",")).join("\r\n");
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="uptrix-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
