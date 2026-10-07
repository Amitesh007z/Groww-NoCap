import type { User } from "../types/user";
import type { Behavior, Knowledge } from "../types/intelligence";

export const demoUser: User = {
  id: "user_001",
  name: "Amitesh",
  age: 21,
  experience: "beginner-intermediate",
  income: 65000,
  monthlyInvestable: 12000,
  onboardingComplete: false,
  familiarity: "basics",
  interests: ["Stocks", "Mutual Funds", "Long-term investing"],
  currentSavings: 84000,
  currentInvestments: 200000,
};

export const defaultKnowledge: Knowledge = {
  mutualFunds: 0.9,
  stocks: 0.7,
  ipo: 0.6,
  valuation: 0.4,
  fno: 0.2,
  cashFlow: 0.25,
  volatility: 0.45,
  sip: 0.85,
  diversification: 0.8,
};

export const defaultBehavior: Behavior = {
  patience: 72,
  diversification: 78,
  lossSensitivity: 64,
  fomoTendency: 48,
  consistency: 74,
};
