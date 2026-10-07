export type Holding = {
  symbol: string;
  name: string;
  invested: number;
  current: number;
  sector: string;
};

export type PortfolioSnapshot = {
  holdings: Holding[];
  total: number;
  invested: number;
  returns: number;
};

export type DecisionRecord = {
  id: string;
  assetId: string;
  assetName: string;
  amount: number;
  reason: string;
  thesis: string;
  reconsider: string;
  reviewDate: string;
  createdAt: string;
};

export type IpoIssue = {
  id: string;
  name: string;
  ticker: string;
  priceBand: string;
  lotSize: number;
  issueSize: string;
  subscription: string;
  about: string;
};
