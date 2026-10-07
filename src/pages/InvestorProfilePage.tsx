import { useInvestorDNA } from "../hooks/useInvestorDNA";
import { InvestorDNA } from "../components/investor/InvestorBits";
import { StatCard } from "../components/cards/Cards";
import { ButtonLink } from "../components/ui/primitives";
export function InvestorProfilePage() {
  const { context, skill, labels } = useInvestorDNA();
  const loss = labels.lossSensitivity;

  return (
    <div>
      <h1 className="text-3xl font-bold">Your Investor Profile</h1>
      <p className="mt-2 text-muted">What Groww has learned from your journey.</p>

      <section className="mt-6 rounded-3xl bg-white p-5 shadow-card">
        <p className="text-xs font-semibold uppercase text-muted">Knowledge</p>
        <div className="mt-4">
          <InvestorDNA knowledge={context.knowledge} />
        </div>
      </section>

      <h2 className="mt-8 text-xl font-semibold">Behavior</h2>
      <p className="text-sm text-muted">Your investing behavior in simulations</p>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <StatCard label="Patience" value={labels.patience} />
        <StatCard label="Diversification" value={labels.diversification} />
        <StatCard label="Loss sensitivity" value={loss} />
        <StatCard label="FOMO tendency" value={labels.fomoTendency} />
        <StatCard label="Consistency" value={labels.consistency} />
      </div>

      <p className="mt-5 rounded-2xl bg-canvas p-4 text-sm leading-6">
        You tend to become more cautious after large losses. Try the volatility mission to understand this behavior.
      </p>

      <h2 className="mt-8 text-xl font-semibold">Experience</h2>
      <div className="mt-3 grid gap-3 md:grid-cols-4">
        <StatCard label="Simulations" value={String(context.progress.simulations)} />
        <StatCard label="Concepts learned" value={String(context.progress.conceptsLearned)} />
        <StatCard label="Decisions recorded" value={String(context.progress.decisions)} />
        <StatCard label="Missions completed" value={String(context.progress.missions)} />
      </div>

      <section className="mt-6 rounded-2xl border border-line bg-white p-5">
        <h3 className="font-semibold">Biggest opportunity</h3>
        <p className="mt-2 text-sm">
          Next thing to learn: {skill.title}. {skill.why}
        </p>
        <ButtonLink className="mt-4" to={skill.href}>
          Learn {skill.title}
        </ButtonLink>
      </section>
    </div>
  );
}
