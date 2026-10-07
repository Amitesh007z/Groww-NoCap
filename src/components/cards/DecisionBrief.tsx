import { useInvestorDNA } from "../../hooks/useInvestorDNA";
import { formatINR } from "../../utils/currency";
import { ButtonLink } from "../ui/primitives";
import { GoalProgress } from "../cards/Cards";
import { RiskCard } from "../cards/Cards";

export function DecisionBrief({
  assetName,
}: {
  assetName: string;
}) {
  const { context } = useInvestorDNA();
  const tech = context.portfolio.holdings.filter((h) => h.sector === "Technology");
  const before = context.portfolio.total ? Math.round((tech.reduce((s, h) => s + h.current, 0) / context.portfolio.total) * 100) : 18;
  const after = Math.min(99, before + 13);

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted">{assetName}</p>
      <RiskCard tone="good" title="Why it could make sense" items={["✓ Long-term horizon", "✓ Fits your selected path", "✓ Diversification benefit"]} />
      <RiskCard tone="warn" title="What could go wrong" items={["⚠ High valuation", "⚠ Sector concentration", "⚠ High volatility"]} />
      <RiskCard tone="open" title="What you haven't checked" items={["○ Debt", "○ Cash flow"]} />
      <section className="rounded-2xl border border-line bg-white p-5">
        <h3 className="font-semibold">Goal impact</h3>
        <p className="mt-3 text-sm">Current technology exposure: {before}%</p>
        <p className="text-sm">After this decision: {after}%</p>
        <p className="mt-2 text-xs text-muted">FACT is the exposure change. INTERPRETATION is that concentration rose. UNCERTAINTY is whether that still fits your thesis.</p>
      </section>
      <GoalProgress current={context.goals[0]?.currentAmount ?? 0} target={context.goals[0]?.targetAmount ?? 1} caption={`${formatINR(context.goals[0]?.currentAmount ?? 0)} toward the goal`} />
      <ButtonLink to="/lens/debt-equity" variant="secondary">
        Check debt first
      </ButtonLink>
    </div>
  );
}
