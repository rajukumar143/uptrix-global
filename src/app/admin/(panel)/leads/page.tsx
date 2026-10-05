import { requireAdmin } from "@/lib/admin-auth";
import { getLeads } from "@/lib/lead-store";

const dateTime = (iso: string) =>
  new Date(iso).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" });

export default async function LeadsAdmin() {
  await requireAdmin();
  const leads = getLeads();

  return (
    <div className="mx-auto flex max-w-[1100px] flex-col gap-6 px-5 py-8 md:px-10">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Leads</h1>
          <p className="mt-1 text-slate-500">People who filled in a form on the website, newest first. Download them to use in Excel or your CRM.</p>
        </div>
        {leads.length > 0 && (
          <a href="/admin/api/leads" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
            Download CSV
          </a>
        )}
      </header>

      {leads.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
          No leads yet. They appear here when someone fills in the form to read a case study.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs font-bold tracking-wide text-slate-500 uppercase">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">From</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leads.map((l, i) => (
                <tr key={i} className="align-top">
                  <td className="px-4 py-3 whitespace-nowrap text-slate-500">{dateTime(l.createdAt)}</td>
                  <td className="px-4 py-3 font-semibold text-slate-900">{l.name}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <a href={`tel:${l.phone.replace(/[^\d+]/g, "")}`} className="text-indigo-700 hover:underline">
                      {l.phone}
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    {l.email && (
                      <a href={`mailto:${l.email}`} className="text-indigo-700 hover:underline">
                        {l.email}
                      </a>
                    )}
                  </td>
                  <td className="px-4 py-3">{l.company}</td>
                  <td className="px-4 py-3 text-slate-500">{l.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
