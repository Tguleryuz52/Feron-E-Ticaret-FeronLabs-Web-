"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import ShopHeader from "@/components/ShopHeader";
import Footer from "@/components/Footer";
import { useCartStore } from "@/store/cartStore";

/* ─── EASING ─── */
const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

/* ─── ACCORDION ITEM ─── */
function Accordion({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-zinc-200">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full cursor-pointer"
        style={{ padding: "18px 0" }}
      >
        <span
          className="uppercase text-black"
          style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em" }}
        >
          {title}
        </span>
        <motion.svg
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="w-4 h-4 text-black"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </motion.svg>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <div style={{ paddingBottom: "20px" }}>
              <p
                className="text-zinc-500"
                style={{ fontSize: "13px", lineHeight: "1.8", letterSpacing: "-0.01em" }}
              >
                {children}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── PRODUCT CARD (Related) ─── */
function RelatedCard({ product }: { product: any }) {
  return (
    <Link href={`/shop/${product.id}`} className="group block">
      <div className="relative aspect-3/4 overflow-hidden rounded-sm bg-[#F4F4F5]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {product.images?.[0] && (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-contain p-10 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-[1.06]"
          />
        )}
      </div>
      <div className="flex items-center justify-between mt-4 px-1">
        <span
          className="uppercase text-black"
          style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.03em" }}
        >
          {product.name}
        </span>
        <span className="text-black" style={{ fontSize: "11px", fontWeight: 500 }}>
          ${parseFloat(product.price).toFixed(2)}
        </span>
      </div>
    </Link>
  );
}

/* ─── CLIENT COMPONENT ─── */
export default function ClientProductDetail({ product, related }: { product: any, related: any[] }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addItem({
      productId: product.id,
      name: product.name,
      price: parseFloat(product.price),
      image: product.images?.[0] ?? "",
      size: selectedSize,
    });
    toast.success(`${product.name} added to cart`, {
      description: `Size: ${selectedSize}`,
      duration: 2500,
    });
  };

  const categoryLabel = product.category?.slug === "tops" ? "Tops" : "Bottoms";

  return (
    <main className="bg-white">
      <ShopHeader />

      {/* ═══════════════════════════════════════════════════
          BREADCRUMB
      ═══════════════════════════════════════════════════ */}
      <div style={{ padding: "24px 64px 0 64px" }}>
        <nav className="flex items-center gap-2">
          <Link
            href="/"
            className="uppercase text-zinc-400 hover:text-black transition-colors duration-300"
            style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em" }}
          >
            Home
          </Link>
          <span className="text-zinc-300" style={{ fontSize: "11px" }}>/</span>
          <Link
            href={`/shop?category=${product.category?.slug}`}
            className="uppercase text-zinc-400 hover:text-black transition-colors duration-300"
            style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em" }}
          >
            {categoryLabel}
          </Link>
        </nav>
      </div>

      {/* ═══════════════════════════════════════════════════
          PRODUCT DETAIL — Two images + Info panel
      ═══════════════════════════════════════════════════ */}
      <div
        className="flex gap-6"
        style={{ padding: "24px 64px 80px 64px" }}
      >

        {/* LEFT — Two product images side by side */}
        <div className="flex gap-4 flex-1">
          {/* Main image */}
          <motion.div
            className="flex-1 bg-[#F4F4F5] overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div className="relative aspect-3/4 w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {product.images?.[0] && (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-contain p-12"
                  fetchPriority="high"
                />
              )}
            </div>
          </motion.div>

          {/* Detail image (zoomed crop) */}
          <motion.div
            className="flex-1 bg-[#F4F4F5] overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          >
            <div className="relative aspect-3/4 w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {product.images?.[0] && (
                <img
                  src={product.images[0]}
                  alt={`${product.name} detail`}
                  className="w-full h-full object-cover scale-[2.5] translate-y-[10%]"
                />
              )}
            </div>
          </motion.div>
        </div>

        {/* RIGHT — Product info panel */}
        <motion.div
          className="flex-shrink-0"
          style={{ width: "380px", paddingLeft: "24px" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        >
          {/* Name */}
          <h1
            className="text-black"
            style={{
              fontFamily: "'Satoshi', 'Inter', 'Helvetica Neue', sans-serif",
              fontSize: "28px",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: "1.2",
            }}
          >
            {product.name}
          </h1>

          {/* Price */}
          <p
            className="text-black"
            style={{ fontSize: "15px", fontWeight: 500, marginTop: "8px" }}
          >
            ${parseFloat(product.price).toFixed(2)}
          </p>

          {/* Size selector */}
          <div style={{ marginTop: "32px" }}>
            <span
              className="text-black"
              style={{ fontSize: "13px", fontWeight: 600 }}
            >
              Size
            </span>
            <div className="flex gap-2 mt-3 flex-wrap">
              {product.sizes?.map((size: string) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`flex items-center justify-center border transition-all duration-200 cursor-pointer ${
                    selectedSize === size
                      ? "border-black bg-black text-white"
                      : "border-zinc-300 bg-white text-black hover:border-black"
                  }`}
                  style={{
                    width: "44px",
                    height: "44px",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart / Select Size button */}
          <div style={{ marginTop: "28px" }}>
            <button
              onClick={handleAddToCart}
              className={`w-full text-center uppercase font-bold transition-all duration-300 cursor-pointer ${
                selectedSize
                  ? "bg-black text-white hover:bg-zinc-800"
                  : "bg-zinc-100 text-zinc-400 cursor-not-allowed"
              }`}
              style={{
                padding: "16px 0",
                fontSize: "12px",
                letterSpacing: "0.1em",
              }}
              disabled={!selectedSize}
            >
              {selectedSize ? "Add to Cart" : "Select Size"}
            </button>
          </div>

          {/* Accordions */}
          <div style={{ marginTop: "32px" }}>
            <Accordion title="Description" defaultOpen>
              {product.desc ?? product.description ?? ""}
            </Accordion>
            <Accordion title="Returns">
              Free returns within 30 days. Items must be unworn with original tags attached. Refunds processed within 5-7 business days.
            </Accordion>
          </div>
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════════════
          MORE FROM CATEGORY — Related products
      ═══════════════════════════════════════════════════ */}
      {related && related.length > 0 && (
        <div style={{ padding: "0 64px 80px 64px" }}>
          <h3
            className="uppercase text-black"
            style={{
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              marginBottom: "32px",
            }}
          >
            More {categoryLabel}
          </h3>
          <div className="grid grid-cols-3 gap-x-4">
            {related.map((p) => (
              <RelatedCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
