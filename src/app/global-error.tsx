"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body>
        <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "24px", textAlign: "center" }}>
          <div>
            <h1>Something went wrong</h1>
            <p>Please try again. If the problem continues, contact our team.</p>
            <button type="button" onClick={reset}>Try again</button>
          </div>
        </main>
      </body>
    </html>
  );
}
