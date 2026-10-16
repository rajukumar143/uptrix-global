import Image from "next/image";

export default function Shot({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <div className={`relative h-full w-full overflow-hidden ${dark ? "bg-[#1a1e55]" : "bg-slate-100"}`}>
      <Image
        src="/images/products/crm-pipeline.jpg"
        alt={label || "Uptrix Pulse CRM"}
        fill
        className="object-cover object-top transition-transform duration-500 hover:scale-105"
        sizes="(max-width: 768px) 100vw, 800px"
      />
    </div>
  );
}
