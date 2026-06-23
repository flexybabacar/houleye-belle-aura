import { createFileRoute, Link, useParams, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Star, Heart, Truck, ShieldCheck, RotateCcw, Minus, Plus, Check } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { PRODUCTS, getProduct, formatPrice, useCart } from "@/lib/shop";

export const Route = createFileRoute("/produit/$id")({
  head: ({ params }) => {
    const p = getProduct(params.id);
    return {
      meta: [
        { title: p ? `${p.name} — Houleye` : "Produit — Houleye" },
        { name: "description", content: p?.description ?? "Produit Houleye Beauty." },
        { property: "og:title", content: p?.name ?? "Houleye" },
        { property: "og:description", content: p?.description ?? "" },
      ],
    };
  },
  component: ProduitPage,
});

function ProduitPage() {
  const { id } = useParams({ from: "/produit/$id" });
  const product = getProduct(id);
  const { add } = useCart();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="container-x py-24 text-center flex-1">
          <h1 className="text-3xl font-serif mb-3">Produit introuvable</h1>
          <Link to="/boutique" className="btn-gold inline-block mt-4">Retour à la boutique</Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container-x py-6 text-xs text-muted-foreground">
          <Link to="/">Accueil</Link> / <Link to="/boutique">Boutique</Link> / <span className="text-foreground">{product.name}</span>
        </div>
        <section className="container-x grid md:grid-cols-2 gap-12 pb-16">
          <div className="bg-[color:var(--cream)] aspect-square overflow-hidden">
            <img src={product.img} alt={product.name} className="size-full object-cover" />
          </div>
          <div>
            <div className="eyebrow text-[color:var(--gold)] mb-2">{product.category}</div>
            <h1 className="text-4xl md:text-5xl font-serif mb-3">{product.name}</h1>
            <div className="flex items-center gap-2 mb-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`size-4 ${i < product.rating ? "fill-[color:var(--gold)] text-[color:var(--gold)]" : "text-muted-foreground"}`} />
              ))}
              <span className="text-xs text-muted-foreground">(128 avis)</span>
            </div>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-serif">{formatPrice(product.price)}</span>
              {product.oldPrice && <span className="text-muted-foreground line-through">{formatPrice(product.oldPrice)}</span>}
            </div>
            <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-border">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-3"><Minus className="size-4" /></button>
                <span className="w-10 text-center">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="p-3"><Plus className="size-4" /></button>
              </div>
              <button
                onClick={() => { add(product.id, qty); setAdded(true); setTimeout(() => setAdded(false), 1800); }}
                className="btn-gold flex-1 flex items-center justify-center gap-2"
              >
                {added ? (<><Check className="size-4" /> Ajouté au panier</>) : "Ajouter au panier"}
              </button>
              <button className="p-3 border border-border" aria-label="Favoris"><Heart className="size-5" /></button>
            </div>

            <button
              onClick={() => { add(product.id, qty); navigate({ to: "/checkout" }); }}
              className="btn-outline w-full mb-8"
            >
              Acheter maintenant
            </button>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border text-xs text-muted-foreground">
              <div className="flex flex-col items-center text-center gap-1"><Truck className="size-5 text-[color:var(--gold)]" />Livraison offerte dès 50 000 FCFA</div>
              <div className="flex flex-col items-center text-center gap-1"><ShieldCheck className="size-5 text-[color:var(--gold)]" />Paiement sécurisé</div>
              <div className="flex flex-col items-center text-center gap-1"><RotateCcw className="size-5 text-[color:var(--gold)]" />Retours sous 30 jours</div>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="container-x pb-20">
            <h2 className="text-3xl font-serif mb-8">Vous pourriez aussi aimer</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((p) => (
                <Link key={p.id} to="/produit/$id" params={{ id: p.id }} className="group">
                  <div className="aspect-square bg-[color:var(--cream)] overflow-hidden mb-3">
                    <img src={p.img} alt={p.name} className="size-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="text-sm">{p.name}</div>
                  <div className="text-sm text-muted-foreground">{formatPrice(p.price)}</div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
