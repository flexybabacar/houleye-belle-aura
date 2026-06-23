import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { User, Package, Heart, MapPin, LogOut, Sparkles } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/compte")({
  head: () => ({
    meta: [
      { title: "Mon compte — Houleye" },
      { name: "description", content: "Accédez à votre espace Houleye : commandes, favoris, programme fidélité." },
    ],
  }),
  component: ComptePage,
});

type Tab = "profil" | "commandes" | "favoris" | "adresses" | "fidelite";

function ComptePage() {
  const [tab, setTab] = useState<Tab>("profil");
  const [logged, setLogged] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  if (!logged) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 container-x py-16">
          <div className="max-w-md mx-auto">
            <h1 className="font-serif text-4xl text-center mb-2">{authMode === "login" ? "Connexion" : "Créer un compte"}</h1>
            <p className="text-center text-muted-foreground mb-8 text-sm">Rejoignez la maison Houleye et profitez d'avantages exclusifs.</p>
            <form onSubmit={(e) => { e.preventDefault(); setLogged(true); }} className="space-y-4 border border-border p-6">
              {authMode === "signup" && (
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Prénom" required />
                  <Input label="Nom" required />
                </div>
              )}
              <Input label="Email" type="email" required />
              <Input label="Mot de passe" type="password" required />
              <button className="btn-gold w-full">{authMode === "login" ? "Se connecter" : "Créer mon compte"}</button>
              <button type="button" className="btn-outline w-full">Continuer avec Google</button>
            </form>
            <p className="text-center text-sm text-muted-foreground mt-5">
              {authMode === "login" ? "Pas encore de compte ?" : "Déjà cliente ?"}{" "}
              <button onClick={() => setAuthMode(authMode === "login" ? "signup" : "login")} className="text-[color:var(--gold)] underline">
                {authMode === "login" ? "Créer un compte" : "Se connecter"}
              </button>
            </p>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "profil", label: "Profil", icon: <User className="size-4" /> },
    { id: "commandes", label: "Commandes", icon: <Package className="size-4" /> },
    { id: "favoris", label: "Favoris", icon: <Heart className="size-4" /> },
    { id: "adresses", label: "Adresses", icon: <MapPin className="size-4" /> },
    { id: "fidelite", label: "Fidélité", icon: <Sparkles className="size-4" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container-x py-12">
        <h1 className="font-serif text-4xl mb-1">Bonjour, Houleye</h1>
        <p className="text-muted-foreground mb-10">Bienvenue dans votre espace personnel.</p>

        <div className="grid lg:grid-cols-[260px_1fr] gap-8">
          <aside className="border border-border p-2 h-fit">
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)} className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition ${tab === t.id ? "bg-[color:var(--cream)] text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                {t.icon}{t.label}
              </button>
            ))}
            <button onClick={() => setLogged(false)} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-foreground border-t border-border mt-2">
              <LogOut className="size-4" />Déconnexion
            </button>
          </aside>

          <section className="border border-border p-8 min-h-[420px]">
            {tab === "profil" && (
              <div>
                <h2 className="font-serif text-2xl mb-6">Informations personnelles</h2>
                <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
                  <Input label="Prénom" defaultValue="Houleye" />
                  <Input label="Nom" defaultValue="Diop" />
                  <Input label="Email" defaultValue="houleye@maison.sn" className="sm:col-span-2" />
                  <Input label="Téléphone" defaultValue="+221 77 000 00 00" className="sm:col-span-2" />
                </div>
                <button className="btn-gold mt-6">Enregistrer</button>
              </div>
            )}
            {tab === "commandes" && (
              <div>
                <h2 className="font-serif text-2xl mb-6">Mes commandes</h2>
                <div className="space-y-3">
                  {[{ id: "HLY-AX12K9", date: "12 mars 2025", total: "84 000 FCFA", status: "Livrée" },
                    { id: "HLY-PQ73B2", date: "28 février 2025", total: "42 000 FCFA", status: "En cours" }].map((o) => (
                    <div key={o.id} className="border border-border p-4 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="font-medium">{o.id}</div>
                        <div className="text-xs text-muted-foreground">{o.date}</div>
                      </div>
                      <div className="text-sm">{o.total}</div>
                      <span className="text-xs px-2 py-1 bg-[color:var(--cream)] border border-border">{o.status}</span>
                      <button className="text-sm underline">Détails</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {tab === "favoris" && (
              <div className="text-center py-12">
                <Heart className="size-10 mx-auto text-[color:var(--gold)] mb-4" />
                <p className="text-muted-foreground mb-5">Vous n'avez encore aucun favori.</p>
                <Link to="/boutique" className="btn-gold inline-block">Explorer la boutique</Link>
              </div>
            )}
            {tab === "adresses" && (
              <div>
                <h2 className="font-serif text-2xl mb-6">Mes adresses</h2>
                <div className="border border-border p-5 max-w-md">
                  <div className="text-sm font-medium mb-1">Domicile</div>
                  <p className="text-sm text-muted-foreground">Houleye Diop<br />12 rue des Almadies<br />Dakar, Sénégal</p>
                  <div className="mt-3 flex gap-3 text-sm"><button className="underline">Modifier</button><button className="underline text-muted-foreground">Supprimer</button></div>
                </div>
                <button className="btn-outline mt-5">+ Ajouter une adresse</button>
              </div>
            )}
            {tab === "fidelite" && (
              <div>
                <h2 className="font-serif text-2xl mb-2">Programme fidélité</h2>
                <p className="text-sm text-muted-foreground mb-6">Cumulez des points à chaque achat et débloquez des cadeaux exclusifs.</p>
                <div className="bg-gradient-to-br from-[color:var(--cream)] to-[color:var(--blush)] p-8 max-w-lg">
                  <div className="text-xs uppercase tracking-widest text-[color:var(--gold)] mb-2">Statut Or</div>
                  <div className="font-serif text-4xl mb-1">1 240 pts</div>
                  <div className="text-sm text-muted-foreground mb-5">Plus que 260 pts pour le statut Diamant</div>
                  <div className="h-2 bg-white/60 overflow-hidden"><div className="h-full bg-[color:var(--gold)]" style={{ width: "82%" }} /></div>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function Input({ label, className = "", ...rest }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-xs text-muted-foreground mb-1">{label}</span>
      <input {...rest} className="w-full border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:border-[color:var(--gold)]" />
    </label>
  );
}
