export default {
  // Common reusable elements
  common: {
    appName: "Trackivity",
    metadataDescription:
      "Suivez le temps passé sur vos activités et atteignez vos objectifs hebdomadaires !",
    accessibility: {
      openMenu: "Ouvrir le menu d'options pour {name}",
      edit: "Modifier {name}",
      delete: "Supprimer {name}",
      viewDetails: "Voir les détails de {name}",
      activityOptions: "Options pour l'activité {name}",
    },
    actions: {
      start: "Démarrer",
      pause: "Pause",
      stop: "Arrêter",
      cancel: "Annuler",
      create: "Créer",
      save: "Enregistrer",
      resume: "Reprendre",
      details: "Détails",
      edit: "Modifier",
      delete: "Supprimer",
      inProgress: "En cours...",
    },
    emptyState: {
      noActivities: "Aucune activité pour le moment",
      createFirst: "Commencez par créer une activité pour suivre votre temps",
    },
    time: {
      hours: "Heures",
      minutes: "Minutes",
      weekly: "hebdomadaire",
    },
  },

  accessibility: {
    weekSelector: {
      weekSelector: "Sélecteur de semaine",
      selectWeekButton: "Sélectionner une semaine",
      selectedWeekLabel: "Semaine sélectionnée",
      availableWeeks: "Semaines disponibles",
      currentWeekLabel: "Semaine actuelle",
    },
  },

  // Navigation
  nav: {
    home: "Accueil",
    add: "Nouvelle activité",
    timer: "Chronomètre",
    summary: "Résumé",
    legal: "Mentions légales",
    srOnly: {
      home: "Aller à la page d'accueil",
      add: "Ajouter une nouvelle activité",
      timer: "Accéder au chronomètre",
      summary: "Voir le résumé des activités",
      mainNavigation: "Navigation principale",
      navigationMenu: "Menu de navigation",
      preferencesSection: "Préférences d'affichage et langue",
      languageSelection: "Sélection de la langue",
      theme: "Changer le thème",
      openSettings: "Ouvrir le menu des paramètres",
      settingsMenu: "Menu des paramètres",
      settingsOptions: "Préférences d'affichage, langue et mentions légales",
      switchToLight: "Passer au mode clair",
      switchToDark: "Passer au mode sombre",
      legalPageLink: "Voir les mentions légales",
    },
  },

  // Pages
  pages: {
    // Home page
    home: {
      title: "Mes activités",
      newActivity: "Nouvelle activité",
      createFirst: "Créer ma première activité",
      weeklyProgress: "Progression hebdo",
      timerAlreadyRunning: {
        title:
          "Un chronomètre est déjà en cours. Veuillez l'arrêter avant d'en démarrer un nouveau.",
        link: "Aller à la page Chronomètre",
      },
      editActivity: {
        title: "Modifier l'activité",
        description: "Ajustez les détails de votre activité selon vos besoins",
        name: "Nom",
        weeklyGoal: "Objectif",
        color: "Couleur",
      },
      deleteActivity: {
        title: "Supprimer l'activité",
        description:
          "Êtes-vous sûr de vouloir supprimer l'activité {activity.name} ? Cette action est irréversible.",
      },
    },

    // New activity page
    newActivity: {
      title: "Nouvelle Activité",
      description:
        "Créez une nouvelle activité avec un objectif de temps hebdomadaire",
      form: {
        name: {
          label: "Nom de l'activité",
          placeholder: "Ex: Piano, Lecture, Sport...",
        },
        weeklyGoal: {
          label: "Objectif hebdomadaire",
        },
        color: {
          label: "Couleur",
        },
        timeMissing: {
          title: "Veuillez remplir l'objectif hebdomadaire",
          description: "L'objectif hebdomadaire doit être supérieur à 0",
        },
        validationError: {
          title: "Création impossible",
          description: "Merci de vérifier les informations saisies.",
        },
      },
    },

    // Activity details page
    details: {
      noActivity: {
        title: "Activité non trouvée",
        description: "Cette activité n'existe pas ou a été supprimée.",
        link: "Retourner à l'accueil",
      },
      createdAt: "créé le ",
      totalProgress: "Progression totale",
      sessionHistory: "Historique des sessions",
      table: {
        caption: "Historique des sessions pour l'activité ",
        start: "Début",
        end: "Fin",
        duration: "Durée",
        progress: "Progression",
      },
    },

    // Timer page
    timer: {
      title: "Chronomètre",
      description: "Suivez le temps passé sur vos activités",
      selectActivity: "Choisir une activité",
      selectPlaceholder: "Sélectionner une activité",
      noActivities: "Aucune activité disponible",
      chooseActivity: "Sélectionnez une activité et démarrez le chronomètre",
      goal: "Objectif",
      progress: "Progression",
      sessionStarted: "Session démarrée à",
    },

    // Summary page
    summary: {
      title: "Résumé Hebdomadaire",
      currentWeek: "Semaine en cours : ",
      selectedWeek: "Semaine sélectionnée : ",
      inputPlaceholder: "Sélectionner une semaine",
      dateRange: "du {start} au {end}",
      overview: {
        title: "Vue d'ensemble",
        description: "Progression globale de vos activités cette semaine",
      },
      goalReached: "Objectif atteint !",
      goalProgress: " de l'objectif",
      remaining: " restants",
      extra: "+{time}",
      stats: {
        goalsReached: {
          title: "Objectifs atteints",
          completed: "activités complétées",
        },
        totalTime: {
          title: "Temps total",
          thisWeek: "cette semaine",
        },
      },
    },

    // Legal page
    legal: {
      mainTitle: "Mentions légales",
      title: {
        siteOwner: "Propriétaire du site",
        hosting: "Hébergeur",
        liability: "Responsabilité",
        data: "Collecte de données personnelles",
        cookies: "Cookies",
        propertie: "Code source et propriété intellectuelle",
        law: "Droit applicable",
        lastUpdate: "Dernière mise à jour",
      },
      text: {
        name: "Nom : ",
        email: "Adresse e-mail : ",
        website: "Site web : ",
        hostingWebsite: "Site web de l'hébergeur : ",
        liability:
          "Le contenu de ce site est fourni à titre informatif. Bien que des efforts soient faits pour maintenir l'exactitude des informations, l'auteur ne peut garantir leur exactitude ni leur exhaustivité.",
        data: "Ce site utilise Vercel Analytics et Speed Insights pour collecter des données anonymes sur la fréquentation et la performance du site (par exemple : nombre de visiteurs, pages vues, temps de chargement, interactions, etc.). Ces données sont utilisées à des fins statistiques et d’optimisation, et ne permettent pas d’identifier les utilisateurs individuellement. En utilisant ce site, vous consentez à la collecte de ces données.",
        cookies:
          "Ce site n'utilise pas de cookies à des fins de suivi ou de personnalisation pour le moment. Cependant, il est possible que des cookies nécessaires au bon fonctionnement de certaines fonctionnalités (comme les outils d'analyse) soient installés.",
        propertie:
          "Le code source de cette application est open source et disponible sur GitHub sous licence MIT. Vous êtes libre de l’utiliser, le modifier et le redistribuer, tant que vous respectez les conditions de la licence. Les ressources utilisées dans cette application (comme les icônes Lucide ou les composants Shadcn) sont elles aussi sous licence open source, selon les conditions de leurs auteurs respectifs.",
        law: "Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents.",
        lastUpdate: "Ces mentions légales ont été mises à jour le {date}.",
      },
    },
  },
} as const;
