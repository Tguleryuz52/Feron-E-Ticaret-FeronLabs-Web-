"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useCartStore } from "@/store/cartStore";

/* ─── PRODUCT TYPE ─── */
type Product = {
  id: number;
  name: string;
  price: number;
  images: string[];
  category: { slug: string };
  slug: string;
  is_featured: boolean;
};

const categories = ["All", "Tops", "Bottoms", "New", "Summer 2026"];

/* ─── ANIMATION ─── */
const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

const fadeIn = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay: i * 0.06,
      ease: EASE,
    },
  }),
};

/* ─── PRODUCT CARD COMPONENT ─── */
function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || "",
      size: "M",
    });
    toast.success(`${product.name} sepete eklendi!`);
  };

  return (
    <Link
      href={`/shop/${product.id}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-3/4 overflow-hidden bg-[#F5F5F5] rounded-xl">
        {/* NEW badge — clean pill button */}
        {product.is_featured && (
          <span
            className="absolute top-4 left-4 z-10 inline-flex items-center justify-center select-none"
            style={{
              backgroundColor: "#000",
              color: "#fff",
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "6px 14px",
              borderRadius: "6px",
              lineHeight: 1,
              whiteSpace: "nowrap",
            }}
          >
            NEW
          </span>
        )}

        {/* Product Image */}
        {product.images?.[0] && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        {/* Quick Add Button — slides from right at bottom-right */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-4 right-4 z-20"
            >
              <button
                onClick={handleQuickAdd}
                className="flex items-center gap-3
                           bg-black text-white cursor-pointer
                           hover:bg-zinc-800 active:bg-zinc-900
                           transition-colors duration-200 select-none shadow-lg"
                style={{
                  padding: "10px 18px",
                  borderRadius: "8px",
                }}
              >
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Sepete Ekle
                </span>
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: 300,
                    lineHeight: 1,
                  }}
                >
                  +
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Product Info */}
      <div className="mt-4 px-1">
        <h3
          className="text-[13px] font-medium text-black truncate"
          style={{ letterSpacing: "-0.01em" }}
        >
          {product.name}
        </h3>
        <p className="text-[13px] text-zinc-500 mt-1 font-normal">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}

/* ─── MAIN SECTION ─── */
export default function ShopSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProducts() {
      const supabase = createClient();
      const { data } = await supabase
        .from("products")
        .select(`
          id, name, price, images, is_featured,
          category:categories(slug)
        `);
      
      if (data) {
        /* Remap image paths: old /products/file.png → /products/Ust/ or /products/Alt/ */
        const ALT_FILES = new Set(["pant.png", "pants2.png", "pants3.png"]);
        const remapped = (data as unknown as Product[]).map((p) => ({
          ...p,
          images: p.images?.map((img) => {
            if (img.includes("/Ust/") || img.includes("/Alt/")) return img;
            const filename = img.split("/").pop() || "";
            if (ALT_FILES.has(filename)) return `/products/Alt/${filename}`;
            return `/products/Ust/${filename}`;
          }),
        }));
        setProducts(remapped);
      }
      setLoading(false);
    }
    getProducts();
  }, []);

  const filtered =
    activeCategory === "All"
      ? products
      : activeCategory === "New"
      ? products.filter((p) => p.is_featured)
      : products.filter((p) => p.category?.slug === activeCategory.toLowerCase());

  return (
    <section className="bg-white text-black min-h-screen">

      {/* ═══════════════════════════════════════════════════
          HERO ZONE — Shop title + Description + Filters
      ═══════════════════════════════════════════════════ */}
      <div style={{ padding: "120px 64px 0 64px" }}>

        {/* Row 1: Title + Description — top-aligned */}
        <div className="flex items-start justify-between">

          {/* LEFT — Shop heading */}
          <h1
            style={{
              fontFamily: "'Satoshi', 'Inter', 'Helvetica Neue', sans-serif",
              fontSize: "clamp(52px, 5.5vw, 80px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 0.9,
              color: "#000000",
            }}
          >
            Shop
          </h1>

          {/* RIGHT — Description */}
          <p
            className="text-zinc-500"
            style={{
              maxWidth: "400px",
              marginTop: "12px",
              fontSize: "15px",
              lineHeight: "1.7",
              letterSpacing: "-0.01em",
              fontWeight: 400,
            }}
          >
            Explore Feron&apos;s premium lifestyle clothing catalog,
            featuring high-end casual wear for the modern individual.
          </p>
        </div>

        {/* Row 2: Category Filters — right-aligned */}
        <div
          className="flex justify-end items-center gap-7"
          style={{ paddingTop: "100px", paddingBottom: "40px" }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="transition-all duration-300 cursor-pointer"
              style={{
                fontSize: "14px",
                fontWeight: activeCategory === cat ? 700 : 400,
                letterSpacing: "-0.01em",
                color: activeCategory === cat ? "#000000" : "#BBBBBB",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          PRODUCT GRID — 3 cols, standard gaps
      ═══════════════════════════════════════════════════ */}
      {loading ? (
        <div
          className="grid grid-cols-3 gap-8"
          style={{ padding: "0 64px 100px 64px" }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-3/4 bg-[#F5F5F5] rounded-xl" />
              <div className="mt-4 px-1 space-y-2">
                <div className="h-3 w-28 bg-zinc-200 rounded" />
                <div className="h-3 w-16 bg-zinc-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="grid grid-cols-3 gap-8"
          style={{ padding: "0 64px 100px 64px" }}
        >
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              custom={i}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
