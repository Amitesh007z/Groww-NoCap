import { useMemo } from "react";
import type { InvestorContext } from "../types/intelligence";
import { useAppStore } from "../store/appStore";
import { useGoalStore } from "../store/goalStore";
import { useLearningStore } from "../store/learningStore";
import { getPortfolioSnapshot, usePortfolioStore } from "../store/portfolioStore";
import { useSimulationStore } from "../store/simulationStore";
import { useUserStore } from "../store/userStore";

export function useInvestorContext(): InvestorContext {
  const user = useUserStore((s) => s.user);
  const selectedPathId = useUserStore((s) => s.selectedPathId);
  const goal = useGoalStore((s) => s.goal);
  const holdings = usePortfolioStore((s) => s.holdings);
  const decisions = usePortfolioStore((s) => s.decisions);
  const knowledge = useLearningStore((s) => s.knowledge);
  const behavior = useLearningStore((s) => s.behavior);
  const viewedConcepts = useLearningStore((s) => s.viewedConcepts);
  const completedMissions = useLearningStore((s) => s.completedMissions);
  const completed = useSimulationStore((s) => s.completed);
  const active = useSimulationStore((s) => s.active);
  const market = useAppStore((s) => s.market);

  return useMemo(
    () => ({
      user,
      goals: [goal],
      portfolio: getPortfolioSnapshot(holdings),
      knowledge,
      behavior,
      simulations: {
        completed,
        active: active
          ? { simulationId: active.simulationId, currentStep: active.currentStep, paused: active.paused }
          : undefined,
      },
      decisions,
      missions: { completed: completedMissions },
      marketContext: market,
      progress: {
        conceptsLearned: viewedConcepts.length,
        simulations: Object.values(completed).filter(Boolean).length,
        decisions: decisions.length,
        missions: completedMissions.length,
      },
      selectedPathId,
    }),
    [
      user,
      selectedPathId,
      goal,
      holdings,
      decisions,
      knowledge,
      behavior,
      viewedConcepts,
      completedMissions,
      completed,
      active,
      market,
    ],
  );
}
