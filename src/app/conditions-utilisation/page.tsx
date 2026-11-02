import type { Metadata } from "next";
import InformationPage from "@/components/layout/information-page";

export const metadata: Metadata = { title: "Conditions d’utilisation — Delifast" };

export default function TermsPage() {
  return (
    <InformationPage content={{
      eyebrow: "Informations légales",
      title: "Conditions d’utilisation",
      intro: "Contenu provisoire — ces conditions doivent être rédigées et validées avant toute publication ou utilisation contractuelle.",
      sections: [
        { title: "Version en préparation", body: "Aucun engagement contractuel ni aucune règle juridique n’est défini sur cette page. Cette mention provisoire ne remplace pas des conditions d’utilisation validées." },
        { title: "Parcours de démonstration", body: "Les commerces, notes et prix du catalogue sont illustratifs. L’authentification, les commandes et les paiements ne sont pas actifs dans cette version frontend." },
      ],
    }} />
  );
}
