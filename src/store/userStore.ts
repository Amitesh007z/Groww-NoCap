import { create } from "zustand";
import { persist } from "zustand/middleware";
import { demoUser } from "../data/user";
import type { PathId } from "../types/goal";
import type { ExperienceLevel, Interest, User } from "../types/user";

type UserState = {
  user: User;
  selectedPathId?: PathId;
  setUser: (patch: Partial<User>) => void;
  setPath: (id: PathId) => void;
  completeOnboarding: (input: {
    familiarity: ExperienceLevel;
    interests: Interest[];
    currentSavings: number;
    currentInvestments: number;
    monthlyInvestable: number;
  }) => void;
  reset: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: demoUser,
      selectedPathId: undefined,
      setUser: (patch) => set((s) => ({ user: { ...s.user, ...patch } })),
      setPath: (id) => set({ selectedPathId: id }),
      completeOnboarding: (input) =>
        set((s) => ({
          user: {
            ...s.user,
            onboardingComplete: true,
            familiarity: input.familiarity,
            interests: input.interests,
            currentSavings: input.currentSavings,
            currentInvestments: input.currentInvestments,
            monthlyInvestable: input.monthlyInvestable,
            experience:
              input.familiarity === "new"
                ? "beginner"
                : input.familiarity === "markets"
                  ? "advanced"
                  : "beginner-intermediate",
          },
        })),
      reset: () => set({ user: { ...demoUser, onboardingComplete: false }, selectedPathId: undefined }),
    }),
    { name: "nocap-user" },
  ),
);
