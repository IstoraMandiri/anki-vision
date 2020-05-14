export default {
  barAllDecks: {
    name: "Deck Names - Bar",
    data: {
      query: {
        period: "month",
        filter: {},
        select: {
          decks: true,
        },
      },
      graph: {
        type: "bump",
      },
    },
  },
  bumpAllDecks: {
    name: "Deck Names - Bump",
    data: {
      query: {
        period: "month",
        filter: {},
        select: {
          decks: true,
        },
      },
      graph: {
        type: "bump",
      },
    },
  },
  lineAllDecks: {
    name: "Deck Names - Line",
    data: {
      query: {
        period: "month",
        filter: {},
        select: {
          decks: true,
        },
      },
      graph: {
        type: "line",
      },
    },
  },
  pieAllTags: {
    name: "Tags - Pie",
    data: {
      query: {
        period: "all",
        filter: {},
        select: {
          tags: true,
        },
      },
      graph: {
        type: "pie",
      },
    },
  },
  calendarTime: {
    name: "Time Taken - Heatmap",
    data: {
      query: {
        period: "day",
        filter: {},
        select: {
          time: true,
        },
      },
      graph: {
        type: "calendar",
      },
    },
  },
};
