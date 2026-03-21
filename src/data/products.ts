/* ─── SHARED PRODUCT DATA ─── */
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: "tops" | "bottoms";
  isNew: boolean;
  description: string;
  sizes: string[];
  sizeAndFit: string;
  returns: string;
}

export const products: Product[] = [
  /* ═══════════ TOPS (Ust/) ═══════════ */
  {
    id: 1,
    name: "Adidas Füme Hoodie",
    price: 89,
    image: "/products/Ust/Adidas-Füme1-copy.png",
    category: "tops",
    isNew: true,
    description: "A premium heavyweight hoodie crafted from 100% organic cotton. Features a relaxed fit with ribbed cuffs and hem. The subtle Adidas branding adds a refined touch to this essential piece.",
    sizes: ["S", "M", "L", "XL"],
    sizeAndFit: "Relaxed fit. Model wears size M and is 185cm / 6'1\". Chest: S 104cm, M 110cm, L 116cm, XL 122cm.",
    returns: "Free returns within 30 days. Items must be unworn with original tags attached. Refunds processed within 5-7 business days.",
  },
  {
    id: 2,
    name: "Adidas Siyah Tee",
    price: 49,
    image: "/products/Ust/Adidas-Siyah1-copy.png",
    category: "tops",
    isNew: false,
    description: "A minimalist black tee made from premium jersey cotton. Clean lines and a contemporary fit make this a wardrobe staple. Features a soft hand feel and excellent drape.",
    sizes: ["S", "M", "L", "XL"],
    sizeAndFit: "Regular fit. Model wears size M and is 183cm / 6'0\". Chest: S 100cm, M 106cm, L 112cm, XL 118cm.",
    returns: "Free returns within 30 days. Items must be unworn with original tags attached. Refunds processed within 5-7 business days.",
  },
  {
    id: 3,
    name: "Adidas Bej Hoodie",
    price: 89,
    image: "/products/Ust/Adidas-bej1-copy.png",
    category: "tops",
    isNew: false,
    description: "Warm beige heavyweight hoodie with a luxurious brushed interior. The oversized silhouette provides effortless comfort. Perfect for layering in transitional weather.",
    sizes: ["S", "M", "L", "XL"],
    sizeAndFit: "Oversized fit. Model wears size M and is 185cm / 6'1\". Chest: S 108cm, M 114cm, L 120cm, XL 126cm.",
    returns: "Free returns within 30 days. Items must be unworn with original tags attached. Refunds processed within 5-7 business days.",
  },
  {
    id: 7,
    name: "Polo Beyaz Classic",
    price: 129,
    image: "/products/Ust/Lacoste-Polo-Beyaz-copy.png",
    category: "tops",
    isNew: true,
    description: "Timeless white polo in ultra-fine piqué cotton. The classic two-button placket and mother-of-pearl buttons elevate this essential. A refined collar sits perfectly with or without a blazer.",
    sizes: ["S", "M", "L", "XL"],
    sizeAndFit: "Slim fit. Model wears size M and is 183cm / 6'0\". Chest: S 96cm, M 102cm, L 108cm, XL 114cm.",
    returns: "Free returns within 30 days. Items must be unworn with original tags attached. Refunds processed within 5-7 business days.",
  },
  {
    id: 8,
    name: "Polo Bold Green",
    price: 129,
    image: "/products/Ust/Lacoste-Polo-Bold-green1-copy.png",
    category: "tops",
    isNew: false,
    description: "A bold green polo that commands attention. Crafted from premium long-staple cotton for exceptional softness and color retention. Features a ribbed collar and two-button placket.",
    sizes: ["S", "M", "L", "XL"],
    sizeAndFit: "Slim fit. Model wears size M and is 183cm / 6'0\". Chest: S 96cm, M 102cm, L 108cm, XL 114cm.",
    returns: "Free returns within 30 days. Items must be unworn with original tags attached. Refunds processed within 5-7 business days.",
  },
  {
    id: 9,
    name: "Polo Bordo Classic",
    price: 129,
    image: "/products/Ust/Lacoste-Polo-Bordo-1-copy.png",
    category: "tops",
    isNew: false,
    description: "Rich bordeaux polo in signature piqué weave. The deep, saturated color pairs beautifully with neutral tones. Features classic mother-of-pearl buttons and a self-finished hem.",
    sizes: ["S", "M", "L", "XL"],
    sizeAndFit: "Slim fit. Model wears size M and is 183cm / 6'0\". Chest: S 96cm, M 102cm, L 108cm, XL 114cm.",
    returns: "Free returns within 30 days. Items must be unworn with original tags attached. Refunds processed within 5-7 business days.",
  },
  {
    id: 10,
    name: "Polo White Blue",
    price: 129,
    image: "/products/Ust/Lacoste-Polo-White-Blue-1-copy.png",
    category: "tops",
    isNew: false,
    description: "A fresh white and blue polo with contrast detailing. Made from breathable cotton piqué, ideal for warmer days. The subtle color blocking adds a contemporary edge.",
    sizes: ["S", "M", "L", "XL"],
    sizeAndFit: "Regular fit. Model wears size M and is 183cm / 6'0\". Chest: S 98cm, M 104cm, L 110cm, XL 116cm.",
    returns: "Free returns within 30 days. Items must be unworn with original tags attached. Refunds processed within 5-7 business days.",
  },
  {
    id: 11,
    name: "Polo White Green",
    price: 129,
    image: "/products/Ust/Lacoste-Polo-White-Green-1-copy.png",
    category: "tops",
    isNew: true,
    description: "Crisp white polo with vibrant green accents. Premium piqué cotton ensures breathability and comfort. A modern interpretation of a timeless classic.",
    sizes: ["S", "M", "L", "XL"],
    sizeAndFit: "Regular fit. Model wears size M and is 183cm / 6'0\". Chest: S 98cm, M 104cm, L 110cm, XL 116cm.",
    returns: "Free returns within 30 days. Items must be unworn with original tags attached. Refunds processed within 5-7 business days.",
  },
  {
    id: 12,
    name: "Polo Indigo Classic",
    price: 129,
    image: "/products/Ust/Lacoste-Polo-İndigo-1-copy.png",
    category: "tops",
    isNew: false,
    description: "Deep indigo polo with a sophisticated feel. The rich color is achieved through a special dyeing process for lasting vibrancy. Features a structured collar and pearl buttons.",
    sizes: ["S", "M", "L", "XL"],
    sizeAndFit: "Slim fit. Model wears size M and is 183cm / 6'0\". Chest: S 96cm, M 102cm, L 108cm, XL 114cm.",
    returns: "Free returns within 30 days. Items must be unworn with original tags attached. Refunds processed within 5-7 business days.",
  },
];

export function getProduct(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getRelatedProducts(product: Product, count = 3): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, count);
}
