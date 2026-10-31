import Link from "next/link";
import type { Post } from "@/lib/blog-store";
import { readingMinutes } from "@/lib/markdown";
import { formatDate } from "@/lib/site";

export default function PostCard({ post, minuteLabel, large = false }: { post: Post; minuteLabel: string; large?: boolean }) {
  const href = `/blog/${post.slug}`;
  return (
    <article
      className={`group flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-pulse-line bg-white transition hover:-translate-y-0.5 hover:shadow-[0_30px_60px_-40px_rgba(30,34,120,0.45)] ${
        large ? "md:flex-row" : ""
      }`}
    >
      <Link href={href} tabIndex={-1} aria-hidden className={`block shrink-0 overflow-hidden bg-pulse-soft ${large ? "md:w-[55%]" : ""}`}>
        {post.coverImage.src ? (
          // eslint-disable-next-line @next/next/no-img-element -- uploaded images are already resized WebP
          <img
            src={post.coverImage.src}
            alt=""
            width={post.coverImage.width || 1600}
            height={post.coverImage.height || 900}
            loading={large ? "eager" : "lazy"}
            decoding="async"
            className="aspect-[16/9] h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="placeholder-stripes aspect-[16/9] h-full w-full" />
        )}
      </Link>
      <div className={`flex flex-1 min-w-0 flex-col gap-3 p-6 ${large ? "md:justify-center md:p-10" : ""}`}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] font-semibold text-pulse-faint">
          {post.category && <span className="font-code text-xs tracking-[0.06em] text-pulse uppercase">{post.category}</span>}
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span aria-hidden>·</span>
          <span>
            {readingMinutes(post.content)} {minuteLabel}
          </span>
        </div>
        <h2 className={`font-extrabold tracking-[-0.02em] text-balance break-words [overflow-wrap:anywhere] ${large ? "text-[clamp(26px,3vw,36px)] leading-[1.15]" : "text-xl leading-snug"}`}>
          <Link href={href} className="hover:text-pulse">
            {post.title}
          </Link>
        </h2>
        {(post.excerpt || post.metaDescription) && (
          <p className={`leading-relaxed text-pulse-muted break-words [overflow-wrap:anywhere] ${large ? "text-[17px]" : "text-[15px] line-clamp-3"}`}>{post.excerpt || post.metaDescription}</p>
        )}
      </div>
    </article>
  );
}
