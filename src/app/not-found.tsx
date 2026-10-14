import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-white px-6 text-center">
      <div className="max-w-lg">
        <p className="font-mono text-sm font-semibold uppercase tracking-widest text-pulse">404</p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-pulse-night">Page not found</h1>
        <p className="mt-4 text-pulse-muted">The page may have moved, or the address may be incorrect.</p>
        <Link href="/" className="mt-7 inline-flex rounded-full bg-pulse px-6 py-3 font-semibold text-white">Go to homepage</Link>
      </div>
    </main>
  );
}
