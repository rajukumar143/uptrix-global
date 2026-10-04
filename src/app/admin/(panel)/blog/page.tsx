import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { getAllPosts, isLive } from "@/lib/blog-store";
import { analyzeSeo } from "@/lib/seo-check";
import { formatDate } from "@/lib/site";

function statusOf(p: ReturnType<typeof getAllPosts>[number]) {
  if (p.status === "draft") return { label: "Draft", cls: "bg-slate-100 text-slate-600" };
  if (!isLive(p)) return { label: "Scheduled", cls: "bg-amber-50 text-amber-700" };
  return { label: "Published", cls: "bg-emerald-50 text-emerald-700" };
}

export default async function BlogAdmin({ searchParams }: PageProps<"/admin/blog">) {
  await requireAdmin();
  const { deleted } = await searchParams;
  const posts = getAllPosts();

  return (
    <div className="mx-auto flex max-w-[1040px] flex-col gap-6 px-5 py-8 md:px-10">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Blog posts</h1>
          <p className="mt-1 text-slate-500">Write articles that help customers find you on Google.</p>
        </div>
        <div className="flex gap-2">
          <a href="/blog" target="_blank" rel="noreferrer" className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold hover:bg-slate-50">
            View blog ↗
          </a>
          <Link href="/admin/blog/new" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
            + New post
          </Link>
        </div>
      </header>

      {deleted && (
        <p role="status" className="rounded-lg bg-emerald-50 px-4 py-3 font-medium text-emerald-800">
          The post was deleted.
        </p>
      )}

      {posts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-lg font-semibold text-slate-800">No posts yet</p>
          <p className="mt-1 text-slate-500">Your first article is one click away.</p>
          <Link href="/admin/blog/new" className="mt-4 inline-block rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700">
            Write your first post
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-slate-50 text-xs font-bold tracking-wide text-slate-500 uppercase">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">SEO score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {posts.map((p) => {
                const st = statusOf(p);
                const { score } = analyzeSeo({
                  title: p.title,
                  seoTitle: p.seoTitle,
                  metaDescription: p.metaDescription,
                  focusKeyword: p.focusKeyword,
                  slug: p.slug,
                  content: p.content,
                  excerpt: p.excerpt,
                  coverSrc: p.coverImage.src,
                  coverAlt: p.coverImage.alt,
                });
                const sc = score >= 80 ? "text-emerald-700" : score >= 50 ? "text-amber-700" : "text-red-600";
                return (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <Link href={`/admin/blog/${p.id}`} className="font-semibold text-slate-900 hover:text-indigo-700">
                        {p.title || "Untitled"}
                      </Link>
                      <p className="text-xs text-slate-400">/blog/{p.slug}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${st.cls}`}>{st.label}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{formatDate(p.publishedAt)}</td>
                    <td className={`px-4 py-3 font-bold ${sc}`}>{score}/100</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
