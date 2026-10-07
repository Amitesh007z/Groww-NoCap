import { useGoalStore } from "../store/goalStore";

export function useGoal() {
  return useGoalStore();
}
