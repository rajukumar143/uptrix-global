import PulseShell from "@/components/site/PulseShell";

export default function BlogLayout({ children }: LayoutProps<"/blog">) {
  return <PulseShell>{children}</PulseShell>;
}
