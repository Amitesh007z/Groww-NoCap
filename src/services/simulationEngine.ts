import type { Simulation, SimulationChoice, SimulationResult, SimulationRun } from "../types/simulation";

export const simulationEngine = {
  start(sim: Simulation): SimulationRun {
    return {
      simulationId: sim.id,
      currentStep: 0,
      choices: [],
      portfolioValue: sim.steps[0]?.portfolioValue ?? 0,
      paused: false,
      completed: false,
    };
  },

  selectChoice(run: SimulationRun, sim: Simulation, choice: SimulationChoice): SimulationRun {
    const step = sim.steps[run.currentStep];
    const nextValue =
      choice.nextValueDelta !== undefined
        ? run.portfolioValue + choice.nextValueDelta
        : sim.steps[run.currentStep + 1]?.portfolioValue ?? run.portfolioValue;

    return {
      ...run,
      choices: [...run.choices, { stepId: step.id, choiceId: choice.id }],
      portfolioValue: nextValue,
    };
  },

  advance(run: SimulationRun, sim: Simulation): SimulationRun {
    const next = run.currentStep + 1;
    if (next >= sim.steps.length) {
      return { ...run, completed: true, paused: false };
    }
    return {
      ...run,
      currentStep: next,
      portfolioValue: sim.steps[next].portfolioValue,
    };
  },

  pause(run: SimulationRun): SimulationRun {
    return { ...run, paused: true };
  },

  resume(run: SimulationRun): SimulationRun {
    return { ...run, paused: false };
  },

  complete(run: SimulationRun): SimulationRun {
    return { ...run, completed: true, paused: false };
  },

  getResult(run: SimulationRun, sim: Simulation): SimulationResult {
    const ids = run.choices.map((c) => c.choiceId);
    const sells = ids.filter((id) => id.includes("sell") || id === "reduce" || id === "book").length;
    const holds = ids.filter((id) => id === "hold" || id === "stay" || id === "continue" || id === "apply").length;
    const fomo = ids.filter((id) => id === "fomo" || id === "chase" || id === "full").length;

    const lossSensitivity: SimulationResult["lossSensitivity"] = sells >= 1 ? "High" : holds >= 2 ? "Medium" : "Low";
    const volatilityTolerance: SimulationResult["volatilityTolerance"] =
      holds >= 2 && sells === 0 ? "High" : sells >= 2 ? "Low" : "Medium";

    return {
      decisionConsistency: Math.max(55, Math.min(92, 70 + holds * 6 - sells * 8 - fomo * 10)),
      volatilityTolerance,
      diversificationAwareness: sim.category === "portfolio" || holds > 0 ? "Strong" : "Developing",
      lossSensitivity,
      noticed:
        sells > 0
          ? "You consistently reduced risk after losses."
          : holds > 0
            ? "You stayed with your plan through uncomfortable moves."
            : "You took time to notice how the situation felt.",
      explore: "Learn how long-term investors think about drawdowns.",
      exploreHref: "/lens/volatility",
    };
  },
};
