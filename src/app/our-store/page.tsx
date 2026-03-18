"use client";

import { motion } from "framer-motion";
import ShopHeader from "@/components/ShopHeader";
import Footer from "@/components/Footer";
import Image from "next/image";
import React from "react";

/* ─── EASING ─── */
const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

export default function OurStorePage() {
  return (
    <main className="bg-white text-black min-h-screen">
      <ShopHeader />

      {/* ═══════════════════════════════════════════════════════════════
          FULL SCREEN IMAGE with Overlay Info
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full" style={{ height: "calc(100vh - 80px)", minHeight: "700px" }}>
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/brand/charlesdeluvio-XdjS0AzKzo0-unsplash.jpg"
            alt="Feron Store Interior"
            fill
            className="object-cover"
            priority
          />
          {/* Premium Dark Overlay - stronger */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center" style={{ padding: "80px 64px" }}>
          
          <div className="flex flex-col items-center gap-8 flex-1 justify-center">
            {/* Feron Logo (Soft/Light version) - smaller */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: EASE }}
              className="relative"
              style={{ width: "140px", height: "60px" }}
            >
              <Image
                src="/brand/logosoft.svg"
                alt="Feron"
                fill
                className="object-contain drop-shadow-lg"
              />
            </motion.div>

            {/* Turkey Map Outline - smaller */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: EASE }}
            >
              <svg 
                width="80" 
                height="60" 
                viewBox="0 0 80 60" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-80 drop-shadow-md"
              >
                <path 
                  d="M10 30 C10 18, 15 12, 25 12 L32 16 L40 12 L48 16 L56 12 L64 16 L70 12 C75 12, 80 18, 80 30 C80 38, 77 44, 70 48 L64 44 L58 48 L52 44 L46 48 L40 44 L34 48 L28 44 L22 48 L16 44 C12 40, 10 36, 10 30 Z" 
                  stroke="white" 
                  strokeWidth="1.5" 
                  fill="none"
                  className="text-white"
                />
              </svg>
            </motion.div>

            {/* Address - Much smaller, minimal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: EASE }}
              className="text-center"
            >
              <p
                className="text-white font-medium"
                style={{
                  fontSize: "14px",
                  lineHeight: 1.6,
                  letterSpacing: "0.02em",
                  fontFamily: "'Satoshi', sans-serif",
                  fontWeight: 500,
                  textShadow: "0 2px 8px rgba(0,0,0,0.4)",
                }}
              >
                İstanbul Premium Store
                <br />
                Nişantaşı, Teşvikiye Cad. No:123
              </p>
            </motion.div>
          </div>

          {/* Live Clock - Bottom of image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9, ease: EASE }}
            className="flex items-baseline gap-2 pb-8"
          >
            <span
              className="text-white font-semibold uppercase"
              style={{ 
                fontSize: "11px", 
                letterSpacing: "0.12em",
                fontFamily: "'Satoshi', sans-serif",
                fontWeight: 600,
                textShadow: "0 2px 6px rgba(0,0,0,0.4)",
              }}
            >
              Istanbul:
            </span>
            <LiveClock />
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

/* ─── LIVE CLOCK COMPONENT ─── */
function LiveClock() {
  const [time, setTime] = React.useState("");

  React.useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Europe/Istanbul",
      });
      setTime(formatted);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className="text-white font-bold tabular-nums"
      style={{ 
        fontSize: "11px", 
        letterSpacing: "0.08em",
        fontFamily: "'Satoshi', sans-serif",
        fontWeight: 700,
        textShadow: "0 2px 6px rgba(0,0,0,0.4)",
      }}
    >
      {time || "00:00:00"}
    </span>
  );
}

