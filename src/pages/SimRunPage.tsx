import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { simulationById } from "../data/simulations";
import { simulationEngine } from "../services/simulationEngine";
import { emit } from "../services/events";
import { useSimulationStore } from "../store/simulationStore";
import { useLearningStore } from "../store/learningStore";
import { LeveragedReplay, MarketReplay, SimulationChoice } from "../components/sim/SimBits";
import { Button, ButtonLink, ProgressBar } from "../components/ui/primitives";
import { StatCard } from "../components/cards/Cards";
import { formatINR } from "../utils/currency";
import type { SimulationChoice as Choice, SimulationRun } from "../types/simulation";

export function SimRunPage() {
  const { simulationId = "" } = useParams();
  const sim = simulationById[simulationId];
  const navigate = useNavigate();
  const stored = useSimulationStore((s) => s.active);
  const setActive = useSimulationStore((s) => s.setActive);
  const applyBehavior = useLearningStore((s) => s.applyBehavior);
  const [run, setRun] = useState<SimulationRun | undefined>();
  const [picked, setPicked] = useState<Choice | null>(null);
  const [showConsequence, setShowConsequence] = useState(false);

  useEffect(() => {
    if (!sim) return;
    const existing = stored?.simulationId === sim.id && !stored.completed ? stored : simulationEngine.start(sim);
    setRun(existing);
    setActive(existing);
    emit("SIMULATION_STARTED", sim.id);
    // Intentionally run once per simulation id so pause/resume does not restart.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [simulationId]);

  const result = useMemo(() => (run && sim && run.completed ? simulationEngine.getResult(run, sim) : null), [run, sim]);

  if (!sim) {
    return (
      <p>
        Simulation not found. <Link to="/sim">Back</Link>
      </p>
    );
  }

  if (!run) return null;

  if (sim.id === "covid") {
    return <MarketReplay />;
  }

  if (sim.id === "fno") {
    return <LeveragedReplay />;
  }

  if (sim.id === "ipo" || sim.id === "portfolio-mission") {
    return (
      <MarketReplay
        config={
          sim.id === "ipo"
            ? {
                title: "Experience the IPO after listing.",
                eyebrow: "IPO REPLAY · PAPER TRADING",
                symbol: "NOVA MOBILITY",
                description: "Watch hype turn into price movement. Demo data only; no application is submitted.",
                candles: [
                  { label: "Listing", open: 430, high: 486, low: 424, close: 468 },
                  { label: "Day 2", open: 468, high: 478, low: 448, close: 452 },
                  { label: "Day 5", open: 452, high: 460, low: 425, close: 431 },
                  { label: "Day 10", open: 431, high: 438, low: 396, close: 404 },
                  { label: "Day 20", open: 404, high: 419, low: 384, close: 392 },
                  { label: "Month 2", open: 392, high: 410, low: 380, close: 401 },
                  { label: "Month 3", open: 401, high: 426, low: 395, close: 418 },
                ],
                initialCash: 14620,
                initialUnits: 34,
                unitSize: 1,
              }
            : {
                title: "Build a portfolio for a 3-year goal.",
                eyebrow: "PORTFOLIO REPLAY · PAPER TRADING",
                symbol: "NOCAP BALANCED",
                description: "Rebalance a diversified demo portfolio as markets move through three years.",
                candles: [
                  { label: "Month 1", open: 100, high: 102, low: 99, close: 101 },
                  { label: "Month 3", open: 101, high: 104, low: 100, close: 103 },
                  { label: "Month 6", open: 103, high: 106, low: 101, close: 102 },
                  { label: "Month 9", open: 102, high: 103, low: 96, close: 98 },
                  { label: "Year 1", open: 98, high: 102, low: 95, close: 101 },
                  { label: "Year 2", open: 101, high: 110, low: 100, close: 108 },
                  { label: "Year 3", open: 108, high: 116, low: 106, close: 114 },
                ],
                initialCash: 30000,
                initialUnits: 700,
                unitSize: 100,
              }
        }
      />
    );
  }

  const step = sim.steps[run.currentStep];
  const total = sim.steps.length;

  function persist(next: SimulationRun) {
    setRun(next);
    setActive(next);
  }

  if (run.paused) {
    return (
      <div className="rounded-3xl bg-white p-6 shadow-card">
        <h1 className="text-2xl font-bold">Paused</h1>
        <p className="mt-2 text-muted">Your place is saved on this device.</p>
        <Button className="mt-4" onClick={() => persist(simulationEngine.resume(run))}>
          Resume
        </Button>
        <ButtonLink className="mt-3" variant="secondary" to="/sim">
          Exit
        </ButtonLink>
      </div>
    );
  }

  if (run.completed && result) {
    return (
      <div className="rounded-3xl bg-white p-6 shadow-card">
        <p className="text-xs font-semibold uppercase text-muted">You experienced the market.</p>
        <h1 className="mt-2 text-3xl font-bold">Your investing behavior in simulations</h1>
        <p className="mt-2 text-sm text-muted">This is not a diagnosis. It is a reflection of choices in this demo.</p>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <StatCard label="Decision consistency" value={`${result.decisionConsistency}%`} />
          <StatCard label="Volatility tolerance" value={result.volatilityTolerance} />
          <StatCard label="Diversification awareness" value={result.diversificationAwareness} />
          <StatCard label="Loss sensitivity" value={result.lossSensitivity} />
        </div>
        <div className="mt-5 rounded-2xl bg-canvas p-4">
          <p className="font-semibold">What we noticed</p>
          <p className="mt-1 text-sm">{result.noticed}</p>
          <p className="mt-3 font-semibold">What to explore</p>
          <p className="mt-1 text-sm">{result.explore}</p>
        </div>
        <Button
          className="mt-5"
          onClick={() => {
            emit("SIMULATION_COMPLETED", sim.id);
            if (sim.id === "covid") emit("MISSION_COMPLETED", "correction-mission");
            if (sim.id === "fno") emit("MISSION_COMPLETED", "leverage-mission");
            if (sim.id === "ipo") emit("MISSION_COMPLETED", "ipo-mission");
            navigate(result.exploreHref);
          }}
        >
          Understand volatility →
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <Link to="/sim" className="font-medium">
          ← Exit
        </Link>
        <button className="min-h-tap font-medium" onClick={() => persist(simulationEngine.pause(run))}>
          Pause
        </button>
      </div>
      <p className="mt-4 text-sm text-muted">
        Step {run.currentStep + 1} of {total}
      </p>
      <ProgressBar className="mt-2" value={((run.currentStep + 1) / total) * 100} />

      <section className="mt-5 rounded-3xl bg-white p-5 shadow-card md:p-7">
        <p className="text-xs font-semibold uppercase text-muted">{step.title}</p>
        <p className="mt-2 text-sm">Market: {step.marketContext}</p>
        <p className="mt-1 text-3xl font-bold">{formatINR(showConsequence ? run.portfolioValue : step.portfolioValue)}</p>
        <p className="text-sm text-muted">Your portfolio</p>
        <p className="mt-4 leading-7">{step.event}</p>

        {step.choices.length > 1 && !showConsequence && (
          <div className="mt-5">
            <h2 className="text-xl font-semibold">What do you do?</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {step.choices.map((c) => (
                <SimulationChoice key={c.id} label={c.label} selected={picked?.id === c.id} onSelect={() => setPicked(c)} />
              ))}
            </div>
          </div>
        )}

        {showConsequence && picked && (
          <div className="mt-5 rounded-2xl bg-canvas p-4">
            <p>{picked.consequence}</p>
          </div>
        )}

        <Button
          className="mt-6 w-full"
          disabled={step.choices.length > 1 && !picked && !showConsequence}
          onClick={() => {
            const choice = picked ?? step.choices[0];
            if (!choice) return;
            if (step.choices.length > 1 && !showConsequence) {
              const next = simulationEngine.selectChoice(run, sim, choice);
              persist(next);
              if (choice.behavioralSignal) applyBehavior([choice.behavioralSignal]);
              setShowConsequence(true);
              return;
            }
            const advanced = simulationEngine.advance(run, sim);
            persist(advanced);
            setPicked(null);
            setShowConsequence(false);
            if (advanced.completed) {
              const signals = advanced.choices
                .map((ch) => {
                  const st = sim.steps.find((s) => s.id === ch.stepId);
                  return st?.choices.find((c) => c.id === ch.choiceId)?.behavioralSignal;
                })
                .filter(Boolean) as string[];
              applyBehavior(signals);
            }
          }}
        >
          {step.choices.length <= 1 && !showConsequence ? "Continue →" : showConsequence ? "Continue →" : "See what happens"}
        </Button>
      </section>
    </div>
  );
}
