"use client";

import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ShopHeader from "@/components/ShopHeader";
import Footer from "@/components/Footer";

/* ─── EASING ─── */
const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

/* ─── JOURNAL DATA ─── */
interface Article {
  id: string;
  title: string;
  date: string;
  image: string;
  slug: string;
}

/* Journal imagery — public/journal (URLs encode spaces) */
const J = {
  wallsign: "/journal/wallsign%20copy.jpg",
  textile: "/journal/Textile%20Mockup%20copy.jpg",
  copy33: "/journal/33%20copy.jpg",
  green: "/journal/Green%20Branding%20Mockup%202%20copy.png",
  stickers: "/journal/ENV_Stickers_01_PSD_LH_Batch_51%20copy.png",
  img8021: "/journal/8021%20copy.jpg",
  janko: "/journal/janko-ferlic-eBtwD6ZG78I-unsplash.jpg",
} as const;

const FEATURED: Article[] = [
  {
    id: "1",
    title: "Crafting Performance Wear",
    date: "04.01.2025",
    image: J.wallsign,
    slug: "crafting-performance-wear",
  },
  {
    id: "2",
    title: "Timeless Comfort: The Feron Way",
    date: "05.04.2025",
    image: J.textile,
    slug: "timeless-comfort",
  },
  {
    id: "3",
    title: "The Value of Quality: Investing in Timeless Fashion",
    date: "06.12.2025",
    image: J.copy33,
    slug: "the-value-of-quality",
  },
];

const ARTICLES: Article[] = [
  {
    id: "4",
    title: "Sustainable Style: Feron's Commitment to Sustainability",
    date: "03.04.2025",
    image: J.green,
    slug: "sustainable-style",
  },
  {
    id: "5",
    title: "Fashion in Motion",
    date: "03.12.2025",
    image: J.janko,
    slug: "fashion-in-motion",
  },
  {
    id: "6",
    title: "Style that Keeps Up with Your Active Life",
    date: "04.22.2025",
    image: J.img8021,
    slug: "style-that-keeps-up",
  },
  {
    id: "7",
    title: "Brand Details: Labels & Finishes",
    date: "05.08.2025",
    image: J.stickers,
    slug: "brand-details-labels",
  },
];

/* ─── ARROW ICON ─── */
const ArrowIcon = memo(function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="w-4 h-4 shrink-0"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      />
    </svg>
  );
});

/* ─── OPTIMIZED CARD — next/image + CSS hover (no parallax / no nested motion) ─── */
const ArticleCard = memo(function ArticleCard({
  article,
  large = false,
  priority = false,
}: {
  article: Article;
  large?: boolean;
  priority?: boolean;
}) {
  const sizes = useMemo(
    () =>
      large
        ? "(max-width: 768px) 100vw, 50vw"
        : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw",
    [large]
  );

  return (
    <article className="group block [content-visibility:auto]">
      <Link href={`/journal/${article.slug}`} className="block">
        <div
          className={`relative overflow-hidden rounded-sm bg-zinc-100 ${
            large ? "aspect-[16/10] min-h-[280px] md:min-h-[320px]" : "aspect-[4/3]"
          }`}
        >
          {/* GPU-friendly hover: transform on wrapper, not motion */}
          <div className="absolute inset-0 origin-center transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-[1.05]">
            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes={sizes}
              className="object-cover"
              priority={priority}
              loading={priority ? "eager" : "lazy"}
              decoding="async"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-between items-start">
          <div className="min-w-0 pr-4">
            <h3
              className="relative inline text-black font-bold"
              style={{
                fontSize: "16px",
                lineHeight: "1.35",
                letterSpacing: "-0.02em",
              }}
            >
              {article.title}
              <span
                className="absolute left-0 -bottom-[3px] h-[2px] w-full origin-left scale-x-0 bg-black transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100"
                aria-hidden
              />
            </h3>
            <p
              className="mt-2 text-zinc-500"
              style={{ fontSize: "12px", fontWeight: 500 }}
            >
              {article.date}
            </p>
          </div>
          <span className="mt-0.5 text-black transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-3">
            <ArrowIcon />
          </span>
        </div>
      </Link>
    </article>
  );
});

/* ─── PAGE ─── */
export default function JournalPage() {
  return (
    <main className="bg-white text-black min-h-screen">
      <ShopHeader />

      <section style={{ padding: "100px 64px 0 64px" }}>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="font-black tracking-tighter leading-none text-black"
          style={{
            fontSize: "clamp(6rem, 10vw, 10rem)",
          }}
        >
          Journal
        </motion.h1>
      </section>

      <section style={{ padding: "48px 64px 0 64px" }}>
        <p
          className="text-black"
          style={{
            fontSize: "15px",
            fontWeight: 500,
            marginBottom: "24px",
          }}
        >
          (Featured)
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="md:col-span-2">
            <ArticleCard article={FEATURED[0]} large priority />
          </div>
          <div className="md:col-span-1">
            <ArticleCard article={FEATURED[1]} />
          </div>
          <div className="md:col-span-1">
            <ArticleCard article={FEATURED[2]} />
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 64px 100px 64px" }}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ARTICLES.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
