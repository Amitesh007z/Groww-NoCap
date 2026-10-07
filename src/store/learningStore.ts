import { create } from "zustand";
import { persist } from "zustand/middleware";
import { defaultBehavior, defaultKnowledge } from "../data/user";
import type { Knowledge, KnowledgeArea, Behavior } from "../types/intelligence";
import { clamp } from "../utils/calculations";

type LearningState = {
  knowledge: Knowledge;
  behavior: Behavior;
  viewedConcepts: string[];
  completedMissions: string[];
  viewConcept: (id: string, area?: KnowledgeArea) => void;
  completeMission: (id: string, area?: KnowledgeArea) => void;
  applyBehavior: (signals: string[]) => void;
  reset: () => void;
};

function bump(knowledge: Knowledge, area: KnowledgeArea, delta: number): Knowledge {
  return { ...knowledge, [area]: clamp(knowledge[area] + delta) };
}

export const useLearningStore = create<LearningState>()(
  persist(
    (set) => ({
      knowledge: defaultKnowledge,
      behavior: defaultBehavior,
      viewedConcepts: [],
      completedMissions: [],
      viewConcept: (id, area) =>
        set((s) => ({
          viewedConcepts: s.viewedConcepts.includes(id) ? s.viewedConcepts : [...s.viewedConcepts, id],
          knowledge: area ? bump(s.knowledge, area, 0.08) : s.knowledge,
        })),
      completeMission: (id, area) =>
        set((s) => ({
          completedMissions: s.completedMissions.includes(id) ? s.completedMissions : [...s.completedMissions, id],
          knowledge: area ? bump(s.knowledge, area, 0.25) : s.knowledge,
        })),
      applyBehavior: (signals) =>
        set((s) => {
          const b = { ...s.behavior };
          for (const signal of signals) {
            if (signal === "sell") b.lossSensitivity = Math.min(100, b.lossSensitivity + 20);
            if (signal === "hold") b.patience = Math.min(100, b.patience + 10);
            if (signal === "buy_dip") b.consistency = Math.min(100, b.consistency + 8);
            if (signal === "fomo") b.fomoTendency = Math.min(100, b.fomoTendency + 15);
            if (signal === "diversify") b.diversification = Math.min(100, b.diversification + 10);
            if (signal === "unsure") b.lossSensitivity = Math.min(100, b.lossSensitivity + 8);
          }
          return { behavior: b };
        }),
      reset: () =>
        set({
          knowledge: defaultKnowledge,
          behavior: defaultBehavior,
          viewedConcepts: [],
          completedMissions: [],
        }),
    }),
    { name: "nocap-learning" },
  ),
);
