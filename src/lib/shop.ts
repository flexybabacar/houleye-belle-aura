import { useEffect, useState, useCallback } from "react";
import catVisage from "@/assets/cat-visage.jpg";
import catMakeup from "@/assets/cat-makeup.jpg";
import catParfum from "@/assets/cat-parfum.jpg";
import catCorps from "@/assets/cat-corps.jpg";
import catCheveux from "@/assets/cat-cheveux.jpg";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  img: string;
  tag?: string | null;
  rating: number;
  brand: string;
  description?: string;
};

export const PRODUCTS: Product[] = [
  { id: "1", name: "Sérum Éclat Or", category: "Soins du visage", price: 48000, img: p1, tag: "Nouveau", rating: 5, brand: "Houleye Signature", description: "Un sérum précieux infusé de particules d'or 24K pour révéler un teint lumineux et unifié dès la première application." },
  { id: "2", name: "Rouge Velours Mat", category: "Maquillage", price: 22000, img: p2, tag: "Best-seller", rating: 5, brand: "Houleye", description: "Texture crémeuse, tenue 12h. Une couleur intense et confortable pour des lèvres veloutées." },
  { id: "3", name: "Eau de Parfum Solaire", category: "Parfums", price: 65000, img: p3, rating: 4, brand: "Maison Houleye", description: "Une fragrance chaude et lumineuse — notes de tubéreuse, vanille bourbon et bois ambré." },
  { id: "4", name: "Crème Riche Nuit", category: "Soins du visage", price: 39000, oldPrice: 49000, img: p4, tag: "-20%", rating: 5, brand: "Houleye Signature", description: "Soin de nuit nourrissant à l'huile d'argan et beurre de karité, pour une peau repulpée au réveil." },
  { id: "5", name: "Huile Précieuse Corps", category: "Soins du corps", price: 28000, img: catCorps, rating: 4, brand: "Houleye", description: "Une huile sèche multi-usages qui sublime la peau d'un voile satiné et délicatement parfumé." },
  { id: "6", name: "Palette Désert Doré", category: "Maquillage", price: 42000, img: catMakeup, tag: "Édition limitée", rating: 5, brand: "Houleye", description: "12 teintes inspirées du sable, du cuivre et de l'or. Finis mats, satinés et métallisés." },
  { id: "7", name: "Brume Capillaire Soyeuse", category: "Cheveux", price: 19000, img: catCheveux, rating: 4, brand: "Houleye", description: "Une brume légère qui parfume, démêle et apporte brillance aux cheveux." },
  { id: "8", name: "Parfum Bois de Nuit", category: "Parfums", price: 78000, img: catParfum, tag: "Nouveau", rating: 5, brand: "Maison Houleye", description: "Sillage envoûtant de oud, cèdre et patchouli pour une signature mystérieuse." },
  { id: "9", name: "Masque Hydratant Rose", category: "Soins du visage", price: 24000, img: catVisage, rating: 4, brand: "Houleye", description: "Un masque-confort à la rose de Damas pour réhydrater et apaiser en 10 minutes." },
  { id: "10", name: "Gloss Miel Cuivré", category: "Maquillage", price: 16000, img: p2, rating: 4, brand: "Houleye", description: "Un gloss non-collant aux reflets miel-cuivré, infusé d'huile de jojoba." },
  { id: "11", name: "Lait Corps Vanille", category: "Soins du corps", price: 21000, oldPrice: 25000, img: catCorps, tag: "-15%", rating: 5, brand: "Houleye", description: "Lait fondant à la vanille de Madagascar, hydratation 24h." },
  { id: "12", name: "Sérum Cheveux Brillance", category: "Cheveux", price: 23000, img: catCheveux, rating: 4, brand: "Houleye Signature", description: "Soin sans rinçage qui discipline, fait briller et protège de la chaleur jusqu'à 230°C." },
];

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);

export const formatPrice = (n: number) => `${n.toLocaleString("fr-FR")} FCFA`;

// ---- Cart (localStorage based) ----
export type CartItem = { id: string; qty: number };
const CART_KEY = "houleye-cart";
const EVT = "houleye-cart-change";

function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); } catch { return []; }
}
function writeCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(EVT));
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  useEffect(() => {
    setItems(readCart());
    const h = () => setItems(readCart());
    window.addEventListener(EVT, h);
    window.addEventListener("storage", h);
    return () => { window.removeEventListener(EVT, h); window.removeEventListener("storage", h); };
  }, []);
  const add = useCallback((id: string, qty = 1) => {
    const cur = readCart();
    const ex = cur.find((c) => c.id === id);
    if (ex) ex.qty += qty; else cur.push({ id, qty });
    writeCart(cur);
  }, []);
  const setQty = useCallback((id: string, qty: number) => {
    const cur = readCart().map((c) => c.id === id ? { ...c, qty } : c).filter((c) => c.qty > 0);
    writeCart(cur);
  }, []);
  const remove = useCallback((id: string) => writeCart(readCart().filter((c) => c.id !== id)), []);
  const clear = useCallback(() => writeCart([]), []);
  const count = items.reduce((s, i) => s + i.qty, 0);
  const detailed = items.map((i) => ({ ...i, product: getProduct(i.id)! })).filter((i) => i.product);
  const subtotal = detailed.reduce((s, i) => s + i.product.price * i.qty, 0);
  return { items, detailed, count, subtotal, add, setQty, remove, clear };
}
