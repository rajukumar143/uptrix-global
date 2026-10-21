import { pageInfo, pageKeys } from "@/content";
import { requireAdmin } from "@/lib/admin-auth";
import { listBackups } from "@/lib/content-store";
import { getLeads } from "@/lib/lead-store";
import { getAllPosts } from "@/lib/blog-store";
import AdminDashboardView from "@/components/admin/AdminDashboardView";

export default async function AdminDashboard({ searchParams }: PageProps<"/admin">) {
  await requireAdmin();
  const sp = searchParams ? await searchParams : undefined;
  const restored = sp?.restored;

  let backups: Awaited<ReturnType<typeof listBackups>> = [];
  try {
    backups = (await listBackups()).slice(0, 10);
  } catch (err) {
    console.warn("Could not load backups for dashboard:", err);
  }

  let leads: ReturnType<typeof getLeads> = [];
  try {
    leads = getLeads();
  } catch (err) {
    console.warn("Could not load leads for dashboard:", err);
  }

  let posts: ReturnType<typeof getAllPosts> = [];
  try {
    posts = getAllPosts();
  } catch (err) {
    console.warn("Could not load posts for dashboard:", err);
  }

  return (
    <AdminDashboardView
      pageKeys={pageKeys}
      pagesMeta={pageInfo}
      backups={backups}
      leadsCount={leads.length}
      postsCount={posts.length}
      restored={Boolean(restored)}
    />
  );
}
