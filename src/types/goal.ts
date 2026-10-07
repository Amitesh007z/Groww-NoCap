import type { GoalCategory } from "./user";

export type GoalStatus = "ahead" | "on-track" | "behind";

export type Goal = {
  id: string;
  name: string;
  category: GoalCategory;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  years: number;
  progress: number;
  status: GoalStatus;
  monthsAhead: number;
};

export type PathId = "steady" | "growth" | "explorer";

export type InvestmentPath = {
  id: PathId;
  title: string;
  complexityLabel: string;
  volatility: string;
  learning: string;
  involvement: string;
  bestFor: string;
  tradeOff: string;
  comparison: Record<string, string>;
  allocation: { core: number; explorer: number; learning: number };
  why: string[];
};
