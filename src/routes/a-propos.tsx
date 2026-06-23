import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Leaf, Heart, Award } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import hero from "@/assets/hero.jpg";
import catVisage from "@/assets/cat-visage.jpg";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "Notre maison — Houleye Beauty" },
      { name: "description", content: "L'histoire de Houleye : une maison de beauté inspirée des rituels africains et de l'élégance contemporaine." },
      { property: "og:title", content: "L'histoire Houleye" },
      { property: "og:description", content: "Rituels, savoir-faire et engagement d'une maison de beauté premium." },
      { property: "og:image", content: hero },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="relative h-[60vh] min-h-[420px] grid place-items-center text-center text-[color:var(--cream)]">
          <img src={hero} alt="Houleye" className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-0 bg-[color:var(--ink)]/55" />
          <div className="relative max-w-2xl px-6">
            <div className="eyebrow text-[color:var(--gold)] mb-3">Notre maison</div>
            <h1 className="font-serif text-5xl md:text-6xl mb-5">L'élégance comme rituel</h1>
            <p className="text-white/80">Houleye est née d'une conviction : la beauté est un geste quotidien, un héritage et une émotion partagée.</p>
          </div>
        </section>

        <section className="container-x py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="eyebrow text-[color:var(--gold)] mb-3">Notre histoire</div>
            <h2 className="font-serif text-4xl mb-5">Une maison enracinée, un regard contemporain</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Fondée à Dakar, Houleye réinvente les rituels de beauté africains avec une exigence digne des grandes maisons européennes.</p>
              <p>Chaque formule est élaborée avec des actifs précieux — huile de baobab, beurre de karité, fleur d'hibiscus — sublimés par les dernières innovations cosmétiques.</p>
              <p>Nos collections, pensées pour toutes les carnations, célèbrent la pluralité des beautés.</p>
            </div>
          </div>
          <div className="aspect-[4/5] overflow-hidden">
            <img src={catVisage} alt="Atelier Houleye" className="size-full object-cover" />
          </div>
        </section>

        <section className="bg-[color:var(--cream)] py-20">
          <div className="container-x">
            <div className="text-center mb-12">
              <div className="eyebrow text-[color:var(--gold)] mb-3">Nos engagements</div>
              <h2 className="font-serif text-4xl">Une beauté plus consciente</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: <Leaf />, t: "Formules clean", d: "Sans parabens, sulfates ni silicones controversés." },
                { icon: <Heart />, t: "Cruelty free", d: "Aucun test sur les animaux, à toutes les étapes." },
                { icon: <Sparkles />, t: "Actifs nobles", d: "Sourcing rigoureux d'ingrédients africains d'exception." },
                { icon: <Award />, t: "Made with care", d: "Conçu et assemblé à Dakar avec passion." },
              ].map((v) => (
                <div key={v.t} className="bg-background p-6 text-center">
                  <div className="inline-flex size-12 rounded-full bg-[color:var(--cream)] items-center justify-center text-[color:var(--gold)] mb-4">{v.icon}</div>
                  <div className="font-serif text-xl mb-2">{v.t}</div>
                  <p className="text-sm text-muted-foreground">{v.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container-x py-20 text-center">
          <h2 className="font-serif text-4xl mb-4">Rejoignez la maison</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-7">Découvrez les rituels qui ont conquis plus de 120 000 clientes à travers le monde.</p>
          <Link to="/boutique" className="btn-gold inline-block">Découvrir la boutique</Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
