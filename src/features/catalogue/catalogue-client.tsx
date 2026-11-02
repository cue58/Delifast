"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES, isCategorySlug, type CategorySlug } from "@/features/catalogue/categories";
import { CATALOGUE_ITEMS, filterCatalogueItems, type CatalogueItem } from "@/features/catalogue/data";
import { FavoriteButton, FavoritesStorageNotice } from "@/features/favorites/favorite-button";
import { useFavorites } from "@/features/favorites/favorites-provider";

type SortOrder = "recommended" | "rating" | "name";

function catalogueHref(query: string, category: CategorySlug | "all") {
  const params = new URLSearchParams();
  if (query.trim()) params.set("q", query.trim());
  if (category !== "all") params.set("categorie", category);
  const search = params.toString();
  return search ? `/catalogue?${search}` : "/catalogue";
}

export default function CatalogueClient({
  initialQuery,
  initialCategory,
}: {
  initialQuery: string;
  initialCategory: string;
}) {
  const router = useRouter();
  const { announce } = useFavorites();
  const validInitialCategory = isCategorySlug(initialCategory) ? initialCategory : "all";
  const [query, setQuery] = useState(initialQuery);
  const [appliedQuery, setAppliedQuery] = useState(initialQuery);
  const [category, setCategory] = useState<CategorySlug | "all">(validInitialCategory);
  const [sort, setSort] = useState<SortOrder>("recommended");
  const [detail, setDetail] = useState<{ item: CatalogueItem; productsOnly: boolean } | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (detail && dialogRef.current && !dialogRef.current.open) dialogRef.current.showModal();
  }, [detail]);

  useEffect(() => {
    setQuery(initialQuery);
    setAppliedQuery(initialQuery);
    const valid = isCategorySlug(initialCategory) ? initialCategory : "all";
    setCategory(valid);
    if (initialCategory && !isCategorySlug(initialCategory)) {
      router.replace(catalogueHref(initialQuery, "all"), { scroll: false });
    }
  }, [initialCategory, initialQuery, router]);

  const visibleItems = useMemo(() => {
    const filtered = filterCatalogueItems(CATALOGUE_ITEMS, appliedQuery, category);
    return filtered.sort((first, second) => {
      if (sort === "rating") return (second.rating ?? -1) - (first.rating ?? -1);
      if (sort === "name") return first.name.localeCompare(second.name, "fr");
      return CATALOGUE_ITEMS.indexOf(first) - CATALOGUE_ITEMS.indexOf(second);
    });
  }, [appliedQuery, category, sort]);

  function updateQuery(nextQuery: string) {
    const cleaned = nextQuery.trim();
    setQuery(cleaned);
    setAppliedQuery(cleaned);
    router.push(catalogueHref(cleaned, category), { scroll: false });
  }

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    updateQuery(query);
  }

  function handleCategory(nextCategory: CategorySlug | "all") {
    setCategory(nextCategory);
    router.push(catalogueHref(appliedQuery, nextCategory), { scroll: false });
  }

  function resetFilters() {
    setQuery("");
    setAppliedQuery("");
    setCategory("all");
    setSort("recommended");
    router.push("/catalogue", { scroll: false });
  }

  function openDetail(item: CatalogueItem, productsOnly = false) {
    setDetail({ item, productsOnly });
    announce(`Aperçu de démonstration de « ${item.name} » ouvert.`);
  }

  return (
    <>
      <div className="catalogue-topline">Commerces et spécialités à découvrir à Ouagadougou</div>
      <header className="catalogue-header">
        <div className="catalogue-wrap catalogue-nav">
          <Link className="catalogue-logo" href="/" aria-label="Delifast, accueil">➤ DELIFAST</Link>
          <nav className="catalogue-nav-links" aria-label="Navigation principale">
            <Link className="catalogue-button light" href="/">Accueil</Link>
            <Link className="catalogue-button light" href="/connexion">Connexion</Link>
            <Link className="catalogue-button" href="/inscription">Créer un compte</Link>
          </nav>
        </div>
      </header>
      <main>
        <section className="catalogue-hero" aria-labelledby="catalogue-title">
          <div className="catalogue-wrap">
            <div className="catalogue-eyebrow">Explorez Delifast</div>
            <h1 id="catalogue-title">Trouvez votre prochain coup de cœur.</h1>
            <p>Restaurants, commerces et spécialités : explorez les offres et découvrez de nouvelles adresses.</p>
            <form className="catalogue-search" role="search" onSubmit={handleSearch}>
              <span aria-hidden="true" className="catalogue-search-icon">⌕</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Commerce, plat ou produit…"
                aria-label="Rechercher un commerce, un plat ou un produit"
              />
              {query && <button type="button" className="catalogue-clear-search" onClick={() => updateQuery("")}>Effacer</button>}
              <button className="catalogue-button" type="submit" aria-label="Rechercher">Rechercher</button>
            </form>
          </div>
        </section>

        <section className="catalogue-wrap catalogue-content" aria-label="Filtres et résultats du catalogue">
          <div className="catalogue-filter-row">
            <div className="catalogue-categories" aria-label="Filtrer par catégorie">
              <button type="button" className={`catalogue-chip${category === "all" ? " active" : ""}`} aria-pressed={category === "all"} onClick={() => handleCategory("all")}>Tout découvrir</button>
              {CATEGORIES.map((item) => (
                <button
                  key={item.slug}
                  type="button"
                  className={`catalogue-chip${category === item.slug ? " active" : ""}`}
                  aria-pressed={category === item.slug}
                  onClick={() => handleCategory(item.slug)}
                >
                  <span aria-hidden="true">{item.icon}</span> {item.label}
                </button>
              ))}
            </div>
            <label className="catalogue-sort-label">
              <span className="visually-hidden">Trier les commerces</span>
              <select value={sort} onChange={(event) => setSort(event.target.value as SortOrder)} aria-label="Trier les commerces">
                <option value="recommended">Trier : recommandés</option>
                <option value="rating">Meilleures notes</option>
                <option value="name">Nom : A à Z</option>
              </select>
            </label>
          </div>

          <div className="catalogue-heading">
            <div>
              <h2>À découvrir sur Delifast</h2>
              <p>Sélection fictive pour présenter le catalogue avant la connexion aux données réelles.</p>
            </div>
            <span className="catalogue-count" aria-live="polite" aria-atomic="true">
              {visibleItems.length} commerce{visibleItems.length === 1 ? "" : "s"} affiché{visibleItems.length === 1 ? "" : "s"}
            </span>
          </div>
          <FavoritesStorageNotice />

          {visibleItems.length > 0 ? (
            <div className="catalogue-grid">
              {visibleItems.map((item) => (
                <article className="catalogue-card" key={item.id}>
                  <div className="catalogue-card-visual">
                    <Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 620px) 92vw, (max-width: 900px) 46vw, 360px" loading="lazy" />
                    <span className="catalogue-tag">{item.tag}</span>
                    <FavoriteButton itemId={item.id} label={item.name} />
                  </div>
                  <div className="catalogue-card-info">
                    <div className="catalogue-name-row">
                      <h3>{item.name}</h3>
                      {item.rating !== undefined && <span className="catalogue-rating" aria-label={`Note fictive : ${item.rating.toLocaleString("fr-FR")}`}>★ {item.rating.toLocaleString("fr-FR")}</span>}
                    </div>
                    <p className="catalogue-description">{item.description}</p>
                    <div className="catalogue-meta"><span>📍 {item.location}</span>{item.availability && <span>· {item.availability}</span>}</div>
                    {item.products && (
                      <div className="catalogue-products">
                        <p className="catalogue-product-title">{item.category === "restaurants" ? "Quelques spécialités" : "Produits de démonstration"}</p>
                        {item.products.map((product) => (
                          <div className="catalogue-product" key={product.name}><span>{product.name}</span><strong>{product.price}</strong></div>
                        ))}
                      </div>
                    )}
                    <div className="catalogue-actions">
                      <button className="catalogue-button" type="button" aria-haspopup="dialog" aria-controls="commerce-details" onClick={() => openDetail(item)}>Voir le commerce</button>
                      {item.products && <button className="catalogue-button light" type="button" aria-haspopup="dialog" aria-controls="commerce-details" onClick={() => openDetail(item, true)}>Voir les produits</button>}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="catalogue-empty" role="status">
              <strong>{category === "maison" ? "Aucun commerce de démonstration pour Maison" : "Aucun résultat trouvé"}</strong>
              <p>{category === "maison" ? "La catégorie Maison est prête, mais aucune donnée fictive de cette catégorie n’est fournie dans les maquettes." : "Essayez un autre mot-clé ou une autre catégorie."}</p>
              <button className="catalogue-button" type="button" onClick={resetFilters}>Réinitialiser les filtres</button>
            </div>
          )}
        </section>

        <section className="catalogue-partner">
          <div className="catalogue-wrap catalogue-partner-row">
            <div>
              <h2>Vous êtes commerçant ?</h2>
              <p>L’espace commerçant utilise le même parcours d’accès. L’authentification n’est pas encore connectée.</p>
            </div>
            <Link className="catalogue-button" href="/connexion?profil=commercant">Découvrir l’espace commerçant</Link>
          </div>
        </section>
      </main>
      <dialog
        className="catalogue-dialog"
        id="commerce-details"
        ref={dialogRef}
        aria-labelledby="commerce-details-title"
        onClose={() => setDetail(null)}
        onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close(); }}
      >
        {detail && <div className="catalogue-dialog-content">
          <div className="catalogue-dialog-top">
            <span className="information-eyebrow">Aperçu de démonstration</span>
            <button className="catalogue-button light" type="button" aria-label="Fermer l’aperçu" onClick={() => dialogRef.current?.close()}>Fermer</button>
          </div>
          <h2 id="commerce-details-title">{detail.productsOnly ? `Produits de ${detail.item.name}` : detail.item.name}</h2>
          <p className="catalogue-dialog-notice">Établissement, disponibilité, notes et prix fictifs. Cet aperçu n’est pas une fiche partenaire réelle.</p>
          {!detail.productsOnly && <>
            <p>{detail.item.description}</p>
            <p><strong>{detail.item.tag}</strong> · {detail.item.location}</p>
            {detail.item.rating !== undefined && <p>Note de maquette : {detail.item.rating.toLocaleString("fr-FR")} / 5</p>}
            {detail.item.availability && <p>Disponibilité de maquette : {detail.item.availability}</p>}
          </>}
          <h3>Produits fournis dans la maquette</h3>
          {detail.item.products ? <ul className="catalogue-dialog-products">
            {detail.item.products.map((product) => <li key={product.name}><span>{product.name}</span><strong>{product.price}</strong></li>)}
          </ul> : <p>Aucun produit de démonstration n’est fourni pour ce commerce.</p>}
        </div>}
      </dialog>
      <footer className="catalogue-footer">
        <div className="catalogue-wrap">
          <div className="catalogue-footer-row">
            <div><Link className="catalogue-logo" href="/">➤ DELIFAST</Link><p>Commerces et spécialités à découvrir.</p></div>
            <nav aria-label="Informations"><Link href="/a-propos">À propos</Link><Link href="/aide-contact">Aide &amp; contact</Link><Link href="/conditions-utilisation">Conditions d’utilisation</Link></nav>
          </div>
          <p className="catalogue-copyright">© {new Date().getFullYear()} Delifast. Catalogue illustratif : établissements, notes et prix fictifs.</p>
        </div>
      </footer>
      <nav className="mobile-nav" aria-label="Navigation mobile">
        <Link href="/" ><span aria-hidden="true">⌂</span>Accueil</Link>
        <Link className="active" href="/catalogue" aria-current="page"><span aria-hidden="true">▦</span>Explorer</Link>
        <Link href="/connexion"><span aria-hidden="true">♙</span>Compte</Link>
      </nav>
    </>
  );
}
