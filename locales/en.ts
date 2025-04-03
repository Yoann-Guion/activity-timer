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
  },
} as const;
