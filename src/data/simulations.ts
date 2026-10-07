import type { Simulation } from "../types/simulation";

export const simulations: Simulation[] = [
  {
    id: "covid",
    title: "Market Replay",
    description: "Experience the 2020 crash.",
    category: "market",
    difficulty: "intermediate",
    estimatedMinutes: 4,
    steps: [
      {
        id: "jan-2020",
        title: "January 2020",
        marketContext: "Stable",
        portfolioValue: 100000,
        event: "You hold 70% diversified, 20% stocks, 10% cash. The market feels calm.",
        choices: [
          {
            id: "continue",
            label: "Continue",
            consequence: "You stay invested as the year begins.",
            behavioralSignal: "hold",
          },
        ],
      },
      {
        id: "mar-2020",
        title: "March 2020",
        marketContext: "-27%",
        portfolioValue: 73000,
        event: "The market has fallen sharply. Your portfolio is ₹73,000.",
        choices: [
          {
            id: "hold",
            label: "Hold",
            consequence: "You chose HOLD. The market fell another 8%. Your portfolio: ₹73,000 → ₹67,160.",
            behavioralSignal: "hold",
            nextValueDelta: -5840,
          },
          {
            id: "sell",
            label: "Sell",
            consequence: "You chose SELL. You locked in the decline and moved to cash.",
            behavioralSignal: "sell",
            nextValueDelta: 0,
          },
          {
            id: "invest-more",
            label: "Invest more",
            consequence: "You chose INVEST MORE. You added to a falling market with money you could afford to wait on.",
            behavioralSignal: "buy_dip",
            nextValueDelta: -4200,
          },
          {
            id: "unsure",
            label: "I'm not sure",
            consequence: "You paused. Uncertainty is information — not a failure.",
            behavioralSignal: "unsure",
            nextValueDelta: -3200,
          },
        ],
      },
      {
        id: "deeper",
        title: "A few weeks later",
        marketContext: "Still weak",
        portfolioValue: 67160,
        event: "Headlines are loud. Your goal is still years away.",
        choices: [
          {
            id: "stay",
            label: "Stay the course",
            consequence: "You kept your original plan in view.",
            behavioralSignal: "hold",
          },
          {
            id: "reduce",
            label: "Reduce risk further",
            consequence: "You cut exposure after losses.",
            behavioralSignal: "sell",
          },
        ],
      },
      {
        id: "recovery",
        title: "The market recovered",
        marketContext: "Recovery",
        portfolioValue: 108700,
        event: "Your decision didn't guarantee this outcome. The simulation shows how decisions interact with market volatility.",
        choices: [
          {
            id: "reflect",
            label: "See what this means",
            consequence: "Portfolio: ₹1,08,700. This is a historical-style replay, not a prediction.",
            behavioralSignal: "hold",
          },
        ],
      },
    ],
  },
  {
    id: "ipo",
    title: "IPO Simulator",
    description: "Would you apply?",
    category: "ipo",
    difficulty: "beginner",
    estimatedMinutes: 3,
    steps: [
      {
        id: "offer",
        title: "Nova Mobility opens",
        marketContext: "IPO price ₹430",
        portfolioValue: 50000,
        event: "Subscription is 12.4×. Friends are talking about GMP. This is demo data.",
        choices: [
          {
            id: "apply",
            label: "Apply in the demo",
            consequence: "You applied with a clear reason, not just listing-day hope.",
            behavioralSignal: "hold",
          },
          {
            id: "skip",
            label: "Skip this IPO",
            consequence: "Skipping is also a decision. You protected attention and capital.",
            behavioralSignal: "diversify",
          },
          {
            id: "fomo",
            label: "Apply because everyone is",
            consequence: "You followed the crowd. FOMO is a signal to slow down.",
            behavioralSignal: "fomo",
          },
        ],
      },
      {
        id: "day1",
        title: "Day 1",
        marketContext: "+18%",
        portfolioValue: 59000,
        event: "Listing pops. Would you hold?",
        choices: [
          {
            id: "hold",
            label: "Hold",
            consequence: "Day 20: −11%. The first week did not define the story.",
            behavioralSignal: "hold",
          },
          {
            id: "book",
            label: "Book the listing gain",
            consequence: "You sold into strength. That can be discipline or fear of giving it back.",
            behavioralSignal: "sell",
          },
        ],
      },
      {
        id: "month3",
        title: "Month 3",
        marketContext: "+6%",
        portfolioValue: 53000,
        event: "Simulation is educational, not predictive.",
        choices: [
          {
            id: "done",
            label: "See the takeaway",
            consequence: "Listing day and month 3 told different stories. Valuation still needs attention.",
            behavioralSignal: "hold",
          },
        ],
      },
    ],
  },
  {
    id: "fno",
    title: "F&O Simulator",
    description: "Experience leverage and expiry.",
    category: "fno",
    difficulty: "advanced",
    estimatedMinutes: 5,
    steps: [
      {
        id: "setup",
        title: "₹10,000 virtual capital",
        marketContext: "Underlying ₹1,000",
        portfolioValue: 10000,
        event: "You control an illustrative ₹50,000 position. This is not a real order.",
        choices: [
          {
            id: "small",
            label: "Keep size modest",
            consequence: "You respected that leverage multiplies outcomes.",
            behavioralSignal: "diversify",
          },
          {
            id: "full",
            label: "Use most of the capital",
            consequence: "A small underlying move can now dominate your day.",
            behavioralSignal: "fomo",
          },
        ],
      },
      {
        id: "move",
        title: "Underlying ₹1,000 → ₹950",
        marketContext: "-5%",
        portfolioValue: 7500,
        event: "Illustrative P&L: −₹2,500. Capital is no longer the same as position size.",
        choices: [
          {
            id: "exit",
            label: "Exit the simulation position",
            consequence: "You chose to stop the experiment once the loss was clear.",
            behavioralSignal: "sell",
          },
          {
            id: "hold-fno",
            label: "Hold to expiry",
            consequence: "Time is working against you. Expiry can concentrate the remaining risk.",
            behavioralSignal: "hold",
          },
        ],
      },
      {
        id: "end-fno",
        title: "What leverage felt like",
        marketContext: "Illustrative simulation only",
        portfolioValue: 7500,
        event: "F&O behaves differently from long-term investing. No real order was placed.",
        choices: [
          {
            id: "learn",
            label: "Review loss mechanics",
            consequence: "You connected the P&L to leverage, margin, and expiry.",
            behavioralSignal: "hold",
          },
        ],
      },
    ],
  },
  {
    id: "portfolio-mission",
    title: "Portfolio Mission",
    description: "Build a portfolio for a 3-year goal.",
    category: "portfolio",
    difficulty: "intermediate",
    estimatedMinutes: 4,
    steps: [
      {
        id: "split",
        title: "How would you split ₹1,00,000?",
        marketContext: "3-year goal",
        portfolioValue: 100000,
        event: "Your demo goal still sits behind this exercise.",
        choices: [
          {
            id: "core-heavy",
            label: "80% core / 20% explorer",
            consequence: "You kept exploration in a box.",
            behavioralSignal: "diversify",
          },
          {
            id: "stock-heavy",
            label: "Mostly individual stocks",
            consequence: "More learning, more concentration risk.",
            behavioralSignal: "fomo",
          },
        ],
      },
      {
        id: "shock",
        title: "A 14% rate shock",
        marketContext: "-14%",
        portfolioValue: 86000,
        event: "Would you rebalance, freeze, or chase what still looks strong?",
        choices: [
          {
            id: "rebalance",
            label: "Rebalance toward the plan",
            consequence: "You used the plan as an anchor.",
            behavioralSignal: "diversify",
          },
          {
            id: "chase",
            label: "Add to the names that fell least",
            consequence: "Recent winners can quietly raise concentration.",
            behavioralSignal: "fomo",
          },
        ],
      },
      {
        id: "close",
        title: "A workable mix",
        marketContext: "Illustrative",
        portfolioValue: 92000,
        event: "Portfolio construction is a series of small, revisitable choices.",
        choices: [
          {
            id: "finish",
            label: "Finish mission",
            consequence: "You practiced allocation before changing real money.",
            behavioralSignal: "hold",
          },
        ],
      },
    ],
  },
];

export const simulationById = Object.fromEntries(simulations.map((s) => [s.id, s])) as Record<string, Simulation>;
