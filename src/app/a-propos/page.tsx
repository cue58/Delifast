import type { Metadata } from "next";
import InformationPage from "@/components/layout/information-page";

export const metadata: Metadata = { title: "À propos — Delifast" };

export default function AboutPage() {
  return (
    <InformationPage content={{
      eyebrow: "À propos de Delifast",
      title: "Les commerces à portée de découverte.",
      intro: "Delifast présente une marketplace destinée à faire découvrir des restaurants, des spécialités et des commerces, avec un lancement ciblé à Ouagadougou.",
      sections: [
        { title: "Un projet en construction", body: "Les parcours présentés ici sont une prévisualisation frontend. Les commerces et visuels des cartes sont fictifs ou illustratifs et ne représentent pas des partenaires réels." },
        { title: "Des services qui restent à connecter", body: "La recherche et les catégories sont disponibles dans ce catalogue de démonstration. Les fiches détaillées, les comptes et les données des commerçants ne sont pas encore connectés." },
      ],
    }} />
  );
}
