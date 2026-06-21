import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, ShoppingBag, Heart, User, Menu, Star, ChevronDown, SlidersHorizontal, X, ArrowRight, Instagram, Facebook, Sparkles } from "lucide-react";
import catVisage from "@/assets/cat-visage.jpg";
import catMakeup from "@/assets/cat-makeup.jpg";
import catParfum from "@/assets/cat-parfum.jpg";
import catCorps from "@/assets/cat-corps.jpg";
import catCheveux from "@/assets/cat-cheveux.jpg";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";

export const Route = createFileRoute("/boutique")({
  head: () => ({
    meta: [
      { title: "Boutique — Houleye Beauty Maison" },
      { name: "description", content: "Explorez toute la boutique Houleye : soins du visage, maquillage, parfums et soins corporels haut de gamme." },
      { property: "og:title", content: "Boutique Houleye — Cosmétiques premium" },
      { property: "og:description", content: "Sélection complète de soins, maquillage et parfums." },
    ],
  }),
  component: Boutique,
});

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  img: string;
  tag?: string | null;
  rating: number;
  brand: string;
};

const ALL_PRODUCTS: Product[] = [
  { id: "1", name: "Sérum Éclat Or", category: "Soins du visage", price: 48000, img: p1, tag: "Nouveau", rating: 5, brand: "Houleye Signature" },
  { id: "2", name: "Rouge Velours Mat", category: "Maquillage", price: 22000, img: p2, tag: "Best-seller", rating: 5, brand: "Houleye" },
  { id: "3", name: "Eau de Parfum Solaire", category: "Parfums", price: 65000, img: p3, rating: 4, brand: "Maison Houleye" },
  { id: "4", name: "Crème Riche Nuit", category: "Soins du visage", price: 39000, oldPrice: 49000, img: p4, tag: "-20%", rating: 5, brand: "Houleye Signature" },
  { id: "5", name: "Huile Précieuse Corps", category: "Soins du corps", price: 28000, img: catCorps, rating: 4, brand: "Houleye" },
  { id: "6", name: "Palette Désert Doré", category: "Maquillage", price: 42000, img: catMakeup, tag: "Édition limitée", rating: 5, brand: "Houleye" },
  { id: "7", name: "Brume Capillaire Soyeuse", category: "Cheveux", price: 19000, img: catCheveux, rating: 4, brand: "Houleye" },
  { id: "8", name: "Parfum Bois de Nuit", category: "Parfums", price: 78000, img: catParfum, tag: "Nouveau", rating: 5, brand: "Maison Houleye" },
  { id: "9", name: "Masque Hydratant Rose", category: "Soins du visage", price: 24000, img: catVisage, rating: 4, brand: "Houleye" },
  { id: "10", name: "Gloss Miel Cuivré", category: "Maquillage", price: 16000, img: p2, rating: 4, brand: "Houleye" },
  { id: "11", name: "Lait Corps Vanille", category: "Soins du corps", price: 21000, img: catCorps, tag: "-15%", oldPrice: 25000, rating: 5, brand: "Houleye" },
  { id: "12", name: "Sérum Cheveux Brillance", category: "Cheveux", price: 23000, img: catCheveux, rating: 4, brand: "Houleye Signature" },
];

const CATEGORIES = ["Soins du visage", "Maquillage", "Parfums", "Soins du corps", "Cheveux"];
const BRANDS = ["Houleye Signature", "Houleye", "Maison Houleye"];

function Boutique() {
  const [open, setOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(80000);
  const [sort, setSort] = useState("featured");

  const toggle = (val: string, list: string[], setter: (v: string[]) => void) =>
    setter(list.includes(val) ? list.filter((v) => v !== val) : [...list, val]);

  const filtered = useMemo(() => {
    let r = ALL_PRODUCTS.filter(
      (p) =>
        (selectedCats.length === 0 || selectedCats.includes(p.category)) &&
        (selectedBrands.length === 0 || selectedBrands.includes(p.brand)) &&
        p.price <= maxPrice,
    );
    if (sort === "price-asc") r = [...r].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") r = [...r].sort((a, b) => b.price - a.price);
    if (sort === "rating") r = [...r].sort((a, b) => b.rating - a.rating);
    return r;
  }, [selectedCats, selectedBrands, maxPrice, sort]);

  const clearAll = () => {
    setSelectedCats([]);
    setSelectedBrands([]);
    setMaxPrice(80000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Announcement */}
      <div className="bg-ink text-cream text-center text-[11px] tracking-[0.25em] uppercase py-2.5">
        Livraison offerte dès 50 000 FCFA · Programme fidélité Houleye
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/85 backdrop-blur border-b border-border">
        <div className="container-x flex items-center justify-between h-20">
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 -ml-2"><Menu className="h-5 w-5" /></button>
          <nav className="hidden md:flex items-center gap-9 text-[12px] tracking-[0.2em] uppercase">
            <Link to="/boutique" className="text-[color:var(--color-gold)]">Boutique</Link>
            <Link to="/" hash="categories" className="hover:text-[color:var(--color-gold)] transition">Catégories</Link>
            <Link to="/" hash="produits" className="hover:text-[color:var(--color-gold)] transition">Nouveautés</Link>
            <Link to="/" hash="about" className="hover:text-[color:var(--color-gold)] transition">À propos</Link>
          </nav>
          <Link to="/" className="font-serif text-2xl md:text-3xl tracking-wider">
            Houleye
            <span className="block text-[9px] tracking-[0.4em] uppercase text-muted-foreground -mt-1 text-center font-sans">Beauty Maison</span>
          </Link>
          <div className="flex items-center gap-4 md:gap-5">
            <button aria-label="Recherche" className="hover:text-[color:var(--color-gold)] transition"><Search className="h-[18px] w-[18px]" /></button>
            <button aria-label="Compte" className="hidden sm:block hover:text-[color:var(--color-gold)] transition"><User className="h-[18px] w-[18px]" /></button>
            <button aria-label="Favoris" className="hidden sm:block hover:text-[color:var(--color-gold)] transition"><Heart className="h-[18px] w-[18px]" /></button>
            <button aria-label="Panier" className="relative hover:text-[color:var(--color-gold)] transition">
              <ShoppingBag className="h-[18px] w-[18px]" />
              <span className="absolute -top-2 -right-2 bg-[color:var(--color-gold)] text-ink text-[10px] rounded-full h-4 w-4 grid place-items-center font-medium">2</span>
            </button>
          </div>
        </div>
      </header>

      {/* Page hero */}
      <section className="bg-[color:var(--color-cream)] py-16 md:py-24">
        <div className="container-x">
          <nav className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-6 flex items-center gap-2">
            <Link to="/" className="hover:text-foreground">Accueil</Link>
            <span>/</span>
            <span className="text-foreground">Boutique</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="eyebrow mb-4">Toute la collection</p>
              <h1 className="text-5xl md:text-6xl max-w-2xl">La boutique Houleye</h1>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              {filtered.length} produits sélectionnés avec soin pour révéler votre éclat naturel.
            </p>
          </div>
        </div>
      </section>

      {/* Category chips */}
      <div className="border-b border-border bg-background">
        <div className="container-x flex gap-2 md:gap-3 overflow-x-auto py-5 no-scrollbar">
          <button
            onClick={() => setSelectedCats([])}
            className={`shrink-0 px-5 py-2.5 text-[11px] tracking-[0.25em] uppercase border transition ${
              selectedCats.length === 0
                ? "bg-ink text-cream border-ink"
                : "border-border hover:border-ink"
            }`}
          >
            Tout
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => toggle(c, selectedCats, setSelectedCats)}
              className={`shrink-0 px-5 py-2.5 text-[11px] tracking-[0.25em] uppercase border transition ${
                selectedCats.includes(c)
                  ? "bg-ink text-cream border-ink"
                  : "border-border hover:border-ink"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Main grid */}
      <section className="py-12 md:py-16">
        <div className="container-x grid lg:grid-cols-[260px_1fr] gap-10 lg:gap-14">
          {/* Sidebar filters */}
          <aside className={`${filtersOpen ? "fixed inset-0 z-50 bg-background overflow-auto p-6" : "hidden"} lg:block lg:static lg:p-0`}>
            <div className="flex items-center justify-between mb-8 lg:mb-10">
              <p className="eyebrow">Filtres</p>
              <button onClick={() => setFiltersOpen(false)} className="lg:hidden p-1"><X className="h-5 w-5" /></button>
            </div>

            <div className="mb-8 pb-8 border-b border-border">
              <h3 className="font-serif text-lg mb-4">Catégorie</h3>
              <div className="space-y-3">
                {CATEGORIES.map((c) => (
                  <label key={c} className="flex items-center gap-3 text-sm cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedCats.includes(c)}
                      onChange={() => toggle(c, selectedCats, setSelectedCats)}
                      className="h-4 w-4 accent-[color:var(--color-gold)]"
                    />
                    <span className="group-hover:text-[color:var(--color-gold)] transition">{c}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-8 pb-8 border-b border-border">
              <h3 className="font-serif text-lg mb-4">Marque</h3>
              <div className="space-y-3">
                {BRANDS.map((b) => (
                  <label key={b} className="flex items-center gap-3 text-sm cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(b)}
                      onChange={() => toggle(b, selectedBrands, setSelectedBrands)}
                      className="h-4 w-4 accent-[color:var(--color-gold)]"
                    />
                    <span className="group-hover:text-[color:var(--color-gold)] transition">{b}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-serif text-lg mb-4">Prix maximum</h3>
              <input
                type="range"
                min={10000}
                max={80000}
                step={1000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[color:var(--color-gold)]"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>10 000 FCFA</span>
                <span className="text-foreground font-medium">{maxPrice.toLocaleString("fr-FR")} FCFA</span>
              </div>
            </div>

            <button onClick={clearAll} className="text-[11px] tracking-[0.25em] uppercase underline underline-offset-4 hover:text-[color:var(--color-gold)]">
              Réinitialiser les filtres
            </button>
          </aside>

          {/* Products */}
          <div>
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-8 pb-5 border-b border-border">
              <button onClick={() => setFiltersOpen(true)} className="lg:hidden inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase">
                <SlidersHorizontal className="h-4 w-4" /> Filtres
              </button>
              <span className="hidden lg:block text-xs text-muted-foreground tracking-wider">
                {filtered.length} résultats
              </span>
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="appearance-none bg-background border border-border pl-4 pr-10 py-2.5 text-[11px] tracking-[0.2em] uppercase cursor-pointer focus:outline-none focus:border-ink"
                >
                  <option value="featured">Tri : Mis en avant</option>
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix décroissant</option>
                  <option value="rating">Mieux notés</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 pointer-events-none" />
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="py-24 text-center">
                <Sparkles className="h-8 w-8 mx-auto mb-5 text-[color:var(--color-gold)]" />
                <h3 className="font-serif text-2xl mb-3">Aucun produit ne correspond</h3>
                <p className="text-muted-foreground mb-6 text-sm">Essayez d'ajuster vos filtres pour voir plus de pépites.</p>
                <button onClick={clearAll} className="btn-outline">Réinitialiser</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
                {filtered.map((p) => (
                  <article key={p.id} className="group">
                    <div className="relative aspect-square bg-[color:var(--color-cream)] overflow-hidden mb-5">
                      {p.tag && (
                        <span className="absolute top-4 left-4 z-10 bg-ink text-cream text-[10px] tracking-[0.2em] uppercase px-3 py-1.5">
                          {p.tag}
                        </span>
                      )}
                      <button aria-label="Ajouter aux favoris" className="absolute top-4 right-4 z-10 h-9 w-9 grid place-items-center bg-background/80 backdrop-blur rounded-full hover:bg-[color:var(--color-gold)] hover:text-ink transition">
                        <Heart className="h-4 w-4" />
                      </button>
                      <img src={p.img} alt={p.name} loading="lazy" width={800} height={800} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <button className="w-full bg-ink text-cream py-3.5 text-[11px] tracking-[0.25em] uppercase hover:bg-[color:var(--color-gold)] hover:text-ink transition">
                          Ajouter au panier
                        </button>
                      </div>
                    </div>
                    <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-1.5">{p.category}</p>
                    <h3 className="font-serif text-lg md:text-xl mb-2">{p.name}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-medium">{p.price.toLocaleString("fr-FR")} FCFA</span>
                        {p.oldPrice && (
                          <span className="text-xs text-muted-foreground line-through">{p.oldPrice.toLocaleString("fr-FR")}</span>
                        )}
                      </div>
                      <div className="flex gap-0.5 text-[color:var(--color-gold)]">
                        {Array.from({ length: p.rating }).map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Pagination */}
            {filtered.length > 0 && (
              <div className="flex items-center justify-center gap-2 mt-16">
                {[1, 2, 3].map((n) => (
                  <button key={n} className={`h-10 w-10 text-sm border ${n === 1 ? "bg-ink text-cream border-ink" : "border-border hover:border-ink"}`}>
                    {n}
                  </button>
                ))}
                <button className="h-10 px-4 text-[11px] tracking-[0.25em] uppercase border border-border hover:border-ink inline-flex items-center gap-2">
                  Suivant <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ink text-cream pt-20 pb-10 mt-10">
        <div className="container-x grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="font-serif text-3xl mb-3">Houleye</div>
            <p className="text-sm opacity-70 leading-relaxed mb-6">
              Maison de beauté indépendante. Soins, maquillage et parfums premium pour révéler toutes les beautés.
            </p>
            <div className="flex gap-3">
              <a href="#" aria-label="Instagram" className="h-9 w-9 grid place-items-center border border-white/20 hover:bg-[color:var(--color-gold)] hover:text-ink hover:border-[color:var(--color-gold)] transition"><Instagram className="h-4 w-4" /></a>
              <a href="#" aria-label="Facebook" className="h-9 w-9 grid place-items-center border border-white/20 hover:bg-[color:var(--color-gold)] hover:text-ink hover:border-[color:var(--color-gold)] transition"><Facebook className="h-4 w-4" /></a>
            </div>
          </div>
          {[
            { title: "Boutique", links: ["Nouveautés", "Best-sellers", "Soins visage", "Maquillage", "Parfums"] },
            { title: "Maison", links: ["Notre histoire", "Engagement qualité", "Carrières", "Presse"] },
            { title: "Service client", links: ["Contact", "Livraison", "Retours", "FAQ", "Programme fidélité"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-serif text-lg mb-5">{col.title}</h4>
              <ul className="space-y-3 text-sm opacity-80">
                {col.links.map((l) => <li key={l}><a href="#" className="hover:text-[color:var(--color-gold)] transition">{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="container-x border-t border-white/10 pt-8 flex flex-col md:flex-row gap-3 justify-between text-xs opacity-60">
          <span>© 2026 Houleye Beauty Maison. Tous droits réservés.</span>
          <span>Mentions légales · CGV · Confidentialité</span>
        </div>
      </footer>
    </div>
  );
}
