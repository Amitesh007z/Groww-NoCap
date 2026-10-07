# GROWW NoCap;

## Technical MVP PRD & AI Coding Agent Build Specification

**Product:** Groww NoCap
**Platform:** Responsive Web Application
**Primary framework:** React.js + TypeScript
**Purpose:** High-fidelity functional product demo / APM prototype
**Backend:** Mock service layer / local JSON data
**Authentication:** Mock authentication
**Payments/trading:** Not real; simulation only
**Data:** Deterministic mock data
**Primary audience:** 18–27-year-old first-generation investors
**Design objective:** Feel like a polished evolution of Groww, not a separate finance app.

---

# 1. BUILD THIS PRODUCT AS ONE SYSTEM

Do not build this as a collection of disconnected screens.

The entire application must communicate one product idea:

> **Groww helps young users become better investors while they pursue a real financial goal.**

The core loop is:

```text
USER GOAL
   ↓
PERSONALIZED NoCap
   ↓
UNDERSTAND
   ↓
SIMULATE
   ↓
DECIDE
   ↓
INVEST / SIMULATE
   ↓
MONITOR
   ↓
GUARD
   ↓
REFLECT
   ↓
LEARN
   ↓
IMPROVE
   ↓
GOAL PROGRESS
   ↓
NEXT GOAL
```

The application should feel like one continuous journey.

---

# 2. PRODUCT PROMISE

Primary:

> **Don't just invest. Become an investor.**

Secondary:

> **Start with what you want. Learn what you need. Experience before you risk. Decide with confidence.**

The product must NEVER communicate:

> “We know what you should buy.”

Instead:

> “We'll help you understand what you're deciding.”

---

# 3. MVP OBJECTIVES

The MVP is successful if a demo user can:

1. Enter a financial goal.
2. See a personalized investment path.
3. Compare different approaches.
4. Start a simulation.
5. Experience a historical market scenario.
6. Make decisions during the simulation.
7. See behavioral feedback.
8. Open financial concepts in contextual explanations.
9. Explore an IPO.
10. Explore F&O safely through simulation.
11. See a personalized investor profile.
12. Review an investment decision.
13. See a mock portfolio.
14. Experience a market-drop “Groww Guard” moment.
15. See goal progress.
16. Complete learning missions.
17. Understand why Groww is recommending a learning action.
18. Navigate the entire product smoothly.

---

# 4. IMPORTANT MVP CONSTRAINT

This is a **demo product**.

Do NOT implement:

- real brokerage
- real order execution
- real financial transactions
- real KYC
- real payments
- real investment advice
- real market API dependency
- real authentication
- real external social scraping

Everything should use deterministic mock data.

However, the architecture should make replacing mock services with real APIs later straightforward.

---

# 5. TECH STACK

## Required

```text
React
TypeScript
Vite
React Router
Tailwind CSS
Lucide React
Recharts
```

Recommended:

```text
Zustand
date-fns
clsx
```

Do not introduce unnecessary libraries.

The app should be lightweight.

---

# 6. PROJECT STRUCTURE

Use:

```text
src/
│
├── app/
│   ├── App.tsx
│   ├── routes.tsx
│   └── providers.tsx
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── charts/
│   ├── cards/
│   ├── goal/
│   ├── path/
│   ├── lens/
│   ├── sim/
│   ├── guard/
│   ├── portfolio/
│   └── investor/
│
├── pages/
│   ├── LandingPage.tsx
│   ├── OnboardingPage.tsx
│   ├── DashboardPage.tsx
│   ├── GoalPage.tsx
│   ├── PathPage.tsx
│   ├── SimPage.tsx
│   ├── LensPage.tsx
│   ├── IPOPage.tsx
│   ├── FnoPage.tsx
│   ├── PortfolioPage.tsx
│   ├── GuardPage.tsx
│   ├── InvestorProfilePage.tsx
│   ├── MissionsPage.tsx
│   └── DecisionPage.tsx
│
├── data/
│   ├── user.ts
│   ├── goals.ts
│   ├── paths.ts
│   ├── concepts.ts
│   ├── simulations.ts
│   ├── stocks.ts
│   ├── funds.ts
│   ├── ipo.ts
│   ├── portfolio.ts
│   ├── missions.ts
│   └── marketEvents.ts
│
├── hooks/
│   ├── useUser.ts
│   ├── useGoal.ts
│   ├── useSimulation.ts
│   ├── useInvestorDNA.ts
│   └── useLens.ts
│
├── services/
│   ├── mockApi.ts
│   ├── intelligenceEngine.ts
│   ├── simulationEngine.ts
│   ├── goalEngine.ts
│   └── recommendationEngine.ts
│
├── store/
│   ├── appStore.ts
│   ├── userStore.ts
│   ├── goalStore.ts
│   └── simulationStore.ts
│
├── types/
│   ├── user.ts
│   ├── goal.ts
│   ├── investment.ts
│   ├── simulation.ts
│   ├── concept.ts
│   └── intelligence.ts
│
└── utils/
    ├── currency.ts
    ├── calculations.ts
    └── formatting.ts
```

---

# 7. ROUTES

Implement:

```text
/
 /onboarding
 /home
 /goal
 /path
 /sim
 /sim/:simulationId
 /lens
 /lens/:conceptId
 /ipo
 /fno
 /portfolio
 /guard
 /investor
 /missions
 /decision/:assetId
```

Optional:

```text
/settings
/help
```

---

# 8. GLOBAL APP SHELL

Desktop:

```text
┌──────────────────────────────────────────────────────────┐
│ Groww logo              Search             🔔   Avatar   │
├───────────────┬──────────────────────────────────────────┤
│               │                                          │
│ Home          │                                          │
│ My Goal       │             MAIN CONTENT                 │
│ My Path       │                                          │
│ Learn         │                                          │
│ Sim           │                                          │
│ Portfolio     │                                          │
│ Missions      │                                          │
│ Investor      │                                          │
│               │                                          │
└───────────────┴──────────────────────────────────────────┘
```

Mobile:

Bottom navigation:

```text
Home | Goal | Learn | Sim | You
```

Do not cram seven navigation items into mobile.

---

# 9. DESIGN LANGUAGE

The application must feel:

- modern
- clean
- premium
- approachable
- youthful
- trustworthy
- minimal
- Indian
- finance-native

Do NOT make it:

- neon
- crypto-looking
- overly gamified
- childish
- excessive gradients
- excessive glassmorphism
- dashboard-heavy
- “AI startup” looking

---

# 10. GROWw VISUAL DIRECTION

Use a Groww-inspired visual language:

### Primary

Use Groww-like green as the major accent.

Suggested:

```text
Primary Green: #00B386
Dark Green: #008F6B
```

Use neutral backgrounds:

```text
Background: #F7F8F8
Surface: #FFFFFF
Text Primary: #191C1F
Text Secondary: #6B7280
Border: #E5E7EB
```

Do not overuse green.

Green should mean:

- progress
- positive state
- action
- confidence

Red should mean:

- loss
- warning
- risk

Amber:

- attention
- learning required

---

# 11. TYPOGRAPHY

Use:

```text
Inter
```

or system fallback.

Hierarchy:

```text
Hero: 36–48px
Page heading: 28–32px
Section heading: 20–24px
Card heading: 16–18px
Body: 14–16px
Caption: 12–13px
```

Use large numbers for financial values.

Example:

```text
₹2,84,000
```

should visually dominate:

```text
Current wealth
```

---

# 12. MICRO-INTERACTIONS

Use subtle animations:

- card hover
- number count-up
- progress animation
- simulation transitions
- drawer opening
- tooltip
- chart reveal
- success state

Avoid:

- bouncing everything
- excessive confetti
- distracting animations

Animation should communicate:

> **progress and understanding**

not:

> **casino excitement**

---

# 13. ONBOARDING

Route:

```text
/onboarding
```

The onboarding should feel like a conversation rather than a financial form.

---

## Screen 1

# What do you want your money to help you achieve?

Cards:

```text
🎓 Education
🏠 Build Wealth
🛟 Safety
✈️ Major Experience
🚗 Major Purchase
💼 Financial Freedom
📈 Long-term Wealth
✨ Something Else
```

Selecting one highlights it.

---

## Screen 2

# How much do you want to reach?

Input:

```text
₹10,00,000
```

Quick options:

```text
₹1L
₹5L
₹10L
₹25L
₹50L+
```

---

## Screen 3

# When do you want to get there?

Options:

```text
1 year
3 years
5 years
10 years
Custom
```

---

## Screen 4

# Where are you starting from?

Fields:

```text
Current savings
Current investments
Monthly amount you can invest
```

---

## Screen 5

# How familiar are you with investing?

```text
🌱 I'm completely new

🔎 I know the basics

📊 I've invested before

🧠 I understand markets fairly well
```

This determines initial learning difficulty.

---

## Screen 6

# What sounds interesting to you?

Multi-select:

```text
Mutual Funds
Stocks
ETFs
IPOs
F&O
Long-term investing
Understanding markets
```

This is for personalization.

---

## Completion

Show:

# Your Groww Path is ready.

Example:

```text
₹10L
Goal

5 years
Timeline

₹2.84L
Current progress

4 months ahead
Current trajectory
```

CTA:

```text
Explore my path →
```

---

# 14. HOME / DASHBOARD

Route:

```text
/home
```

This is the most important screen.

It should NOT be a generic Groww portfolio dashboard.

It is the user's **financial command center**.

---

## Header

```text
Good evening, Amitesh 👋

Here's where your money stands.
```

---

## Hero Card

```text
┌─────────────────────────────────────────────────────┐
│ YOUR GOAL                                           │
│                                                     │
│ Build ₹10L                                          │
│                                                     │
│ ₹2,84,000 / ₹10,00,000                              │
│ ███████████░░░░░░░░ 28%                             │
│                                                     │
│ You're 4 months ahead of your target                 │
│                                                     │
│ View your path →                                    │
└─────────────────────────────────────────────────────┘
```

---

# 15. “WHAT SHOULD I DO TODAY?”

This is powered by the mock intelligence engine.

Example:

```text
TODAY FOR YOU

You don't need to invest today.

Your goal is on track.

But there's one thing worth understanding:

Why valuation matters when buying individual stocks.

[Learn in 90 sec]
```

This is critical.

The dashboard should sometimes explicitly say:

# **Nothing needs your attention today.**

---

# 16. INTELLIGENCE CARD

Possible states:

### Learn

> You're exploring stocks but haven't looked at valuation yet.

### Simulate

> You're considering individual stocks. Experience a market correction first.

### Review

> Your portfolio has become more concentrated in technology.

### Goal

> You're 6 weeks ahead.

### Guard

> Your stock is down 8%, but your original thesis appears unchanged.

### Do Nothing

> You're on track. Nothing needs your attention today.

---

# 17. QUICK ACTIONS

```text
Understand something
Try a simulation
Explore my path
Review portfolio
```

---

# 18. HOME LEARNING CARD

Example:

```text
YOUR NEXT SKILL

You understand:
✓ SIP
✓ Mutual funds
✓ Diversification

Next:
○ Valuation

Why?
You're exploring individual stocks.

[Learn valuation →]
```

---

# 19. HOME SIM CARD

```text
TRY THIS

The market falls 25%.

Your goal is still 4 years away.

What would you do?

[Experience it →]
```

---

# 20. PATH PAGE

Route:

```text
/path
```

Header:

# Your Financial Path

Subtitle:

> Three possible ways to move toward ₹10L.

---

# 21. PATH CARDS

## Steady Builder

```text
LOWER COMPLEXITY

Volatility      Low
Learning        Low
Involvement     Low

Best for:
Consistency

Trade-off:
Less active control

[Explore]
```

---

## Growth Builder

```text
MEDIUM COMPLEXITY

Volatility      Medium/High
Learning        Medium
Involvement     Medium

Best for:
Long horizons

Trade-off:
Larger temporary losses

[Explore]
```

---

## Core + Explorer

```text
HIGHER INVOLVEMENT

Volatility      High
Learning        High
Involvement     High

Best for:
Users who want to learn stocks

Trade-off:
Requires more knowledge

[Experience]
```

---

# 22. PATH COMPARISON

Use a modal/drawer.

Comparison rows:

```text
Goal suitability
Expected volatility
Complexity
Knowledge required
Time commitment
Decision frequency
Learning opportunity
Potential downside
```

Never show fabricated guaranteed returns.

Use labels such as:

```text
Lower
Moderate
Higher
```

rather than fake precise returns.

---

# 23. PATH DETAIL

When user selects a path:

```text
Core + Explorer

Why this path?

Your goal is long-term.
You have moderate experience.
You want to learn individual stocks.

This path separates:
CORE
from
EXPLORATION
```

Show a visual allocation **only as an illustrative mock**, clearly labelled:

```text
Illustrative demo allocation
```

Example:

```text
70% Core
20% Explorer
10% Learning
```

Do not present this as personalized financial advice.

---

# 24. CTA

Primary:

```text
Experience this path
```

Secondary:

```text
Compare again
```

---

# 25. GROWW SIM

Route:

```text
/sim
```

Header:

# Experience before you risk.

Subtitle:

> Real market situations. Zero real-money risk.

---

# 26. SIM HOME

Cards:

### Market Replay

```text
Experience the 2020 crash.

Difficulty: Medium
Time: 4 min

[Start]
```

### IPO Simulator

```text
Would you apply?

Difficulty: Beginner
Time: 3 min

[Start]
```

### F&O Simulator

```text
Experience leverage and expiry.

Difficulty: Advanced
Time: 5 min

[Start]
```

### Portfolio Mission

```text
Build a portfolio for a 3-year goal.

Difficulty: Medium
Time: 4 min
```

---

# 27. SIMULATION ENGINE

Create a reusable simulation model.

```ts
type Simulation = {
  id: string;
  title: string;
  description: string;
  category: "market" | "ipo" | "fno" | "portfolio";
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedMinutes: number;
  steps: SimulationStep[];
};
```

```ts
type SimulationStep = {
  id: string;
  title: string;
  marketContext: string;
  portfolioValue: number;
  event: string;
  choices: SimulationChoice[];
};
```

```ts
type SimulationChoice = {
  id: string;
  label: string;
  consequence: string;
  behavioralSignal?: string;
};
```

---

# 28. HISTORICAL MARKET SIM

Example steps:

### Step 1

```text
January 2020

Portfolio:
₹1,00,000

Market:
Stable

You hold:
70% diversified
20% stocks
10% cash
```

CTA:

```text
Continue →
```

---

### Step 2

```text
March 2020

Market:
-27%

Your portfolio:
₹73,000
```

Question:

# What do you do?

Buttons:

```text
Hold
Sell
Invest more
I'm not sure
```

---

# 29. CHOICE CONSEQUENCE

Do not immediately tell them:

> Correct / Wrong.

Instead:

```text
You chose HOLD.

The market fell another 8%.

Your portfolio:
₹73,000 → ₹67,160
```

Continue.

Later:

```text
The market recovered.

Portfolio:
₹1,08,700
```

Then explain:

> Your decision didn't guarantee this outcome. The simulation shows how decisions interact with market volatility.

---

# 30. SIMULATION RESULT

At the end:

# You experienced the market.

Show:

```text
Decision consistency       78%
Volatility tolerance       Medium
Diversification awareness  Strong
Loss sensitivity           High
```

Then:

### What we noticed

> You consistently reduced risk after losses.

### What to explore

> Learn how long-term investors think about drawdowns.

CTA:

```text
Understand volatility →
```

Never diagnose:

> “You are a bad investor.”

---

# 31. SIMULATION PROGRESS

Show:

```text
Step 3 of 7

███████████░░░░
```

Always let the user:

```text
Pause
Exit
Resume
```

Persist simulation progress in local state.

---

# 32. GROWW LENS

Route:

```text
/lens
```

Header:

# Understand what you're investing in.

Search:

```text
Search a term, metric or product...
```

Categories:

```text
Stocks
Mutual Funds
IPO
F&O
Portfolio
Basics
```

---

# 33. CONCEPT CARD

Example:

```text
P/E Ratio

What:
Price-to-Earnings ratio

Why it matters:
Helps compare how much investors are paying
relative to company earnings.

Watch out:
A high P/E does not automatically mean
a stock is expensive.

[See example]
```

---

# 34. LENS DETAIL

Every concept follows:

```text
WHAT
↓
WHY
↓
SO WHAT
↓
WATCH OUT
↓
TRY IT
↓
RELATED CONCEPT
```

This pattern must be reusable.

---

# 35. CONCEPT EXAMPLES

Seed at least:

```text
P/E
EPS
Market Cap
Revenue
Profit
Cash Flow
ROE
Debt-to-Equity
Expense Ratio
NAV
SIP
ETF
IPO
Lot Size
GMP
QIB
RII
Leverage
Margin
Expiry
Call Option
Put Option
Diversification
Volatility
Drawdown
```

---

# 36. IPO EXPERIENCE

Route:

```text
/ipo
```

Use one polished fictional IPO.

Example:

```text
Nova Mobility Ltd.

IPO
₹410 – ₹430

Lot size
34

Issue size
₹2,800 Cr

Subscription
12.4×
```

Clearly label:

> **DEMO DATA**

---

# 37. IPO LEARNING MODE

Show:

```text
IPO IN 60 SECONDS

01 What is an IPO?
02 Why is this company raising money?
03 What are you paying?
04 What could go right?
05 What could go wrong?
06 What does subscription mean?
```

Each opens a small explanation.

---

# 38. IPO DECISION

After learning:

```text
YOUR UNDERSTANDING

Business model       ✓ Strong
IPO mechanics        ✓ Strong
Financials           ◐ Developing
Valuation            ! Needs attention
```

Then:

```text
[Learn valuation]
[Explore simulation]
[Make my decision]
```

---

# 39. IPO SIMULATION

User receives historical-style mock scenario:

```text
IPO price:
₹430

Day 1:
+18%

Day 20:
-11%

Month 3:
+6%
```

Ask:

> Would you hold?

Then reveal outcome.

Again:

> Simulation is educational, not predictive.

---

# 40. F&O PAGE

Route:

```text
/fno
```

Use a visually distinct warning header:

# Understand leverage before you use it.

---

# 41. F&O EDUCATION

Four cards:

```text
Leverage
Margin
Expiry
Loss mechanics
```

Each card has:

```text
30–45 sec explanation
```

---

# 42. F&O SIMULATOR

Mock capital:

```text
₹10,000 virtual capital
```

User selects:

```text
Underlying price
Position size
Direction
```

Then market movement:

```text
+2%
-2%
-5%
+5%
```

Update P&L dynamically.

Example:

```text
Underlying:
₹1,000 → ₹950

Position:
₹50,000

Capital:
₹10,000

Illustrative P&L:
-₹2,500
```

Show clearly:

> **Illustrative simulation only.**

---

# 43. F&O GUARD

Before continuing:

```text
You understand:

✓ leverage
✓ margin
✓ expiry

Still learning:

○ loss mechanics
```

CTA:

```text
Complete simulation
```

The demo should not simulate real order placement.

---

# 44. DECISION BRIEF

Route:

```text
/decision/:assetId
```

This is the screen immediately before a mock investment.

---

# 45. DECISION BRIEF UI

Header:

# Before you decide

Asset:

```text
Nova Mobility
```

Then:

### Why it could make sense

```text
✓ Long-term horizon
✓ Fits your selected path
✓ Diversification benefit
```

### What could go wrong

```text
⚠ High valuation
⚠ Sector concentration
⚠ High volatility
```

### What you haven't checked

```text
○ Debt
○ Cash flow
```

### Goal impact

```text
Current technology exposure:
18%

After this decision:
31%
```

---

# 46. DECISION MEMORY

Prompt:

> Why are you considering this?

Options:

```text
Long-term growth
Diversification
Valuation
Learning
Recommendation
Market opportunity
Other
```

Optional:

```text
What would make you reconsider?

[Text input]
```

CTA:

```text
Continue
```

---

# 47. MOCK INVESTMENT CONFIRMATION

Never say:

> “Order placed.”

Say:

# Demo decision recorded

```text
You chose to allocate ₹5,000.

Reason:
Long-term growth

Your thesis:
Revenue growth will continue.

Review date:
6 months
```

CTA:

```text
View portfolio
```

---

# 48. PORTFOLIO

Route:

```text
/portfolio
```

Use mock portfolio:

```text
Total:
₹3,42,800

Invested:
₹3,10,000

Returns:
+₹32,800
```

But immediately underneath:

# How this affects your goal

```text
Goal progress:
34%

Trajectory:
Ahead
```

---

# 49. PORTFOLIO INTELLIGENCE

Cards:

### Diversification

```text
Healthy
```

### Sector concentration

```text
Technology:
31%

↑ Higher than your previous 18%
```

### Risk

```text
Moderate
```

### Goal alignment

```text
On track
```

---

# 50. GROWW GUARD

Route:

```text
/guard
```

This is a major demo moment.

Create a simulated event:

# Market Drop

```text
Market:
-8.2%

Your portfolio:
-6.8%
```

Instead of alarming UI:

```text
Let's put this in context.
```

---

# 51. GUARD ANALYSIS

Show:

```text
Your goal:
₹10L by 2031

Goal status:
Still on track

Original thesis:
Long-term growth

Recent change:
No major thesis-breaking event in demo data

Portfolio concentration:
Unchanged
```

Then:

# **Nothing requires action right now.**

CTA:

```text
Review my thesis
```

Secondary:

```text
Understand the market drop
```

---

# 52. INVESTOR PROFILE

Route:

```text
/investor
```

Header:

# Your Investor Profile

Subtitle:

> What Groww has learned from your journey.

---

# 53. INVESTOR DNA UI

### Knowledge

```text
Mutual Funds      █████████░ 90%
Stocks            ███████░░░ 70%
IPO               ██████░░░░ 60%
Valuation         ████░░░░░░ 40%
F&O               ██░░░░░░░░ 20%
```

### Behavior

```text
Patience             Strong
Diversification      Strong
Loss sensitivity     High
FOMO tendency        Moderate
Consistency          Strong
```

### Experience

```text
7 simulations
14 concepts learned
23 decisions recorded
4 missions completed
```

---

# 54. PROFILE LANGUAGE

Never make it judgmental.

Bad:

> “You're bad at stocks.”

Good:

> “You tend to become more cautious after large losses.”

Then:

> “Try the volatility mission to understand this behavior.”

---

# 55. MISSIONS

Route:

```text
/missions
```

Cards:

### Mission 01

# Understand P/E

```text
Difficulty:
Beginner

Time:
2 min

Reward:
+1 Investor Skill
```

### Mission 02

# Survive a market correction

```text
Difficulty:
Intermediate

Time:
4 min
```

### Mission 03

# Evaluate an IPO

```text
Difficulty:
Intermediate

Time:
3 min
```

### Mission 04

# Understand leverage

```text
Difficulty:
Advanced

Time:
5 min
```

---

# 56. MISSION COMPLETION

After mission:

```text
MISSION COMPLETE ✓

You learned:

✓ What P/E measures
✓ Why context matters
✓ Why high P/E ≠ automatically bad

New skill:
Valuation Basics
```

Then:

```text
Your next recommended skill:

Cash Flow
```

---

# 57. MOCK DATA

Create one complete deterministic user.

```ts
export const demoUser = {
  id: "user_001",
  name: "Amitesh",
  age: 21,
  experience: "beginner-intermediate",
  income: 65000,
  monthlyInvestable: 12000,
};
```

Goal:

```ts
export const demoGoal = {
  id: "goal_001",
  name: "Build ₹10L",
  targetAmount: 1000000,
  currentAmount: 284000,
  targetDate: "2031-12-01",
  progress: 0.284,
  status: "ahead",
  monthsAhead: 4,
};
```

---

# 58. MOCK PORTFOLIO

```ts
[
  {
    symbol: "NOVA",
    name: "Nova Mobility",
    invested: 50000,
    current: 54800,
    sector: "Technology"
  },
  {
    symbol: "INDEX",
    name: "Nifty Index Fund",
    invested: 120000,
    current: 134500,
    sector: "Diversified"
  },
  {
    symbol: "FUND01",
    name: "Growth Equity Fund",
    invested: 100000,
    current: 108500,
    sector: "Diversified"
  },
  {
    symbol: "ETF01",
    name: "India 50 ETF",
    invested: 40000,
    current: 45000,
    sector: "Index"
  }
]
```

---

# 59. MOCK MARKET EVENTS

```ts
[
  {
    id: "covid",
    name: "2020 Market Crash",
    marketChange: -27,
    duration: 5,
    type: "historical-replay"
  },
  {
    id: "rate",
    name: "Rate Shock",
    marketChange: -14,
    duration: 4,
    type: "historical-replay"
  }
]
```

---

# 60. MOCK INTELLIGENCE ENGINE

Create deterministic rules rather than an actual LLM.

Example:

```ts
function getNextBestAction(context) {
  if (context.goalStatus === "on-track" &&
      context.knowledge.valuation < 0.5 &&
      context.exploringStocks) {
    return {
      type: "LEARN",
      title: "Learn valuation",
      reason: "You're exploring individual stocks."
    };
  }

  if (context.consideredFno &&
      context.fnoExperience === 0) {
    return {
      type: "SIMULATE",
      title: "Experience leverage first",
      reason: "F&O behaves differently from long-term investing."
    };
  }

  if (context.marketDrop &&
      context.thesisIntact) {
    return {
      type: "GUARD",
      title: "Review your thesis",
      reason: "The market moved, but your original thesis hasn't changed."
    };
  }

  return {
    type: "DO_NOTHING",
    title: "You're on track",
    reason: "Nothing needs your attention today."
  };
}
```

The UI should make this feel intelligent even though the demo uses deterministic mock logic.

---

# 61. STATE MANAGEMENT

Use Zustand.

Stores:

```text
userStore
goalStore
simulationStore
portfolioStore
learningStore
```

Persist with localStorage.

This allows the demo to behave like a real product.

For example:

User completes simulation:

```text
simulationStore.completed["covid"] = true
```

Then Investor DNA updates.

Then dashboard changes:

```text
“You completed your first market replay.”
```

---

# 62. CROSS-FEATURE STATE

This is VERY important.

Do not make every screen static.

Example:

User completes:

```text
P/E mission
```

Then:

```text
Investor knowledge:
valuation 40% → 65%
```

Dashboard:

```text
Next skill:
Cash flow
```

User completes simulation:

```text
Loss sensitivity:
high
```

Investor profile updates.

Then market Guard can reference it:

> “You've previously experienced a similar drawdown in simulation.”

This makes the demo feel like a real intelligence layer.

---

# 63. EVENT SYSTEM

Create a simple event bus or state event model.

Events:

```ts
GOAL_CREATED
PATH_SELECTED
SIMULATION_STARTED
SIMULATION_COMPLETED
CONCEPT_VIEWED
MISSION_COMPLETED
DECISION_STARTED
DECISION_RECORDED
PORTFOLIO_CHANGED
MARKET_EVENT_TRIGGERED
GUARD_TRIGGERED
```

These events update the user's intelligence state.

---

# 64. INTELLIGENCE CONTEXT OBJECT

Use:

```ts
type InvestorContext = {
  user;
  goals;
  portfolio;
  knowledge;
  behavior;
  simulations;
  decisions;
  marketContext;
  progress;
};
```

Every intelligent component receives this context.

---

# 65. MOCK AI EXPERIENCE

For the demo, create an assistant panel:

```text
Ask Groww

Why is this important?
```

Suggested prompts:

```text
Why is P/E important?
Why is my portfolio down?
What is an IPO?
Why does F&O have higher risk?
Why am I seeing this recommendation?
```

Responses should be predefined based on context.

Do not pretend there is a live financial AI.

---

# 66. RESPONSIVE DESIGN

Must support:

```text
1440px
1280px
1024px
768px
390px
375px
```

Desktop:

- sidebar
- large cards
- multi-column layouts

Tablet:

- collapsible sidebar
- 2-column cards

Mobile:

- bottom nav
- stacked cards
- horizontal scrolling for some cards
- bottom sheets instead of large modals
- sticky primary CTA

---

# 67. MOBILE HOME

Structure:

```text
Good evening 👋

₹2,84,000
Your financial progress

████████░░ 28%

4 months ahead

──────────────

Today for you

You're on track.
Nothing needs your attention.

──────────────

Next skill

Valuation

[Learn]

──────────────

Try this

Market drops 25%.

[Simulate]

──────────────

Your journey
₹10K → ₹50K → ₹1L → ₹5L → ₹10L
```

---

# 68. RESPONSIVE SIMULATION

Simulation must feel immersive on mobile.

Use:

```text
Step 3 / 7

MARKET EVENT

Market:
-27%

Your portfolio:
₹73,000

What do you do?

[Hold]

[Sell]

[Invest more]

[I'm not sure]
```

Large tap targets.

---

# 69. COMPONENT LIBRARY

Create reusable:

```text
<MoneyCard />
<GoalProgress />
<ProgressBar />
<StatCard />
<PathCard />
<PathComparison />
<InsightCard />
<LearningCard />
<SimulationCard />
<SimulationChoice />
<ConceptCard />
<ConceptDrawer />
<DecisionBrief />
<RiskCard />
<GuardCard />
<InvestorDNA />
<MissionCard />
<PortfolioCard />
<SectionHeader />
<BottomSheet />
<Modal />
<Tooltip />
<Badge />
<EmptyState />
```

---

# 70. COMPONENT RULE

Do not duplicate styling.

If three cards look similar, create one reusable component.

Use props.

Example:

```tsx
<InsightCard
  type="learn"
  title="Learn valuation"
  description="You're exploring stocks."
  action="Learn"
/>
```

---

# 71. ACCESSIBILITY

Implement:

- keyboard navigation
- visible focus states
- semantic buttons
- aria labels
- sufficient contrast
- minimum 44px touch targets
- reduced-motion support

---

# 72. LOADING STATES

Even with mock data, use skeleton states for realism.

Example:

```text
████████████
████████
```

But keep them short:

300–600ms.

---

# 73. ERROR STATES

Create realistic mock error handling.

Example:

```text
We couldn't load your market context.

Your goal and portfolio are still available.

[Try again]
```

Do not break the entire demo.

---

# 74. EMPTY STATES

Example:

No investments:

> **Your investing journey starts here.**

> You don't need to know everything before you begin.

```text
Explore your path →
```

---

# 75. DEMO MODE

Add a subtle:

```text
DEMO MODE
```

badge.

Potentially add:

```text
Reset Demo
```

inside Settings.

This allows the evaluator to replay the experience.

---

# 76. DEMO SCRIPT

The application should be optimized for this 5–7 minute demo.

### Scene 1

Open dashboard.

> “Groww doesn't start by asking me what I want to buy.”

Show:

# **What are you trying to achieve?**

---

### Scene 2

Goal:

> ₹10L in five years.

Show:

# **Your Path**

Three strategies.

---

### Scene 3

Choose:

> Core + Explorer.

Click:

# Experience this path

---

### Scene 4

Market crash simulation.

Portfolio falls.

User chooses:

> Hold.

Continue.

---

### Scene 5

Simulation result:

> High loss sensitivity.

Click:

> Learn volatility.

---

### Scene 6

Open stock.

Tap:

> P/E

Groww Lens opens.

---

### Scene 7

Return to Decision Brief.

Show:

> Supports
> Risks
> Unknowns

---

### Scene 8

Record decision.

---

### Scene 9

Trigger market drop.

Groww Guard:

# Nothing requires action right now.

---

### Scene 10

Investor Profile:

> Groww learned something about you.

Show:

> Loss sensitivity: High
> Diversification: Strong
> Valuation: Developing

---

### Final

Dashboard:

# **You're 4 months ahead.**

And:

> **Next thing to learn: Cash Flow**

This demonstrates the entire intelligence loop.

---

# 77. KEY PRODUCT MOMENTS TO POLISH

These deserve disproportionate engineering/design attention.

## Moment 1

### Goal creation

Should feel motivating.

---

## Moment 2

### Path reveal

Should feel personalized.

---

## Moment 3

### Market simulation

Should feel immersive.

---

## Moment 4

### Contextual explanation

Should feel instant.

---

## Moment 5

### Decision Brief

Should feel safe.

---

## Moment 6

### Guard

Should feel like:

> “Groww has my back.”

---

## Moment 7

### Investor DNA

Should feel surprisingly personalized.

---

# 78. UX PRINCIPLE

Every screen should answer:

> **“Why am I seeing this?”**

For example:

Bad:

> Learn P/E.

Good:

> **You're exploring stocks, and valuation is the next concept that will help you evaluate them.**

---

# 79. SECOND UX PRINCIPLE

Never overwhelm beginners.

Use progressive disclosure.

Initial:

```text
P/E: 42×
```

Tap:

```text
What is P/E?
```

Then:

```text
Why does it matter?
```

Then:

```text
Show me an example.
```

Then:

```text
Try it.
```

Information expands only when requested.

---

# 80. THIRD UX PRINCIPLE

Every recommendation must explain itself.

Instead of:

> Learn valuation.

Show:

> **Why you're seeing this**
>
> You've explored 3 stocks but haven't yet looked at valuation.

This is critical for trust.

---

# 81. FOURTH UX PRINCIPLE

Never use manipulative urgency.

Avoid:

```text
🔥 DON'T MISS THIS
🚨 BUY NOW
LAST CHANCE
TRENDING STOCK
```

Use:

```text
Worth understanding
Worth reviewing
Needs your attention
Nothing requires action
```

---

# 82. FIFTH UX PRINCIPLE

Separate:

### FACT

What happened?

### INTERPRETATION

What might it mean?

### UNCERTAINTY

What don't we know?

### DECISION

What can you choose?

This should appear throughout the application.

---

# 83. ENGINEERING QUALITY BAR

The AI coding agent must behave like a **senior frontend engineer**.

Requirements:

- strict TypeScript
- no `any` unless unavoidable
- reusable components
- centralized mock data
- centralized types
- no giant components
- no inline repeated styles
- no duplicated business logic
- responsive layouts
- clean routing
- local persistence
- meaningful loading/error states
- accessible components
- realistic interactions
- polished transitions

---

# 84. DO NOT BUILD A STATIC FIGMA MOCK

This is crucial.

The demo must be interactive.

If the user:

> selects a goal

the goal changes.

If the user:

> completes a simulation

their profile changes.

If the user:

> learns P/E

their knowledge state changes.

If the user:

> records an investment decision

the portfolio changes.

If the user:

> triggers a market event

Guard appears.

If the user:

> completes a mission

their Investor DNA changes.

The entire product should feel **alive**.

---

# 85. MOCK DATA MUST BE COHERENT

Do not randomly generate numbers.

All mock numbers should tell one consistent story.

Example:

```text
Goal:
₹10L

Current:
₹2.84L

Portfolio:
₹3.42L

Monthly contribution:
₹12K

Target:
2031

Status:
Ahead
```

The same numbers should appear everywhere.

---

# 86. MOCK DATA SERVICE

Create:

```ts
mockApi.getUser()
mockApi.getGoal()
mockApi.getPaths()
mockApi.getPortfolio()
mockApi.getConcept(id)
mockApi.getSimulation(id)
mockApi.getMissions()
mockApi.getInvestorDNA()
mockApi.getMarketEvent()
```

All return Promises to simulate backend behavior.

Example:

```ts
export async function getGoal() {
  await delay(300);
  return demoGoal;
}
```

This makes future backend integration straightforward.

---

# 87. SIMULATION ENGINE

Do not hardcode UI logic into the simulation page.

Create:

```ts
simulationEngine.start()
simulationEngine.selectChoice()
simulationEngine.advance()
simulationEngine.complete()
simulationEngine.getResult()
```

The engine tracks:

```text
currentStep
choices
portfolioValue
riskSignals
behaviorSignals
completion
```

---

# 88. BEHAVIOR ENGINE

For demo purposes, infer signals from choices.

Example:

```text
Sell during first 3 drawdowns
→ lossSensitivity += 20

Buy after sudden rise
→ fomoTendency += 15

Maintain diversification
→ diversificationScore += 10

Hold through volatility
→ patienceScore += 10
```

This is not a real psychological diagnosis.

Label it:

> **Your investing behavior in simulations**

---

# 89. GOAL ENGINE

Calculate:

```text
progressPercentage
monthsRemaining
trajectory
monthsAhead
contributionProgress
```

Example:

```ts
progress =
currentAmount / targetAmount
```

For demo trajectory:

Use deterministic mocked assumptions rather than claiming actual investment returns.

Clearly label:

> **Illustrative projection**

---

# 90. PROJECTION LANGUAGE

Avoid:

> “You will have ₹10L.”

Use:

> “Illustrative trajectory”

> “Based on the demo assumptions”

> “Markets can vary significantly.”

This matters even in a prototype because the product concept is about trust.

---

# 91. DESIGN FOR THE GROWw BRAND

The app should look like:

> **Groww evolved**

not:

> **random startup built on top of Groww.**

Use:

- familiar green
- familiar card language
- simple financial numbers
- minimal navigation
- clean typography
- calm charts

But make it more modern with:

- richer personalization
- larger hero moments
- subtle motion
- conversational copy
- contextual learning
- interactive simulations

---

# 92. COPY STYLE

Use:

### Short

> “You're on track.”

### Human

> “Let's make this easier.”

### Confidence-building

> “You don't need to know everything yet.”

### Contextual

> “You're seeing this because you're exploring stocks.”

### Non-judgmental

> “Here's what happened.”

### Trustworthy

> “Nothing requires action right now.”

Avoid corporate copy such as:

> “Leverage our AI-powered wealth optimization infrastructure.”

---

# 93. PRIMARY CTA LANGUAGE

Prefer:

```text
Explore
Understand
Experience
Compare
Review
Learn
Try it
See why
Continue
```

Avoid:

```text
Buy Now
Trade Now
Act Now
Don't Miss
```

unless representing actual Groww-style product UI in a clearly separated demo.

---

# 94. SUCCESS CRITERIA FOR THE AI CODING AGENT

The build is considered complete only when:

### Functional

- all routes work
- no broken links
- all buttons have behavior
- state persists
- simulations work
- onboarding works
- goal progress works
- learning state updates
- Investor DNA updates
- Guard works

### Visual

- responsive
- polished
- consistent
- no overflow
- no layout breaking
- proper empty/loading states
- mobile usable

### Product

- user understands why each recommendation appears
- no feature feels disconnected
- simulation connects to learning
- learning connects to investment decisions
- decisions connect to Guard
- Guard connects back to goals
- progress connects back to motivation

---

# 95. FINAL PRODUCT ARCHITECTURE

The entire MVP should be mentally represented as:

```text
                         GROWW NoCap
                              │
                    ┌─────────▼─────────┐
                    │      MY GOAL      │
                    └─────────┬─────────┘
                              │
                    ┌─────────▼─────────┐
                    │    PATH ENGINE    │
                    │                   │
                    │ Steady            │
                    │ Growth            │
                    │ Explorer          │
                    └─────────┬─────────┘
                              │
             ┌────────────────┼────────────────┐
             │                │                │
             ▼                ▼                ▼
        GROWW LENS       GROWW SIM       GROWW MISSIONS
             │                │                │
             └────────────────┼────────────────┘
                              │
                       USER DECISION
                              │
                       DECISION BRIEF
                              │
                         MOCK INVEST
                              │
                     ┌────────▼────────┐
                     │   GROWW GUARD   │
                     └────────┬────────┘
                              │
                          REFLECTION
                              │
                     ┌────────▼────────┐
                     │ INVESTOR DNA   │
                     └────────┬────────┘
                              │
                     NEXT BEST ACTION
                              │
             ┌────────────────┼────────────────┐
             ▼                ▼                ▼
           LEARN          SIMULATE          REVIEW
                              │
                              ▼
                         GOAL PROGRESS
                              │
                              ▼
                          NEXT GOAL
```

---

# 96. THE MOST IMPORTANT ENGINEERING CONCEPT

Every feature should contribute data back into:

# `InvestorContext`

Conceptually:

```ts
InvestorContext {
  user
  goals
  financialState
  portfolio
  knowledge
  behavior
  simulations
  decisions
  missions
  marketContext
  progress
}
```

Then every intelligent surface reads this.

That is what makes the prototype feel like an **intelligence layer** rather than a collection of screens.

---

# 97. THE DEMO'S “WOW” MOMENT

The most important sequence should be:

```text
USER:
I want ₹10L in 5 years.

        ↓

GROWW:
Here are 3 possible paths.

        ↓

USER:
I want to explore stocks.

        ↓

GROWW:
Before risking money, experience a market crash.

        ↓

USER:
Chooses HOLD.

        ↓

GROWW SIM:
You handled volatility well,
but showed high loss sensitivity.

        ↓

GROWW:
Learn valuation next.

        ↓

USER:
Opens stock.

        ↓

GROWW LENS:
Here's what P/E means,
why it matters,
and what it doesn't tell you.

        ↓

USER:
Wants to invest.

        ↓

GROWW:
Here's what supports your decision,
what could go wrong,
and what you haven't checked.

        ↓

USER:
Records decision.

        ↓

MARKET EVENT:
Portfolio falls 8%.

        ↓

GROWW GUARD:
Your goal remains on track.
Your thesis hasn't materially changed.

Nothing requires action right now.

        ↓

USER:
Opens Investor DNA.

        ↓

GROWW:
You've learned 14 concepts,
completed 7 simulations,
and your biggest opportunity is valuation.

        ↓

GOAL:
You're now 6 weeks ahead.
```

The user should finish the demo thinking:

> **“Groww actually knows where I am in my investing journey.”**

and:

> **“It doesn't tell me what to buy. It helps me understand whether I'm ready to make the decision.”**

---

# 98. FINAL BUILD DIRECTIVE FOR THE AI AGENT

When implementing this PRD:

> **Build the product as if you are a senior frontend engineer and product designer working on a production-quality Groww feature. Do not create a static mockup. Build a fully navigable, responsive React application with deterministic mock data, reusable components, local state persistence, realistic interactions, coherent financial data, and polished UX. Every major action must update shared application state and affect subsequent screens. The experience must feel like one intelligent product rather than independent pages. Preserve Groww's clean, trustworthy visual language while introducing a modern Gen-Z-friendly interaction model. Never use gamification that encourages trading. Never imply guaranteed investment returns. Never represent mock data as real market data. Clearly distinguish educational simulation from real investment. Prioritize clarity, trust, contextual explanations, progressive disclosure, and user control.**

The final product should communicate one idea above everything else:

# **GROWW&#x20;**

## **Don't just invest. Become an investor.**

**Goal → Path → Learn → Simulate → Decide → Invest → Guard → Reflect → Improve → Progress**

That is the product.
The individual features are simply the mechanisms that make that loop work.
