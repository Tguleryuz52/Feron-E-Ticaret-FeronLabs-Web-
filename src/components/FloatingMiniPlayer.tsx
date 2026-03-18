"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMusicStore, TRACK } from "@/stores/musicStore";

/* ═══════════════════════════════════════════════════════
   FLOATING MINI-PLAYER — iOS 26 Liquid Glass
   Frosted glass pill: album art + pause/forward buttons
   Fixed bottom-left on all non-hero pages
   Hides smoothly when footer is visible
   ═══════════════════════════════════════════════════════ */
export default function FloatingMiniPlayer() {
  const playing = useMusicStore((s) => s.playing);
  const toggle = useMusicStore((s) => s.toggle);
  const skip = useMusicStore((s) => s.skip);
  const current = useMusicStore((s) => s.current);
  const duration = useMusicStore((s) => s.duration);

  const [footerVisible, setFooterVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  /* Listen for FeronLabs drawer menu toggle */
  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent<boolean>;
      setMenuOpen(custom.detail);
    };
    window.addEventListener("feronlabs-menu", handler);
    return () => window.removeEventListener("feronlabs-menu", handler);
  }, []);

  const pct = duration ? (current / duration) * 100 : 0;

  return (
    <AnimatePresence>
      {!footerVisible && !menuOpen && (
        <motion.div
          key="mini-player"
          initial={{ y: 80, opacity: 0, scale: 0.92 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 40, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-6 z-9999 select-none"
          style={{ pointerEvents: "auto" }}
        >
          {/* ── Liquid Glass outer shell ── */}
          <div
            className="relative"
            style={{
              borderRadius: 28,
              padding: 1.5,
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.1) 100%)",
              boxShadow:
                "0 8px 40px rgba(0,0,0,0.35), 0 2px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(255,255,255,0.05)",
            }}
          >
            {/* ── Inner frosted pill ── */}
            <div
              className="relative flex items-center overflow-hidden"
              style={{
                borderRadius: 26,
                height: 55,
                background: "rgba(30,30,35,0.55)",
                backdropFilter: "blur(40px) saturate(1.8)",
                WebkitBackdropFilter: "blur(40px) saturate(1.8)",
              }}
            >
              {/* Liquid Glass specular highlights */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  borderRadius: 26,
                  background:
                    "linear-gradient(165deg, rgba(255,255,255,0.12) 0%, transparent 40%, rgba(255,255,255,0.03) 70%, transparent 100%)",
                }}
              />
              {/* Subtle refraction edge glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  borderRadius: 26,
                  boxShadow:
                    "inset 0 0.5px 0 rgba(255,255,255,0.2), inset 0 -0.5px 0 rgba(255,255,255,0.05), inset 0.5px 0 0 rgba(255,255,255,0.08), inset -0.5px 0 0 rgba(255,255,255,0.08)",
                }}
              />

              {/* Album art — left side */}
              <div
                className="relative shrink-0 h-full overflow-hidden"
                style={{ width: 55, borderRadius: "26px 0 0 26px" }}
              >
                <Image
                  src={TRACK.cover}
                  alt={TRACK.title}
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                />
                {/* Soft fade into glass */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to right, transparent 40%, rgba(30,30,35,0.5) 100%)",
                  }}
                />
              </div>

              {/* Controls area — transparent on glass */}
              <div className="flex items-center gap-3 px-3.5 h-full flex-1 relative z-10">
                {/* Play / Pause — glass ring */}
                <button
                  onClick={toggle}
                  className="flex items-center justify-center shrink-0 transition-all duration-200 hover:scale-110 active:scale-95"
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: "50%",
                    border: "1.5px solid rgba(255,255,255,0.35)",
                    background: "rgba(255,255,255,0.08)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.12)",
                  }}
                  aria-label={playing ? "Pause" : "Play"}
                >
                  {playing ? (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[13px] h-[13px]" style={{ color: "rgba(255,255,255,0.92)" }}>
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[13px] h-[13px] ml-px" style={{ color: "rgba(255,255,255,0.92)" }}>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>

                {/* Forward — glass filled circle */}
                <button
                  onClick={() => skip(10)}
                  className="flex items-center justify-center shrink-0 transition-all duration-200 hover:scale-110 active:scale-95"
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.1)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)",
                  }}
                  aria-label="Forward"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[13px] h-[13px]" style={{ color: "rgba(255,255,255,0.85)" }}>
                    <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z" />
                  </svg>
                </button>
              </div>

              {/* Progress bar — bottom edge */}
              <div
                className="absolute bottom-0 left-0 right-0"
                style={{ height: 2, background: "rgba(255,255,255,0.06)" }}
              >
                <div
                  className="h-full"
                  style={{
                    width: `${pct}%`,
                    background: "rgba(255,255,255,0.5)",
                    transition: "width 0.15s linear",
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
