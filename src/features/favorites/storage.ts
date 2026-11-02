export const FAVORITES_STORAGE_KEY = "delifast:favorites:v1";

const FAVORITE_ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function parseFavoriteIds(serialized: string | null): string[] {
  if (serialized === null) return [];
  try {
    const parsed: unknown = JSON.parse(serialized);
    if (!Array.isArray(parsed)) return [];
    return [...new Set(parsed.filter(
      (value): value is string =>
        typeof value === "string" && FAVORITE_ID_PATTERN.test(value),
    ))];
  } catch {
    return [];
  }
}

export function readFavoriteIds(): { ids: string[]; available: boolean } {
  try {
    return {
      ids: parseFavoriteIds(window.localStorage.getItem(FAVORITES_STORAGE_KEY)),
      available: true,
    };
  } catch {
    return { ids: [], available: false };
  }
}

export function writeFavoriteIds(ids: string[]): boolean {
  try {
    const safeIds = [...new Set(ids.filter((id) => FAVORITE_ID_PATTERN.test(id)))];
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(safeIds));
    return true;
  } catch {
    return false;
  }
}
