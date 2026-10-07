import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SimulationRun } from "../types/simulation";

type SimulationState = {
  completed: Record<string, boolean>;
  active?: SimulationRun;
  lastResultId?: string;
  setActive: (run?: SimulationRun) => void;
  markComplete: (id: string) => void;
  reset: () => void;
};

export const useSimulationStore = create<SimulationState>()(
  persist(
    (set) => ({
      completed: {},
      active: undefined,
      lastResultId: undefined,
      setActive: (run) => set({ active: run }),
      markComplete: (id) =>
        set((s) => ({
          completed: { ...s.completed, [id]: true },
          lastResultId: id,
          active: undefined,
        })),
      reset: () => set({ completed: {}, active: undefined, lastResultId: undefined }),
    }),
    { name: "nocap-sim" },
  ),
);
