import type { IpoIssue } from "../types/investment";

export const novaIpo: IpoIssue = {
  id: "nova",
  name: "Nova Mobility Ltd.",
  ticker: "NOVA",
  priceBand: "₹410 – ₹430",
  lotSize: 34,
  issueSize: "₹2,800 Cr",
  subscription: "12.4×",
  about: "A fictional company building everyday mobility products. DEMO DATA only.",
};

export const ipoLessons = [
  { id: "1", title: "What is an IPO?", body: "A company offers shares to the public for the first time. You are buying ownership, not a listing-day lottery ticket." },
  { id: "2", title: "Why is this company raising money?", body: "In this demo, Nova Mobility is raising capital to expand manufacturing. Real IPOs disclose this in the RHP." },
  { id: "3", title: "What are you paying?", body: "The upper band is ₹430. Price is what you pay; the business is what you get. Valuation still needs attention." },
  { id: "4", title: "What could go right?", body: "The product could scale, and a long horizon could absorb listing volatility." },
  { id: "5", title: "What could go wrong?", body: "High valuation, sector concentration, and execution risk can all sit together." },
  { id: "6", title: "What does subscription mean?", body: "12.4× means demand exceeded supply in this demo. It is popularity, not a quality certificate." },
];
