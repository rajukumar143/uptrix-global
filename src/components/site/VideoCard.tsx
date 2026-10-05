"use client";

import { useState } from "react";

/**
 * A YouTube video that only loads YouTube's player when the visitor presses play,
 * so pages with several videos stay fast.
 */
export default function VideoCard({ id, title, playLabel }: { id: string; title: string; playLabel: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl bg-pulse-night">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} aria-label={`${playLabel}: ${title}`} className="group absolute inset-0 cursor-pointer">
          {/* eslint-disable-next-line @next/next/no-img-element -- YouTube's own thumbnail */}
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover opacity-90 transition duration-300 group-hover:scale-[1.03] group-hover:opacity-100"
          />
          <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-[rgba(15,18,64,0.55)] to-transparent" />
          <span
            aria-hidden
            className="absolute top-1/2 left-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-pulse shadow-[0_12px_30px_-8px_rgba(0,0,0,0.5)] transition-transform duration-200 group-hover:scale-110"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
