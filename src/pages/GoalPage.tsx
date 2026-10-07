import { Link } from "react-router-dom";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useGoal } from "../hooks/useGoal";
import { useUser } from "../hooks/useUser";
import { GoalProgress, MoneyCard, StatCard } from "../components/cards/Cards";
import { ButtonLink } from "../components/ui/primitives";
import { formatINR } from "../utils/currency";

export function GoalPage() {
  const { goal } = useGoal();
  const monthly = useUser().user.monthlyInvestable;
  const projection = [
    { y: "Now", v: goal.currentAmount },
    { y: "Y1", v: Math.round(goal.currentAmount + (goal.targetAmount - goal.currentAmount) * 0.18) },
    { y: "Y2", v: Math.round(goal.currentAmount + (goal.targetAmount - goal.currentAmount) * 0.36) },
    { y: "Y3", v: Math.round(goal.currentAmount + (goal.targetAmount - goal.currentAmount) * 0.56) },
    { y: "Y4", v: Math.round(goal.currentAmount + (goal.targetAmount - goal.currentAmount) * 0.78) },
    { y: "Y5", v: goal.targetAmount },
  ];
  return (
    <div>
      <p className="text-xs font-semibold uppercase text-muted">My goal</p>
      <h1 className="mt-1 text-3xl font-bold">{goal.name}</h1>
      <p className="mt-2 text-muted">A goal gives your money a direction. Here's how you're progressing.</p>

      <section className="mt-6 rounded-3xl bg-white p-6 shadow-card">
        <GoalProgress
          current={goal.currentAmount}
          target={goal.targetAmount}
          caption={goal.status === "ahead" ? `You're ${goal.monthsAhead} months ahead of your target.` : "On an illustrative trajectory"}
        />
        <p className="mt-4 text-xs text-muted">Illustrative projection · based on demo assumptions · markets can vary significantly.</p>
        <div className="mt-6 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={projection}>
              <XAxis dataKey="y" />
              <YAxis hide />
              <Tooltip />
              <Line type="monotone" dataKey="v" stroke="#00B386" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <StatCard label="Timeline" value={`${goal.years} years`} />
        <MoneyCard label="Monthly amount" value={monthly} hint="What you can invest" />
        <StatCard label="Current trajectory" value={goal.status === "ahead" ? "Ahead" : goal.status} tone="positive" />
      </div>

      <section className="mt-6 rounded-2xl border border-line bg-white p-5">
        <h3 className="font-semibold">Your goal, your pace</h3>
        <p className="mt-2 text-sm text-muted">This is a demo projection based on illustrative assumptions. No outcome is guaranteed.</p>
        <ButtonLink className="mt-4" to="/path">
          Explore possible paths →
        </ButtonLink>
      </section>
      <Link to="/onboarding" className="mt-4 inline-block text-sm font-semibold text-groww-dark">
        Update my goal
      </Link>
    </div>
  );
}
