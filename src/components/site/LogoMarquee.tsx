import Image from "next/image";

const logoColors = ["#4F46E5", "#0284C7", "#D97706", "#16A34A", "#DC2626", "#7C3AED", "#DB2777", "#0D9488", "#EA580C", "#CA8A04"];

/** "Trusted by" bar with client names scrolling sideways. Used on the home page and the CRM page. */
export default function LogoMarquee({ heading, names, id = "trust-heading" }: { heading: string; names: string[]; id?: string }) {
  const logos = names.filter(Boolean);
  if (!logos.length) return null;

  return (
    <section aria-labelledby={id} className="border-b border-[#EEF1F6] bg-white">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-x-12 gap-y-6 px-6 py-9">
        <div className="flex flex-[0_1_240px] flex-col gap-2.5">
          <Image src="/logo-dark.png" alt="Uptrix" width={756} height={235} className="h-8 w-auto self-start" />
          <h2 id={id} className="font-display text-base leading-snug font-bold text-slate-900">
            {heading}
          </h2>
        </div>
        <div className="pause-on-hover min-w-0 flex-[1_1_400px] overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
          <ul aria-label="Client logos" className="animate-marquee flex w-max gap-14 px-7 py-2.5">
            {[...logos, ...logos].map((l, i) => (
              <li
                key={i}
                aria-hidden={i >= logos.length}
                className="logo-item flex flex-none cursor-default items-center gap-2.5 text-slate-400 transition-colors duration-300"
                style={{ ["--hover" as string]: logoColors[(i % logos.length) % logoColors.length] }}
              >
                <span className="grid h-6.5 w-6.5 flex-none place-items-center rounded-lg bg-current">
                  <span className="font-display text-[13px] leading-none font-extrabold text-white">{l[0]}</span>
                </span>
                <span className="font-display text-[17px] leading-none font-bold whitespace-nowrap">{l}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
