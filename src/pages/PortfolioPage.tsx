import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts";
import { usePortfolioStore, getPortfolioSnapshot } from "../store/portfolioStore";
import { useGoal } from "../hooks/useGoal";
import { MoneyCard, StatCard } from "../components/cards/Cards";
import { PortfolioCard } from "../components/sim/SimBits";
import { ButtonLink, EmptyState } from "../components/ui/primitives";
import { formatSignedINR } from "../utils/currency";
import { percent } from "../utils/calculations";

export function PortfolioPage() {
  const holdings = usePortfolioStore((s) => s.holdings);
  const decisions = usePortfolioStore((s) => s.decisions);
  const { goal } = useGoal();
  const snap = getPortfolioSnapshot(holdings);
  const tech = holdings.filter((h) => h.sector === "Technology").reduce((s, h) => s + h.current, 0);
  const techPct = percent(tech, snap.total || 1);

  if (holdings.length === 0) {
    return (
      <EmptyState
        title="Your investing journey starts here."
        body="You don't need to know everything before you begin."
        action={<ButtonLink to="/path">Explore your path →</ButtonLink>}
      />
    );
  }

  const slices = [
    { name: "Tech", value: techPct },
    { name: "Other", value: 100 - techPct },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold">Your money, in context.</h1>
      <p className="mt-2 text-muted">See how your choices affect the goal you're working toward.</p>
      <section className="mt-6 rounded-3xl bg-white p-6 shadow-card">
        <p className="text-xs font-semibold uppercase text-muted">Total</p>
        <p className="text-4xl font-bold">{snap.total.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })}</p>
        <p className="text-sm text-muted">Invested {snap.invested.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })}</p>
        <p className="mt-1 font-semibold text-groww-dark">Returns {formatSignedINR(snap.returns)}</p>
      </section>

      <h2 className="mt-8 text-xl font-semibold">How this affects your goal</h2>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <StatCard label="Goal progress" value={`${percent(goal.currentAmount, goal.targetAmount)}%`} />
        <StatCard label="Trajectory" value={goal.status === "ahead" ? "Ahead" : goal.status} tone="positive" />
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Diversification" value="Healthy" tone="positive" />
        <MoneyCard label="Technology" value={`${techPct}%`} hint={`↑ Higher than your previous 18%`} />
        <StatCard label="Risk" value="Moderate" />
        <StatCard label="Goal alignment" value="On track" tone="positive" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_220px]">
        <div className="space-y-2">
          {holdings.map((h) => (
            <PortfolioCard key={h.symbol} name={h.name} invested={h.invested} current={h.current} />
          ))}
        </div>
        <div className="h-48">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={slices} dataKey="value" innerRadius={40} outerRadius={70}>
                <Cell fill="#00B386" />
                <Cell fill="#E5E7EB" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {decisions.length > 0 && (
        <p className="mt-6 text-sm text-muted">{decisions.length} demo decision(s) recorded on this device.</p>
      )}
      <ButtonLink className="mt-6" to="/decision/nova" variant="secondary">
        Review Nova decision
      </ButtonLink>
    </div>
  );
}
