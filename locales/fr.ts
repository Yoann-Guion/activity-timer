export default {
  // Navigation
  navigation: {
    home: "Accueil",
    add: "Ajouter",
    timer: "Chronomètre",
    summary: "Résumé",
  },

  // Home page
  home: {
    title: "Mes Activités",
    newActivity: "Nouvelle Activité",
    emptyState: {
      title: "Aucune activité pour le moment",
      description: "Commencez par créer une activité pour suivre votre temps",
      cta: "Créer ma première activité",
    },
    weeklyProgress: "Progression hebdomadaire",
    start: "Démarrer",
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
        hours: "Heures",
        minutes: "Minutes",
      },
      color: {
        label: "Couleur",
      },
    },
    buttons: {
      cancel: "Annuler",
      create: "Créer",
    },
  },

  // Timer page
  timer: {
    title: "Chronomètre",
    description: "Suivez le temps passé sur vos activités",
    selectActivity: "Choisir une activité",
    selectActivityPlaceholder: "Sélectionner une activité",
    noActivities: "Aucune activité disponible",
    emptyState: {
      description: "Sélectionnez une activité et démarrez le chronomètre",
    },
    goal: "Objectif",
    progress: "Progression",
    sessionStarted: "Session démarrée à",
    buttons: {
      start: "Démarrer",
      pause: "Pause",
      stop: "Arrêter",
    },
  },

  // Summary page
  summary: {
    title: "Résumé Hebdomadaire",
    currentWeek: "Semaine en cours",
    emptyState: {
      title: "Aucune activité pour le moment",
      description: "Créez des activités pour voir votre résumé hebdomadaire",
    },
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

  // Common
  common: {
    appName: "Activity Timer",
  },
};
