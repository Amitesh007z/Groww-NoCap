import type { Goal } from "./goal";
import type { DecisionRecord, PortfolioSnapshot } from "./investment";
import type { User } from "./user";

export type IntelligenceType =
  | "LEARN"
  | "SIMULATE"
  | "REVIEW"
  | "GOAL"
  | "GUARD"
  | "DO_NOTHING";

export type NextAction = {
  type: IntelligenceType;
  title: string;
  reason: string;
  whySeeingThis: string;
  cta: string;
  href: string;
};

export type KnowledgeArea =
  | "mutualFunds"
  | "stocks"
  | "ipo"
  | "valuation"
  | "fno"
  | "cashFlow"
  | "volatility"
  | "sip"
  | "diversification";

export type Knowledge = Record<KnowledgeArea, number>;

export type Behavior = {
  patience: number;
  diversification: number;
  lossSensitivity: number;
  fomoTendency: number;
  consistency: number;
};

export type MarketContext = {
  dropActive: boolean;
  eventId?: string;
  marketChange: number;
  portfolioChange: number;
};

export type InvestorProgress = {
  conceptsLearned: number;
  simulations: number;
  decisions: number;
  missions: number;
};

export type InvestorContext = {
  user: User;
  goals: Goal[];
  portfolio: PortfolioSnapshot;
  knowledge: Knowledge;
  behavior: Behavior;
  simulations: {
    completed: Record<string, boolean>;
    active?: { simulationId: string; currentStep: number; paused: boolean };
  };
  decisions: DecisionRecord[];
  missions: { completed: string[] };
  marketContext: MarketContext;
  progress: InvestorProgress;
  selectedPathId?: string;
};

export type AppEventType =
  | "GOAL_CREATED"
  | "PATH_SELECTED"
  | "SIMULATION_STARTED"
  | "SIMULATION_COMPLETED"
  | "CONCEPT_VIEWED"
  | "MISSION_COMPLETED"
  | "DECISION_STARTED"
  | "DECISION_RECORDED"
  | "PORTFOLIO_CHANGED"
  | "MARKET_EVENT_TRIGGERED"
  | "GUARD_TRIGGERED";
