import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, ShoppingBag, Heart, User, Menu, Star, Truck, ShieldCheck, Sparkles, Headphones, ArrowRight, Instagram, Facebook } from "lucide-react";
import hero from "@/assets/hero.jpg";
import catVisage from "@/assets/cat-visage.jpg";
import catMakeup from "@/assets/cat-makeup.jpg";
import catParfum from "@/assets/cat-parfum.jpg";
import catCorps from "@/assets/cat-corps.jpg";
import catCheveux from "@/assets/cat-cheveux.jpg";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Houleye — Cosmétiques premium & soins de beauté" },
      { name: "description", content: "Révélez votre beauté naturelle. Sélection premium de soins du visage, maquillage, parfums et soins corporels." },
      { property: "og:title", content: "Houleye — Cosmétiques premium" },
      { property: "og:description", content: "Soins, maquillage, parfums haut de gamme." },
    ],
  }),
  component: Index,
});

const categories = [
  { name: "Soins du visage", img: catVisage },
  { name: "Maquillage", img: catMakeup },
  { name: "Parfums", img: catParfum },
  { name: "Soins du corps", img: catCorps },
  { name: "Cheveux", img: catCheveux },
];

const products = [
  { name: "Sérum Éclat Or", category: "Soin du visage", price: "48 000", img: p1, tag: "Nouveau" },
  { name: "Rouge Velours Mat", category: "Maquillage", price: "22 000", img: p2, tag: "Best-seller" },
  { name: "Eau de Parfum Solaire", category: "Parfum", price: "65 000", img: p3, tag: null },
  { name: "Crème Riche Nuit", category: "Soin du visage", price: "39 000", img: p4, tag: "-20%" },
];

const advantages = [
  { icon: Truck, title: "Livraison rapide", desc: "Dans toute l'Afrique de l'Ouest sous 48h." },
  { icon: ShieldCheck, title: "Paiement sécurisé", desc: "Carte, Wave, Orange Money, Free Money." },
  { icon: Sparkles, title: "Produits authentiques", desc: "Sélection certifiée par nos experts beauté." },
  { icon: Headphones, title: "Support 24/7", desc: "Une équipe à votre écoute à tout moment." },
];

const reviews = [
  { name: "Aïssatou D.", text: "Le sérum Éclat Or a transformé ma peau en deux semaines. Texture sublime, parfum délicat.", rating: 5 },
  { name: "Mariama S.", text: "Livraison rapide, emballage somptueux. Houleye, c'est une vraie expérience luxe.", rating: 5 },
  { name: "Fatou N.", text: "Le rouge à lèvres tient toute la journée sans dessécher. Je recommande sans hésiter.", rating: 5 },
];

function Index() {
  const [open, setOpen] = useState(false);
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
            <Link to="/boutique" className="hover:text-[color:var(--color-gold)] transition">Boutique</Link>
            <a href="#categories" className="hover:text-[color:var(--color-gold)] transition">Catégories</a>
            <a href="#produits" className="hover:text-[color:var(--color-gold)] transition">Nouveautés</a>
            <a href="#about" className="hover:text-[color:var(--color-gold)] transition">À propos</a>
          </nav>
          <a href="/" className="font-serif text-2xl md:text-3xl tracking-wider">
            Houleye
            <span className="block text-[9px] tracking-[0.4em] uppercase text-muted-foreground -mt-1 text-center font-sans">Beauty Maison</span>
          </a>
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

      {/* Hero */}
      <section className="relative">
        <div className="grid lg:grid-cols-2 min-h-[88vh]">
          <div className="bg-[color:var(--color-cream)] flex items-center justify-center px-6 py-20 lg:py-0 order-2 lg:order-1">
            <div className="max-w-md animate-fade-in">
              <p className="eyebrow mb-6">Édition Automne 2026</p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl leading-[1.02] mb-6">
                Révélez votre <em className="not-italic text-[color:var(--color-gold)]">beauté</em> naturelle
              </h1>
              <p className="text-base text-muted-foreground mb-10 leading-relaxed">
                Découvrez notre sélection de soins et cosmétiques haut de gamme,
                pensés pour célébrer chaque carnation et chaque caractère.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#produits" className="btn-gold">Découvrir la collection</a>
                <a href="#about" className="btn-outline">Notre histoire</a>
              </div>
              <div className="flex items-center gap-6 mt-12 pt-8 border-t border-border">
                <div>
                  <div className="font-serif text-2xl">120k+</div>
                  <div className="text-xs text-muted-foreground tracking-wider uppercase">Clientes</div>
                </div>
                <div className="h-10 w-px bg-border" />
                <div>
                  <div className="font-serif text-2xl">4.9★</div>
                  <div className="text-xs text-muted-foreground tracking-wider uppercase">Avis vérifiés</div>
                </div>
                <div className="h-10 w-px bg-border hidden sm:block" />
                <div className="hidden sm:block">
                  <div className="font-serif text-2xl">340+</div>
                  <div className="text-xs text-muted-foreground tracking-wider uppercase">Références</div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative bg-[color:var(--color-blush)] order-1 lg:order-2 overflow-hidden">
            <img src={hero} alt="Cosmétiques premium Houleye" className="h-full w-full object-cover" width={1600} height={1200} />
            <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 bg-background/90 backdrop-blur p-5 md:p-6 max-w-xs">
              <p className="eyebrow mb-2">Coup de cœur</p>
              <p className="font-serif text-xl mb-3">Rituel Éclat Or — édition limitée</p>
              <Link to="/boutique" className="text-xs tracking-[0.2em] uppercase inline-flex items-center gap-2 hover:text-[color:var(--color-gold)] transition">
                Explorer <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee / Trust */}
      <div className="border-y border-border bg-background py-5 overflow-hidden">
        <div className="container-x flex flex-wrap justify-center md:justify-between items-center gap-6 text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
          <span>Fenty Beauty</span><span>Dior</span><span>Charlotte Tilbury</span><span>Sephora Collection</span><span>Chanel</span><span>YSL Beauty</span>
        </div>
      </div>

      {/* Categories */}
      <section id="categories" className="py-24 md:py-32">
        <div className="container-x">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <p className="eyebrow mb-4">Catégories</p>
              <h2 className="text-4xl md:text-5xl max-w-xl">Tout l'univers Houleye</h2>
            </div>
            <Link to="/boutique" className="text-xs tracking-[0.2em] uppercase inline-flex items-center gap-2 hover:text-[color:var(--color-gold)] transition">
              Voir la boutique <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {categories.map((c) => (
              <Link key={c.name} to="/boutique" className="group block">
                <div className="aspect-[4/5] overflow-hidden bg-[color:var(--color-cream)] mb-4">
                  <img src={c.img} alt={c.name} loading="lazy" width={800} height={1000} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg">{c.name}</h3>
                  <ArrowRight className="h-4 w-4 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section id="produits" className="py-24 md:py-32 bg-[color:var(--color-cream)]">
        <div className="container-x">
          <div className="text-center mb-16">
            <p className="eyebrow mb-4">Sélection signature</p>
            <h2 className="text-4xl md:text-5xl">Produits vedettes</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
            {products.map((p) => (
              <article key={p.name} className="group">
                <div className="relative aspect-square bg-background overflow-hidden mb-5">
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
                  <span className="text-sm font-medium">{p.price} FCFA</span>
                  <div className="flex gap-0.5 text-[color:var(--color-gold)]">
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial split */}
      <section className="py-24 md:py-32">
        <div className="container-x grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="aspect-[4/5] bg-[color:var(--color-blush)] overflow-hidden">
            <img src={catVisage} alt="Rituel Éclat Or" loading="lazy" width={800} height={1000} className="h-full w-full object-cover" />
          </div>
          <div>
            <p className="eyebrow mb-5">L'art du rituel</p>
            <h2 className="text-4xl md:text-5xl mb-6 leading-tight">
              Une beauté qui se cultive, geste après geste.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Chaque produit Houleye est composé d'ingrédients rigoureusement sélectionnés —
              huiles précieuses, actifs botaniques, textures soyeuses — pour transformer
              chaque soin en moment d'élégance pure.
            </p>
            <ul className="space-y-4 mb-10">
              {["Formules clean & cruelty-free", "Conçus pour toutes les carnations", "Packaging éco-responsable"].map((t) => (
                <li key={t} className="flex items-center gap-4 pb-4 border-b border-border">
                  <Sparkles className="h-4 w-4 text-[color:var(--color-gold)]" />
                  <span className="text-sm">{t}</span>
                </li>
              ))}
            </ul>
            <a href="#about" className="btn-outline">Notre engagement</a>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 md:py-32 bg-ink text-cream">
        <div className="container-x">
          <div className="text-center mb-16">
            <p className="eyebrow mb-4" style={{ color: "var(--color-gold)" }}>Témoignages</p>
            <h2 className="text-4xl md:text-5xl text-cream">Elles parlent de Houleye</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-10">
            {reviews.map((r) => (
              <figure key={r.name} className="border border-white/15 p-8 md:p-10">
                <div className="flex gap-1 mb-5 text-[color:var(--color-gold)]">
                  {Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <blockquote className="font-serif text-xl leading-relaxed mb-6">"{r.text}"</blockquote>
                <figcaption className="text-xs tracking-[0.25em] uppercase opacity-70">— {r.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-20 md:py-24">
        <div className="container-x grid grid-cols-2 lg:grid-cols-4 gap-10">
          {advantages.map((a) => (
            <div key={a.title} className="text-center">
              <div className="inline-grid place-items-center h-14 w-14 rounded-full border border-[color:var(--color-gold)] text-[color:var(--color-gold)] mb-5">
                <a.icon className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg mb-2">{a.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 md:py-24 bg-[color:var(--color-blush)]">
        <div className="container-x max-w-2xl text-center">
          <p className="eyebrow mb-4">Le Carnet Houleye</p>
          <h2 className="text-4xl md:text-5xl mb-5">Rituels & exclusivités</h2>
          <p className="text-muted-foreground mb-8">
            Recevez nos conseils beauté, lancements et offres privées. -10% sur votre première commande.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre adresse e-mail"
              className="flex-1 bg-background border border-border px-5 py-3.5 text-sm focus:outline-none focus:border-ink"
            />
            <button type="submit" className="btn-gold">S'abonner</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="bg-ink text-cream pt-20 pb-10">
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
        <div className="container-x border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs opacity-60">
          <p>© 2026 Houleye Beauty Maison. Tous droits réservés.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:opacity-100">Mentions légales</a>
            <a href="#" className="hover:opacity-100">CGV</a>
            <a href="#" className="hover:opacity-100">Confidentialité</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
