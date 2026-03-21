"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { products as localCatalog } from "@/data/products";

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

/** Yerel katalog → Shop grid formatı (Supabase yok / boş / hata) */
function productsFromLocalCatalog(): Product[] {
  return localCatalog.map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    images: [p.image],
    category: { slug: p.category },
    slug: `product-${p.id}`,
    is_featured: p.isNew,
  }));
}

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

/* ─── PRODUCT CARD COMPONENT (Fossil Style - Birebir) ─── */
function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop/${product.id}`} className="group block">
      {/* Image Container — no border radius, tight */}
      <div className="relative overflow-hidden bg-[#EBEBEB]" style={{ aspectRatio: "3/4" }}>

        {/* NEW badge — top-right, white rounded pill */}
        {product.is_featured && (
          <span
            className="absolute top-3 right-3 z-10 bg-white text-black select-none"
            style={{
              fontSize: "9px",
              fontWeight: 500,
              letterSpacing: "0.03em",
              padding: "5px 11px",
              borderRadius: "20px",
              lineHeight: 1,
            }}
          >
            New
          </span>
        )}

        {/* Product Image */}
        {product.images?.[0] && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        )}
      </div>

      {/* Product Info — Fossil birebir: isim bold, fiyat normal, küçük üst boşluk */}
      <div className="mt-3 space-y-0.5">
        <h3
          className="text-black leading-snug"
          style={{
            fontSize: "14px",
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
        >
          {product.name}
        </h3>
        <p
          className="text-black"
          style={{
            fontSize: "14px",
            fontWeight: 400,
            letterSpacing: "-0.01em",
          }}
        >
          $ {product.price.toFixed(2)}
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
    let cancelled = false;

    async function getProducts() {
      const ALT_FILES = new Set(["pant.png", "pants2.png", "pants3.png"]);
      const remapImages = (list: Product[]) =>
        list.map((p) => ({
          ...p,
          images: p.images?.map((img) => {
            if (img.includes("/Ust/") || img.includes("/Alt/")) return img;
            const filename = img.split("/").pop() || "";
            if (ALT_FILES.has(filename)) return `/products/Alt/${filename}`;
            return `/products/Ust/${filename}`;
          }),
        }));

      const useLocal = () => {
        if (!cancelled) setProducts(remapImages(productsFromLocalCatalog()));
      };

      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!url || !key) {
        useLocal();
        if (!cancelled) setLoading(false);
        return;
      }

      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("products")
          .select(`
          id, name, price, images, is_featured,
          category:categories(slug)
        `);

        if (cancelled) return;

        if (error) {
          console.warn("[Shop] Supabase error, using local catalog:", error.message);
          useLocal();
        } else if (data && data.length > 0) {
          setProducts(remapImages(data as unknown as Product[]));
        } else {
          useLocal();
        }
      } catch (e) {
        console.warn("[Shop] Supabase unavailable, using local catalog:", e);
        useLocal();
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    getProducts();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered =
    activeCategory === "All" || activeCategory === "Summer 2026"
      ? products
      : activeCategory === "New"
        ? products.filter((p) => p.is_featured)
        : products.filter(
            (p) => p.category?.slug === activeCategory.toLowerCase()
          );

  return (
    <section className="bg-white text-black min-h-screen">

      {/* ═══════════════════════════════════════════════════
          HERO ZONE — Shop title + Description + Filters
      ═══════════════════════════════════════════════════ */}
      <div style={{ padding: "120px 48px 0 48px" }}>

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
          PRODUCT GRID — Fossil birebir: 3 col, gap küçük
      ═══════════════════════════════════════════════════ */}
      {loading ? (
        <div
          className="grid grid-cols-3 gap-x-3 gap-y-10"
          style={{ padding: "0 48px 100px 48px" }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-[#EBEBEB]" style={{ aspectRatio: "3/4" }} />
              <div className="mt-3 space-y-1.5">
                <div className="h-3 w-28 bg-zinc-200" />
                <div className="h-3 w-16 bg-zinc-200" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-10"
          style={{ padding: "0 48px 100px 48px" }}
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
