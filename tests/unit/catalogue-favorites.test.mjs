import assert from "node:assert/strict";
import test from "node:test";
import { CATEGORIES, isCategorySlug } from "../../src/features/catalogue/categories.ts";
import { CATALOGUE_ITEMS, filterCatalogueItems, normalizeSearch } from "../../src/features/catalogue/data.ts";
import {
  FAVORITES_STORAGE_KEY,
  parseFavoriteIds,
  readFavoriteIds,
  writeFavoriteIds,
} from "../../src/features/favorites/storage.ts";

test("les six catégories canoniques sont reconnues, Maison comprise", () => {
  assert.deepEqual(CATEGORIES.map((category) => category.slug), [
    "restaurants", "alimentation", "mode", "beaute", "electronique", "maison",
  ]);
  assert.equal(isCategorySlug("maison"), true);
  assert.equal(isCategorySlug("epicerie"), false);
  assert.equal(isCategorySlug("inconnu"), false);
});

test("la recherche ignore les accents et garde les caractères de requête", () => {
  assert.equal(normalizeSearch("Éclat & beauté"), "eclat & beaute");
  assert.equal(filterCatalogueItems(CATALOGUE_ITEMS, "crème hydratante", "beaute")[0]?.id, "eclat-beaute");
  assert.equal(filterCatalogueItems(CATALOGUE_ITEMS, "creme hydratante", "beaute").length, 1);
});

test("la recherche et la catégorie sont appliquées en ET", () => {
  const results = filterCatalogueItems(CATALOGUE_ITEMS, "riz sauce", "restaurants");
  assert.deepEqual(results.map((item) => item.id), ["chez-awa"]);
  assert.equal(filterCatalogueItems(CATALOGUE_ITEMS, "riz sauce", "mode").length, 0);
});

test("Maison affiche un état vide plutôt qu’un filtre erroné", () => {
  assert.deepEqual(filterCatalogueItems(CATALOGUE_ITEMS, "", "maison"), []);
});

test("le parseur ignore les favoris corrompus, invalides ou dupliqués", () => {
  assert.deepEqual(parseFavoriteIds("not-json"), []);
  assert.deepEqual(parseFavoriteIds('{"id":"le-petit-four"}'), []);
  assert.deepEqual(parseFavoriteIds('["chez-awa","../secret","chez-awa",4,null]'), ["chez-awa"]);
});

test("lecture et écriture locales tolèrent les refus du navigateur", (t) => {
  const originalWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
  t.after(() => {
    if (originalWindow) Object.defineProperty(globalThis, "window", originalWindow);
    else delete globalThis.window;
  });

  const memory = new Map();
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: { localStorage: {
      getItem: (key) => memory.get(key) ?? null,
      setItem: (key, value) => memory.set(key, value),
    } },
  });
  assert.deepEqual(readFavoriteIds(), { ids: [], available: true });
  assert.equal(writeFavoriteIds(["le-petit-four", "invalid id", "le-petit-four"]), true);
  assert.equal(memory.get(FAVORITES_STORAGE_KEY), '["le-petit-four"]');
  assert.deepEqual(readFavoriteIds(), { ids: ["le-petit-four"], available: true });

  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: { get localStorage() { throw new Error("storage disabled"); } },
  });
  assert.deepEqual(readFavoriteIds(), { ids: [], available: false });
  assert.equal(writeFavoriteIds(["chez-awa"]), false);
});
