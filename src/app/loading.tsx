export default function Loading() {
  return (
    <main className="grid min-h-[40vh] place-items-center px-6" aria-label="Loading page">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-pulse-line border-t-pulse" role="status">
        <span className="sr-only">Loading</span>
      </div>
    </main>
  );
}
