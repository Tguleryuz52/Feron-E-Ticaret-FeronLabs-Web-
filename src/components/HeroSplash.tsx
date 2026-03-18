"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import ClockWidget from "./ClockWidget";
import MusicWidget from "./MusicWidget";

const SPLASH_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/feronlabs", label: "FeronLabs" },
  { href: "/shop/categories/new", label: "New Arrivals" },
  { href: "/brand", label: "Brand" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const easeCubic = [0.23, 1, 0.32, 1] as const;

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeCubic },
  },
};

export default function HeroSplash() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <Image
        src="/hero/hero-image.png"
        alt="Feron Hero"
        fill
        priority
        className="object-cover"
        quality={90}
      />

      {/* Exact dark overlay matching Fossil (soft charcoal/black vignette) */}
      <div className="absolute inset-0 bg-black/30" style={{ backdropFilter: "brightness(0.9)" }} />

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
        {/* Logo - EXACT styling: 26px, -0.02em tracking, 24px bottom margin */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeCubic }}
          className="mb-[24px]"
        >
          <span className="text-white font-serif text-[26px] italic tracking-[-0.02em] font-normal select-none">
            feron.<sup className="text-[10px] not-italic align-super">™</sup>
          </span>
        </motion.div>

        {/* Navigation Links - EXACT styling: 14px, 500 weight, -0.02em tracking, 1.4 line-height */}
        <motion.nav
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-[10px]"
        >
          {SPLASH_LINKS.map((link) => (
            <motion.div key={link.href} variants={itemVariants}>
              <Link
                href={link.href}
                className="text-white/80 text-[14px] font-medium tracking-[-0.02em] leading-[1.4] hover:text-white transition-opacity duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </motion.nav>
      </div>

      {/* Bottom Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 flex items-end justify-between px-6 pb-6">
        {/* Left: Music Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: easeCubic }}
        >
          <MusicWidget />
        </motion.div>

        {/* Center: Clock */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: easeCubic }}
          className="absolute left-1/2 -translate-x-1/2 bottom-6"
        >
          <ClockWidget />
        </motion.div>

        {/* Right: spacer to keep layout balanced */}
        <div className="w-[300px]" />
      </div>
    </section>
  );
}
