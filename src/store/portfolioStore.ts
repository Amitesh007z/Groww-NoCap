import { create } from "zustand";
import { persist } from "zustand/middleware";
import { demoHoldings } from "../data/portfolio";
import type { DecisionRecord, Holding } from "../types/investment";

type PortfolioState = {
  holdings: Holding[];
  decisions: DecisionRecord[];
  recordDecision: (decision: DecisionRecord) => void;
  applyMarketMove: (pct: number) => void;
  restoreHoldings: () => void;
  reset: () => void;
};

function totals(holdings: Holding[]) {
  const invested = holdings.reduce((s, h) => s + h.invested, 0);
  const total = holdings.reduce((s, h) => s + h.current, 0);
  return { invested, total, returns: total - invested };
}

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set) => ({
      holdings: demoHoldings,
      decisions: [],
      recordDecision: (decision) =>
        set((s) => {
          const exists = s.holdings.find((h) => h.symbol === "NOVA");
          const holdings = exists
            ? s.holdings.map((h) =>
                h.symbol === "NOVA"
                  ? { ...h, invested: h.invested + decision.amount, current: h.current + decision.amount }
                  : h,
              )
            : [
                ...s.holdings,
                {
                  symbol: "NOVA",
                  name: decision.assetName,
                  invested: decision.amount,
                  current: decision.amount,
                  sector: "Technology",
                },
              ];
          return { holdings, decisions: [...s.decisions, decision] };
        }),
      applyMarketMove: (pct) =>
        set((s) => ({
          holdings: s.holdings.map((h) => ({ ...h, current: Math.round(h.current * (1 + pct / 100)) })),
        })),
      restoreHoldings: () => set({ holdings: demoHoldings }),
      reset: () => set({ holdings: demoHoldings, decisions: [] }),
    }),
    { name: "nocap-portfolio" },
  ),
);

export function getPortfolioSnapshot(holdings: Holding[]) {
  return { holdings, ...totals(holdings) };
}
