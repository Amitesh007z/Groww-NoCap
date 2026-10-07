export type ConceptCategory =
  | "Stocks"
  | "Mutual Funds"
  | "IPO"
  | "F&O"
  | "Portfolio"
  | "Basics";

export type Concept = {
  id: string;
  title: string;
  category: ConceptCategory;
  what: string;
  why: string;
  soWhat: string;
  watchOut: string;
  tryIt: string;
  tryHref: string;
  related: string[];
  example?: string;
};

export type Mission = {
  id: string;
  number: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  minutes: number;
  reward: string;
  href: string;
  conceptId?: string;
  simulationId?: string;
};
