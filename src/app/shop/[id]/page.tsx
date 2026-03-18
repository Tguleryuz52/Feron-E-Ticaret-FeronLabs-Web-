import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import ClientProductDetail from "./ClientProductDetail";

/* ─── MAIN PAGE (Server Component) ─── */
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const resolvedParams = await params;
  const productId = Number(resolvedParams.id);

  // Fetch product + related products in parallel
  const [{ data: product }, { data: allRelated }] = await Promise.all([
    supabase
      .from("products")
      .select(`*, category:categories(slug)`)
      .eq("id", productId)
      .single(),
    supabase
      .from("products")
      .select(`id, name, price, images, category_id, category:categories(slug)`)
      .limit(20),
  ]);

  if (!product) {
    notFound();
  }

  /* Remap image paths: old /products/file.png → /products/Ust/ or /products/Alt/ */
  const ALT_FILES = new Set(["pant.png", "pants2.png", "pants3.png"]);
  function remapImages(imgs: string[] | null) {
    if (!imgs) return imgs;
    return imgs.map((img: string) => {
      if (img.includes("/Ust/") || img.includes("/Alt/")) return img;
      const filename = img.split("/").pop() || "";
      if (ALT_FILES.has(filename)) return `/products/Alt/${filename}`;
      return `/products/Ust/${filename}`;
    });
  }

  product.images = remapImages(product.images);

  // Filter related products from the same category (excluding current)
  const related = (allRelated || [])
    .filter((p) => p.id !== product.id && p.category_id === product.category_id)
    .slice(0, 3)
    .map((p) => ({ ...p, images: remapImages(p.images) }));

  return (
    <ClientProductDetail 
      product={product} 
      related={related} 
    />
  );
}


