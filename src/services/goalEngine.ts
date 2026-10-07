import type { Goal } from "../types/goal";
import { percent } from "../utils/calculations";

export function computeGoalMetrics(input: {
  currentAmount: number;
  targetAmount: number;
  years: number;
  monthlyInvestable: number;
}): Pick<Goal, "progress" | "status" | "monthsAhead"> & { monthsRemaining: number } {
  const progress = input.targetAmount > 0 ? input.currentAmount / input.targetAmount : 0;
  const monthsRemaining = input.years * 12;
  const expectedByNow = input.targetAmount * 0.22;
  const monthsAhead = input.currentAmount > expectedByNow ? 4 : input.currentAmount > expectedByNow * 0.85 ? 0 : -3;
  const status: Goal["status"] = monthsAhead > 0 ? "ahead" : monthsAhead < 0 ? "behind" : "on-track";
  return { progress, status, monthsAhead, monthsRemaining };
}

export function progressPercent(goal: Goal): number {
  return percent(goal.currentAmount, goal.targetAmount);
}
