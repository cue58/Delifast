import type { CategorySlug } from "@/features/catalogue/categories";

export type CatalogueProduct = { name: string; price: string };

export type CatalogueItem = {
  id: string;
  name: string;
  category: CategorySlug;
  image: string;
  imageAlt: string;
  tag: string;
  description: string;
  location: string;
  rating?: number;
  availability?: string;
  products?: CatalogueProduct[];
  searchTerms: string;
};

const CATEGORY_SEARCH_LABELS: Record<CategorySlug, string> = {
  restaurants: "Restaurants",
  alimentation: "Alimentation épicerie",
  mode: "Mode accessoires",
  beaute: "Beauté bien-être",
  electronique: "Électronique",
  maison: "Maison",
};

// Les six commerces et leurs détails ci-dessous proviennent de la maquette catalogue.
// Les trois restaurants suivants viennent de la maquette d’accueil; aucune donnée
// commerciale supplémentaire n’est fabriquée pour eux.
export const CATALOGUE_ITEMS: CatalogueItem[] = [
  {
    id: "le-petit-four",
    name: "Le Petit Four",
    category: "restaurants",
    image: "/images/catalogue/le-petit-four.webp",
    imageAlt: "Pizza fraîchement préparée",
    tag: "Restaurant",
    description: "Pizzas généreuses et recettes maison.",
    location: "Zone du Bois",
    rating: 4.8,
    availability: "Ouvert aujourd'hui",
    products: [
      { name: "Pizza royale", price: "4 500 F CFA" },
      { name: "Pizza végétarienne", price: "3 500 F CFA" },
    ],
    searchTerms: "pizza burger poulet braisé cuisine repas restaurant zone du bois",
  },
  {
    id: "chez-awa",
    name: "Chez Awa",
    category: "restaurants",
    image: "/images/catalogue/chez-awa.webp",
    imageAlt: "Plat cuisiné et légumes",
    tag: "Restaurant",
    description: "Saveurs locales et plats préparés avec soin.",
    location: "Koulouba",
    rating: 4.7,
    availability: "Ouvert aujourd'hui",
    products: [
      { name: "Poulet braisé", price: "3 000 F CFA" },
      { name: "Riz sauce du jour", price: "1 500 F CFA" },
    ],
    searchTerms: "poulet braisé riz sauce africaine local restaurant repas koulouba",
  },
  {
    id: "marche-frais",
    name: "Marché Frais",
    category: "alimentation",
    image: "/images/catalogue/marche-frais.webp",
    imageAlt: "Fruits et légumes frais",
    tag: "Épicerie",
    description: "Fruits, légumes et essentiels du quotidien.",
    location: "Zogona",
    rating: 4.5,
    availability: "Ouvert aujourd'hui",
    products: [
      { name: "Panier de légumes", price: "2 500 F CFA" },
      { name: "Fruits de saison", price: "1 800 F CFA" },
    ],
    searchTerms: "fruits légumes épicerie frais banane tomate oignon alimentation zogona",
  },
  {
    id: "urban-style",
    name: "Urban Style",
    category: "mode",
    image: "/images/catalogue/urban-style.webp",
    imageAlt: "Vêtements et mode",
    tag: "Mode",
    description: "Des tenues modernes pour tous les jours.",
    location: "Ouaga 2000",
    rating: 4.4,
    availability: "Retrait possible",
    products: [
      { name: "T-shirt classique", price: "5 000 F CFA" },
      { name: "Chemise casual", price: "9 500 F CFA" },
    ],
    searchTerms: "vêtements mode chemise t-shirt pantalon accessoires habits ouaga 2000",
  },
  {
    id: "eclat-beaute",
    name: "Éclat Beauté",
    category: "beaute",
    image: "/images/catalogue/eclat-beaute.webp",
    imageAlt: "Produits de soin et beauté",
    tag: "Beauté",
    description: "Des essentiels pour votre routine beauté.",
    location: "Patte d'Oie",
    rating: 4.6,
    availability: "Retrait possible",
    products: [
      { name: "Crème hydratante", price: "4 000 F CFA" },
      { name: "Savon doux", price: "1 500 F CFA" },
    ],
    searchTerms: "beauté soin peau cheveux crème savon cosmétique patte d'oie",
  },
  {
    id: "tech-express",
    name: "Tech Express",
    category: "electronique",
    image: "/images/catalogue/tech-express.webp",
    imageAlt: "Téléphone mobile illustratif",
    tag: "Électronique",
    description: "Accessoires mobiles et petits équipements.",
    location: "Dassasgho",
    rating: 4.3,
    availability: "Retrait possible",
    products: [
      { name: "Écouteurs filaires", price: "2 500 F CFA" },
      { name: "Chargeur USB", price: "3 500 F CFA" },
    ],
    searchTerms: "téléphone chargeur écouteurs électronique accessoires mobile dassasgho",
  },
  {
    id: "saveurs-du-faso",
    name: "Saveurs du Faso",
    category: "restaurants",
    image: "/images/home/restaurant-grill.webp",
    imageAlt: "Assiette de grillades",
    tag: "Grillades",
    description: "Cuisine locale · Grillades",
    location: "Ouagadougou",
    searchTerms: "cuisine locale grillades restaurant",
  },
  {
    id: "la-piazza",
    name: "La Piazza",
    category: "restaurants",
    image: "/images/home/restaurant-pizza.webp",
    imageAlt: "Pizza fraîchement préparée",
    tag: "Pizzeria",
    description: "Pizzas · Cuisine italienne",
    location: "Ouagadougou",
    searchTerms: "pizza cuisine italienne restaurant",
  },
  {
    id: "le-jardin-gourmand",
    name: "Le Jardin Gourmand",
    category: "restaurants",
    image: "/images/home/restaurant-meal.webp",
    imageAlt: "Repas grillé et accompagnements",
    tag: "Cuisine variée",
    description: "Plats du jour · Cuisine variée",
    location: "Ouagadougou",
    searchTerms: "plats du jour cuisine variée restaurant",
  },
];

export function normalizeSearch(value: string): string {
  return value
    .toLocaleLowerCase("fr")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export function matchesSearch(item: CatalogueItem, query: string): boolean {
  const term = normalizeSearch(query);
  if (!term) return true;
  const haystack = normalizeSearch(
    [item.name, CATEGORY_SEARCH_LABELS[item.category], item.tag, item.description, item.location, item.searchTerms,
      ...(item.products?.map((product) => product.name) ?? [])].join(" "),
  );
  return haystack.includes(term);
}

export function filterCatalogueItems(
  items: CatalogueItem[],
  query: string,
  category: CategorySlug | "all",
): CatalogueItem[] {
  return items.filter((item) =>
    (category === "all" || item.category === category) && matchesSearch(item, query),
  );
}
