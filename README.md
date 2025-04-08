# Activity Timer

[-> english below](#english)

## Français

### Description

Activity Timer est une application web permettant de suivre et gérer ses activités avec un objectif hebdomadaire. Elle offre un suivi précis du temps passé sur chaque activité et permet d'ajouter, modifier et supprimer des entrées facilement.

### Fonctionnalités
- 🎯 Création d'activités avec un objectif hebdomadaire (en heures et minutes)
- ⏱️ Chronomètre intégré pour suivre le temps passé
- 📊 Affichage de la progression hebdomadaire sous forme de barre de progression
- 🎨 Personnalisation de chaque activité avec une couleur unique
- 🌗 Mode sombre/clair
- 🌍 Support multilingue (français/anglais)
- 📌 Stockage des activités via Zustand (bientôt persisté dans `localStorage`)

### Technologies utilisées
- **Frontend** : Next.js, TypeScript, Zustand
- **UI** : ShadCN/UI, Tailwind CSS
- **Internationalisation** : i18n

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
Je travaille seul sur ce projet mais les contributions sont les bienvenues !  
Vous pouvez proposer des améliorations via pull request ou ouvrir des issues pour signaler des bugs

### TODO
- [ ] Persistance des activités via `localStorage`
- [ ] Amélioration du design des cartes avec possibilité de modifier les activités
- [ ] Ajout d'un mode statistiques avancées pour garder en mémoire les précédentes semaines
- [ ] Ajout d'un guide d'utilisation (onBoarding) à la première connexion 

#### Et pour la suite
- [ ] Possiblité de s'authentifier
- [ ] Sauvegarde des activités en base de données pour permettre un accès sur plusieurs appareils
- [ ] Pouvoir choisir sa progression : journalière / hebdomadaire / mensuelle...

## Licence

Ce projet est open source et disponible sous la [licence MIT](./LICENSE).  





## English

## Description
Activity Timer is a web application that allows users to track and manage their activities with a weekly goal. It provides precise tracking of time spent on each activity and enables easy addition, modification, and deletion of entries.

## Features
- 🎯 Create activities with a weekly goal (in hours and minutes)
- ⏱️ Built-in timer to track time spent
- 📊 Weekly progress display with a progress bar
- 🎨 Customize each activity with a unique color
- 🌗 Light/Dark mode support
- 🌍 Multilingual support (French/English)
- 📌 Activity storage using Zustand (soon to be persisted in `localStorage`)

## Technologies Used
- **Frontend**: Next.js, TypeScript, Zustand
- **UI**: ShadCN/UI, Tailwind CSS
- **Internationalization**: i18n

## Installation & Usage
### Prerequisites
- Node.js (v18+ recommended)
- pnpm (or npm/yarn)

### Installation
```sh
# Clone the project
git clone https://github.com/Yoann-Guion/activity-timer.git 
# or
git clone git@github.com:Yoann-Guion/activity-timer.git
cd activity-timer

# Install dependencies
pnpm install
```

### Run the project in development mode
```sh
pnpm dev
```
Access the application at `http://localhost:3000`.

## Contribution
I am currently working on this project alone, but contributions are more than welcome!  
You can suggest improvements via pull requests or open issues to report bugs.


## TODO
- [ ] Persist activities via `localStorage`
- [ ] Improve card design with editing functionality
- [ ] Add an advanced statistics mode to track previous weeks
- [ ] Implement an onboarding guide for first-time users

### Future Plans
- [ ] Implement user authentication
- [ ] Store activities in a database to allow multi-device access
- [ ] Choose your progress: daily / weekly / monthly...

## License

This project is open source and available under the [MIT License](./LICENSE).  





