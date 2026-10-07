import { Link } from "react-router-dom";
import { simulations } from "../data/simulations";
import { SimulationCard } from "../components/cards/Cards";
import { useSimulationStore } from "../store/simulationStore";

export function SimPage() {
  const completed = useSimulationStore((s) => s.completed);
  const active = useSimulationStore((s) => s.active);

  return (
    <div>
      <h1 className="text-3xl font-bold">Experience before you risk.</h1>
      <p className="mt-2 text-muted">Real market situations. Zero real-money risk.</p>
      {active && !active.completed && (
        <p className="mt-4 rounded-2xl bg-amber-faint p-4 text-sm">
          You have a paused simulation.{" "}
          <Link className="font-semibold text-groww-dark" to={`/sim/${active.simulationId}`}>
            Resume
          </Link>
        </p>
      )}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {simulations.map((s) => (
          <div key={s.id} className="relative">
            {completed[s.id] && <span className="absolute right-4 top-4 z-10 text-xs font-semibold text-groww-dark">Done</span>}
            <SimulationCard
              title={s.title}
              description={s.description}
              minutes={s.estimatedMinutes}
              difficulty={s.difficulty}
              href={`/sim/${s.id}`}
            />
          </div>
        ))}
      </div>
      <section className="mt-8">
        <h2 className="text-lg font-semibold">Explore safely</h2>
        <p className="mt-1 text-sm text-muted">These are separate learning experiences, not real trading screens.</p>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <Link to="/ipo" className="rounded-2xl border border-line bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">DEMO DATA</p>
            <h3 className="mt-2 font-semibold">IPO experience</h3>
            <p className="mt-1 text-sm text-muted">Understand price bands, lots and subscription.</p>
            <span className="mt-3 block text-sm font-semibold text-groww-dark">Explore IPO →</span>
          </Link>
          <Link to="/fno" className="rounded-2xl border border-line bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">VIRTUAL CAPITAL</p>
            <h3 className="mt-2 font-semibold">F&O simulator</h3>
            <p className="mt-1 text-sm text-muted">See how leverage changes loss mechanics.</p>
            <span className="mt-3 block text-sm font-semibold text-groww-dark">Learn leverage →</span>
          </Link>
          <Link to="/guard" className="rounded-2xl border border-line bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">REFLECTION</p>
            <h3 className="mt-2 font-semibold">Groww Guard</h3>
            <p className="mt-1 text-sm text-muted">Practice staying calm during a market drop.</p>
            <span className="mt-3 block text-sm font-semibold text-groww-dark">Open Guard →</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
