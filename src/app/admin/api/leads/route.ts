import { isAdmin } from "@/lib/admin-auth";
import { getLeads } from "@/lib/lead-store";

// Download every lead as a CSV file (admins only). Cells Excel could run as a formula get a ' in front.
const cell = (v: string) => `"${(/^([=@]|[+-](?![\d\s]*$))/.test(v) ? `'${v}` : v).replace(/"/g, '""')}"`;

export async function GET() {
  if (!(await isAdmin())) return new Response("Please sign in again.", { status: 401 });

  const headers = [
    "Date",
    "Time (IST)",
    "Lead Name",
    "Company Name",
    "Email / Gmail",
    "Mobile Number",
    "Business Type",
    "What would you like to solve?",
    "Page URL",
    "Source Channel",
  ];

  const rows = [
    headers,
    ...getLeads().map((l) => {
      const d = new Date(l.createdAt);
      const dateStr = Number.isNaN(d.getTime())
        ? l.createdAt
        : d.toLocaleDateString("en-IN", {
            timeZone: "Asia/Kolkata",
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
      const timeStr = Number.isNaN(d.getTime())
        ? ""
        : d.toLocaleTimeString("en-IN", {
            timeZone: "Asia/Kolkata",
            hour: "2-digit",
            minute: "2-digit",
          });

      return [
        dateStr,
        timeStr,
        l.name || "",
        l.company || "",
        l.email || "",
        l.phone || "",
        l.businessType || "",
        l.solveProblem || "",
        l.pageUrl || "",
        l.source || "",
      ];
    }),
  ];

  const csv = "\uFEFF" + rows.map((r) => r.map(cell).join(",")).join("\r\n");
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="uptrix-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
