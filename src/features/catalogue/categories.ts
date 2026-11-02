export const CATEGORIES = [
  { slug: "restaurants", label: "Restaurants", icon: "🍲", caption: "Plats & spécialités" },
  { slug: "alimentation", label: "Alimentation", icon: "🥬", caption: "Produits du quotidien" },
  { slug: "mode", label: "Mode & accessoires", icon: "👗", caption: "Style et tendances" },
  { slug: "beaute", label: "Beauté & bien-être", icon: "✨", caption: "Prendre soin de soi" },
  { slug: "electronique", label: "Électronique", icon: "🎧", caption: "Tech et accessoires" },
  { slug: "maison", label: "Maison", icon: "🏡", caption: "Équipement et déco" },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];

export function isCategorySlug(value: string | undefined): value is CategorySlug {
  return CATEGORIES.some((category) => category.slug === value);
}

export function getCategoryLabel(slug: string): string | undefined {
  return CATEGORIES.find((category) => category.slug === slug)?.label;
}
