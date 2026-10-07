import { create } from "zustand";
import { persist } from "zustand/middleware";
import { demoGoal } from "../data/goals";
import { computeGoalMetrics } from "../services/goalEngine";
import type { Goal } from "../types/goal";
import type { GoalCategory } from "../types/user";

type GoalState = {
  goal: Goal;
  setGoal: (patch: Partial<Goal>) => void;
  createGoal: (input: {
    category: GoalCategory;
    targetAmount: number;
    years: number;
    currentAmount: number;
    monthlyInvestable: number;
  }) => void;
  addToCurrent: (amount: number) => void;
  reset: () => void;
};

function withMetrics(goal: Goal, monthlyInvestable: number): Goal {
  const metrics = computeGoalMetrics({
    currentAmount: goal.currentAmount,
    targetAmount: goal.targetAmount,
    years: goal.years,
    monthlyInvestable,
  });
  return { ...goal, ...metrics, name: `Build ₹${Math.round(goal.targetAmount / 100000)}L` };
}

export const useGoalStore = create<GoalState>()(
  persist(
    (set) => ({
      goal: demoGoal,
      setGoal: (patch) => set((s) => ({ goal: { ...s.goal, ...patch } })),
      createGoal: (input) => {
        const targetDate = `${2026 + input.years}-12-01`;
        const base: Goal = {
          id: "goal_001",
          name: `Build ₹${Math.round(input.targetAmount / 100000)}L`,
          category: input.category,
          targetAmount: input.targetAmount,
          currentAmount: input.currentAmount,
          targetDate,
          years: input.years,
          progress: 0,
          status: "on-track",
          monthsAhead: 0,
        };
        set({ goal: withMetrics(base, input.monthlyInvestable) });
      },
      addToCurrent: (amount) =>
        set((s) => {
          const currentAmount = s.goal.currentAmount + amount;
          return { goal: withMetrics({ ...s.goal, currentAmount }, 12000) };
        }),
      reset: () => set({ goal: demoGoal }),
    }),
    { name: "nocap-goal" },
  ),
);
