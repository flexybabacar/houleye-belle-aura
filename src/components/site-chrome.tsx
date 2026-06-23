import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, ShoppingBag, Heart, User, Menu, X, Instagram, Facebook, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/shop";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const links = [
    { to: "/", label: "Accueil" },
    { to: "/boutique", label: "Boutique" },
    { to: "/a-propos", label: "Notre maison" },
    { to: "/contact", label: "Contact" },
  ] as const;
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-[color:var(--cream)]/85 backdrop-blur">
      <div className="container-x flex items-center justify-between py-4">
        <button onClick={() => setOpen((v) => !v)} className="md:hidden p-2 -ml-2" aria-label="Menu">
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
        <Link to="/" className="font-serif text-2xl tracking-wide">Houleye</Link>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="hover:text-[color:var(--gold)] transition-colors">{l.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-3 text-foreground">
          <button className="p-2 hidden sm:block" aria-label="Recherche"><Search className="size-5" /></button>
          <Link to="/compte" className="p-2" aria-label="Compte"><User className="size-5" /></Link>
          <button className="p-2 hidden sm:block" aria-label="Favoris"><Heart className="size-5" /></button>
          <Link to="/panier" className="relative p-2" aria-label="Panier">
            <ShoppingBag className="size-5" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[color:var(--gold)] text-[10px] text-[color:var(--ink)] rounded-full size-4 flex items-center justify-center font-medium">{count}</span>
            )}
          </Link>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-border/60 bg-[color:var(--cream)]">
          <nav className="container-x py-4 flex flex-col gap-3 text-sm">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="py-1">{l.label}</Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[color:var(--ink)] text-[color:var(--cream)] mt-24">
      <div className="container-x py-16 grid md:grid-cols-4 gap-10">
        <div>
          <div className="font-serif text-2xl mb-4">Houleye</div>
          <p className="text-sm text-white/60 leading-relaxed">Maison de beauté premium. Soins, maquillage et parfums conçus avec exigence.</p>
          <div className="flex gap-3 mt-5">
            <a className="p-2 border border-white/20 rounded-full hover:border-[color:var(--gold)]" href="#"><Instagram className="size-4" /></a>
            <a className="p-2 border border-white/20 rounded-full hover:border-[color:var(--gold)]" href="#"><Facebook className="size-4" /></a>
          </div>
        </div>
        <div>
          <div className="eyebrow mb-4 text-[color:var(--gold)]">Boutique</div>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link to="/boutique">Tous les produits</Link></li>
            <li><Link to="/boutique">Soins du visage</Link></li>
            <li><Link to="/boutique">Maquillage</Link></li>
            <li><Link to="/boutique">Parfums</Link></li>
          </ul>
        </div>
        <div>
          <div className="eyebrow mb-4 text-[color:var(--gold)]">Maison</div>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link to="/a-propos">Notre histoire</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/compte">Mon compte</Link></li>
            <li><a href="#">Programme fidélité</a></li>
          </ul>
        </div>
        <div>
          <div className="eyebrow mb-4 text-[color:var(--gold)]">Newsletter</div>
          <p className="text-sm text-white/70 mb-3">Recevez nos rituels et offres exclusives.</p>
          <form className="flex gap-2">
            <input type="email" placeholder="Votre email" className="flex-1 bg-white/5 border border-white/20 px-3 py-2 text-sm focus:outline-none focus:border-[color:var(--gold)]" />
            <button className="bg-[color:var(--gold)] text-[color:var(--ink)] px-4" aria-label="S'inscrire"><ArrowRight className="size-4" /></button>
          </form>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-5 text-xs text-white/50 flex flex-wrap justify-between gap-3">
          <span>© {new Date().getFullYear()} Houleye Beauty Maison. Tous droits réservés.</span>
          <span>Paiement sécurisé · Livraison soignée · Dakar & international</span>
        </div>
      </div>
    </footer>
  );
}
