"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { products, type Product } from "@/data/products";
import {
  calculateMatchScore,
  type PlannerCategory,
} from "@/data/outfitData";
import { useCartStore } from "@/store/cartStore";

/* ─── ANIMATION ─── */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ═══════════════════════════════════════════════════════
   FERON LABS BUILDER — IKEA-Style Premium Panel
   ═══════════════════════════════════════════════════════ */
interface Props {
  category: PlannerCategory;
  onBack: () => void;
}

export default function FeronLabs({ category, onBack }: Props) {
  const addItem = useCartStore((s) => s.addItem);

  /* ─── ALL PRODUCTS ─── */
  const allTops = useMemo(() => products.filter((p) => p.category === "tops"), []);
  const allBottoms = useMemo(() => products.filter((p) => p.category === "bottoms"), []);

  const categoryTopIds = useMemo(() => new Set(category.topIds), [category]);
  const categoryBottomIds = useMemo(() => new Set(category.bottomIds), [category]);

  const sortedTops = useMemo(() => {
    const relevant = allTops.filter((p) => categoryTopIds.has(p.id));
    const rest = allTops.filter((p) => !categoryTopIds.has(p.id));
    return [...relevant, ...rest];
  }, [allTops, categoryTopIds]);

  const sortedBottoms = useMemo(() => {
    const relevant = allBottoms.filter((p) => categoryBottomIds.has(p.id));
    const rest = allBottoms.filter((p) => !categoryBottomIds.has(p.id));
    return [...relevant, ...rest];
  }, [allBottoms, categoryBottomIds]);

  const allProducts = useMemo(() => [...sortedTops, ...sortedBottoms], [sortedTops, sortedBottoms]);

  /* ─── STATE ─── */
  const [selectedTop, setSelectedTop] = useState<Product>(sortedTops[0] || allTops[0]);
  const [selectedBottom, setSelectedBottom] = useState<Product>(sortedBottoms[0] || allBottoms[0]);
  const [panelOpen, setPanelOpen] = useState(true);
  const [activeFilter, setActiveFilter] = useState<"all" | "tops" | "bottoms">("all");
  const [dragOver, setDragOver] = useState<"top" | "bottom" | null>(null);
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  /* ─── MATCH DATA ─── */
  const matchData = useMemo(
    () => calculateMatchScore(selectedTop.id, selectedBottom.id),
    [selectedTop.id, selectedBottom.id],
  );
  const totalPrice = selectedTop.price + selectedBottom.price;

  const seasonConfig: Record<string, string> = { "İlkbahar": "🌸", "Yaz": "☀️", "Sonbahar": "🍂", "Kış": "❄️" };

  /* ─── CART ─── */
  const handleAddCombo = useCallback(() => {
    addItem({ productId: selectedTop.id, name: selectedTop.name, price: selectedTop.price, image: selectedTop.image, size: "M" });
    addItem({ productId: selectedBottom.id, name: selectedBottom.name, price: selectedBottom.price, image: selectedBottom.image, size: "M" });
    toast.success("Kombin sepete eklendi!");
  }, [addItem, selectedTop, selectedBottom]);

  /* ─── DRAG & DROP ─── */
  const handleDragStart = (e: React.DragEvent, product: Product) => {
    e.dataTransfer.setData("productId", String(product.id));
    e.dataTransfer.setData("productCategory", product.category);
    e.dataTransfer.effectAllowed = "move";
  };
  const handleDrop = (e: React.DragEvent, zone: "top" | "bottom") => {
    e.preventDefault();
    const pid = Number(e.dataTransfer.getData("productId"));
    const cat = e.dataTransfer.getData("productCategory");
    const p = products.find((x) => x.id === pid);
    if (!p) return;
    if (zone === "top" && cat === "tops") setSelectedTop(p);
    else if (zone === "bottom" && cat === "bottoms") setSelectedBottom(p);
    setDragOver(null);
  };

  /* ─── FILTERED PRODUCTS ─── */
  const displayProducts = activeFilter === "tops" ? sortedTops : activeFilter === "bottoms" ? sortedBottoms : allProducts;
  const categoryCount = categoryTopIds.size + categoryBottomIds.size;

  /* ─── SCORE CIRCLE ─── */
  const Score = ({ value, label, color, size = 48 }: { value: number; label: string; color: string; size?: number }) => {
    const r = (size - 5) / 2;
    const C = 2 * Math.PI * r;
    return (
      <div className="flex flex-col items-center gap-0.5">
        <div className="relative" style={{ width: size, height: size }}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="2.5" />
            <motion.circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeDasharray={C} initial={{ strokeDashoffset: C }} animate={{ strokeDashoffset: C - (value / 100) * C }} transition={{ duration: 1, delay: 0.15, ease: EASE }} />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span style={{ fontSize: size * 0.3, fontWeight: 800, color: "#111", fontFamily: "'Satoshi', sans-serif" }}>{value}</span>
          </div>
        </div>
        <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(0,0,0,0.28)", fontFamily: "'Satoshi', sans-serif" }}>{label}</span>
      </div>
    );
  };

  return (
    <section
      className="relative w-full select-none flex flex-col"
      style={{ height: "calc(100vh - 64px)", background: "#f5f5f5" }}
    >
      {/* ═══ TOP BAR ═══ */}
      <div className="relative z-20 flex items-center justify-between shrink-0" style={{ height: 52, padding: "0 16px", background: "#fff", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
        <div className="flex items-center gap-2.5">
          <button onClick={onBack} className="flex items-center justify-center cursor-pointer hover:bg-zinc-100 transition-colors" style={{ width: 36, height: 36, borderRadius: 999, border: "1px solid rgba(0,0,0,0.08)", background: "#fff" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
          </button>
          <button className="flex items-center gap-2 cursor-pointer hover:bg-zinc-50 transition-colors" style={{ padding: "7px 16px", borderRadius: 999, border: "1px solid rgba(0,0,0,0.08)", background: "#fff", fontFamily: "'Satoshi', sans-serif", fontSize: 13, fontWeight: 600, color: "#111" }} onClick={() => toast.success("Kombin kaydedildi!")}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
            Kaydet
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></svg>
            <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 17, fontWeight: 800, color: "#111", letterSpacing: "-0.02em" }}>{totalPrice}</span>
            <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 11, fontWeight: 700, color: "#111", position: "relative", top: -2 }}>₺</span>
          </div>
          <button onClick={handleAddCombo} className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity" style={{ padding: "9px 22px", borderRadius: 999, background: "#0058a3", color: "#fff", border: "none", fontFamily: "'Satoshi', sans-serif", fontSize: 13, fontWeight: 700 }}>
            Sepete Ekle
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </button>
        </div>
        <div style={{ minWidth: 80 }}>
          {!panelOpen && (
            <button onClick={() => setPanelOpen(true)} className="flex items-center gap-2 cursor-pointer hover:bg-zinc-50 transition-colors" style={{ padding: "7px 14px", borderRadius: 999, border: "1px solid rgba(0,0,0,0.08)", background: "#fff", fontFamily: "'Satoshi', sans-serif", fontSize: 12, fontWeight: 600, color: "#111" }}>
              Ürünler
            </button>
          )}
        </div>
      </div>

      {/* ═══ MAIN AREA ═══ */}
      <div className="flex flex-1 overflow-hidden">

        {/* ─── LEFT: CANVAS ─── */}
        <div className="flex-1 h-full relative flex items-center justify-center overflow-hidden">
          <div className="relative flex flex-col items-center">
            {/* TOP */}
            <div
              onDrop={(e) => handleDrop(e, "top")}
              onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = "move"; setDragOver("top"); }}
              onDragLeave={() => setDragOver(null)}
              className="relative transition-all duration-300"
              style={{ zIndex: 2, borderRadius: 14, outline: dragOver === "top" ? "2.5px dashed #0058a3" : "2.5px solid transparent", outlineOffset: 4, background: dragOver === "top" ? "rgba(0,88,163,0.03)" : "transparent" }}
            >
              <AnimatePresence mode="wait">
                <motion.div key={`t-${selectedTop.id}`} initial={{ opacity: 0, y: -12, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.94 }} transition={{ duration: 0.35, ease: EASE }} className="cursor-pointer" style={{ width: "clamp(180px, 22vw, 300px)" }} onClick={() => { setActiveFilter("tops"); setPanelOpen(true); }}>
                  <Image src={selectedTop.image} alt={selectedTop.name} width={600} height={600} className="w-full h-auto object-contain" style={{ maxHeight: "32vh", filter: "drop-shadow(0 6px 16px rgba(0,0,0,0.07))" }} priority />
                </motion.div>
              </AnimatePresence>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2" style={{ background: "rgba(0,0,0,0.8)", color: "#fff", padding: "2px 10px", borderRadius: 4, fontSize: 9, fontWeight: 600, fontFamily: "'Satoshi', sans-serif", whiteSpace: "nowrap" }}>{selectedTop.name}</div>
            </div>
            {/* BOTTOM */}
            <div
              onDrop={(e) => handleDrop(e, "bottom")}
              onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = "move"; setDragOver("bottom"); }}
              onDragLeave={() => setDragOver(null)}
              className="relative transition-all duration-300"
              style={{ zIndex: 1, marginTop: -16, borderRadius: 14, outline: dragOver === "bottom" ? "2.5px dashed #0058a3" : "2.5px solid transparent", outlineOffset: 4, background: dragOver === "bottom" ? "rgba(0,88,163,0.03)" : "transparent" }}
            >
              <AnimatePresence mode="wait">
                <motion.div key={`b-${selectedBottom.id}`} initial={{ opacity: 0, y: 12, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.94 }} transition={{ duration: 0.35, ease: EASE }} className="cursor-pointer" style={{ width: "clamp(160px, 20vw, 280px)" }} onClick={() => { setActiveFilter("bottoms"); setPanelOpen(true); }}>
                  <Image src={selectedBottom.image} alt={selectedBottom.name} width={600} height={600} className="w-full h-auto object-contain" style={{ maxHeight: "32vh", filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.09))" }} priority />
                </motion.div>
              </AnimatePresence>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2" style={{ background: "rgba(0,0,0,0.8)", color: "#fff", padding: "2px 10px", borderRadius: 4, fontSize: 9, fontWeight: 600, fontFamily: "'Satoshi', sans-serif", whiteSpace: "nowrap" }}>{selectedBottom.name}</div>
            </div>
          </div>

          {/* Minimal bottom info */}
          <div className="absolute bottom-3 left-4 flex items-center gap-2" style={{ opacity: 0.45 }}>
            <div className="flex -space-x-2">
              {[selectedTop, selectedBottom].map((p, i) => (
                <div key={i} style={{ width: 22, height: 22, borderRadius: 5, background: "#fff", border: "1px solid rgba(0,0,0,0.06)", overflow: "hidden", position: "relative", zIndex: 2 - i }}>
                  <Image src={p.image} alt="" width={44} height={44} className="w-full h-full object-contain" style={{ padding: 2 }} />
                </div>
              ))}
            </div>
            <span style={{ fontSize: 10, fontWeight: 500, color: "#111", fontFamily: "'Satoshi', sans-serif" }}>{selectedTop.name} + {selectedBottom.name}</span>
          </div>
        </div>

        {/* ─── DATA STRIP (vertical sidebar) ─── */}
        <motion.div
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: EASE }}
          className="h-full flex flex-col items-center justify-center gap-2.5 border-l shrink-0"
          style={{ width: 68, background: "rgba(255,255,255,0.55)", backdropFilter: "blur(20px)", borderColor: "rgba(0,0,0,0.04)", padding: "16px 0" }}
        >
          <Score value={matchData.trendScore} label="Trend" color="#111" />
          <div style={{ width: 24, height: 1, background: "rgba(0,0,0,0.04)" }} />
          <Score value={matchData.matchScore} label="Uyum" color="#22c55e" />
          <div style={{ width: 24, height: 1, background: "rgba(0,0,0,0.04)" }} />
          <div className="flex flex-col items-center gap-0.5">
            <span style={{ fontSize: 18 }}>{seasonConfig[matchData.season] || "☀️"}</span>
            <span style={{ fontSize: 7, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: "rgba(0,0,0,0.22)", fontFamily: "'Satoshi', sans-serif" }}>{matchData.season}</span>
          </div>
          <div style={{ width: 24, height: 1, background: "rgba(0,0,0,0.04)" }} />
          <div className="flex flex-col items-center gap-0.5">
            <span style={{ fontSize: 7, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: "rgba(0,0,0,0.22)", fontFamily: "'Satoshi', sans-serif" }}>Sıcaklık</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: "#111", fontFamily: "'Satoshi', sans-serif" }}>{matchData.tempRange}</span>
            <div style={{ width: 28, height: 3, borderRadius: 2, background: "linear-gradient(90deg, #60a5fa, #f59e0b, #ef4444)" }} />
          </div>
          <div style={{ width: 24, height: 1, background: "rgba(0,0,0,0.04)" }} />
          <div className="flex flex-col items-center gap-0.5">
            <span style={{ fontSize: 7, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: "rgba(0,0,0,0.22)", fontFamily: "'Satoshi', sans-serif" }}>Stil</span>
            <span style={{ fontSize: 9, fontWeight: 700, color: "#111", fontFamily: "'Satoshi', sans-serif", textAlign: "center" }}>{matchData.style}</span>
          </div>
          <div style={{ width: 24, height: 1, background: "rgba(0,0,0,0.04)" }} />
          <div className="flex flex-col items-center gap-1">
            {matchData.colorPalette.map((hex, i) => (
              <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 + i * 0.08 }} style={{ width: 13, height: 13, borderRadius: "50%", background: hex, border: "1.5px solid rgba(255,255,255,0.9)", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }} />
            ))}
          </div>
        </motion.div>

        {/* ─── RIGHT: PREMIUM PRODUCT PANEL ─── */}
        <AnimatePresence>
          {panelOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 440, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="h-full border-l flex flex-col shrink-0"
              style={{ borderColor: "rgba(0,0,0,0.05)", background: "#fff", overflow: "clip" }}
            >
              {/* ── Fixed Panel Header ── */}
              <div className="shrink-0" style={{ padding: "20px 24px 0", width: 440 }}>
                <div className="flex items-start justify-between">
                  <div>
                    <h2 style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 22, fontWeight: 800, color: "#111", letterSpacing: "-0.03em", lineHeight: 1.15 }}>{category.name}</h2>
                    <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 12, fontWeight: 400, color: "rgba(0,0,0,0.4)", marginTop: 3 }}>{category.description}</p>
                  </div>
                  <button onClick={() => setPanelOpen(false)} className="flex items-center justify-center cursor-pointer hover:bg-zinc-100 transition-colors shrink-0" style={{ width: 32, height: 32, borderRadius: 999, background: "transparent", border: "none" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  </button>
                </div>

                {/* Filters */}
                <div className="flex items-center justify-between" style={{ marginTop: 16, paddingBottom: 16, borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
                  <div className="flex items-center gap-1.5">
                    {(["all", "tops", "bottoms"] as const).map((f) => (
                      <button key={f} onClick={() => setActiveFilter(f)} className="cursor-pointer transition-all duration-200" style={{
                        padding: "6px 16px", borderRadius: 999,
                        border: activeFilter === f ? "1.5px solid #111" : "1.5px solid rgba(0,0,0,0.06)",
                        background: activeFilter === f ? "#111" : "#fff",
                        color: activeFilter === f ? "#fff" : "rgba(0,0,0,0.4)",
                        fontFamily: "'Satoshi', sans-serif", fontSize: 12, fontWeight: 600,
                      }}>
                        {f === "all" ? "Tümü" : f === "tops" ? "Üst Giyim" : "Alt Giyim"}
                      </button>
                    ))}
                  </div>
                  <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 12, fontWeight: 500, color: "rgba(0,0,0,0.3)" }}>{displayProducts.length} ürün</span>
                </div>
              </div>

              {/* ── Scrollable Product Grid ── */}
              <div
                ref={panelRef}
                className="flex-1"
                onWheel={(e) => {
                  const el = panelRef.current;
                  if (el) {
                    e.stopPropagation();
                    el.scrollTop += e.deltaY;
                  }
                }}
                style={{
                  width: 440,
                  overflowY: "auto",
                  overflowX: "hidden",
                  overscrollBehavior: "contain",
                  WebkitOverflowScrolling: "touch",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {activeFilter === "all" && (
                  <div style={{ padding: "14px 24px 0" }}>
                    <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(0,0,0,0.22)" }}>
                      {category.name} için önerilen · {categoryCount} parça
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3" style={{ padding: "12px 24px 32px" }}>
                  {displayProducts.map((p) => {
                    const isSelected = selectedTop.id === p.id || selectedBottom.id === p.id;

                    return (
                      <motion.div
                        key={p.id}
                        layout
                        draggable
                        onDragStart={(e) => handleDragStart(e as unknown as React.DragEvent, p)}
                        whileHover={{ y: -3, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
                        className="cursor-grab active:cursor-grabbing flex flex-col"
                        style={{
                          borderRadius: 10,
                          border: isSelected ? "2px solid #0058a3" : "1.5px solid rgba(0,0,0,0.04)",
                          background: "#fff",
                          overflow: "hidden",
                          transition: "border 0.2s ease",
                          boxShadow: isSelected ? "0 0 0 3px rgba(0,88,163,0.08)" : "0 1px 4px rgba(0,0,0,0.03)",
                        }}
                      >
                        {/* ─── IMAGE AREA: ~65% of card ─── */}
                        <div
                          className="relative flex items-center justify-center"
                          style={{ height: 190, background: "#f7f7f7", padding: 16 }}
                          onClick={() => {
                            if (p.category === "tops") setSelectedTop(p);
                            else setSelectedBottom(p);
                          }}
                        >
                          <Image
                            src={p.image} alt={p.name} width={220} height={220}
                            className="object-contain"
                            style={{ maxWidth: "82%", maxHeight: "82%", width: "auto", height: "auto", filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.05))" }}
                          />

                          {/* Selection check */}
                          {isSelected && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-2.5 right-2.5 flex items-center justify-center" style={{ width: 22, height: 22, borderRadius: 999, background: "#0058a3" }}>
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                            </motion.div>
                          )}

                          {/* Detail button (ⓘ) — opens product detail overlay */}
                          <button
                            onClick={(e) => { e.stopPropagation(); setDetailProduct(p); }}
                            className="absolute bottom-2.5 right-2.5 flex items-center justify-center hover:opacity-100 hover:scale-110 transition-all"
                            style={{ width: 24, height: 24, borderRadius: 999, border: "1.5px solid rgba(0,0,0,0.15)", background: "rgba(255,255,255,0.9)", opacity: 0.55, cursor: "pointer", backdropFilter: "blur(4px)" }}
                          >
                            <span style={{ fontSize: 12, fontWeight: 800, color: "rgba(0,0,0,0.5)", fontFamily: "serif", fontStyle: "italic" }}>i</span>
                          </button>
                        </div>

                        {/* ─── PRODUCT INFO ─── */}
                        <div style={{ padding: "12px 14px 14px", display: "flex", flexDirection: "column", flex: 1 }}>
                          <h3 style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 12, fontWeight: 700, color: "#111", letterSpacing: "0.01em", lineHeight: 1.3, textTransform: "uppercase", margin: 0 }}>{p.name}</h3>
                          <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 10.5, fontWeight: 400, color: "rgba(0,0,0,0.35)", lineHeight: 1.4, marginTop: 4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{p.description}</p>

                          {/* Price */}
                          <div className="flex items-baseline mt-auto" style={{ gap: 1, paddingTop: 10 }}>
                            <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 20, fontWeight: 800, color: "#111", letterSpacing: "-0.03em", lineHeight: 1 }}>{p.price}</span>
                            <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 11, fontWeight: 800, color: "#111", position: "relative", top: -4 }}>₺</span>
                          </div>

                          {/* Sizes */}
                          <div className="flex items-center gap-1" style={{ marginTop: 8 }}>
                            {p.sizes.map((sz, i) => (
                              <span key={sz} className="flex items-center justify-center" style={{
                                width: 28, height: 22, borderRadius: 5,
                                border: i === 0 ? "1.5px solid #111" : "1px solid rgba(0,0,0,0.08)",
                                fontSize: 9, fontWeight: 700, fontFamily: "'Satoshi', sans-serif",
                                color: i === 0 ? "#111" : "rgba(0,0,0,0.28)",
                              }}>{sz}</span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ═══ PRODUCT DETAIL OVERLAY ═══ */}
      <AnimatePresence>
        {detailProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)" }}
            onClick={() => setDetailProduct(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="relative flex"
              style={{ width: 680, maxHeight: "80vh", borderRadius: 16, background: "#fff", overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.15)" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image side */}
              <div className="flex items-center justify-center" style={{ width: "50%", background: "#f5f5f5", padding: 32 }}>
                <Image src={detailProduct.image} alt={detailProduct.name} width={400} height={400} className="w-full h-auto object-contain" style={{ maxHeight: 340, filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.06))" }} />
              </div>

              {/* Info side */}
              <div className="flex flex-col" style={{ width: "50%", padding: "32px 28px" }}>
                {/* Close */}
                <button onClick={() => setDetailProduct(null)} className="absolute top-4 right-4 flex items-center justify-center cursor-pointer hover:bg-zinc-100 transition-colors" style={{ width: 32, height: 32, borderRadius: 999, background: "transparent", border: "none" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>

                {/* Category */}
                <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(0,0,0,0.25)" }}>
                  {detailProduct.category === "tops" ? "Üst Giyim" : "Alt Giyim"}
                </span>

                {/* Name */}
                <h2 style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 22, fontWeight: 800, color: "#111", letterSpacing: "-0.02em", lineHeight: 1.2, marginTop: 8 }}>{detailProduct.name}</h2>

                {/* Description */}
                <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 13, fontWeight: 400, color: "rgba(0,0,0,0.45)", lineHeight: 1.55, marginTop: 10 }}>{detailProduct.description}</p>

                {/* Price */}
                <div className="flex items-baseline" style={{ gap: 2, marginTop: 20 }}>
                  <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 32, fontWeight: 800, color: "#111", letterSpacing: "-0.03em" }}>{detailProduct.price}</span>
                  <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 14, fontWeight: 800, color: "#111", position: "relative", top: -8 }}>₺</span>
                </div>

                {/* Sizes */}
                <div style={{ marginTop: 20 }}>
                  <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(0,0,0,0.25)", marginBottom: 8, display: "block" }}>Beden Seçimi</span>
                  <div className="flex items-center gap-2">
                    {detailProduct.sizes.map((sz, i) => (
                      <span key={sz} className="flex items-center justify-center cursor-pointer hover:border-black transition-colors" style={{
                        width: 40, height: 32, borderRadius: 8,
                        border: i === 0 ? "2px solid #111" : "1.5px solid rgba(0,0,0,0.08)",
                        fontSize: 12, fontWeight: 700, fontFamily: "'Satoshi', sans-serif",
                        color: i === 0 ? "#111" : "rgba(0,0,0,0.3)",
                        background: i === 0 ? "rgba(0,0,0,0.02)" : "#fff",
                      }}>{sz}</span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-auto" style={{ paddingTop: 20 }}>
                  <button
                    onClick={() => {
                      if (detailProduct.category === "tops") setSelectedTop(detailProduct);
                      else setSelectedBottom(detailProduct);
                      setDetailProduct(null);
                      toast.success(`${detailProduct.name} kombinlenmeye eklendi`);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 cursor-pointer hover:opacity-90 transition-opacity"
                    style={{ height: 44, borderRadius: 10, background: "#0058a3", color: "#fff", border: "none", fontFamily: "'Satoshi', sans-serif", fontSize: 13, fontWeight: 700 }}
                  >
                    Kombine Ekle
                  </button>
                  <button
                    onClick={() => {
                      addItem({ productId: detailProduct.id, name: detailProduct.name, price: detailProduct.price, image: detailProduct.image, size: "M" });
                      toast.success(`${detailProduct.name} sepete eklendi`);
                    }}
                    className="flex items-center justify-center cursor-pointer hover:bg-zinc-50 transition-colors"
                    style={{ width: 44, height: 44, borderRadius: 10, border: "1.5px solid rgba(0,0,0,0.08)", background: "#fff" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
