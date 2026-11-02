"use client";

import { useFavorites } from "@/features/favorites/favorites-provider";

export function FavoriteButton({ itemId, label }: { itemId: string; label: string }) {
  const { favoriteIds, toggleFavorite } = useFavorites();
  const selected = favoriteIds.includes(itemId);

  return (
    <button
      className={`heart${selected ? " active" : ""}`}
      type="button"
      aria-label={`${selected ? "Retirer" : "Ajouter"} ${label} ${selected ? "des" : "aux"} favoris`}
      aria-pressed={selected}
      onClick={() => toggleFavorite(itemId, label)}
    >
      {selected ? "♥" : "♡"}
    </button>
  );
}

export function FavoritesStorageNotice() {
  const { storageAvailable } = useFavorites();
  return (
    <p className={`favorites-notice${storageAvailable === false ? " unavailable" : ""}`}>
      {storageAvailable === false
        ? "Le stockage local est indisponible : vos favoris ne seront conservés que pendant cette session de page."
        : "Les favoris sont enregistrés dans ce navigateur lorsque le stockage local le permet. Leur conservation n’est pas garantie, notamment en navigation privée ou après l’effacement des données."}
    </p>
  );
}
