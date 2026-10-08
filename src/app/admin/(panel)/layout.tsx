import { pageInfo, pageKeys } from "@/content";
import { requireAdmin } from "@/lib/admin-auth";
import { getLeads } from "@/lib/lead-store";
import { getAllPosts } from "@/lib/blog-store";
import AdminPanelShell from "@/components/admin/AdminPanelShell";

export default async function PanelLayout({ children }: LayoutProps<"/admin">) {
  await requireAdmin();

  const leads = getLeads();
  const posts = getAllPosts();

  return (
    <AdminPanelShell
      leadsCount={leads.length}
      postsCount={posts.length}
      pageKeys={pageKeys}
      pagesMeta={pageInfo}
    >
      {children}
    </AdminPanelShell>
  );
}
