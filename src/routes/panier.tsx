import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { useCart, formatPrice } from "@/lib/shop";

export const Route = createFileRoute("/panier")({
  head: () => ({
    meta: [
      { title: "Panier — Houleye" },
      { name: "description", content: "Consultez votre panier Houleye Beauty." },
    ],
  }),
  component: PanierPage,
});

function PanierPage() {
  const { detailed, subtotal, setQty, remove } = useCart();
  const shipping = subtotal >= 50000 || subtotal === 0 ? 0 : 3500;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container-x py-12">
        <h1 className="text-4xl md:text-5xl font-serif mb-2">Mon panier</h1>
        <p className="text-muted-foreground mb-10">{detailed.length} article{detailed.length > 1 ? "s" : ""}</p>

        {detailed.length === 0 ? (
          <div className="text-center py-24 border border-border">
            <ShoppingBag className="size-12 mx-auto text-[color:var(--gold)] mb-4" />
            <p className="text-lg font-serif mb-2">Votre panier est vide</p>
            <p className="text-sm text-muted-foreground mb-6">Découvrez nos rituels signature.</p>
            <Link to="/boutique" className="btn-gold inline-block">Explorer la boutique</Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_400px] gap-10">
            <div className="space-y-4">
              {detailed.map((i) => (
                <div key={i.id} className="flex gap-4 border border-border p-4">
                  <Link to="/produit/$id" params={{ id: i.id }} className="size-28 bg-[color:var(--cream)] shrink-0">
                    <img src={i.product.img} alt={i.product.name} className="size-full object-cover" />
                  </Link>
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between gap-3">
                      <div>
                        <div className="text-xs text-muted-foreground">{i.product.category}</div>
                        <Link to="/produit/$id" params={{ id: i.id }} className="font-serif text-lg">{i.product.name}</Link>
                      </div>
                      <button onClick={() => remove(i.id)} className="text-muted-foreground hover:text-foreground" aria-label="Retirer"><X className="size-4" /></button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center border border-border">
                        <button onClick={() => setQty(i.id, i.qty - 1)} className="p-2"><Minus className="size-3" /></button>
                        <span className="w-8 text-center text-sm">{i.qty}</span>
                        <button onClick={() => setQty(i.id, i.qty + 1)} className="p-2"><Plus className="size-3" /></button>
                      </div>
                      <div className="font-serif">{formatPrice(i.product.price * i.qty)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="bg-[color:var(--cream)] p-6 h-fit">
              <h2 className="font-serif text-2xl mb-5">Récapitulatif</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Sous-total</span><span>{formatPrice(subtotal)}</span></div>
                <div className="flex justify-between"><span>Livraison</span><span>{shipping === 0 ? "Offerte" : formatPrice(shipping)}</span></div>
              </div>
              <div className="border-t border-border my-4" />
              <div className="flex justify-between font-serif text-xl mb-6"><span>Total</span><span>{formatPrice(total)}</span></div>
              <Link to="/checkout" className="btn-gold w-full block text-center">Passer la commande</Link>
              <Link to="/boutique" className="block text-center mt-3 text-sm text-muted-foreground hover:text-foreground">← Continuer mes achats</Link>
              <div className="mt-6 pt-5 border-t border-border text-xs text-muted-foreground">
                <div className="mb-1">✓ Livraison offerte dès 50 000 FCFA</div>
                <div className="mb-1">✓ Paiement 100% sécurisé</div>
                <div>✓ Retours sous 30 jours</div>
              </div>
            </aside>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
