import type { Metadata } from "next";
import { container, eyebrow, h1 } from "@/components/crm/styles";
import StoryCard from "@/components/site/StoryCard";
import { liveStudies } from "@/content/stories";
import { getContent } from "@/lib/content-store";

export async function generateMetadata(): Promise<Metadata> {
  const { page } = getContent().caseStudies;
  return {
    title: page.pageTitle,
    description: page.metaDescription,
    alternates: { canonical: "/case-studies" },
    openGraph: { title: page.pageTitle, description: page.metaDescription, type: "website", url: "/case-studies", images: ["/logo-dark.png"] },
  };
}

export default function CaseStudiesPage() {
  const { page, studies } = getContent().caseStudies;
  const list = liveStudies(studies);

  return (
    <main>
      <section aria-labelledby="cs-h" className={`${container} flex flex-col gap-5 pt-[clamp(48px,8vw,96px)] pb-[clamp(40px,6vw,64px)]`}>
        <p className={eyebrow}>{page.eyebrow}</p>
        <h1 id="cs-h" className={`${h1} max-w-[820px]`}>
          {page.heading}
        </h1>
        <p className="max-w-[680px] text-[clamp(17px,1.6vw,19px)] leading-relaxed text-pretty text-pulse-muted">{page.intro}</p>
      </section>

      <section aria-label="Stories" className={`${container} pb-[clamp(64px,9vw,112px)]`}>
        <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(min(100%,340px),1fr))] gap-6 p-0">
          {list.map((s, i) => (
            <li key={s.slug}>
              <StoryCard study={s} index={i} text={page} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
