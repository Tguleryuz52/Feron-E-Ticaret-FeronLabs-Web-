"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { plannerCategories, type PlannerCategory } from "@/data/outfitData";
import { products } from "@/data/products";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ─── CATEGORY ICONS (stroke style) ─── */
const categoryIcons: Record<string, React.ReactNode> = {
  spor: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.5 6.5h11M4 10h16M6 14l-2 6M18 14l2 6M8 14h8M9 10V6.5M15 10V6.5" />
    </svg>
  ),
  ofis: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <path d="M12 12v2" />
    </svg>
  ),
  gunluk: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      <line x1="6" y1="2" x2="6" y2="4" />
      <line x1="10" y1="2" x2="10" y2="4" />
      <line x1="14" y1="2" x2="14" y2="4" />
    </svg>
  ),
  kampus: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
    </svg>
  ),
  tatil: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  ),
};

/* ─── PREVIEW COMBOS ─── */
function getPreviewCombos(cat: PlannerCategory) {
  const combos: { top: typeof products[0]; bottom: typeof products[0] }[] = [];
  for (let i = 0; i < Math.min(cat.topIds.length, 3); i++) {
    const top = products.find((p) => p.id === cat.topIds[i]);
    const bottom = products.find((p) => p.id === cat.bottomIds[i % cat.bottomIds.length]);
    if (top && bottom) combos.push({ top, bottom });
  }
  return combos;
}

/* ─── ARROW BUTTON ─── */
const ArrowButton = ({ size = 36, dark = false }: { size?: number; dark?: boolean }) => (
  <div
    className="flex items-center justify-center rounded-full transition-all duration-300"
    style={{
      width: size,
      height: size,
      border: dark ? "none" : "1.5px solid rgba(26,26,26,0.15)",
      background: dark ? "rgba(0,0,0,0.5)" : "transparent",
      color: dark ? "#fff" : "#1a1a1a",
      backdropFilter: dark ? "blur(8px)" : "none",
    }}
  >
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  </div>
);

interface Props {
  onSelectCategory: (category: PlannerCategory) => void;
}

export default function FeronLabsOnboard({ onSelectCategory }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>(plannerCategories[0].id);
  const activeCat = plannerCategories.find((c) => c.id === activeCategory)!;
  const previews = getPreviewCombos(activeCat);

  return (
    <section className="relative w-full" style={{ background: "#fff" }}>

      {/* ═══ HERO SECTION — IKEA Split Layout ═══ */}
      <div className="flex" style={{ minHeight: 400, maxHeight: 480 }}>

        {/* LEFT: Bold Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex flex-col justify-center"
          style={{ flex: "1 1 50%", padding: "56px 48px 56px 70px" }}
        >
          <h1
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontSize: "clamp(36px, 4.2vw, 56px)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              color: "#111",
              lineHeight: 1.05,
            }}
          >
            Tarzına uygun
            <br />
            kombin oluştur
          </h1>
          <p
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontSize: 15,
              fontWeight: 400,
              color: "rgba(17,17,17,0.5)",
              lineHeight: 1.65,
              marginTop: 24,
              maxWidth: 400,
            }}
          >
            Feron ürünleriyle stilini tasarla. Farklı parçaları bir araya getir
            ve ortamına uygun kombinleri keşfet. FeronLabs ile kombinlerini
            kolayca oluştur.
          </p>
        </motion.div>

        {/* RIGHT: Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="relative overflow-hidden"
          style={{ flex: "1 1 50%" }}
        >
          <Image
            src="/products/feronlabs-hero.png"
            alt="FeronLabs Lifestyle"
            fill
            className="object-cover"
            style={{ objectPosition: "center 20%" }}
            priority
          />
        </motion.div>
      </div>

      {/* ═══ CONTENT AREA — grey background ═══ */}
      <div style={{ background: "#f5f5f5" }}>

        {/* Heading + Pills */}
        <div style={{ padding: "44px 70px 0", maxWidth: 1500, margin: "0 auto" }}>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontSize: "clamp(22px, 2.5vw, 32px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "#111",
              marginBottom: 24,
            }}
          >
            Kendi kombinini oluştur veya ilhamla başla
          </motion.h2>

          {/* Category Pills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
            className="flex flex-wrap gap-2.5"
          >
            {plannerCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="flex items-center gap-2 cursor-pointer transition-all duration-300"
                  style={{
                    padding: "10px 20px",
                    borderRadius: 999,
                    fontFamily: "'Satoshi', sans-serif",
                    fontSize: 13,
                    fontWeight: 500,
                    background: isActive ? "#fff" : "transparent",
                    border: isActive ? "1px solid #111" : "1px solid rgba(26,26,26,0.1)",
                    color: isActive ? "#111" : "rgba(26,26,26,0.45)",
                    boxShadow: isActive ? "0 1px 4px rgba(0,0,0,0.04)" : "none",
                  }}
                >
                  <span style={{ color: isActive ? "#111" : "rgba(26,26,26,0.25)" }}>
                    {categoryIcons[cat.id]}
                  </span>
                  {cat.name}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* ═══ COMPACT TEMPLATE CARDS (IKEA-like) ═══ */}
        <div style={{ padding: "28px 70px 52px", maxWidth: 1500, margin: "0 auto" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="grid gap-3.5"
              style={{
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
              }}
            >
              {/* Card 1: Text card */}
              <motion.button
                whileHover={{ scale: 1.005 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectCategory(activeCat)}
                className="relative flex flex-col justify-between text-left cursor-pointer group"
                style={{
                  borderRadius: 16,
                  background: "#e8e6e3",
                  padding: "28px 24px",
                  border: "none",
                  height: 240,
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: "'Satoshi', sans-serif",
                      fontSize: 18,
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                      color: "#111",
                      lineHeight: 1.3,
                      textDecoration: "underline",
                      textUnderlineOffset: 3,
                      textDecorationThickness: 1,
                    }}
                  >
                    Kendi kombinini
                    <br />
                    oluştur
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Satoshi', sans-serif",
                      fontSize: 12,
                      fontWeight: 400,
                      color: "rgba(26,26,26,0.4)",
                      marginTop: 10,
                      lineHeight: 1.5,
                    }}
                  >
                    {activeCat.description}
                  </p>
                </div>
                <div className="group-hover:translate-x-1 transition-transform duration-300">
                  <ArrowButton size={32} />
                </div>
              </motion.button>

              {/* Cards 2-4: Compact outfit preview cards (invisible person style) */}
              {previews.map((combo, i) => (
                <motion.button
                  key={`${activeCategory}-${i}`}
                  whileHover={{ scale: 1.005 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSelectCategory(activeCat)}
                  className="relative cursor-pointer overflow-hidden group"
                  style={{
                    borderRadius: 16,
                    background: "#e8e6e3",
                    border: "none",
                    height: 240,
                    padding: 0,
                  }}
                >
                  {/* Outfit stack — "invisible person wearing" layout */}
                  <div
                    className="w-full h-full flex flex-col items-center justify-center relative"
                    style={{ padding: "16px 16px 40px" }}
                  >
                    {/* Top garment — smaller, above */}
                    <Image
                      src={combo.top.image}
                      alt={combo.top.name}
                      width={300}
                      height={300}
                      className="object-contain relative"
                      style={{
                        width: "52%",
                        height: "auto",
                        maxHeight: "50%",
                        zIndex: 2,
                        filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.06))",
                      }}
                    />
                    {/* Bottom garment — slightly overlaps top, same scale */}
                    <Image
                      src={combo.bottom.image}
                      alt={combo.bottom.name}
                      width={300}
                      height={300}
                      className="object-contain relative"
                      style={{
                        width: "46%",
                        height: "auto",
                        maxHeight: "48%",
                        marginTop: -12,
                        zIndex: 1,
                        filter: "drop-shadow(0 3px 10px rgba(0,0,0,0.08))",
                      }}
                    />
                  </div>

                  {/* Bottom gradient + arrow */}
                  <div
                    className="absolute bottom-0 left-0 right-0 flex items-end justify-end"
                    style={{
                      padding: "12px 14px",
                      background: "linear-gradient(to top, rgba(0,0,0,0.25) 0%, transparent 100%)",
                      borderRadius: "0 0 16px 16px",
                      height: 56,
                    }}
                  >
                    <div className="group-hover:translate-x-0.5 transition-transform duration-300">
                      <ArrowButton size={30} dark />
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ═══ DIVIDER ═══ */}
        <div style={{ maxWidth: 1500, margin: "0 auto", padding: "0 70px" }}>
          <div style={{ height: 1, background: "rgba(26,26,26,0.06)" }} />
        </div>

        {/* ═══ AI Section ═══ */}
        <div style={{ padding: "44px 70px 56px", maxWidth: 1500, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontSize: "clamp(20px, 2vw, 28px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "#111",
              marginBottom: 8,
            }}
          >
            Kendin oluşturabilir veya AI desteği alabilirsin.
          </h2>
          <div
            className="mt-6"
            style={{ background: "#e8e6e3", borderRadius: 16, padding: "32px 28px" }}
          >
            <h3
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: 20,
                fontWeight: 700,
                color: "#111",
                marginBottom: 6,
              }}
            >
              FeronLabs AI
            </h3>
            <p
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: 13,
                fontWeight: 400,
                color: "rgba(26,26,26,0.4)",
                maxWidth: 480,
                lineHeight: 1.6,
                marginBottom: 18,
              }}
            >
              Tarzına, mevsimine ve ortamına göre kişiselleştirilmiş kombin önerileri.
              Yapay zeka destekli stil asistanı ile mükemmel kombinini keşfet.
            </p>
            <ArrowButton size={32} />
          </div>
        </div>
      </div>
    </section>
  );
}
