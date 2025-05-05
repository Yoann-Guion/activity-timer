# Activity Timer

[-> english below](#english)

## Français

### Description

Activity Timer est une application web permettant de suivre et gérer ses activités avec un objectif hebdomadaire. Elle offre un suivi précis du temps passé sur chaque activité et permet d'ajouter, modifier et supprimer des entrées facilement.

🔗 [Voir l'application en ligne](https://activity-timer.vercel.app)

### Fonctionnalités
- 🎯 Création d'activités avec un objectif hebdomadaire (en heures et minutes)
- ⏱️ Chronomètre intégré pour suivre le temps passé
- 📊 Visualisation de la progression via une barre de progression hebdomadaire
- 🗓️ Historique hebdomadaire des activités accessible dans un résumé dédié
- 🎨 Personnalisation des activités par couleur
- 🌗 Mode sombre/clair
- 🌍 Support multilingue (français/anglais)
- 📌 Stockage des activités via Zustand et persistance dans le localStorage

### Technologies utilisées
- **Frontend** : Next.js, TypeScript, Zustand
- **UI** : ShadCN/UI, Tailwind CSS
- **Validation** : Zod
- **Internationalisation** : next-international

### Installation et utilisation
#### Prérequis
- Node.js (v18+ recommandé)
- pnpm (ou npm/yarn)

#### Installation
```sh
# Cloner le projet
git clone https://github.com/Yoann-Guion/activity-timer.git 
# ou
git clone git@github.com:Yoann-Guion/activity-timer.git
cd activity-timer

# Installer les dépendances
pnpm install
```

#### Lancer le projet en mode développement
```sh
pnpm dev
```
Accède à l'application sur `http://localhost:3000`.

### Contribution
Je développe ce projet en solo dans le cadre de mon portfolio, mais les contributions sont les bienvenues !
N’hésitez pas à ouvrir une issue ou une pull request pour proposer des idées, corriger un bug ou améliorer une fonctionnalité.

### TODO
- [x] Persistance des activités via `localStorage`
- [x] Design amélioré des cartes avec possibilité d’éditer et de supprimer les activités
- [x] Sauvegarde hebdomadaire des objectifs atteints
- [x] Affichage des objectifs des semaines précédentes dans la vue de résumé ainsi que dans le détail d'une activité
- [ ] Amélioration de l'accessiblité
- [ ] Ajout d'un guide d'utilisation (onBoarding) à la première connexion 

#### Et pour la suite
- [ ] Possibilité de s'authentifier
- [ ] Sauvegarde des activités en base de données pour permettre un accès sur plusieurs appareils
- [ ] Pouvoir choisir sa progression : journalière / hebdomadaire / mensuelle...  
...Et j’ai encore plein d’idées en tête pour améliorer l’application au fil du temps

## Licence

Ce projet est open source et disponible sous la [licence MIT](./LICENSE).  





## English

### Description

Activity Timer is a web application that helps you track and manage your weekly activity goals. It offers accurate time tracking for each activity, with an easy interface to add, edit, or delete entries.

🔗 [View the live application](https://activity-timer.vercel.app)

### Features
- 🎯 Create activities with a weekly goal (in hours and minutes)
- ⏱️ Built-in timer to track time spent
- 📊 Weekly progress bar for visual tracking
- 🗓️ Weekly history view with summaries of past activity goals
- 🎨 Customize each activity with a unique color
- 🌗 Light/Dark mode support
- 🌍 Multilingual support (French/English)
- 📌 State management with Zustand and localStorage persistence

### Tech Stack
- **Frontend**: Next.js, TypeScript, Zustand
- **UI**: ShadCN/UI, Tailwind CSS
- **Validation**: Zod
- **Internationalization**: next-international

### Installation & Usage
#### Prerequisites
- Node.js (v18+ recommended)
- pnpm (or npm/yarn)

#### Installation

```sh
# Clone the repository
git clone https://github.com/Yoann-Guion/activity-timer.git 
# or
git clone git@github.com:Yoann-Guion/activity-timer.git
cd activity-timer

# Install dependencies
pnpm install
```

#### Start the development server
```sh
pnpm dev
```

Access the app at http://localhost:3000.

### Contributing

This project is being developed solo as part of my portfolio, but contributions are very welcome!
Feel free to open an issue or pull request to suggest ideas, fix bugs, or improve features.

### TODO
- [x] Persist activities via localStorage
- [x] Improved card design with edit/delete options
- [x] Weekly save of completed activity goals
- [x] Display past weeks' goals in the summary and activity detail views
- [ ] Improve accessibility
- [ ] Add a first-time onboarding guide

### Coming next
- [ ] User authentication
- [ ] Store activities in a database to sync across devices
- [ ] Choose goal frequency: daily / weekly / monthly
...And I still have plenty of ideas to improve the app over time!

### License

This project is open source and available under the MIT license.