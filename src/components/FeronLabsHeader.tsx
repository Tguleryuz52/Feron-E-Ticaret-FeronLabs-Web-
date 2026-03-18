"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ─── MENU ITEMS ─── */
const menuItems = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
        <polyline points="17 21 17 13 7 13 7 21" />
        <polyline points="7 3 7 8 15 8" />
      </svg>
    ),
    label: "Kayıtlı Kombinlerim",
    href: "#",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
    label: "Sahip Olduğum Ürünler",
    href: "#",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5H2v7l6.29 6.29c.94.94 2.48.94 3.42 0l4.58-4.58c.94-.94.94-2.48 0-3.42L9 5Z" />
        <path d="M6 9.01V9" />
        <path d="M22 8l-5 5" />
        <path d="M19 11l-5 5" />
      </svg>
    ),
    label: "Hemen Planla",
    href: "#",
  },
];

export default function FeronLabsHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /* Dispatch custom event so FloatingMiniPlayer can hide */
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("feronlabs-menu", { detail: isMenuOpen }));
  }, [isMenuOpen]);

  /* Close on Escape */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          height: 64,
          background: "#fff",
          borderBottom: "1px solid rgba(26,26,26,0.06)",
        }}
      >
        <div
          className="h-full flex items-center justify-between"
          style={{ padding: "0 28px" }}
        >
          {/* ── LEFT: Logo + Hamburger ── */}
          <div className="flex items-center gap-5">
            {/* FeronLabs Logo — bold premium */}
            <Link href="/feronlabs" className="flex items-baseline gap-0">
              <span
                style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: 26,
                  fontWeight: 900,
                  letterSpacing: "-0.05em",
                  color: "#111",
                }}
              >
                Feron
              </span>
              <span
                style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: 26,
                  fontWeight: 500,
                  letterSpacing: "-0.05em",
                  color: "rgba(17,17,17,0.4)",
                }}
              >
                Labs
              </span>
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative flex items-center justify-center cursor-pointer transition-opacity hover:opacity-60"
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: "transparent",
                border: "none",
              }}
              aria-label="Menu"
            >
              <div className="flex flex-col justify-center items-center gap-[5px]">
                <motion.span
                  animate={{
                    rotate: isMenuOpen ? 45 : 0,
                    y: isMenuOpen ? 7 : 0,
                  }}
                  transition={{ duration: 0.3, ease: EASE }}
                  style={{
                    display: "block",
                    width: 18,
                    height: 1.5,
                    background: "#111",
                    borderRadius: 1,
                  }}
                />
                <motion.span
                  animate={{
                    opacity: isMenuOpen ? 0 : 1,
                    scaleX: isMenuOpen ? 0 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                  style={{
                    display: "block",
                    width: 18,
                    height: 1.5,
                    background: "#111",
                    borderRadius: 1,
                  }}
                />
                <motion.span
                  animate={{
                    rotate: isMenuOpen ? -45 : 0,
                    y: isMenuOpen ? -7 : 0,
                  }}
                  transition={{ duration: 0.3, ease: EASE }}
                  style={{
                    display: "block",
                    width: 18,
                    height: 1.5,
                    background: "#111",
                    borderRadius: 1,
                  }}
                />
              </div>
            </button>
          </div>

          {/* ── RIGHT: Back to Feron (more prominent) ── */}
          <Link
            href="/"
            className="flex items-center gap-2.5 transition-all duration-300 hover:opacity-70"
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              color: "#111",
              letterSpacing: "-0.01em",
              padding: "8px 16px",
              borderRadius: 999,
              border: "1px solid rgba(26,26,26,0.12)",
              background: "transparent",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Feron&apos;a Dön
          </Link>
        </div>
      </header>
      {/* Spacer for fixed header */}
      <div style={{ height: 64 }} />

      {/* ═══ SLIDE-IN DRAWER ═══ */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-55 bg-black/30"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.45, ease: EASE }}
              className="fixed top-0 left-0 z-60 h-full bg-white flex flex-col"
              style={{
                width: "min(400px, 85vw)",
                boxShadow: "8px 0 40px rgba(0,0,0,0.06)",
              }}
            >
              {/* Drawer Header */}
              <div
                className="flex items-center justify-end"
                style={{
                  height: 64,
                  padding: "0 24px",
                  borderBottom: "1px solid rgba(26,26,26,0.06)",
                }}
              >
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center cursor-pointer transition-opacity hover:opacity-50"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: "transparent",
                    border: "none",
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Menu Items */}
              <div className="flex-1 flex flex-col" style={{ padding: "16px 0" }}>
                {menuItems.map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: 0.1 + i * 0.06, ease: EASE }}
                    className="flex items-center gap-4 transition-all duration-200 hover:bg-zinc-50"
                    style={{
                      padding: "16px 28px",
                      color: "#111",
                      textDecoration: "none",
                    }}
                  >
                    <span style={{ color: "rgba(17,17,17,0.7)" }}>{item.icon}</span>
                    <span
                      style={{
                        fontFamily: "'Satoshi', sans-serif",
                        fontSize: 15,
                        fontWeight: 600,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {item.label}
                    </span>
                  </motion.a>
                ))}

                {/* Divider */}
                <div style={{ height: 1, background: "rgba(26,26,26,0.06)", margin: "16px 28px" }} />

                {/* Login */}
                <motion.a
                  href="/account"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.35, ease: EASE }}
                  className="flex items-center gap-4 transition-all duration-200 hover:bg-zinc-50"
                  style={{
                    padding: "16px 28px",
                    color: "#111",
                    textDecoration: "none",
                  }}
                >
                  <span
                    className="flex items-center justify-center rounded-full"
                    style={{
                      width: 32,
                      height: 32,
                      background: "rgba(17,17,17,0.06)",
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </span>
                  <span
                    style={{
                      fontFamily: "'Satoshi', sans-serif",
                      fontSize: 15,
                      fontWeight: 600,
                      letterSpacing: "-0.01em",
                      color: "rgba(17,17,17,0.7)",
                    }}
                  >
                    Giriş yap veya kayıt ol
                  </span>
                </motion.a>
              </div>

              {/* Bottom: Feron brand mark */}
              <div
                className="flex items-center"
                style={{
                  padding: "24px 28px",
                  borderTop: "1px solid rgba(26,26,26,0.06)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/hero/hero-yazılogo.svg"
                  alt="Feron"
                  style={{
                    height: 20,
                    width: "auto",
                    filter: "brightness(0)",
                    opacity: 0.15,
                  }}
                  draggable={false}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
