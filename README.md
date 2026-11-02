# Delifast

Frontend de démonstration pour découvrir des restaurants et commerces à Ouagadougou. Le projet utilise Next.js App Router, React, TypeScript strict, Tailwind CSS et ESLint. Il n’est connecté à aucun backend ni service d’authentification.

## Pages et interactions

L’accueil `/` conserve la direction artistique de `delifast-accueil-v1.html`; le fichier `index.html` historique ne remplace pas cette référence. Les pages catalogue et authentification reprennent leurs maquettes correspondantes.

Routes disponibles :

- `/` — accueil, recherche, catégories et favoris.
- `/catalogue` — catalogue fictif, recherche `?q=...`, filtre `?categorie=...`, tri et aperçus des commerces/produits.
- `/connexion` et `/inscription` — formulaires distincts avec validation côté client uniquement.
- `/a-propos`, `/aide-contact`, `/conditions-utilisation` — informations provisoires, sans coordonnées ni conditions légales inventées.

Les six slugs sont `restaurants`, `alimentation`, `mode`, `beaute`, `electronique` et `maison`. Recherche et catégorie se combinent en ET et peuvent être retirées indépendamment. Maison possède un état vide explicite. Les titres des restaurants de l’accueil mènent à leur sélection propre dans le catalogue. Les boutons « Voir le commerce » et « Voir les produits » ouvrent un aperçu accessible des seules données de maquette.

Le contexte commerçant est conservé entre `/connexion?profil=commercant` et `/inscription?profil=commercant`. Les formulaires ne créent ni compte, ni session, ni faux succès. Le mot de passe oublié n’annonce aucun envoi. Aucune donnée d’authentification n’est enregistrée localement.

## Favoris et données de démonstration

Le `FavoritesProvider` partage les favoris entre pages et onglets. Seuls des identifiants stables sont conservés sous `delifast:favorites:v1`. Les JSON invalides et erreurs de stockage sont interceptés; si le stockage est bloqué, les favoris restent utilisables en mémoire et l’interface avertit que la persistance n’est pas garantie.

Les établissements, produits, prix, disponibilités et notes sont fictifs. Les photographies locales sont optimisées en WebP et affichées avec `next/image`, avec chargement différé des visuels secondaires. Le visuel téléphone de Tech Express remplace une source de maquette indisponible. Les contenus et droits des visuels devront être validés avant une éventuelle publication réelle.

## Démarrage local

Node.js 20.9 ou ultérieur et npm sont requis pour l’application. Les tests unitaires utilisent la suppression native des types TypeScript de Node : Node.js 22.6 ou ultérieur est requis pour `npm test` (recette exécutée sous Node 24).

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000). Aucune variable d’environnement n’est nécessaire pour ce frontend. Le modèle `.env.example` reste réservé à une future intégration distincte; aucune clé secrète ne doit être placée dans une variable `NEXT_PUBLIC_*` ni dans Git.

## Vérifications

```bash
npm run typecheck # TypeScript strict
npm run lint      # ESLint
npm test          # node:test natif : catégories, recherche et stockage favoris
npm run build     # build de production, sans déploiement
npm run start     # servir localement le build
```

Aucun framework ni dépendance de test n’a été ajouté. Les captures de recette de l’accueil et du catalogue se trouvent dans `docs/qa/`, en formats desktop et mobile.

## Organisation et limites

- `src/app/` : routes, layout et styles globaux.
- `src/components/` : accueil, authentification et pages d’information.
- `src/features/catalogue/` : catégories, données fictives et interactions catalogue.
- `src/features/favorites/` : provider, stockage et bouton partagé.
- `public/images/` : ressources locales optimisées.
- `tests/unit/` : tests automatisés sans dépendance supplémentaire.

Cette version ne comporte ni intégration Supabase, ni authentification réelle, paiement, commande backend, administration, abonnement ou déploiement de production. Ces sujets restent hors du périmètre frontend.
