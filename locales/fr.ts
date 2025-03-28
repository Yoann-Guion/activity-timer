export default {
  // Common reusable elements
  common: {
    appName: "Activity Timer",
    actions: {
      start: "Démarrer",
      pause: "Pause",
      stop: "Arrêter",
      cancel: "Annuler",
      create: "Créer",
      save: "Enregistrer",
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

  // Navigation
  nav: {
    home: "Accueil",
    add: "Ajouter",
    timer: "Chronomètre",
    summary: "Résumé",
  },

  // Pages
  pages: {
    // Home page
    home: {
      title: "Mes activités",
      newActivity: "Nouvelle activité",
      createFirst: "Créer ma première activité",
      weeklyProgress: "Progression hebdomadaire",
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
      currentWeek: "Semaine en cours",
      dateRange: "du {start} au {end}",
      overview: {
        title: "Vue d'ensemble",
        description: "Progression globale de vos activités cette semaine",
      },
      goalReached: "Objectif atteint !",
      goalProgress: "{percentage}% de l'objectif",
      remaining: "{time} restants",
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
  },
} as const;
