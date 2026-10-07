import type { InvestorContext, NextAction } from "../types/intelligence";

export function getNextBestAction(context: InvestorContext): NextAction {
  const goal = context.goals[0];
  const onTrack = goal?.status === "ahead" || goal?.status === "on-track";

  if (context.marketContext.dropActive && context.marketContext.eventId) {
    return {
      type: "GUARD",
      title: "Review your thesis",
      reason: "The market moved, but your original thesis hasn't changed.",
      whySeeingThis: "A demo market drop is active. Guard puts the move in the context of your goal.",
      cta: "Open Groww Guard",
      href: "/guard",
    };
  }

  if (context.user.interests.includes("F&O") && context.knowledge.fno < 0.4 && !context.simulations.completed.fno) {
    return {
      type: "SIMULATE",
      title: "Experience leverage first",
      reason: "F&O behaves differently from long-term investing.",
      whySeeingThis: "You marked F&O as interesting, and you haven't completed the leverage simulation yet.",
      cta: "Try F&O simulator",
      href: "/fno",
    };
  }

  if (context.knowledge.valuation < 0.5 && (context.user.interests.includes("Stocks") || context.selectedPathId === "explorer")) {
    return {
      type: "LEARN",
      title: "Learn valuation",
      reason: "You're exploring individual stocks.",
      whySeeingThis: "You've started looking at stocks, but valuation is still developing.",
      cta: "Learn in 90 sec",
      href: "/lens/pe",
    };
  }

  if (!context.simulations.completed.covid) {
    return {
      type: "SIMULATE",
      title: "Experience a market correction first",
      reason: "You're considering individual stocks.",
      whySeeingThis: "A historical replay is the safest way to feel a 25% drop before real money is involved.",
      cta: "Experience it",
      href: "/sim/covid",
    };
  }

  const tech = context.portfolio.holdings.filter((h) => h.sector === "Technology");
  const techShare = context.portfolio.total
    ? tech.reduce((s, h) => s + h.current, 0) / context.portfolio.total
    : 0;
  if (techShare > 0.25) {
    return {
      type: "REVIEW",
      title: "Your portfolio has become more concentrated in technology.",
      reason: "Technology is a larger slice than before.",
      whySeeingThis: `Technology is now ${Math.round(techShare * 100)}% of this illustrative portfolio.`,
      cta: "Review portfolio",
      href: "/portfolio",
    };
  }

  if (goal && goal.status === "ahead") {
    return {
      type: "GOAL",
      title: `You're ${goal.monthsAhead} months ahead.`,
      reason: "Your goal is moving in the right direction.",
      whySeeingThis: "Illustrative trajectory based on demo assumptions. Markets can vary significantly.",
      cta: "View your path",
      href: "/path",
    };
  }

  if (onTrack) {
    return {
      type: "DO_NOTHING",
      title: "You're on track",
      reason: "Nothing needs your attention today.",
      whySeeingThis: "Your goal and thesis do not require an action in this demo state.",
      cta: "See why",
      href: "/home",
    };
  }

  return {
    type: "DO_NOTHING",
    title: "You're on track",
    reason: "Nothing needs your attention today.",
    whySeeingThis: "Your goal and thesis do not require an action in this demo state.",
    cta: "See why",
    href: "/home",
  };
}

export function nextSkill(context: InvestorContext): { id: string; title: string; why: string; href: string } {
  if (context.knowledge.valuation < 0.65) {
    return {
      id: "valuation",
      title: "Valuation",
      why: "You're exploring individual stocks.",
      href: "/lens/pe",
    };
  }
  if (context.knowledge.cashFlow < 0.6) {
    return {
      id: "cashFlow",
      title: "Cash Flow",
      why: "You now have valuation basics. Cash flow is the next useful check.",
      href: "/lens/cash-flow",
    };
  }
  if (context.knowledge.fno < 0.5 && context.user.interests.includes("F&O")) {
    return {
      id: "fno",
      title: "Leverage",
      why: "You flagged F&O as interesting.",
      href: "/lens/leverage",
    };
  }
  return {
    id: "drawdown",
    title: "Drawdown",
    why: "You have the basics. Next is staying oriented during a fall.",
    href: "/lens/drawdown",
  };
}
