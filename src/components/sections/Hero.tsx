"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import MusicWidget from "@/components/MusicWidget";
import { useEffect, useRef, useState } from "react";

/* ─── NAV DATA ──────────────────────────────────────── */
const navLinks = [
  { text: "Shop", href: "/shop" },
  { text: "FeronLabs", href: "/feronlabs" },
  { text: "New Arrivals", href: "/new-arrivals" },
  { text: "Brand", href: "/brand" },
  { text: "Journal", href: "/journal" },
  { text: "Contact", href: "/contact" },
];

/* ─── KRIK BEYAZ — off-white like Fossil ─── */
const OFF_WHITE = "#F5F5F7";

/* ─── ANIMATION VARIANTS ────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.25 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

/* ═══════════════════════════════════════════════════════
   HERO COMPONENT — Fossil Template Replica for Feron
   ═══════════════════════════════════════════════════════ */
export default function Hero() {
  const [time, setTime] = useState("");
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);

  /* ── Smooth loop fade: darken at seam, lighten after restart ── */
  useEffect(() => {
    const video = videoRef.current;
    const fade = fadeRef.current;
    if (!video || !fade) return;

    const FADE_BEFORE = 0.4; // seconds before end to start darkening

    const onTime = () => {
      if (!video.duration) return;
      const remaining = video.duration - video.currentTime;
      if (remaining <= FADE_BEFORE) {
        // ease into dark
        const t = 1 - remaining / FADE_BEFORE; // 0→1
        fade.style.opacity = String(t * 0.6);
      } else if (video.currentTime < 0.3) {
        // just restarted — ease out of dark
        fade.style.opacity = "0";
      }
    };

    video.addEventListener("timeupdate", onTime);
    return () => video.removeEventListener("timeupdate", onTime);
  }, []);

  /* Scroll-linked scale: video goes from 1.08 → 1.0 */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.0]);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Europe/Istanbul",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section ref={heroRef} className="relative w-full h-screen bg-black overflow-hidden">
      {/* ───────────────────────────────────────────────
          LAYER 0 — Background Video (single, native loop)
      ─────────────────────────────────────────────── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ scale: bgScale, willChange: "transform" }}
        >
          <video
            ref={videoRef}
            src="/hero/hero-surface2.mov"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center bottom" }}
          />
        </motion.div>
        {/* Dark + cinematic overlay */}
        <div className="absolute inset-0 z-[1] bg-black/40" />
        {/* Loop-seam fade overlay — masks the hard cut */}
        <div
          ref={fadeRef}
          className="absolute inset-0 z-[2] bg-black pointer-events-none"
          style={{ opacity: 0, transition: "opacity 0.35s ease-out" }}
        />
        {/* Radial vignette */}
        <div
          className="absolute inset-0 z-[3]"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
          }}
        />
      </div>

      {/* Film grain — static PNG-like texture, no SVG filter cost */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "512px 512px",
        }}
      />

      {/* ───────────────────────────────────────────────
          LAYER 2 — All UI Content
      ─────────────────────────────────────────────── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="absolute inset-0 z-20 w-full h-full"
      >
        {/* ══════════════════════════════════════════════
            TOP-LEFT — Small Circle Scroll Indicator
        ══════════════════════════════════════════════ */}
        <motion.div
          variants={fadeUp}
          className="absolute top-7 left-7 pointer-events-auto z-30"
        >
          <div
            className="w-[36px] h-[36px] rounded-full border flex items-center justify-center cursor-pointer hover:border-white/70 transition-colors duration-500"
            style={{ borderColor: "rgba(245,245,247,0.3)" }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-[14px] h-[14px]"
              style={{ color: "rgba(245,245,247,0.5)" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
            </svg>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════
            CENTER BLOCK — Logo + Navigation
        ══════════════════════════════════════════════ */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{ marginTop: "-3vh" }}>
          {/* Logo SVG — slightly smaller */}
          <motion.div
            variants={fadeUp}
            className="pointer-events-auto select-none"
            style={{
              marginBottom: "clamp(30px, 4.5vh, 50px)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero/hero-yaz%C4%B1logo.svg"
              alt="Feron"
              style={{
                width: "clamp(80px, 9vw, 140px)",
                height: "auto",
              }}
              draggable={false}
            />
          </motion.div>

          {/* ── Navigation Menu ──
              font-weight: 500, text-[14px],
              letter-spacing: -0.01em, line-height: 2.6
              Tighter vertical gap between links
          ─────────────────────────── */}
          <motion.nav
            variants={containerVariants}
            className="flex flex-col items-center pointer-events-auto"
            style={{ gap: "0px" }}
          >
            {navLinks.map((link) => (
              <motion.div key={link.text} variants={fadeUp}>
                <Link
                  href={link.href}
                  className="group relative flex items-center justify-center"
                  style={{
                    fontWeight: 500,
                    fontSize: "14px",
                    letterSpacing: "-0.01em",
                    lineHeight: "2.6",
                    color: OFF_WHITE,
                  }}
                >
                  {/* Dot indicator */}
                  <span
                    className="absolute -left-4 w-[5px] h-[5px] rounded-full opacity-0 scale-0 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-100"
                    style={{ backgroundColor: OFF_WHITE }}
                  />

                  {/* Text with slide-up effect */}
                  <span className="relative overflow-hidden inline-block">
                    <span
                      className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full"
                      style={{ color: OFF_WHITE }}
                    >
                      {link.text}
                    </span>
                    <span
                      className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
                      style={{ color: OFF_WHITE }}
                      aria-hidden
                    >
                      {link.text}
                    </span>
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.nav>
        </div>

        {/* ══════════════════════════════════════════════
            BOTTOM LEFT — Music Player Widget
        ══════════════════════════════════════════════ */}
        <motion.div
          variants={fadeUp}
          className="absolute bottom-6 left-6 z-30 pointer-events-auto"
        >
          <MusicWidget />
        </motion.div>

        {/* ══════════════════════════════════════════════
            BOTTOM CENTER — City & Live Clock
        ══════════════════════════════════════════════ */}
        <motion.div
          variants={fadeUp}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
        >
          <span
            className="font-extralight uppercase tabular-nums"
            style={{
              fontSize: "10px",
              letterSpacing: "0.4em",
              color: "rgba(245,245,247,0.35)",
            }}
            suppressHydrationWarning
          >
            ISTANBUL: {time || "00:00:00"}
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
