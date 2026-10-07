import type { Holding } from "../types/investment";

export const demoHoldings: Holding[] = [
  { symbol: "NOVA", name: "Nova Mobility", invested: 50000, current: 54800, sector: "Technology" },
  { symbol: "INDEX", name: "Nifty Index Fund", invested: 120000, current: 134500, sector: "Diversified" },
  { symbol: "FUND01", name: "Growth Equity Fund", invested: 100000, current: 108500, sector: "Diversified" },
  { symbol: "ETF01", name: "India 50 ETF", invested: 40000, current: 45000, sector: "Index" },
];

export const emptyHoldings: Holding[] = [];
