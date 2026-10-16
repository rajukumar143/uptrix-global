"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import imageCompression from "browser-image-compression";

export default function AdminUploadPage() {
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [published, setPublished] = useState(true);

  // Image handling
  const [previewUrl, setPreviewUrl] = useState(null);
  const [compressedFile, setCompressedFile] = useState(null);
  const [imageStats, setImageStats] = useState(null); // { originalSize, compressedSize }

  // Status
  const [status, setStatus] = useState("idle"); // 'idle' | 'compressing' | 'uploading' | 'success' | 'error'
  const [statusMessage, setStatusMessage] = useState("");
  const [createdPost, setCreatedPost] = useState(null);

  // Image selection and client-side compression
  async function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreviewUrl(URL.createObjectURL(file));
    setStatus("compressing");
    setStatusMessage("Compressing image in browser (target: max 300 KB, max 1600 px)...");

    try {
      const options = {
        maxSizeMB: 0.3, // Max 300 KB
        maxWidthOrHeight: 1600, // Max 1600 px
        useWebWorker: true,
      };

      const compressed = await imageCompression(file, options);
      setCompressedFile(compressed);

      setImageStats({
        originalKb: Math.round(file.size / 1024),
        compressedKb: Math.round(compressed.size / 1024),
      });

      setStatus("idle");
      setStatusMessage("");
    } catch (err) {
      console.error("[upload] Image compression error:", err);
      // Fallback: use original file if compression encounters issues
      setCompressedFile(file);
      setImageStats({
        originalKb: Math.round(file.size / 1024),
        compressedKb: Math.round(file.size / 1024),
      });
      setStatus("idle");
      setStatusMessage("");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setStatus("error");
      setStatusMessage("Title and content are required.");
      return;
    }

    setStatus("uploading");
    setStatusMessage("Uploading image and publishing post to Supabase...");
    setCreatedPost(null);

    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("content", content.trim());
      formData.append("meta_description", metaDescription.trim());
      formData.append("meta_title", metaTitle.trim() || title.trim());
      formData.append("meta_keywords", metaKeywords.trim());
      formData.append("published", published ? "true" : "false");

      if (compressedFile) {
        formData.append("image", compressedFile, compressedFile.name || "cover.jpg");
      }

      const res = await fetch("/api/posts", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setStatusMessage(data.error || "Failed to create post.");
        return;
      }

      setStatus("success");
      setStatusMessage("Post successfully published!");
      setCreatedPost(data.post);

      // Reset form fields
      setTitle("");
      setContent("");
      setMetaDescription("");
      setMetaTitle("");
      setMetaKeywords("");
      setSelectedFile(null);
      setCompressedFile(null);
      setPreviewUrl(null);
      setImageStats(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error("[upload] Submission error:", err);
      setStatus("error");
      setStatusMessage("Network error occurred while publishing.");
    }
  }

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Top Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Create & Publish Post
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Browser-side image compression (max 300KB) • Server-side Supabase storage
            </p>
          </div>

          <Link
            href="/admin/security"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition self-start"
          >
            <span>🛡️ Security Logs</span>
          </Link>
        </div>

        {/* Success Alert */}
        {status === "success" && createdPost && (
          <div className="mb-8 rounded-2xl border border-teal-500/30 bg-teal-500/10 p-5 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-teal-500 text-slate-950 font-bold text-sm">
                ✓
              </span>
              <div>
                <h4 className="font-semibold text-teal-200 text-sm">Post Created Successfully!</h4>
                <p className="text-xs text-teal-300/80 mt-0.5">
                  Slug: <code className="font-mono">{createdPost.slug}</code>
                </p>
              </div>
            </div>

            <Link
              href={`/blog/${createdPost.slug}`}
              target="_blank"
              className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-teal-400 px-4 text-xs font-bold text-slate-950 transition hover:bg-teal-300 whitespace-nowrap self-start sm:self-center"
            >
              <span>View Live Post</span>
              <span>↗</span>
            </Link>
          </div>
        )}

        {/* Error Alert */}
        {status === "error" && (
          <div className="mb-8 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs text-rose-300 flex items-center gap-3">
            <span className="text-lg">⚠️</span>
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Post Title */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Post Title <span className="text-rose-400">*</span>
            </label>
            <input
              required
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Building Scalable Microservices with Node.js & Docker"
              className="h-12 w-full rounded-xl border border-white/15 bg-white/5 px-4 text-base font-semibold text-white placeholder-slate-500 outline-none transition focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
            />
          </div>

          {/* Image Upload with Client Compression */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Cover Image (Browser-Compressed: Max 300 KB, Max 1600 px)
              </label>
              {imageStats && (
                <span className="text-[11px] font-mono text-teal-400">
                  {imageStats.originalKb} KB → {imageStats.compressedKb} KB (
                  {Math.round((1 - imageStats.compressedKb / imageStats.originalKb) * 100)}% smaller)
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 mt-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-xs text-slate-400 file:mr-4 file:h-10 file:rounded-xl file:border-0 file:bg-white/10 file:px-4 file:text-xs file:font-semibold file:text-white file:cursor-pointer hover:file:bg-white/20"
              />

              {previewUrl && (
                <div className="relative aspect-video w-48 shrink-0 overflow-hidden rounded-xl border border-white/20 bg-slate-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
            </div>

            {status === "compressing" && (
              <p className="mt-2 text-xs text-indigo-300 animate-pulse">{statusMessage}</p>
            )}
          </div>

          {/* Post Markdown Content */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Article Body (Markdown Supported) <span className="text-rose-400">*</span>
              </label>
              <span className="text-[11px] text-slate-400">Supports # H1, ## H2, ```code```</span>
            </div>
            <textarea
              required
              rows={14}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your article here using Markdown...&#10;&#10;## Section Heading&#10;Paragraph text with **bold** and *italic* styling.&#10;&#10;- Bullet points&#10;- Code blocks"
              className="w-full rounded-xl border border-white/15 bg-white/5 p-4 text-sm text-white placeholder-slate-500 font-mono leading-relaxed outline-none transition focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
            />
          </div>

          {/* SEO Metadata Fields */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-4">
              SEO & Social Metadata
            </h3>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Meta Description (Max 160 characters)
                  </label>
                  <span
                    className={`text-[11px] font-mono ${
                      metaDescription.length > 160 ? "text-rose-400 font-bold" : "text-slate-400"
                    }`}
                  >
                    {metaDescription.length} / 160
                  </span>
                </div>
                <input
                  type="text"
                  maxLength={160}
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="Compelling 1-2 sentence summary for Google search and social cards..."
                  className="h-11 w-full rounded-xl border border-white/15 bg-white/5 px-4 text-xs text-white placeholder-slate-500 outline-none transition focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Meta Title (Browser Tab / SERP Title)
                  </label>
                  <input
                    type="text"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    placeholder="Defaults to Post Title if blank"
                    className="h-11 w-full rounded-xl border border-white/15 bg-white/5 px-4 text-xs text-white placeholder-slate-500 outline-none transition focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Meta Keywords (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={metaKeywords}
                    onChange={(e) => setMetaKeywords(e.target.value)}
                    placeholder="e.g. nodejs, supabase, nextjs"
                    className="h-11 w-full rounded-xl border border-white/15 bg-white/5 px-4 text-xs text-white placeholder-slate-500 outline-none transition focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                  />
                </div>
              </div>

              {/* Publish Toggle */}
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="publishedToggle"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="h-4 w-4 rounded accent-teal-400 cursor-pointer"
                />
                <label htmlFor="publishedToggle" className="text-xs font-medium text-slate-200 cursor-pointer">
                  Publish immediately (Visible publicly on <code className="text-teal-400">/blog</code>)
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4">
            <button
              type="submit"
              disabled={status === "compressing" || status === "uploading"}
              className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-teal-600 px-8 font-semibold text-sm text-white shadow-[0_8px_20px_-6px_rgba(79,70,229,0.7)] transition hover:brightness-110 disabled:opacity-50"
            >
              {status === "uploading" ? (
                <>
                  <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Publishing Post...</span>
                </>
              ) : (
                <>
                  <span>Publish Article</span>
                  <span>→</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
