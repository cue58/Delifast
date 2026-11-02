import Image from "next/image";
import Link from "next/link";
import HomeMenu from "@/components/home/home-menu";
import HomeSearch from "@/components/home/home-search";
import { FavoriteButton, FavoritesStorageNotice } from "@/features/favorites/favorite-button";

const categories = [
  { icon: "🍲", title: "Restaurants", caption: "Plats & spécialités", slug: "restaurants" },
  { icon: "🥬", title: "Alimentation", caption: "Produits du quotidien", slug: "alimentation" },
  { icon: "👗", title: "Mode & accessoires", caption: "Style et tendances", slug: "mode" },
  { icon: "✨", title: "Beauté & bien-être", caption: "Prendre soin de soi", slug: "beaute" },
  { icon: "🎧", title: "Électronique", caption: "Tech et accessoires", slug: "electronique" },
  { icon: "🏡", title: "Maison", caption: "Équipement et déco", slug: "maison" },
] as const;

const sampleRestaurants = [
  {
    image: "/images/home/restaurant-grill.webp",
    id: "saveurs-du-faso",
    alt: "Assiette de grillades",
    tag: "Grillades",
    name: "Saveurs du Faso",
    description: "Cuisine locale · Grillades",
  },
  {
    image: "/images/home/restaurant-pizza.webp",
    id: "la-piazza",
    alt: "Pizza fraîchement préparée",
    tag: "Pizzeria",
    name: "La Piazza",
    description: "Pizzas · Cuisine italienne",
  },
  {
    image: "/images/home/restaurant-meal.webp",
    id: "le-jardin-gourmand",
    alt: "Repas grillé et accompagnements",
    tag: "Cuisine variée",
    name: "Le Jardin Gourmand",
    description: "Plats du jour · Cuisine variée",
  },
] as const;

const otherBusinesses = [
  {
    icon: "🛍️",
    title: "Mode & accessoires",
    description: "Vêtements, chaussures, sacs et accessoires.",
    links: [{ label: "Explorer la mode", slug: "mode" }],
  },
  {
    icon: "💆🏾",
    title: "Beauté & bien-être",
    description: "Produits de beauté, soins et univers bien-être.",
    links: [{ label: "Explorer cet univers", slug: "beaute" }],
  },
  {
    icon: "📱",
    title: "Électronique & maison",
    description: "Équipements, accessoires et essentiels du quotidien.",
    links: [
      { label: "Électronique", slug: "electronique" },
      { label: "Maison", slug: "maison" },
    ],
  },
] as const;

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <>
      <div className="topline">
        Bienvenue sur Delifast — <strong>les bonnes adresses de Ouagadougou</strong>
      </div>

      <header className="header">
        <div className="wrap nav">
          <Link className="brand" href="/" aria-label="Delifast, accueil">
            <span className="brand-mark" aria-hidden="true">➤</span>
            <span>DELI<span>FAST</span></span>
          </Link>
          <nav className="navlinks" aria-label="Navigation principale">
            <Link href="#restaurants">Restaurants</Link>
            <Link href="#categories">Catégories</Link>
            <Link href="#commerces">Commerces</Link>
          </nav>
          <div className="nav-actions">
            <Link className="btn btn-outline" href="/connexion">Connexion</Link>
            <Link className="btn btn-primary" href="/inscription">
              Créer un compte <span aria-hidden="true">↗</span>
            </Link>
            <HomeMenu />
          </div>
        </div>
      </header>

      <main id="accueil">
        <section className="hero" aria-labelledby="hero-title">
          <div className="wrap hero-grid">
            <div>
              <div className="eyebrow">La restauration à l’honneur</div>
              <h1 id="hero-title">Vos envies ont trouvé leur <em>adresse.</em></h1>
              <p className="hero-copy">
                Découvrez les restaurants, explorez des plats qui donnent envie et trouvez aussi les commerces qui facilitent votre quotidien à Ouagadougou.
              </p>
              <HomeSearch />
              <div className="hero-meta">
                <span><span aria-hidden="true">✓</span> Restaurants et commerces</span>
                <span><span aria-hidden="true">✓</span> Paiement direct au vendeur</span>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-photo">
                <Image
                  src="/images/home/hero-food.webp"
                  alt="Plat coloré fraîchement préparé"
                  fill
                  priority
                  sizes="(max-width: 680px) 92vw, (max-width: 950px) 48vw, 560px"
                />
                <div className="photo-shade" aria-hidden="true" />
              </div>
              <div className="rating-pill"><span aria-hidden="true">★ ★ ★ ★ ★</span> Les saveurs à découvrir</div>
              <div className="floating-card">
                <div className="floating-icon" aria-hidden="true">🍽️</div>
                <div><strong>Une envie ? Trouvez votre table.</strong><small>Explorez les restaurants près de vous</small></div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="categories" aria-labelledby="categories-title">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="section-kicker">Explorez Delifast</div>
                <h2 id="categories-title">Tout ce qui vous fait envie</h2>
                <p className="section-sub">La cuisine en vedette, et d’autres univers à découvrir au fil de vos besoins.</p>
              </div>
              <Link className="text-link" href="/catalogue">Voir toutes les catégories →</Link>
            </div>
            <div className="category-grid">
              {categories.map((category) => (
                <Link className="category" key={category.title} href={`/catalogue?categorie=${category.slug}`}>
                  <div className="category-icon" aria-hidden="true">{category.icon}</div>
                  <strong>{category.title}</strong>
                  <small>{category.caption}</small>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-soft" id="restaurants" aria-labelledby="restaurants-title">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="section-kicker">À découvrir en premier</div>
                <h2 id="restaurants-title">Les restaurants à la une</h2>
                <p className="section-sub">Parcourez les adresses gourmandes et laissez-vous inspirer par leurs spécialités.</p>
              </div>
              <Link className="text-link" href="/catalogue?categorie=restaurants">Explorer les restaurants →</Link>
            </div>
            <div className="restaurant-grid">
              {sampleRestaurants.map((restaurant) => (
                <article className="restaurant-card" key={restaurant.name}>
                  <div className="restaurant-image">
                    <Image
                      src={restaurant.image}
                      alt={restaurant.alt}
                      fill
                      sizes="(max-width: 680px) 48vw, (max-width: 950px) 48vw, 380px"
                    />
                    <span className="tag">{restaurant.tag}</span>
                    <FavoriteButton itemId={restaurant.id} label={restaurant.name} />
                  </div>
                  <div className="restaurant-info">
                    <div className="restaurant-title-row">
                      <h3><Link href={`/catalogue?${new URLSearchParams({ q: restaurant.name, categorie: "restaurants" }).toString()}`}>{restaurant.name}</Link></h3>
                      <span className="rating demo-rating">Maquette</span>
                    </div>
                    <p>{restaurant.description}</p>
                    <div className="restaurant-foot">
                      <span>📍 Ouagadougou</span>
                      <strong>À découvrir</strong>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <p className="demo-disclaimer">
              Visuels et établissements fictifs, repris de la maquette. Aucun avis n’est réel; les liens ouvrent leur sélection de démonstration dans le catalogue.
            </p>
            <FavoritesStorageNotice />
          </div>
        </section>

        <section className="section" aria-label="Découvrir les restaurants">
          <div className="wrap">
            <div className="food-banner">
              <div className="food-banner-copy">
                <div className="section-kicker">Le goût d’abord</div>
                <h2>La bonne cuisine mérite d’être trouvée.</h2>
                <p>Découvrez les menus, comparez les spécialités et contactez directement les restaurants pour vos envies du moment.</p>
                <Link className="btn btn-primary" href="/catalogue?categorie=restaurants">Découvrir les restaurants <span aria-hidden="true">↗</span></Link>
              </div>
              <div className="food-banner-visual">
                <Image
                  src="/images/home/food-banner.webp"
                  alt="Table garnie de plusieurs plats"
                  fill
                  sizes="(max-width: 680px) 92vw, 560px"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="section section-soft" id="commerces" aria-labelledby="commerces-title">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="section-kicker">Et bien plus encore</div>
                <h2 id="commerces-title">Vos autres commerces, au même endroit</h2>
                <p className="section-sub">Delifast s’ouvre aussi aux boutiques et commerces de proximité.</p>
              </div>
              <Link className="text-link" href="/catalogue">Tout explorer →</Link>
            </div>
            <div className="other-grid">
              {otherBusinesses.map((business) => (
                <article className="other-card" key={business.title}>
                  <div className="symbol" aria-hidden="true">{business.icon}</div>
                  <h3>{business.title}</h3>
                  <p>{business.description}</p>
                  <div className="other-card-links">
                    {business.links.map((item) => (
                      <Link key={item.slug} href={`/catalogue?categorie=${item.slug}`}>
                        {item.label} →
                      </Link>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="trust-title">
          <div className="wrap">
            <div className="section-head">
              <div><div className="section-kicker">Simple et transparent</div><h2 id="trust-title">Delifast, pensé pour vos habitudes</h2></div>
            </div>
            <div className="trust">
              <div className="trust-item"><div className="trust-icon" aria-hidden="true">🔎</div><div><strong>Trouvez facilement</strong><p>Recherchez des restaurants, des plats et des commerces depuis un seul espace.</p></div></div>
              <div className="trust-item"><div className="trust-icon" aria-hidden="true">🤝</div><div><strong>Échangez directement</strong><p>Consultez les informations du vendeur et passez commande auprès de lui.</p></div></div>
              <div className="trust-item"><div className="trust-icon" aria-hidden="true">📱</div><div><strong>Payez selon les modalités proposées</strong><p>Les modalités de paiement sont affichées par le commerçant concerné.</p></div></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap">
          <div className="footer-grid">
            <div>
              <Link className="brand" href="/" aria-label="Delifast, accueil">
                <span className="brand-mark" aria-hidden="true">➤</span><span>DELI<span>FAST</span></span>
              </Link>
              <p className="footer-intro">Les restaurants à l’honneur, les commerces à portée de découverte. Delifast, votre marketplace au Burkina Faso.</p>
            </div>
            <div><h4>Découvrir</h4><div className="footer-links"><Link href="#restaurants">Restaurants</Link><Link href="#categories">Catégories</Link><Link href="#commerces">Commerces</Link></div></div>
            <div><h4>Votre compte</h4><div className="footer-links"><Link href="/connexion">Connexion</Link><Link href="/inscription">Créer un compte</Link><Link href="/connexion?profil=commercant">Espace commerçant</Link></div></div>
            <div><h4>Informations</h4><div className="footer-links"><Link href="/a-propos">À propos</Link><Link href="/aide-contact">Aide &amp; contact</Link><Link href="/conditions-utilisation">Conditions d’utilisation</Link></div></div>
          </div>
          <div className="copyright"><span>© {year} Delifast. Tous droits réservés.</span><span>Fait pour découvrir les bonnes adresses du Burkina Faso.</span></div>
        </div>
      </footer>

      <nav className="mobile-nav" aria-label="Navigation mobile">
        <Link className="active" href="/" aria-current="page"><span aria-hidden="true">⌂</span>Accueil</Link>
        <Link href="/catalogue"><span aria-hidden="true">▦</span>Explorer</Link>
        <Link href="/connexion"><span aria-hidden="true">♙</span>Compte</Link>
      </nav>
    </>
  );
}
