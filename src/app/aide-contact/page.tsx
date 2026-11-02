import type { Metadata } from "next";
import InformationPage from "@/components/layout/information-page";

export const metadata: Metadata = { title: "Aide & contact — Delifast" };

export default function HelpPage() {
  return (
    <InformationPage content={{
      eyebrow: "Aide & contact",
      title: "Comment pouvons-nous vous aider ?",
      intro: "Cette page d’assistance est en préparation. Les coordonnées de contact ne sont pas encore publiées.",
      sections: [
        { title: "Parcours de démonstration", body: "Vous pouvez explorer le catalogue et tester les filtres. Les commerces et offres affichés sont fictifs; aucune commande ni demande de contact n’est envoyée." },
        { title: "Connexion et inscription", body: "Les formulaires vérifient les informations saisies dans votre navigateur, mais le service d’authentification n’est pas connecté. Aucun compte n’est créé et aucune session n’est ouverte." },
      ],
    }} />
  );
}
