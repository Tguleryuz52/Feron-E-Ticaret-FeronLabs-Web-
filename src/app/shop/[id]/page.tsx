import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import ClientProductDetail from "./ClientProductDetail";
import {
  getProduct as getLocalProduct,
  getRelatedProducts,
  type Product as LocalProduct,
} from "@/data/products";

/* Remap image paths: old /products/file.png → /products/Ust/ or /products/Alt/ */
const ALT_FILES = new Set(["pant.png", "pants2.png", "pants3.png"]);

function remapImages(imgs: string[] | null | undefined) {
  if (!imgs) return imgs;
  return imgs.map((img: string) => {
    if (img.includes("/Ust/") || img.includes("/Alt/")) return img;
    const filename = img.split("/").pop() || "";
    if (ALT_FILES.has(filename)) return `/products/Alt/${filename}`;
    return `/products/Ust/${filename}`;
  });
}

/** Yerel katalog → ClientProductDetail + ilgili kartlar */
function fromLocalCatalog(p: LocalProduct) {
  const img = remapImages([p.image])?.[0] ?? p.image;
  return {
    id: p.id,
    name: p.name,
    price: p.price,
    images: [img],
    category: { slug: p.category },
    sizes: p.sizes,
    desc: p.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const productId = Number(resolvedParams.id);
  if (Number.isNaN(productId)) notFound();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let product: Record<string, unknown> | null = null;
  let related: Record<string, unknown>[] = [];

  if (url && key) {
    try {
      const supabase = await createClient();
      const [{ data: row }, { data: allRelated }] = await Promise.all([
        supabase
          .from("products")
          .select(`*, category:categories(slug)`)
          .eq("id", productId)
          .single(),
        supabase
          .from("products")
          .select(
            `id, name, price, images, category_id, category:categories(slug)`
          )
          .limit(20),
      ]);

      if (row) {
        const r = row as { images?: string[] | null; [k: string]: unknown };
        r.images = remapImages(r.images ?? null) ?? r.images;
        product = r as Record<string, unknown>;
        related = (allRelated || [])
          .filter(
            (p: { id: number; category_id?: number }) =>
              p.id !== (product as { id: number }).id &&
              p.category_id === (product as { category_id?: number }).category_id
          )
          .slice(0, 3)
          .map((p: { images?: string[] | null }) => ({
            ...p,
            images: remapImages(p.images ?? null),
          })) as Record<string, unknown>[];
      }
    } catch {
      // Supabase hata → yerel katalog
    }
  }

  if (!product) {
    const local = getLocalProduct(productId);
    if (!local) notFound();
    product = fromLocalCatalog(local);
    related = getRelatedProducts(local, 3).map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      images: [remapImages([p.image])?.[0] ?? p.image],
    })) as Record<string, unknown>[];
  }

  return (
    <ClientProductDetail product={product} related={related} />
  );
}
