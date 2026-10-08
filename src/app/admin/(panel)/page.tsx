import { pageInfo, pageKeys } from "@/content";
import { requireAdmin } from "@/lib/admin-auth";
import { listBackups } from "@/lib/content-store";
import { getLeads } from "@/lib/lead-store";
import { getAllPosts } from "@/lib/blog-store";
import AdminDashboardView from "@/components/admin/AdminDashboardView";

export default async function AdminDashboard({ searchParams }: PageProps<"/admin">) {
  await requireAdmin();
  const { restored } = await searchParams;
  const backups = (await listBackups()).slice(0, 10);
  const leads = getLeads();
  const posts = getAllPosts();

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
