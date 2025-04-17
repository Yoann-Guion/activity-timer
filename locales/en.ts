export default {
  // Common reusable elements
  common: {
    appName: "Activity Timer",
    accessibility: {
      openMenu: "Open settings menu for {name}",
      edit: "Edit {name}",
      delete: "Delete {name}",
      viewDetails: "See details of {name}",
      activityOptions: "Options for activity {name}",
    },
    actions: {
      start: "Start",
      pause: "Pause",
      stop: "Stop",
      cancel: "Cancel",
      create: "Create",
      save: "Save",
      resume: "Resume",
      details: "Details",
      edit: "Edit",
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
        validationError: {
          title: "Creation impossible",
          description: "Please check the information you have entered",
        },
      },
    },

    // Activity details page
    details: {
      noActivity: {
        title: "Activity not found",
        description: "The activity you are looking for does not exist.",
        link: "Go back to the home page",
      },
      createdAt: "created on ",
      totalProgress: "Total progress",
      sessionHistory: "Session history",
      table: {
        caption: "Session history of ",
        start: "Start",
        end: "End",
        duration: "Duration",
        progress: "Progress",
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
      currentWeek: "Current week : ",
      selectedWeek: "Selected week : ",
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
        propertie: "Source Code and Intellectual Property",
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
        propertie:
          "The source code of this application is open source and available on GitHub under the MIT license. You are free to use, modify, and redistribute it, as long as you comply with the terms of the license. The resources used in this application (such as Lucide icons or Shadcn components) are also open source, under their respective licenses.",
        law: "These legal notices are subject to French law. In case of dispute, French courts shall have exclusive jurisdiction.",
        lastUpdate: "These legal notices were last updated on {date}.",
      },
    },
  },
} as const;
