export const marketEvents = [
  {
    id: "covid",
    name: "2020 Market Crash",
    marketChange: -27,
    duration: 5,
    type: "historical-replay" as const,
  },
  {
    id: "rate",
    name: "Rate Shock",
    marketChange: -14,
    duration: 4,
    type: "historical-replay" as const,
  },
  {
    id: "guard-drop",
    name: "Market Drop",
    marketChange: -8.2,
    portfolioChange: -6.8,
    duration: 1,
    type: "live-demo" as const,
  },
];
