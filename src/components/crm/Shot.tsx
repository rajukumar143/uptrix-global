// PLACEHOLDER: swap each <Shot> for a real Uptrix Pulse screenshot (next/image, object-contain)
export default function Shot({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <div
      role="img"
      aria-label={`Placeholder: ${label}`}
      className={`grid h-full w-full place-items-center p-4 ${dark ? "bg-[#1a1e55]" : "placeholder-stripes"}`}
    >
      <span
        className={`rounded-lg border px-2.5 py-1.5 text-center font-code text-xs ${
          dark ? "border-white/15 bg-white/5 text-[#c9cbf0]" : "border-pulse-line bg-white text-pulse-subtle"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
