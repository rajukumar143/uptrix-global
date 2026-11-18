import { notFound } from "next/navigation";
import { resetPage } from "@/app/admin/actions";
import ContentEditor from "@/components/admin/ContentEditor";
import { defaultContent, isPageKey, pageInfo } from "@/content";
import { HRMS_LAYOUTS, HRMS_PART_TITLES, editablePart, isHrmsPart } from "@/content/hrms-parts";
import type { Json } from "@/content/merge";
import { requireAdmin } from "@/lib/admin-auth";
import { getPageContent } from "@/lib/content-store";

export default async function EditPage({ params, searchParams }: PageProps<"/admin/pages/[page]">) {
  await requireAdmin();
  const { page } = await params;
  const sp = searchParams ? await searchParams : undefined;
  const reset = sp?.reset;
  if (!isPageKey(page)) notFound();

  // The HRMS page can be opened one part at a time (home, HR suite, IT suite, Finance suite).
  const part = page === "hrms" && isHrmsPart(sp?.part) ? sp?.part : undefined;
  const info = pageInfo[page];
  const full = getPageContent(page) as unknown as Record<string, unknown>;
  const defaults = defaultContent[page] as unknown as Record<string, unknown>;

  return (
    <ContentEditor
      key={`${page}-${part ?? "all"}${reset ? "-reset" : ""}`}
      pageKey={page}
      part={part}
      layout={part ? HRMS_LAYOUTS[part] : undefined}
      title={part ? HRMS_PART_TITLES[part] : info.title}
      description={info.description}
      viewPath={info.paths[0]}
      initial={(part ? editablePart(full, part) : full) as Json}
      defaults={(part ? editablePart(defaults, part) : defaults) as Json}
      resetAction={resetPage.bind(null, page)}
      wasReset={Boolean(reset)}
    />
  );
}
