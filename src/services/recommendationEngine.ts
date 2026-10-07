import type { InvestorContext } from "../types/intelligence";
import { nextSkill } from "./intelligenceEngine";

export function recommendAfterMission(context: InvestorContext) {
  return nextSkill(context);
}

export function whyThisRecommendation(context: InvestorContext, topic: string): string {
  if (topic === "valuation") {
    return "You've explored stocks but haven't yet looked at valuation.";
  }
  if (topic === "fno") {
    return "F&O showed up in your interests, and leverage still needs a simulation.";
  }
  if (context.marketContext.dropActive) {
    return "The market moved. Your goal context matters more than the headline.";
  }
  return "This is the next useful step on the path you chose.";
}
