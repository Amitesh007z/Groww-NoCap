export type SimulationCategory = "market" | "ipo" | "fno" | "portfolio";
export type SimulationDifficulty = "beginner" | "intermediate" | "advanced";

export type SimulationChoice = {
  id: string;
  label: string;
  consequence: string;
  behavioralSignal?: "hold" | "sell" | "buy_dip" | "unsure" | "fomo" | "diversify";
  nextValueDelta?: number;
};

export type SimulationStep = {
  id: string;
  title: string;
  marketContext: string;
  portfolioValue: number;
  event: string;
  choices: SimulationChoice[];
};

export type Simulation = {
  id: string;
  title: string;
  description: string;
  category: SimulationCategory;
  difficulty: SimulationDifficulty;
  estimatedMinutes: number;
  steps: SimulationStep[];
};

export type SimulationRun = {
  simulationId: string;
  currentStep: number;
  choices: { stepId: string; choiceId: string }[];
  portfolioValue: number;
  paused: boolean;
  completed: boolean;
};

export type SimulationResult = {
  decisionConsistency: number;
  volatilityTolerance: "Low" | "Medium" | "High";
  diversificationAwareness: "Developing" | "Strong";
  lossSensitivity: "Low" | "Medium" | "High";
  noticed: string;
  explore: string;
  exploreHref: string;
};
