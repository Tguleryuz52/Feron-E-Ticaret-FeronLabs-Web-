import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://edmkywayreyutaaqdpwg.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkbWt5d2F5cmV5dXRhYXFkcHdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4NzEzNDgsImV4cCI6MjA4NzQ0NzM0OH0.Hd5N9g0di8XOl0UFyH1jOS6tsF-qtiU7ucoaznyckcM"
);

// Known top image filenames
const ustFiles = new Set([
  "Adidas-Füme1-copy.png",
  "Adidas-Siyah1-copy.png",
  "Adidas-bej1-copy.png",
  "Adidas-bordo1-copy.png",
  "Adidas-green1-copy.png",
  "Adidas-İndigo1-copy.png",
  "Lacoste-Polo-Beyaz-copy.png",
  "Lacoste-Polo-Bold-green1-copy.png",
  "Lacoste-Polo-Bordo-1-copy.png",
  "Lacoste-Polo-White-Blue-1-copy.png",
  "Lacoste-Polo-White-Green-1-copy.png",
  "Lacoste-Polo-İndigo-1-copy.png",
]);

// Known bottom image filenames
const altFiles = new Set(["pant.png", "pants2.png", "pants3.png"]);

async function main() {
  // 1) Read current state
  const { data: products, error } = await supabase
    .from("products")
    .select("id, name, images, slug");
  if (error) { console.error("Fetch error:", error); return; }

  console.log(`Found ${products.length} products in Supabase:\n`);

  for (const p of products) {
    console.log(`ID ${p.id} | ${p.name} | images: ${JSON.stringify(p.images)}`);

    if (!p.images || !Array.isArray(p.images) || p.images.length === 0) {
      console.log("  -> No images, skipping\n");
      continue;
    }

    const updated = p.images.map((imgPath) => {
      // Already correct?
      if (imgPath.startsWith("/products/Ust/") || imgPath.startsWith("/products/Alt/")) {
        return imgPath;
      }
      // Extract filename from the path
      const parts = imgPath.split("/");
      const filename = parts[parts.length - 1];

      if (ustFiles.has(filename)) {
        return `/products/Ust/${filename}`;
      }
      if (altFiles.has(filename)) {
        return `/products/Alt/${filename}`;
      }
      // Unknown file — leave as is
      console.log(`  ⚠ Unknown file: ${filename}`);
      return imgPath;
    });

    const changed = JSON.stringify(updated) !== JSON.stringify(p.images);
    if (changed) {
      console.log(`  OLD: ${JSON.stringify(p.images)}`);
      console.log(`  NEW: ${JSON.stringify(updated)}`);
      const { error: ue } = await supabase
        .from("products")
        .update({ images: updated })
        .eq("id", p.id);
      if (ue) console.log(`  ✗ Update failed: ${ue.message}`);
      else    console.log(`  ✓ Updated`);
    } else {
      console.log("  -> Already correct");
    }
    console.log();
  }

  // 2) Verify
  console.log("=== VERIFICATION ===");
  const { data: check } = await supabase.from("products").select("id, name, images");
  for (const p of check) {
    console.log(`ID ${p.id} | ${p.name} | ${JSON.stringify(p.images)}`);
  }
}

main();
