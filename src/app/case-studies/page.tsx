import type { Metadata } from "next";
import Link from "next/link";
import { container, eyebrow, h1 } from "@/components/crm/styles";
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

const accents = ["#3b3fd4", "#22b07d", "#f08a24", "#8b4fd8", "#e0457b"];

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
          {list.map((s, i) => {
            const accent = accents[i % accents.length];
            return (
              <li key={s.slug}>
                <Link
                  href={`/case-studies/${s.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-pulse-line bg-white shadow-[0_18px_40px_-30px_rgba(14,19,48,0.35)] transition-transform duration-200 hover:-translate-y-1"
                >
                  <div className="relative flex flex-col gap-5 bg-pulse-night p-7 text-white">
                    <div aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: accent }} />
                    <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                      <span className="rounded-full bg-white/10 px-3 py-1">{s.product}</span>
                      {s.isExample && <span className="rounded-full border border-white/25 px-3 py-1 text-[#cfd0f0]">{page.exampleLabel}</span>}
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {s.metrics.slice(0, 3).map((m, j) => (
                        <div key={j} className="flex flex-col gap-1">
                          <span className="text-[clamp(22px,2.4vw,28px)] leading-none font-extrabold tracking-[-0.02em]" style={{ color: j === 0 ? "#fff" : "#cfd0f0" }}>
                            {m.value}
                          </span>
                          <span className="text-xs leading-snug text-[#a9abd6]">{m.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-7">
                    <p className="text-sm font-semibold text-pulse-faint">
                      {s.client}
                      {s.location && ` · ${s.location}`}
                    </p>
                    <h2 className="text-xl leading-snug font-extrabold tracking-[-0.01em] text-balance group-hover:text-pulse">{s.title}</h2>
                    <p className="text-[15px] leading-[1.6] text-pulse-subtle">{s.summary}</p>
                    <span className="mt-auto pt-2 text-[15px] font-bold text-pulse">{page.readMoreLabel} →</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
