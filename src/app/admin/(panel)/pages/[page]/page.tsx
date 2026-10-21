import { notFound } from "next/navigation";
import { resetPage } from "@/app/admin/actions";
import ContentEditor from "@/components/admin/ContentEditor";
import { defaultContent, isPageKey, pageInfo } from "@/content";
import type { Json } from "@/content/merge";
import { requireAdmin } from "@/lib/admin-auth";
import { getPageContent } from "@/lib/content-store";

export default async function EditPage({ params, searchParams }: PageProps<"/admin/pages/[page]">) {
  await requireAdmin();
  const { page } = await params;
  const sp = searchParams ? await searchParams : undefined;
  const reset = sp?.reset;
  if (!isPageKey(page)) notFound();

  const info = pageInfo[page];
  return (
    <ContentEditor
      key={reset ? `${page}-reset` : page}
      pageKey={page}
      title={info.title}
      description={info.description}
      viewPath={info.paths[0]}
      initial={getPageContent(page) as unknown as Json}
      defaults={defaultContent[page] as unknown as Json}
      resetAction={resetPage.bind(null, page)}
      wasReset={Boolean(reset)}
    />
  );
}
