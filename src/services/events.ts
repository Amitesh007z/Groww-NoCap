import type { AppEventType, KnowledgeArea } from "../types/intelligence";
import { useAppStore } from "../store/appStore";
import { useLearningStore } from "../store/learningStore";
import { useSimulationStore } from "../store/simulationStore";
import { useUserStore } from "../store/userStore";
import { usePortfolioStore } from "../store/portfolioStore";
import type { PathId } from "../types/goal";

const conceptArea: Record<string, KnowledgeArea> = {
  pe: "valuation",
  valuation: "valuation",
  eps: "valuation",
  "cash-flow": "cashFlow",
  sip: "sip",
  diversification: "diversification",
  volatility: "volatility",
  drawdown: "volatility",
  ipo: "ipo",
  leverage: "fno",
  margin: "fno",
  expiry: "fno",
  "call-option": "fno",
  "put-option": "fno",
  "loss-mechanics": "fno",
  "mutual-funds": "mutualFunds",
  "expense-ratio": "mutualFunds",
  nav: "mutualFunds",
  etf: "mutualFunds",
};

export function emit(type: AppEventType, detail?: string) {
  useAppStore.getState().logEvent(type, detail);

  if (type === "PATH_SELECTED" && detail) {
    useUserStore.getState().setPath(detail as PathId);
  }

  if (type === "CONCEPT_VIEWED" && detail) {
    useLearningStore.getState().viewConcept(detail, conceptArea[detail]);
  }

  if (type === "MISSION_COMPLETED" && detail) {
    const area =
      detail === "pe-mission"
        ? "valuation"
        : detail === "ipo-mission"
          ? "ipo"
          : detail === "leverage-mission"
            ? "fno"
            : "volatility";
    useLearningStore.getState().completeMission(detail, area);
  }

  if (type === "SIMULATION_COMPLETED" && detail) {
    useSimulationStore.getState().markComplete(detail);
  }

  if (type === "GUARD_TRIGGERED") {
    useAppStore.getState().triggerMarketDrop();
  }
}

export function startGuardEvent() {
  const already = useAppStore.getState().market.dropActive;
  emit("GUARD_TRIGGERED");
  if (!already) usePortfolioStore.getState().applyMarketMove(-6.8);
}

export { conceptArea };
