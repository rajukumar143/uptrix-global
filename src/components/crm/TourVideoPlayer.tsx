"use client";

import { useEffect, useRef, useState } from "react";

export default function TourVideoPlayer({
  tabLabel,
  title,
  videoUrl,
  youtubeId,
  screenshotLabel,
}: {
  tabLabel: string;
  title: string;
  videoUrl?: string;
  youtubeId?: string;
  screenshotLabel?: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(24);
  const [customUrl, setCustomUrl] = useState<string>("");
  const [showInput, setShowInput] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeVideo = customUrl || videoUrl;

  // Simulated progress when playing in mockup mode
  useEffect(() => {
    if (!isPlaying || activeVideo || youtubeId) return;
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 0.8));
    }, 200);
    return () => clearInterval(interval);
  }, [isPlaying, activeVideo, youtubeId]);

  const togglePlay = () => {
    if (activeVideo && videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    } else {
      setIsPlaying((p) => !p);
    }
  };

  const handleFullscreen = () => {
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current.requestFullscreen();
    }
  };

  return (
    <div
      ref={containerRef}
      className="group relative flex aspect-video w-full flex-col overflow-hidden rounded-[24px] border border-[#d8dceb] bg-[#0c102a] shadow-[0_28px_65px_-20px_rgba(14,19,48,0.38)] ring-1 ring-white/10"
    >
      {/* Top OS / Browser chrome */}
      <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-[#12163b]/95 px-4 py-2.5 backdrop-blur-md sm:px-5">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
        </div>

        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/90 shadow-inner">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-pulse-soft">
            <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
          </svg>
          <span className="truncate max-w-[200px] sm:max-w-[340px]">
            Uptrix Pulse · {tabLabel} Walkthrough
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowInput((s) => !s)}
            className="hidden items-center gap-1.5 rounded-md border border-white/15 bg-white/10 px-2 py-1 text-[11px] font-bold text-white/80 transition hover:bg-white/20 sm:flex"
            title="Attach custom video file or URL"
          >
            <span>+ Video URL</span>
          </button>
          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-300">
            HD 1080p
          </span>
        </div>
      </div>

      {/* Optional video URL input dropdown */}
      {showInput && (
        <div className="absolute top-12 right-4 z-30 flex items-center gap-2 rounded-xl border border-white/20 bg-slate-900/95 p-2 shadow-2xl backdrop-blur-md">
          <input
            type="text"
            placeholder="Paste .mp4 link or YouTube URL..."
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            className="w-64 rounded-lg border border-white/15 bg-black/40 px-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-pulse"
          />
          <button
            type="button"
            onClick={() => setShowInput(false)}
            className="rounded-lg bg-pulse px-3 py-1.5 text-xs font-bold text-white hover:bg-pulse-hover"
          >
            Done
          </button>
        </div>
      )}

      {/* Video Content Area */}
      <div className="relative flex-1 overflow-hidden">
        {youtubeId ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=${isPlaying ? "1" : "0"}&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : activeVideo ? (
          <video
            ref={videoRef}
            src={activeVideo}
            playsInline
            muted={isMuted}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onTimeUpdate={() => {
              if (videoRef.current) {
                const pct = (videoRef.current.currentTime / videoRef.current.duration) * 100;
                setProgress(pct || 0);
              }
            }}
            className="h-full w-full object-cover"
          />
        ) : (
          /* High-fidelity interactive demo mockup */
          <div className="relative h-full w-full bg-gradient-to-br from-[#0e1338] via-[#141a4a] to-[#0a0d24] text-white">
            {/* Visual demo background showing active CRM workflow */}
            <div className="absolute inset-0 opacity-40">
              <div className="grid h-full grid-cols-12 gap-3 p-6">
                <div className="col-span-3 flex flex-col gap-2 rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="h-3 w-20 rounded bg-white/20" />
                  <div className="h-8 rounded-lg bg-pulse/30" />
                  <div className="h-8 rounded-lg bg-white/5" />
                  <div className="h-8 rounded-lg bg-white/5" />
                  <div className="h-8 rounded-lg bg-white/5" />
                </div>
                <div className="col-span-9 flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <div className="h-4 w-32 rounded bg-white/25" />
                    <div className="h-6 w-24 rounded-full bg-emerald-500/20" />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-16 rounded-lg bg-white/5 p-2" />
                    <div className="h-16 rounded-lg bg-white/5 p-2" />
                    <div className="h-16 rounded-lg bg-white/5 p-2" />
                  </div>
                  <div className="flex-1 rounded-lg border border-dashed border-white/15 bg-white/[0.03] p-4 flex items-center justify-center">
                    <span className="font-code text-xs text-white/50 tracking-wider">
                      {screenshotLabel || `${tabLabel} live workspace demo`}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Glowing Center Play Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/25 backdrop-blur-[2px]">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause video walkthrough" : "Play video walkthrough"}
                className="group/btn relative flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-white text-pulse shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-110 hover:bg-pulse hover:text-white"
              >
                <span className="absolute -inset-2 animate-ping rounded-full bg-white/20 opacity-75 group-hover/btn:bg-pulse/30" />
                {isPlaying ? (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
                  </svg>
                ) : (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="translate-x-0.5">
                    <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
                  </svg>
                )}
              </button>

              <div className="flex flex-col items-center gap-1 text-center">
                <span className="text-base font-extrabold text-white">
                  {isPlaying ? "Playing Walkthrough" : `Watch ${tabLabel} Video Tour`}
                </span>
                <span className="text-xs text-white/60">
                  {isPlaying ? "Click to pause" : "2 min quick walkthrough"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Video Player Bottom Controls Overlay */}
        <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 pt-6 transition-opacity sm:p-4">
          {/* Progress bar */}
          <div
            className="group/track relative h-1.5 w-full cursor-pointer rounded-full bg-white/20 transition-all hover:h-2"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickPct = ((e.clientX - rect.left) / rect.width) * 100;
              setProgress(clickPct);
              if (activeVideo && videoRef.current) {
                videoRef.current.currentTime = (clickPct / 100) * videoRef.current.duration;
              }
            }}
          >
            <div
              className="relative h-full rounded-full bg-gradient-to-r from-pulse to-[#22b07d]"
              style={{ width: `${progress}%` }}
            >
              <span className="absolute top-1/2 right-0 h-3 w-3 -translate-y-1/2 translate-x-1/2 rounded-full bg-white shadow-md" />
            </div>
          </div>

          {/* Control buttons */}
          <div className="mt-2.5 flex items-center justify-between text-xs text-white">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={togglePlay}
                className="grid h-7 w-7 place-items-center rounded-lg bg-white/10 text-white transition hover:bg-white/20"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
                  </svg>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsMuted((m) => !m);
                  if (videoRef.current) videoRef.current.muted = !isMuted;
                }}
                className="grid h-7 w-7 place-items-center rounded-lg bg-white/10 text-white transition hover:bg-white/20"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 5 6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 5 6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                )}
              </button>

              <span className="font-mono text-[11px] text-white/80">
                {String(Math.floor((progress / 100) * 135)).padStart(2, "0")}s / 2:15
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden text-[11px] text-white/60 sm:inline">
                {tabLabel} Walkthrough
              </span>
              <button
                type="button"
                onClick={handleFullscreen}
                className="grid h-7 w-7 place-items-center rounded-lg bg-white/10 text-white transition hover:bg-white/20"
                aria-label="Toggle Fullscreen"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
