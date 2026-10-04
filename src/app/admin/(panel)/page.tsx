import Link from "next/link";
import { restoreVersion } from "@/app/admin/actions";
import { pageInfo, pageKeys } from "@/content";
import ConfirmSubmit from "@/components/admin/ConfirmSubmit";
import { requireAdmin } from "@/lib/admin-auth";
import { listBackups } from "@/lib/content-store";

const when = (iso: string) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" });
};

export default async function AdminDashboard({ searchParams }: PageProps<"/admin">) {
  await requireAdmin();
  const { restored } = await searchParams;
  const backups = (await listBackups()).slice(0, 10);

  return (
    <div className="mx-auto flex max-w-[960px] flex-col gap-8 px-5 py-8 md:px-10">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Website content</h1>
        <p className="mt-1 text-slate-500">Choose a page to edit its text. Changes go live as soon as you press Save.</p>
      </header>

      {restored && (
        <p role="status" className="rounded-lg bg-emerald-50 px-4 py-3 font-medium text-emerald-800">
          The earlier version has been restored.
        </p>
      )}

      <ul className="grid gap-3 sm:grid-cols-2">
        {pageKeys.map((k) => (
          <li key={k}>
            <Link
              href={`/admin/${k}`}
              className="flex h-full flex-col gap-1.5 rounded-xl border border-slate-200 bg-white p-5 transition hover:border-indigo-300 hover:shadow-sm"
            >
              <span className="text-base font-bold text-slate-900">{pageInfo[k].title}</span>
              <span className="text-sm text-slate-500">{pageInfo[k].description}</span>
              <span className="mt-1 text-sm font-semibold text-indigo-600">Edit →</span>
            </Link>
          </li>
        ))}
      </ul>

      <section aria-labelledby="history-h" className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 id="history-h" className="text-lg font-bold text-slate-900">
          Version history
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Every save keeps a copy of the text as it was before. Restore one to undo changes on all pages back to that point.
        </p>
        {backups.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">No earlier versions yet.</p>
        ) : (
          <ul className="mt-4 divide-y divide-slate-100">
            {backups.map((b) => (
              <li key={b.id} className="flex items-center justify-between gap-4 py-2.5">
                <span className="text-sm text-slate-700">Before the save at {when(b.savedAt)}</span>
                <form action={restoreVersion}>
                  <input type="hidden" name="id" value={b.id} />
                  <ConfirmSubmit
                    message="Restore this version? Text on all pages will go back to how it was before this save."
                    className="cursor-pointer rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold hover:bg-slate-50"
                  >
                    Restore
                  </ConfirmSubmit>
                </form>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
