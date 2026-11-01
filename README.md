# Delifast
Appli_de_vente_en_ligne

## Application web

Socle initial de l’application Delifast, construit avec Next.js App Router, React, TypeScript strict, Tailwind CSS et ESLint. Cette version ne contient pas encore de parcours métier et n’est connectée à aucun service Supabase.

## Accueil frontend

La route `/` reprend l’interface du fichier de référence `delifast-accueil-v1.html` conçu par Star. Toutes ses sections sont conservées. Les composants clients sont limités au menu mobile et à la saisie/validation de la recherche ; le contenu reste rendu côté serveur.

Les cinq photographies de la référence sont hébergées dans `public/images/home/`, compressées en WebP et affichées avec `next/image` : préchargement du visuel principal, tailles adaptées et chargement différé des images secondaires. Il s’agit toujours de visuels de maquette, à remplacer par les contenus autorisés des partenaires avant une mise en production.

Seule la route `/` existe actuellement. Les navigations actives mènent à cette route ou aux sections `#restaurants`, `#categories` et `#commerces`. Les routes de connexion, inscription, catalogue, recherche, fiches restaurants et informations ne sont pas créées par cette intégration. Leurs éléments restent non interactifs ; la recherche accepte et valide la saisie mais signale explicitement son indisponibilité sans simuler de résultats ni rediriger vers une page absente. Les établissements d’exemple sont marqués « Maquette », sans note numérique, fiche fictive ni favori actif.

## Prérequis

- Node.js 20.9 ou une version ultérieure
- npm

## Démarrage local

```bash
npm install
npm run dev
```

Ouvrir ensuite [http://localhost:3000](http://localhost:3000).

Le fichier `.env.example` documente les variables publiques prévues pour une future intégration Supabase. Il n’est pas nécessaire pour démarrer la page d’accueil. Si l’intégration est ajoutée, copier ce modèle vers `.env.local` et remplir uniquement les valeurs de développement appropriées. Ne jamais placer une clé `service_role` ou une clé secrète dans une variable `NEXT_PUBLIC_*` ou dans Git.

## Commandes

```bash
npm run dev       # serveur de développement
npm run typecheck # contrôle TypeScript sans émission de fichiers
npm run lint      # ESLint
npm run build     # build de production
npm run start     # démarrer le build de production
```

## Organisation

- `src/app/` — routes et layout de l’App Router
- `src/components/` — composants d’interface et de mise en page
- `src/features/` — futurs modules fonctionnels
- `src/lib/` — utilitaires partagés, validation et emplacements d’intégration
- `src/hooks/`, `src/types/`, `src/styles/` — hooks, types et styles partagés
- `public/` — ressources statiques
- `docs/` — documentation d’architecture, de base de données et de sécurité
- `tests/` — emplacements prévus pour les tests unitaires, d’intégration et end-to-end

## Supabase

L’intégration Supabase reste à configurer. Aucune table, migration, fonction Auth, clé ou bucket n’a été créé dans le projet distant. Les migrations SQL Supabase seront l’autorité unique du futur schéma PostgreSQL; Prisma n’est pas utilisé.
