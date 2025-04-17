import { Description } from "@radix-ui/react-dialog";
import { access, link } from "fs";

export default {
  // Common reusable elements
  common: {
    appName: "Activity Timer",
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
    legal: "Mentions légales",
    srOnly: {
      theme: "Changer le thème",
      language: "Changer la langue",
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
        data: "Ce site utilise Vercel Analytics pour collecter des données anonymes sur la fréquentation et l'utilisation du site (par exemple, le nombre de visiteurs, les pages vues, etc.). Ces données sont utilisées à des fins statistiques et ne permettent pas d'identifier les utilisateurs individuellement. En utilisant ce site, vous consentez à la collecte de ces données.",
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
