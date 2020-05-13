export default {
  pieAllTags: {
    name: "Pie Chart: All Tags",
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
  lineAllDecks: {
    name: "Line Chart: All Decks",
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
  calendarTime: {
    name: "Calendar: Time Taken",
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
