"use client";

import { motion } from "framer-motion";
import ParallaxImage from "@/components/ParallaxImage";

/* ─── EASING ─── */
const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

/**
 * Newsletter "Get in on the News" bölümü.
 * Tüm sayfalarda (Shop, Brand, Home vb.) Footer'dan hemen önce kullanılır.
 * Koyu arka plan fotoğrafı + sol büyük başlık + sağ minimalist input.
 */
export default function Newsletter() {
  return (
    <motion.section
      className="relative w-full overflow-hidden bg-black"
      style={{ minHeight: "520px" }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      {/* Background — clip-path reveal + black bg underneath */}
      <motion.div
        className="absolute inset-0 bg-black"
        variants={{
          hidden: { clipPath: "inset(100% 0 0 0)" },
          visible: {
            clipPath: "inset(0% 0 0 0)",
            transition: { duration: 1.3, ease: EASE },
          },
        }}
      >
        <ParallaxImage
          src="/brand/getonnews.jpg"
          alt="Newsletter Background"
          className="w-full h-full"
          intensity={6}
        />
        <div className="absolute inset-0 bg-black/50 z-[1]" />
      </motion.div>

      {/* Content */}
      <div
        className="relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between h-full gap-10"
        style={{ padding: "0 80px 80px 80px", minHeight: "520px" }}
      >
        {/* LEFT — Heading (Horizontal layout, smaller) */}
        <motion.h2
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.9, delay: 0.4, ease: EASE },
            },
          }}
          className="font-bold text-white"
          style={{
            fontSize: "clamp(2rem, 3.5vw, 3.5rem)",
            lineHeight: 1.3,
            letterSpacing: "-0.02em",
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <span>Get in on</span>
          <span>the News</span>
        </motion.h2>

        {/* RIGHT — Subscribe form */}
        <motion.div
          className="flex flex-col gap-5 w-full md:w-auto"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.9, delay: 0.6, ease: EASE },
            },
          }}
        >
          <span
            className="uppercase text-white"
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.15em",
            }}
          >
            Subscribe to our newsletter
          </span>
          <div className="flex items-end gap-6">
            <input
              type="email"
              placeholder="Your email"
              className="bg-transparent border-0 border-b border-white/30 text-white placeholder:text-white/40 focus:outline-none focus:border-white transition-colors duration-500"
              style={{
                width: "240px",
                padding: "8px 0",
                fontSize: "13px",
                letterSpacing: "-0.01em",
              }}
            />
            <button
              className="text-white hover:opacity-60 transition-opacity duration-300 cursor-pointer"
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                paddingBottom: "8px",
              }}
            >
              JOIN
            </button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
