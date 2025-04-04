export default {
  // Common reusable elements
  common: {
    appName: "Activity Timer",
    actions: {
      start: "Start",
      pause: "Pause",
      stop: "Stop",
      cancel: "Cancel",
      create: "Create",
      save: "Save",
      resume: "Resume",
      delete: "Delete",
    },
    emptyState: {
      noActivities: "No activities yet",
      createFirst: "Start by creating an activity to track your time",
    },
    time: {
      hours: "Hours",
      minutes: "Minutes",
      weekly: "weekly",
    },
  },

  // Navigation
  nav: {
    home: "Home",
    add: "Add",
    timer: "Timer",
    summary: "Summary",
    legal: "Legal Notices",
    srOnly: {
      theme: "Change theme",
      language: "Change language",
    },
  },

  // Pages
  pages: {
    // Home page
    home: {
      title: "My activities",
      newActivity: "New activity",
      createFirst: "Create my first activity",
      weeklyProgress: "Weekly progress",
      timerAlreadyRunning: {
        title:
          "An active timer is already running. Please stop it before starting a new one.",
        link: "Go to the Timer page",
      },
      editActivity: {
        title: "Edit activity",
        description: "Adjust your activity details as needed",
        name: "Name",
        weeklyGoal: "Goal",
        color: "Color",
      },
      deleteActivity: {
        title: "Delete activity",
        description:
          "Are you sure you want to delete the activity {activity.name}? This action is irreversible.",
      },
    },

    // New activity page
    newActivity: {
      title: "New activity",
      description: "Create a new activity with a weekly time goal",
      form: {
        name: {
          label: "Activity name",
          placeholder: "Ex: Piano, Reading, Sports...",
        },
        weeklyGoal: {
          label: "Weekly goal",
        },
        color: {
          label: "Color",
        },
        timeMissing: {
          title: "Please fill in the weekly goal",
          description: "The weekly goal must be greater than 0",
        },
      },
    },

    // Timer page
    timer: {
      title: "Timer",
      description: "Track time spent on your activities",
      selectActivity: "Choose an activity",
      selectPlaceholder: "Select an activity",
      noActivities: "No activities available",
      chooseActivity: "Select an activity and start the timer",
      goal: "Goal",
      progress: "Progress",
      sessionStarted: "Session started at",
    },

    // Summary page
    summary: {
      title: "Weekly Summary",
      currentWeek: "Current week",
      dateRange: "from {start} to {end}",
      overview: {
        title: "Overview",
        description: "Global progress of your activities this week",
      },
      goalReached: "Goal reached!",
      goalProgress: " of goal",
      remaining: " remaining",
      extra: "+{time}",
      stats: {
        goalsReached: {
          title: "Goals reached",
          completed: "activities completed",
        },
        totalTime: {
          title: "Total time",
          thisWeek: "this week",
        },
      },
    },

    // Legal page
    legal: {
      mainTitle: "Legal notices",
      title: {
        siteOwner: "Website Owner",
        hosting: "Hosting Provider",
        liability: "Liability",
        data: "Personal Data Collection",
        cookies: "Cookies",
        ip: "Intellectual Property",
        credits: "Credits and Resources Used",
        law: "Applicable Law",
        lastUpdate: "Last Update",
      },
      text: {
        name: "Name: ",
        email: "Email address: ",
        website: "Website: ",
        hostingWebsite: "Hosting provider's website: ",
        liability:
          "The content of this website is provided for informational purposes only. While efforts are made to maintain the accuracy of the information, the author cannot guarantee its accuracy or completeness.",
        data: "This site uses Vercel Analytics to collect anonymous data about site traffic and usage (for example, number of visitors, page views, etc.). This data is used for statistical purposes and does not identify individual users. By using this site, you consent to the collection of this data.",
        cookies:
          "This site does not currently use cookies for tracking or personalization purposes. However, cookies necessary for the proper functioning of certain features (such as analytics tools) may be installed.",
        ip: "All elements on this site (texts, images, logos, etc.) are the exclusive property of the author, unless otherwise stated. Any reproduction, distribution, or modification without prior authorization is prohibited.",
        credits: {
          before: "This site uses icons from ",
          linkText: "Lucide",
          after: ", an open-source library under MIT license.",
        },
        law: "These legal notices are subject to French law. In case of dispute, French courts shall have exclusive jurisdiction.",
        lastUpdate: "These legal notices were last updated on {date}.",
      },
    },
  },
} as const;
