"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { FAVORITES_STORAGE_KEY, parseFavoriteIds, readFavoriteIds, writeFavoriteIds } from "@/features/favorites/storage";

type FavoritesContextValue = {
  favoriteIds: string[];
  storageAvailable: boolean | null;
  toggleFavorite: (id: string, label: string) => void;
  announce: (message: string) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [storageAvailable, setStorageAvailable] = useState<boolean | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const [ready, setReady] = useState(false);
  const announcementTimer = useRef<number | null>(null);

  useEffect(() => {
    const stored = readFavoriteIds();
    setFavoriteIds(stored.ids);
    setStorageAvailable(stored.available);
    setReady(true);

    function syncFromAnotherTab(event: StorageEvent) {
      if (event.key !== FAVORITES_STORAGE_KEY && event.key !== null) return;
      const ids = event.key === null ? [] : parseFavoriteIds(event.newValue);
      setFavoriteIds(ids);
      setStorageAvailable(true);
    }

    window.addEventListener("storage", syncFromAnotherTab);
    return () => window.removeEventListener("storage", syncFromAnotherTab);
  }, []);

  useEffect(() => {
    if (!ready) return;
    setStorageAvailable(writeFavoriteIds(favoriteIds));
  }, [favoriteIds, ready]);

  useEffect(() => () => {
    if (announcementTimer.current !== null) window.clearTimeout(announcementTimer.current);
  }, []);

  const announce = useCallback((message: string) => {
    setAnnouncement(message);
    if (announcementTimer.current !== null) window.clearTimeout(announcementTimer.current);
    announcementTimer.current = window.setTimeout(() => setAnnouncement(""), 3200);
  }, []);

  const toggleFavorite = useCallback((id: string, label: string) => {
    const wasFavorite = favoriteIds.includes(id);
    setFavoriteIds((current) => {
      return current.includes(id) ? current.filter((favoriteId) => favoriteId !== id) : [...current, id];
    });
    announce(wasFavorite ? `${label} retiré des favoris.` : `${label} ajouté aux favoris.`);
  }, [announce, favoriteIds]);

  const value = useMemo(() => ({ favoriteIds, storageAvailable, toggleFavorite, announce }),
    [favoriteIds, storageAvailable, toggleFavorite, announce]);

  return (
    <FavoritesContext.Provider value={value}>
      {children}
      <div className={`toast${announcement ? " show" : ""}`} role="status" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>
    </FavoritesContext.Provider>
  );
}

export function useFavorites(): FavoritesContextValue {
  const value = useContext(FavoritesContext);
  if (!value) throw new Error("useFavorites doit être utilisé dans FavoritesProvider.");
  return value;
}
