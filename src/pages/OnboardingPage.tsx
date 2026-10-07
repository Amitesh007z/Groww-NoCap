import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { Button, ProgressBar } from "../components/ui/primitives";
import { formatINR } from "../utils/currency";
import { useGoalStore } from "../store/goalStore";
import { useUserStore } from "../store/userStore";
import { emit } from "../services/events";
import type { ExperienceLevel, GoalCategory, Interest } from "../types/user";

const goals: { id: GoalCategory; label: string; icon: string }[] = [
  { id: "education", label: "Education", icon: "🎓" },
  { id: "wealth", label: "Build Wealth", icon: "🏠" },
  { id: "safety", label: "Safety", icon: "🛟" },
  { id: "experience", label: "Major Experience", icon: "✈️" },
  { id: "purchase", label: "Major Purchase", icon: "🚗" },
  { id: "freedom", label: "Financial Freedom", icon: "💼" },
  { id: "long-term", label: "Long-term Wealth", icon: "📈" },
  { id: "other", label: "Something Else", icon: "✨" },
];

const amounts = [
  { label: "₹1L", value: 100000 },
  { label: "₹5L", value: 500000 },
  { label: "₹10L", value: 1000000 },
  { label: "₹25L", value: 2500000 },
  { label: "₹50L+", value: 5000000 },
];

const yearsOpts = [1, 3, 5, 10];

const familiarity: { id: ExperienceLevel; label: string }[] = [
  { id: "new", label: "🌱 I'm completely new" },
  { id: "basics", label: "🔎 I know the basics" },
  { id: "invested", label: "📊 I've invested before" },
  { id: "markets", label: "🧠 I understand markets fairly well" },
];

const interestOptions: Interest[] = [
  "Mutual Funds",
  "Stocks",
  "ETFs",
  "IPOs",
  "F&O",
  "Long-term investing",
  "Understanding markets",
];

export function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState<GoalCategory>("wealth");
  const [target, setTarget] = useState(1000000);
  const [years, setYears] = useState(5);
  const [customYears, setCustomYears] = useState("");
  const [savings, setSavings] = useState(84000);
  const [investments, setInvestments] = useState(200000);
  const [monthly, setMonthly] = useState(12000);
  const [level, setLevel] = useState<ExperienceLevel>("basics");
  const [interests, setInterests] = useState<Interest[]>(["Stocks", "Mutual Funds"]);
  const navigate = useNavigate();
  const createGoal = useGoalStore((s) => s.createGoal);
  const completeOnboarding = useUserStore((s) => s.completeOnboarding);

  const totalSteps = 6;
  const current = savings + investments;

  function finish() {
    completeOnboarding({
      familiarity: level,
      interests,
      currentSavings: savings,
      currentInvestments: investments,
      monthlyInvestable: monthly,
    });
    createGoal({
      category,
      targetAmount: target,
      years,
      currentAmount: current,
      monthlyInvestable: monthly,
    });
    emit("GOAL_CREATED", category);
    setStep(6);
  }

  if (step === 6) {
    return (
      <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-5 py-10">
        <div className="rounded-3xl border border-line bg-white p-6 text-center shadow-card">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-groww-faint text-groww-dark">
            <Check />
          </div>
          <h1 className="mt-4 text-3xl font-bold">Your Groww Path is ready.</h1>
          <div className="mt-6 grid grid-cols-2 gap-3 text-left">
            <Stat label="Goal" value={formatINR(target)} />
            <Stat label="Timeline" value={`${years} years`} />
            <Stat label="Current progress" value={formatINR(current)} />
            <Stat label="Current trajectory" value="4 months ahead" />
          </div>
          <Button className="mt-6 w-full" onClick={() => navigate("/path")}>
            Explore my path →
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-xl px-5 py-8">
      <div className="flex items-center justify-between text-sm">
        <Link to="/" className="font-extrabold">
          groww.
        </Link>
        <span className="text-muted">
          {step + 1} / {totalSteps}
        </span>
      </div>
      <ProgressBar className="mt-4" value={((step + 1) / totalSteps) * 100} />

      {step === 0 && (
        <Block title="What do you want your money to help you achieve?">
          <div className="grid grid-cols-2 gap-3">
            {goals.map((g) => (
              <button
                key={g.id}
                className={`min-h-tap rounded-2xl border p-4 text-left ${category === g.id ? "border-groww bg-groww-faint" : "border-line bg-white"}`}
                onClick={() => setCategory(g.id)}
              >
                <div className="text-xl">{g.icon}</div>
                <div className="mt-2 font-semibold">{g.label}</div>
              </button>
            ))}
          </div>
        </Block>
      )}

      {step === 1 && (
        <Block title="How much do you want to reach?">
          <p className="text-4xl font-bold">{formatINR(target)}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {amounts.map((a) => (
              <button key={a.label} className={`rounded-full border px-4 py-2 ${target === a.value ? "border-groww bg-groww-faint" : "border-line"}`} onClick={() => setTarget(a.value)}>
                {a.label}
              </button>
            ))}
          </div>
        </Block>
      )}

      {step === 2 && (
        <Block title="When do you want to get there?">
          <div className="grid grid-cols-2 gap-3">
            {yearsOpts.map((y) => (
              <button key={y} className={`min-h-tap rounded-2xl border ${years === y ? "border-groww bg-groww-faint" : "border-line"}`} onClick={() => setYears(y)}>
                {y} year{y > 1 ? "s" : ""}
              </button>
            ))}
          </div>
          <label className="mt-4 block text-sm">
            Custom
            <input
              className="mt-1 w-full rounded-xl border border-line px-3 py-3"
              inputMode="numeric"
              value={customYears}
              placeholder="Years"
              onChange={(e) => {
                setCustomYears(e.target.value);
                const n = Number(e.target.value);
                if (n > 0) setYears(n);
              }}
            />
          </label>
        </Block>
      )}

      {step === 3 && (
        <Block title="Where are you starting from?">
          <Field label="Current savings" value={savings} onChange={setSavings} />
          <Field label="Current investments" value={investments} onChange={setInvestments} />
          <Field label="Monthly amount you can invest" value={monthly} onChange={setMonthly} />
        </Block>
      )}

      {step === 4 && (
        <Block title="How familiar are you with investing?">
          <div className="space-y-2">
            {familiarity.map((f) => (
              <button key={f.id} className={`flex min-h-tap w-full rounded-2xl border px-4 py-4 text-left ${level === f.id ? "border-groww bg-groww-faint" : "border-line"}`} onClick={() => setLevel(f.id)}>
                {f.label}
              </button>
            ))}
          </div>
        </Block>
      )}

      {step === 5 && (
        <Block title="What sounds interesting to you?">
          <p className="text-sm text-muted">Multi-select. This is for personalization, not a product push.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {interestOptions.map((item) => {
              const on = interests.includes(item);
              return (
                <button
                  key={item}
                  className={`rounded-full border px-4 py-2 ${on ? "border-groww bg-groww-faint" : "border-line"}`}
                  onClick={() => setInterests(on ? interests.filter((i) => i !== item) : [...interests, item])}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </Block>
      )}

      <div className="mt-8 flex gap-3">
        {step > 0 && (
          <Button variant="secondary" onClick={() => setStep(step - 1)}>
            Back
          </Button>
        )}
        <Button
          className="flex-1"
          onClick={() => {
            if (step === 5) finish();
            else setStep(step + 1);
          }}
        >
          Continue
        </Button>
      </div>
    </main>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-10">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">Let's start with you</p>
      <h1 className="mt-2 text-3xl font-bold leading-tight">{title}</h1>
      <div className="mt-6 space-y-4">{children}</div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-canvas p-3">
      <p className="text-xs text-muted">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: number; onChange: (n: number) => void }) {
  return (
    <label className="block text-sm">
      {label}
      <input
        className="mt-1 w-full rounded-xl border border-line px-3 py-3"
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(Number(e.target.value.replace(/[^\d]/g, "")) || 0)}
      />
    </label>
  );
}
