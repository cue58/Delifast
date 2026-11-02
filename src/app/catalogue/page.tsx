import type { Metadata } from "next";
import CatalogueClient from "@/features/catalogue/catalogue-client";

export const metadata: Metadata = {
  title: "Catalogue — Delifast",
  description: "Explorez le catalogue illustratif des restaurants et commerces Delifast à Ouagadougou.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function firstValue(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function CataloguePage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  return <CatalogueClient initialQuery={firstValue(params.q)} initialCategory={firstValue(params.categorie)} />;
}
