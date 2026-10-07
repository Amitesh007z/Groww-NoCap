import { useMemo } from "react";
import { getNextBestAction, nextSkill } from "../services/intelligenceEngine";
import { useInvestorContext } from "./useInvestorContext";
import { behaviorLabel } from "../utils/calculations";

export function useInvestorDNA() {
  const context = useInvestorContext();
  const action = useMemo(() => getNextBestAction(context), [context]);
  const skill = useMemo(() => nextSkill(context), [context]);
  return {
    context,
    action,
    skill,
    labels: {
      patience: behaviorLabel(context.behavior.patience),
      diversification: behaviorLabel(context.behavior.diversification),
      lossSensitivity: behaviorLabel(context.behavior.lossSensitivity),
      fomoTendency: behaviorLabel(context.behavior.fomoTendency),
      consistency: behaviorLabel(context.behavior.consistency),
    },
  };
}
