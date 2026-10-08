import { requireAdmin } from "@/lib/admin-auth";
import { getLeads } from "@/lib/lead-store";
import LeadsAdminView from "@/components/admin/LeadsAdminView";

export default async function LeadsAdmin() {
  await requireAdmin();
  const leads = getLeads();

  return <LeadsAdminView initialLeads={leads} />;
}
