export type ExperienceLevel = "new" | "basics" | "invested" | "markets";

export type Interest =
  | "Mutual Funds"
  | "Stocks"
  | "ETFs"
  | "IPOs"
  | "F&O"
  | "Long-term investing"
  | "Understanding markets";

export type GoalCategory =
  | "education"
  | "wealth"
  | "safety"
  | "experience"
  | "purchase"
  | "freedom"
  | "long-term"
  | "other";

export type User = {
  id: string;
  name: string;
  age: number;
  experience: "beginner" | "beginner-intermediate" | "intermediate" | "advanced";
  income: number;
  monthlyInvestable: number;
  onboardingComplete: boolean;
  familiarity: ExperienceLevel;
  interests: Interest[];
  currentSavings: number;
  currentInvestments: number;
};
