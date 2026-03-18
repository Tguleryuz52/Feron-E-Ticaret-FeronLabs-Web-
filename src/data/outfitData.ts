/* ─── FERONLABS OUTFIT PLANNER DATA ─── */
import { products, type Product } from "./products";

export interface Outfit {
  id: number;
  topId: number;
  bottomId: number;
  trendScore: number;
  matchScore: number;
  style: string;
  season: string;
  tempRange: string;
  occasion: string;
  colorPalette: string[];
  versatility: number;
}

/* ─── PLANNER CATEGORIES ─── */
export interface PlannerCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  topIds: number[];
  bottomIds: number[];
  bgGradient: string;
}

export const plannerCategories: PlannerCategory[] = [
  {
    id: "spor",
    name: "Spor",
    icon: "🏋️",
    description: "Aktif yaşam için rahat ve şık kombinler",
    topIds: [1, 2, 3],
    bottomIds: [5, 6],
    bgGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    id: "ofis",
    name: "Ofis",
    icon: "💼",
    description: "Profesyonel ve şık iş kombinleri",
    topIds: [7, 8, 12],
    bottomIds: [4, 6],
    bgGradient: "linear-gradient(135deg, #2c3e50 0%, #3498db 100%)",
  },
  {
    id: "gunluk",
    name: "Günlük",
    icon: "☕",
    description: "Her güne uygun rahat ve stil sahibi",
    topIds: [1, 2, 3, 9, 11],
    bottomIds: [4, 5, 6],
    bgGradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    id: "kampus",
    name: "Kampüs",
    icon: "🎓",
    description: "Genç, enerjik ve trend kampüs stili",
    topIds: [1, 2, 11, 10],
    bottomIds: [5, 6],
    bgGradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
  {
    id: "tatil",
    name: "Tatil",
    icon: "🏖️",
    description: "Rahat ve ferah tatil kombinleri",
    topIds: [7, 10, 11, 8],
    bottomIds: [4, 5],
    bgGradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  },
];

/* ─── AI MATCH SCORING ─── */
// Generates a pseudo-deterministic score for any top+bottom combo
export function calculateMatchScore(topId: number, bottomId: number): {
  trendScore: number;
  matchScore: number;
  versatility: number;
  season: string;
  tempRange: string;
  colorPalette: string[];
  style: string;
} {
  // Check if a curated outfit exists first
  const curated = outfits.find(
    (o) => o.topId === topId && o.bottomId === bottomId,
  );
  if (curated) {
    return {
      trendScore: curated.trendScore,
      matchScore: curated.matchScore,
      versatility: curated.versatility,
      season: curated.season,
      tempRange: curated.tempRange,
      colorPalette: curated.colorPalette,
      style: curated.style,
    };
  }

  // Generate pseudo-deterministic scores for uncurated combos
  const seed = (topId * 17 + bottomId * 31) % 100;
  const top = products.find((p) => p.id === topId);
  const bottom = products.find((p) => p.id === bottomId);

  const seasons = ["İlkbahar", "Yaz", "Sonbahar", "Kış"];
  const styles = [
    "Casual",
    "Smart Casual",
    "Streetwear",
    "Minimal",
    "Urban",
    "Fresh",
  ];

  const topColors: Record<number, string> = {
    1: "#6B8EA0",
    2: "#1a1a1a",
    3: "#c4a882",
    7: "#f5f5f5",
    8: "#2d6a4f",
    9: "#722f37",
    10: "#e8e8f0",
    11: "#f5f5f5",
    12: "#2c3e6b",
  };
  const bottomColors: Record<number, string> = {
    4: "#1a1a1a",
    5: "#8a8a8a",
    6: "#2c2c2c",
  };

  return {
    trendScore: 72 + (seed % 25),
    matchScore: 75 + ((seed * 7) % 22),
    versatility: 5 + (seed % 5),
    season: seasons[seed % 4],
    tempRange: `${8 + (seed % 12)}°C – ${20 + (seed % 12)}°C`,
    colorPalette: [
      topColors[topId] || "#888",
      bottomColors[bottomId] || "#444",
      "#e5e1db",
    ],
    style: styles[seed % styles.length],
  };
}

/* Pre-curated outfits combining tops + bottoms */
export const outfits: Outfit[] = [
  {
    id: 1,
    topId: 1,
    bottomId: 4,
    trendScore: 94,
    matchScore: 91,
    style: "Sporty Casual",
    season: "Sonbahar",
    tempRange: "10°C – 18°C",
    occasion: "Kampüs",
    colorPalette: ["#6B8EA0", "#1a1a1a", "#3d3d3d"],
    versatility: 8,
  },
  {
    id: 2,
    topId: 8,
    bottomId: 6,
    trendScore: 88,
    matchScore: 95,
    style: "Smart Casual",
    season: "İlkbahar",
    tempRange: "15°C – 22°C",
    occasion: "Kafe",
    colorPalette: ["#2d6a4f", "#1a1a1a", "#2c2c2c"],
    versatility: 7,
  },
  {
    id: 3,
    topId: 2,
    bottomId: 5,
    trendScore: 82,
    matchScore: 87,
    style: "Streetwear",
    season: "Yaz",
    tempRange: "22°C – 30°C",
    occasion: "Sokak",
    colorPalette: ["#1a1a1a", "#8a8a8a", "#b0b0b0"],
    versatility: 9,
  },
  {
    id: 4,
    topId: 7,
    bottomId: 4,
    trendScore: 91,
    matchScore: 93,
    style: "Classic",
    season: "İlkbahar",
    tempRange: "14°C – 22°C",
    occasion: "Ofis",
    colorPalette: ["#f5f5f5", "#1a1a1a", "#2e7d32"],
    versatility: 9,
  },
  {
    id: 5,
    topId: 3,
    bottomId: 6,
    trendScore: 86,
    matchScore: 90,
    style: "Layered",
    season: "Kış",
    tempRange: "5°C – 12°C",
    occasion: "Kafe",
    colorPalette: ["#c4a882", "#1a1a1a", "#2c2c2c"],
    versatility: 7,
  },
  {
    id: 6,
    topId: 9,
    bottomId: 5,
    trendScore: 79,
    matchScore: 84,
    style: "Bold Casual",
    season: "Yaz",
    tempRange: "20°C – 28°C",
    occasion: "Sokak",
    colorPalette: ["#722f37", "#8a8a8a", "#b0b0b0"],
    versatility: 6,
  },
  {
    id: 7,
    topId: 11,
    bottomId: 4,
    trendScore: 92,
    matchScore: 89,
    style: "Fresh",
    season: "İlkbahar",
    tempRange: "16°C – 24°C",
    occasion: "Kampüs",
    colorPalette: ["#f5f5f5", "#2e7d32", "#1a1a1a"],
    versatility: 8,
  },
  {
    id: 8,
    topId: 12,
    bottomId: 6,
    trendScore: 85,
    matchScore: 92,
    style: "Minimal",
    season: "Sonbahar",
    tempRange: "12°C – 20°C",
    occasion: "Ofis",
    colorPalette: ["#2c3e6b", "#1a1a1a", "#2c2c2c"],
    versatility: 8,
  },
  {
    id: 9,
    topId: 10,
    bottomId: 5,
    trendScore: 77,
    matchScore: 86,
    style: "Summer",
    season: "Yaz",
    tempRange: "24°C – 32°C",
    occasion: "Tatil",
    colorPalette: ["#f5f5f5", "#4a90d9", "#8a8a8a"],
    versatility: 6,
  },
  {
    id: 10,
    topId: 1,
    bottomId: 5,
    trendScore: 90,
    matchScore: 88,
    style: "Urban",
    season: "Sonbahar",
    tempRange: "8°C – 16°C",
    occasion: "Sokak",
    colorPalette: ["#6B8EA0", "#8a8a8a", "#b0b0b0"],
    versatility: 9,
  },
];

/* Resolve products from outfit */
export function resolveOutfit(outfit: Outfit): {
  top: Product;
  bottom: Product;
  totalPrice: number;
} | null {
  const top = products.find((p) => p.id === outfit.topId);
  const bottom = products.find((p) => p.id === outfit.bottomId);
  if (!top || !bottom) return null;
  return { top, bottom, totalPrice: top.price + bottom.price };
}

/* Pseudo-random shuffle using Fisher-Yates */
export function getShuffledOutfits(): Outfit[] {
  const arr = [...outfits];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
