"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="grid min-h-screen place-items-center bg-white px-6 text-center">
      <div className="max-w-lg">
        <h1 className="text-3xl font-extrabold text-pulse-night">Something went wrong</h1>
        <p className="mt-3 text-pulse-muted">Please try again. If the problem continues, contact our team.</p>
        <button type="button" onClick={reset} className="mt-7 rounded-full bg-pulse px-6 py-3 font-semibold text-white">Try again</button>
      </div>
    </main>
  );
}
