import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { formatLongDate, greeting } from "../utils/formatting";
import { useInvestorDNA } from "../hooks/useInvestorDNA";
import { GoalProgress, InsightCard, LearningCard } from "../components/cards/Cards";
import { Button, ButtonLink, Skeleton } from "../components/ui/primitives";
import { useMockLoading } from "../hooks/useMockLoading";
import { startGuardEvent } from "../services/events";
import { formatINR } from "../utils/currency";

export function DashboardPage() {
  const { context, action, skill } = useInvestorDNA();
  const { loading, error, retry } = useMockLoading();
  const goal = context.goals[0];
  const typeMap = {
    LEARN: "learn",
    SIMULATE: "simulate",
    REVIEW: "review",
    GOAL: "goal",
    GUARD: "guard",
    DO_NOTHING: "nothing",
  } as const;

  if (error) {
    return (
      <div className="rounded-2xl border border-line bg-white p-6">
        <h2 className="text-lg font-semibold">We couldn't load your market context.</h2>
        <p className="mt-2 text-sm text-muted">Your goal and portfolio are still available.</p>
        <Button className="mt-4" onClick={retry}>
          Try again
        </Button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  const known = [
    context.knowledge.sip > 0.5 ? "SIP" : null,
    context.knowledge.mutualFunds > 0.5 ? "Mutual funds" : null,
    context.knowledge.diversification > 0.5 ? "Diversification" : null,
  ].filter(Boolean) as string[];

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">{formatLongDate()}</p>
      <h1 className="mt-1 text-3xl font-bold md:text-4xl">
        {greeting()}, {context.user.name}
      </h1>
      <p className="mt-1 text-muted">Here's where your money stands.</p>

      <section className="mt-6 rounded-3xl bg-white p-5 shadow-card md:p-7">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">Your goal</p>
          <Link to="/path" className="text-sm font-semibold text-groww-dark">
            View your path →
          </Link>
        </div>
        <h2 className="mt-2 text-2xl font-semibold md:text-3xl">{goal.name}</h2>
        <div className="mt-4">
          <GoalProgress
            current={goal.currentAmount}
            target={goal.targetAmount}
            caption={goal.status === "ahead" ? `You're ${goal.monthsAhead} months ahead of your target` : "Illustrative trajectory"}
          />
        </div>
      </section>

      <div className="mt-4 lg:hidden">
        <p className="text-4xl font-bold">{formatINR(goal.currentAmount)}</p>
        <p className="text-sm text-muted">Your financial progress</p>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <InsightCard
          type={typeMap[action.type]}
          title={action.type === "DO_NOTHING" ? "Nothing needs your attention today." : action.title}
          description={action.reason}
          why={action.whySeeingThis}
          action={action.cta}
          href={action.href}
        />
        <LearningCard known={known} next={skill.title} why={skill.why} href={skill.href} />
      </div>

      <section className="mt-4 rounded-2xl border border-line bg-white p-5">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">Try this</p>
        <h3 className="mt-2 text-xl font-semibold">The market falls 25%.</h3>
        <p className="mt-1 text-sm text-muted">Your goal is still years away. What would you do?</p>
        <ButtonLink className="mt-4" to="/sim/covid">
          Experience it →
        </ButtonLink>
      </section>

      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          ["Understand something", "/lens"],
          ["Try a simulation", "/sim"],
          ["Explore my path", "/path"],
          ["Review portfolio", "/portfolio"],
        ].map(([label, href]) => (
          <Link key={label} to={href} className="flex min-h-tap items-center justify-center rounded-2xl border border-line bg-white px-3 py-4 text-center text-sm font-semibold">
            {label}
          </Link>
        ))}
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">Your journey</h2>
        <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
          {["₹10K", "₹50K", "₹1L", "₹5L", "₹10L"].map((m) => (
            <div key={m} className="min-w-[88px] rounded-2xl bg-white p-3 text-center text-sm font-semibold shadow-card">
              {m}
            </div>
          ))}
        </div>
      </section>

      {context.simulations.completed.covid && (
        <p className="mt-6 rounded-2xl bg-groww-faint p-4 text-sm">You completed your first market replay.</p>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        <Button variant="secondary" onClick={startGuardEvent}>
          Trigger demo market drop
        </Button>
        <ButtonLink to="/guard" variant="ghost">
          Open Guard <ArrowRight size={14} />
        </ButtonLink>
      </div>
    </div>
  );
}
