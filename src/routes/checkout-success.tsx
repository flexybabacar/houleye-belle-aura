import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Package, Mail } from "lucide-react";
import { z } from "zod";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/checkout-success")({
  validateSearch: z.object({ id: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Commande confirmée — Houleye" },
      { name: "description", content: "Merci pour votre commande chez Houleye Beauty." },
    ],
  }),
  component: SuccessPage,
});

function SuccessPage() {
  const { id } = Route.useSearch();
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container-x py-20">
        <div className="max-w-xl mx-auto text-center">
          <div className="inline-flex items-center justify-center size-20 rounded-full bg-[color:var(--cream)] mb-6">
            <CheckCircle2 className="size-10 text-[color:var(--gold)]" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl mb-3">Merci pour votre commande</h1>
          <p className="text-muted-foreground mb-2">Votre paiement a été reçu avec succès.</p>
          {id && <p className="text-sm">Référence : <span className="font-medium tracking-wider">{id}</span></p>}

          <div className="grid sm:grid-cols-2 gap-4 mt-10 text-left">
            <div className="border border-border p-5">
              <Mail className="size-5 text-[color:var(--gold)] mb-2" />
              <div className="font-serif text-lg mb-1">Confirmation envoyée</div>
              <p className="text-sm text-muted-foreground">Un email récapitulatif vous a été adressé avec votre facture.</p>
            </div>
            <div className="border border-border p-5">
              <Package className="size-5 text-[color:var(--gold)] mb-2" />
              <div className="font-serif text-lg mb-1">Préparation soignée</div>
              <p className="text-sm text-muted-foreground">Votre commande est emballée à la main et expédiée sous 24h.</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-10">
            <Link to="/boutique" className="btn-gold">Continuer mes achats</Link>
            <Link to="/compte" className="btn-outline">Voir mes commandes</Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
