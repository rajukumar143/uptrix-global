import { pageInfo, pageKeys } from "@/content";
import { requireAdmin } from "@/lib/admin-auth";
import { getLeads } from "@/lib/lead-store";
import { getAllPosts } from "@/lib/blog-store";
import { seedSiteContent } from "@/lib/content-store";
import AdminPanelShell from "@/components/admin/AdminPanelShell";

export default async function PanelLayout({ children }: LayoutProps<"/admin">) {
  await requireAdmin();
  try {
    await seedSiteContent();
  } catch (err) {
    console.warn("PanelLayout seedSiteContent failed:", err);
  }

  let leads: ReturnType<typeof getLeads> = [];
  try {
    leads = getLeads();
  } catch (err) {
    console.warn("PanelLayout getLeads failed:", err);
  }

  let posts: ReturnType<typeof getAllPosts> = [];
  try {
    posts = getAllPosts();
  } catch (err) {
    console.warn("PanelLayout getAllPosts failed:", err);
  }

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
