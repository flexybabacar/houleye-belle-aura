import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Lock, CreditCard, Smartphone, Wallet, Check } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { useCart, formatPrice } from "@/lib/shop";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Paiement — Houleye" },
      { name: "description", content: "Finalisez votre commande Houleye en toute sécurité." },
    ],
  }),
  component: CheckoutPage,
});

type PayMethod = "card" | "mobile" | "cod";

function CheckoutPage() {
  const { detailed, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const shipping = subtotal >= 50000 || subtotal === 0 ? 0 : 3500;
  const total = subtotal + shipping;
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [pay, setPay] = useState<PayMethod>("card");
  const [loading, setLoading] = useState(false);
  const [contact, setContact] = useState({ email: "", firstName: "", lastName: "", phone: "", address: "", city: "Dakar", country: "Sénégal" });

  if (detailed.length === 0 && !loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="container-x flex-1 py-24 text-center">
          <h1 className="font-serif text-3xl mb-3">Aucun article à régler</h1>
          <Link to="/boutique" className="btn-gold inline-block mt-4">Retour à la boutique</Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const orderId = "HLY-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    setTimeout(() => {
      try { localStorage.setItem("houleye-last-order", JSON.stringify({ id: orderId, total, items: detailed.length, method: pay, email: contact.email })); } catch { /* ignore */ }
      clear();
      navigate({ to: "/checkout/succes", search: { id: orderId } });
    }, 1600);
  };

  const stepBadge = (n: 1 | 2 | 3, label: string) => (
    <div className="flex items-center gap-2">
      <div className={`size-7 rounded-full flex items-center justify-center text-xs ${step >= n ? "bg-[color:var(--gold)] text-[color:var(--ink)]" : "bg-muted text-muted-foreground"}`}>
        {step > n ? <Check className="size-3.5" /> : n}
      </div>
      <span className={step >= n ? "text-foreground" : "text-muted-foreground"}>{label}</span>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container-x py-10">
        <h1 className="font-serif text-4xl mb-2">Finaliser ma commande</h1>
        <div className="flex items-center gap-6 text-sm mb-10 flex-wrap">
          {stepBadge(1, "Informations")}
          <div className="h-px w-12 bg-border" />
          {stepBadge(2, "Livraison")}
          <div className="h-px w-12 bg-border" />
          {stepBadge(3, "Paiement")}
        </div>

        <form onSubmit={onSubmit} className="grid lg:grid-cols-[1fr_420px] gap-10">
          <div className="space-y-8">
            <section className="border border-border p-6">
              <h2 className="font-serif text-xl mb-5">1. Vos informations</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Email" type="email" required value={contact.email} onChange={(v) => setContact({ ...contact, email: v })} className="sm:col-span-2" />
                <Field label="Prénom" required value={contact.firstName} onChange={(v) => setContact({ ...contact, firstName: v })} />
                <Field label="Nom" required value={contact.lastName} onChange={(v) => setContact({ ...contact, lastName: v })} />
                <Field label="Téléphone" required value={contact.phone} onChange={(v) => setContact({ ...contact, phone: v })} className="sm:col-span-2" />
              </div>
              {step === 1 && (
                <button type="button" onClick={() => setStep(2)} className="btn-gold mt-5">Continuer vers la livraison</button>
              )}
            </section>

            {step >= 2 && (
              <section className="border border-border p-6">
                <h2 className="font-serif text-xl mb-5">2. Adresse de livraison</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Adresse" required value={contact.address} onChange={(v) => setContact({ ...contact, address: v })} className="sm:col-span-2" />
                  <Field label="Ville" required value={contact.city} onChange={(v) => setContact({ ...contact, city: v })} />
                  <Field label="Pays" required value={contact.country} onChange={(v) => setContact({ ...contact, country: v })} />
                </div>
                <div className="mt-5 space-y-2 text-sm">
                  <label className="flex items-center justify-between border border-border p-3 cursor-pointer">
                    <span>Livraison standard (3–5 jours)</span>
                    <span>{shipping === 0 ? "Offerte" : formatPrice(shipping)}</span>
                  </label>
                </div>
                {step === 2 && (
                  <button type="button" onClick={() => setStep(3)} className="btn-gold mt-5">Continuer vers le paiement</button>
                )}
              </section>
            )}

            {step >= 3 && (
              <section className="border border-border p-6">
                <h2 className="font-serif text-xl mb-5 flex items-center gap-2"><Lock className="size-4 text-[color:var(--gold)]" />3. Paiement sécurisé</h2>
                <div className="grid sm:grid-cols-3 gap-3 mb-5">
                  <PayChoice icon={<CreditCard className="size-5" />} label="Carte bancaire" value="card" current={pay} onChange={setPay} />
                  <PayChoice icon={<Smartphone className="size-5" />} label="Mobile money" value="mobile" current={pay} onChange={setPay} />
                  <PayChoice icon={<Wallet className="size-5" />} label="À la livraison" value="cod" current={pay} onChange={setPay} />
                </div>

                {pay === "card" && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Nom sur la carte" required className="sm:col-span-2" />
                    <Field label="Numéro de carte" placeholder="0000 0000 0000 0000" required className="sm:col-span-2" />
                    <Field label="Expiration" placeholder="MM/AA" required />
                    <Field label="CVC" placeholder="123" required />
                  </div>
                )}
                {pay === "mobile" && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2 text-sm text-muted-foreground">Vous recevrez une notification Wave / Orange Money pour valider le paiement.</div>
                    <Field label="Numéro mobile money" required placeholder="+221 ..." className="sm:col-span-2" />
                  </div>
                )}
                {pay === "cod" && (
                  <div className="text-sm text-muted-foreground">Payez en espèces à la réception de votre commande. Disponible uniquement à Dakar.</div>
                )}

                <button type="submit" disabled={loading} className="btn-gold w-full mt-6 disabled:opacity-60">
                  {loading ? "Traitement..." : `Payer ${formatPrice(total)}`}
                </button>
                <p className="text-xs text-muted-foreground text-center mt-3 flex items-center justify-center gap-1.5">
                  <Lock className="size-3" /> Transaction chiffrée SSL · Vos données sont protégées
                </p>
              </section>
            )}
          </div>

          <aside className="bg-[color:var(--cream)] p-6 h-fit lg:sticky lg:top-24">
            <h2 className="font-serif text-2xl mb-5">Votre commande</h2>
            <div className="space-y-4 max-h-80 overflow-auto pr-1">
              {detailed.map((i) => (
                <div key={i.id} className="flex gap-3 items-center">
                  <div className="size-14 bg-white shrink-0 relative">
                    <img src={i.product.img} alt={i.product.name} className="size-full object-cover" />
                    <span className="absolute -top-2 -right-2 bg-[color:var(--ink)] text-white text-[10px] size-5 rounded-full flex items-center justify-center">{i.qty}</span>
                  </div>
                  <div className="flex-1 text-sm">{i.product.name}</div>
                  <div className="text-sm">{formatPrice(i.product.price * i.qty)}</div>
                </div>
              ))}
            </div>
            <div className="border-t border-border my-4" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Sous-total</span><span>{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between"><span>Livraison</span><span>{shipping === 0 ? "Offerte" : formatPrice(shipping)}</span></div>
            </div>
            <div className="border-t border-border my-4" />
            <div className="flex justify-between font-serif text-xl"><span>Total</span><span>{formatPrice(total)}</span></div>
          </aside>
        </form>
      </main>
      <SiteFooter />
    </div>
  );
}

function Field({ label, value, onChange, type = "text", required, placeholder, className = "" }: { label: string; value?: string; onChange?: (v: string) => void; type?: string; required?: boolean; placeholder?: string; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-xs text-muted-foreground mb-1">{label}{required && " *"}</span>
      <input type={type} value={value} onChange={(e) => onChange?.(e.target.value)} required={required} placeholder={placeholder} className="w-full border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:border-[color:var(--gold)]" />
    </label>
  );
}

function PayChoice({ icon, label, value, current, onChange }: { icon: React.ReactNode; label: string; value: PayMethod; current: PayMethod; onChange: (v: PayMethod) => void }) {
  const active = current === value;
  return (
    <button type="button" onClick={() => onChange(value)} className={`border p-4 flex flex-col items-center gap-2 text-sm transition ${active ? "border-[color:var(--gold)] bg-[color:var(--cream)]" : "border-border hover:border-foreground/40"}`}>
      {icon}
      <span>{label}</span>
    </button>
  );
}
