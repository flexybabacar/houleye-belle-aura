import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Mail, Phone, MapPin, Clock, Check } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Houleye Beauty Maison" },
      { name: "description", content: "Une question ? L'équipe Houleye vous répond avec attention." },
      { property: "og:title", content: "Contact — Houleye" },
      { property: "og:description", content: "Nous écrire, nous appeler, nous rencontrer." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent) => { e.preventDefault(); setSent(true); };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-[color:var(--cream)] py-20 text-center">
          <div className="eyebrow text-[color:var(--gold)] mb-3">Contact</div>
          <h1 className="font-serif text-5xl md:text-6xl mb-4">Parlons beauté</h1>
          <p className="max-w-xl mx-auto text-muted-foreground">Notre équipe d'experts est à votre écoute pour vous conseiller, vous accompagner et créer un rituel à votre image.</p>
        </section>

        <section className="container-x py-16 grid lg:grid-cols-[1fr_1fr] gap-12">
          <div>
            <h2 className="font-serif text-3xl mb-6">Nous écrire</h2>
            {sent ? (
              <div className="border border-[color:var(--gold)] bg-[color:var(--cream)] p-8 text-center">
                <Check className="size-10 mx-auto text-[color:var(--gold)] mb-3" />
                <div className="font-serif text-2xl mb-2">Message reçu</div>
                <p className="text-sm text-muted-foreground">Nous vous répondons sous 24 heures.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Prénom" required />
                  <Input label="Nom" required />
                </div>
                <Input label="Email" type="email" required />
                <Input label="Sujet" required />
                <label className="block">
                  <span className="block text-xs text-muted-foreground mb-1">Message *</span>
                  <textarea required rows={6} className="w-full border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:border-[color:var(--gold)]" />
                </label>
                <button className="btn-gold">Envoyer le message</button>
              </form>
            )}
          </div>

          <div className="space-y-6">
            <h2 className="font-serif text-3xl mb-2">Notre maison</h2>
            <InfoRow icon={<MapPin className="size-5" />} title="Boutique flagship" lines={["12 rue des Almadies", "Dakar, Sénégal"]} />
            <InfoRow icon={<Mail className="size-5" />} title="Email" lines={["bonjour@houleye.beauty", "presse@houleye.beauty"]} />
            <InfoRow icon={<Phone className="size-5" />} title="Téléphone" lines={["+221 33 000 00 00", "Service client 7j/7"]} />
            <InfoRow icon={<Clock className="size-5" />} title="Horaires" lines={["Lun – Sam : 10h – 20h", "Dimanche : 14h – 19h"]} />

            <div className="aspect-[4/3] bg-[color:var(--cream)] mt-6 grid place-items-center text-muted-foreground text-sm">
              Plan de la boutique
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function InfoRow({ icon, title, lines }: { icon: React.ReactNode; title: string; lines: string[] }) {
  return (
    <div className="flex gap-4 border-b border-border pb-5">
      <div className="text-[color:var(--gold)] mt-1">{icon}</div>
      <div>
        <div className="font-serif text-lg">{title}</div>
        {lines.map((l) => <div key={l} className="text-sm text-muted-foreground">{l}</div>)}
      </div>
    </div>
  );
}

function Input({ label, ...rest }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="block text-xs text-muted-foreground mb-1">{label}{rest.required && " *"}</span>
      <input {...rest} className="w-full border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:border-[color:var(--gold)]" />
    </label>
  );
}
