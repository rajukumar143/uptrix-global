import Image from "next/image";
import Link from "next/link";
import type { CrmLayoutContent } from "@/content/crm";
import { container } from "./styles";

export default function PulseFooter({ content }: { content: CrmLayoutContent["footer"] }) {
  return (
    <footer className="border-t border-pulse-line bg-white">
      <div className={`${container} flex flex-col gap-12 pt-[clamp(48px,7vw,80px)] pb-8`}>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,160px),1fr))] gap-8">
          <div className="flex flex-col gap-3.5">
            <Image src="/logo-dark.png" alt="Uptrix" width={756} height={235} className="h-[38px] w-auto self-start" />
            <p className="max-w-[240px] text-sm leading-relaxed text-pulse-subtle">{content.tagline}</p>
          </div>
          {content.columns.map((c, i) => (
            <nav key={i} aria-label={c.heading} className="flex flex-col gap-3">
              <h3 className="text-[13px] font-extrabold tracking-[0.04em] uppercase">{c.heading}</h3>
              {c.links.map((l, j) => (
                <Link key={j} href={l.link || "#"} className="py-0.5 text-[15px] text-pulse-muted hover:text-pulse">
                  {l.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>
        <div className="flex flex-wrap justify-between gap-4 border-t border-[#eceef5] pt-6 text-sm text-pulse-faint">
          <span>
            © {new Date().getFullYear()} {content.copyrightText}
          </span>
          <div className="flex flex-wrap gap-6">
            {content.legalLinks.map((l, i) => {
              const oldHomepageLink = ["https://uptrixglobal.com", "https://uptrixglobal.com/"].includes(l.link);
              const label = l.label.trim().toLowerCase();
              const href =
                oldHomepageLink || l.link === "/"
                  ? label === "privacy"
                    ? "/privacy"
                    : label === "terms"
                      ? "/terms"
                      : l.link
                  : l.link;
              return (
              <Link key={i} href={href || "#"} className="hover:text-pulse">
                {l.label}
              </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
