"use client";

import { useState } from "react";
import FeronLabsHeader from "@/components/FeronLabsHeader";
import FeronLabsOnboard from "@/components/sections/FeronLabsOnboard";
import FeronLabs from "@/components/sections/FeronLabs";
import Footer from "@/components/Footer";
import { type PlannerCategory } from "@/data/outfitData";

export default function FeronLabsPage() {
  const [selectedCategory, setSelectedCategory] = useState<PlannerCategory | null>(null);

  return (
    <main
      className="bg-[#f5f5f5]"
      style={{
        height: selectedCategory ? "100vh" : "auto",
        overflow: selectedCategory ? "hidden" : "auto",
      }}
    >
      <FeronLabsHeader />
      {selectedCategory ? (
        <FeronLabs
          category={selectedCategory}
          onBack={() => setSelectedCategory(null)}
        />
      ) : (
        <>
          <FeronLabsOnboard onSelectCategory={setSelectedCategory} />
          <Footer />
        </>
      )}
    </main>
  );
}
