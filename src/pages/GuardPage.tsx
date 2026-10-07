import { useEffect } from "react";
import { ShieldCheck } from "lucide-react";
import { ButtonLink } from "../components/ui/primitives";
import { GuardCard } from "../components/sim/SimBits";
import { useAppStore } from "../store/appStore";
import { useGoal } from "../hooks/useGoal";
import { useSimulationStore } from "../store/simulationStore";
import { startGuardEvent } from "../services/events";

export function GuardPage() {
  const market = useAppStore((s) => s.market);
  const { goal } = useGoal();
  const covidDone = useSimulationStore((s) => s.completed.covid);

  useEffect(() => {
    startGuardEvent();
  }, []);

  return (
    <div>
      <div className="flex items-center gap-2 text-groww-dark">
        <ShieldCheck />
        <p className="text-xs font-semibold uppercase">Groww Guard</p>
      </div>
      <h1 className="mt-2 text-3xl font-bold">Your goal remains on track.</h1>
      <p className="mt-2 text-muted">The market moved. Let's look at what changed — calmly.</p>

      <div className="mt-6">
        <GuardCard market={market.marketChange || -8.2} portfolio={market.portfolioChange || -6.8} />
      </div>

      <section className="mt-4 space-y-2 rounded-3xl bg-white p-5 text-sm shadow-card">
        <p>Your goal: {goal.name} by {goal.targetDate.slice(0, 4)}</p>
        <p>Goal status: Still on track</p>
        <p>Original thesis: Long-term growth</p>
        <p>Recent change: No major thesis-breaking event in demo data</p>
        <p>Portfolio concentration: Unchanged</p>
        {covidDone && (
          <p className="rounded-xl bg-groww-faint p-3">
            You've previously experienced a similar drawdown in simulation.
          </p>
        )}
      </section>

      <h2 className="mt-6 text-2xl font-bold">Nothing requires action right now.</h2>
      <div className="mt-4 flex flex-wrap gap-3">
        <ButtonLink to="/decision/nova">Review my thesis</ButtonLink>
        <ButtonLink variant="secondary" to="/lens/drawdown">
          Understand the market drop
        </ButtonLink>
      </div>
    </div>
  );
}
