import { Link } from "react-router-dom";
import { formatINR } from "../../utils/currency";
import { ProgressBar } from "../ui/primitives";
import { cn } from "../../utils/cn";
import { useEffect, useState } from "react";

function useCountUp(value: number) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setN(value);
      return;
    }
    let frame = 0;
    const frames = 28;
    let raf = 0;
    const tick = () => {
      frame += 1;
      setN(Math.round(value * (frame / frames)));
      if (frame < frames) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return n;
}

export function MoneyCard({
  label,
  value,
  hint,
  tone,
}: {
  label: string;
  value: number | string;
  hint?: string;
  tone?: "positive" | "negative";
}) {
  return (
    <div className="rounded-2xl border border-line bg-white p-4 shadow-card">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
      <p className={cn("mt-1 text-3xl font-bold tracking-tight", tone === "positive" && "text-groww-dark", tone === "negative" && "text-danger")}>
        {typeof value === "number" ? formatINR(value) : value}
      </p>
      {hint && <p className="mt-1 text-sm text-muted">{hint}</p>}
    </div>
  );
}

export function StatCard({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-4">
      <p className="text-xs text-muted">{label}</p>
      <p className={cn("mt-1 text-lg font-semibold", tone === "positive" && "text-groww-dark")}>{value}</p>
    </div>
  );
}

export function GoalProgress({
  current,
  target,
  caption,
}: {
  current: number;
  target: number;
  caption?: string;
}) {
  const pct = Math.round((current / target) * 100);
  const shown = useCountUp(current);
  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-2">
        <strong className="text-3xl font-bold md:text-4xl">{formatINR(shown)}</strong>
        <span className="text-muted">/ {formatINR(target)}</span>
      </div>
      <ProgressBar value={pct} className="mt-3" />
      <div className="mt-2 flex justify-between text-sm text-muted">
        <span>{pct}%</span>
        {caption && <span className="font-medium text-groww-dark">{caption}</span>}
      </div>
    </div>
  );
}

export function InsightCard({
  type,
  title,
  description,
  action,
  href,
  why,
}: {
  type: "learn" | "simulate" | "review" | "goal" | "guard" | "nothing";
  title: string;
  description: string;
  action: string;
  href: string;
  why?: string;
}) {
  const tones: Record<string, string> = {
    learn: "bg-groww-faint",
    simulate: "bg-sky-50",
    review: "bg-amber-faint",
    goal: "bg-groww-faint",
    guard: "bg-emerald-50",
    nothing: "bg-canvas",
  };
  return (
    <article className={cn("rounded-2xl border border-line p-5 shadow-card", tones[type] || "bg-white")}>
      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">Today for you</p>
      <h3 className="mt-2 text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
      {why && (
        <p className="mt-3 rounded-xl bg-white/80 p-3 text-sm">
          <span className="font-semibold">Why you're seeing this. </span>
          {why}
        </p>
      )}
      <Link to={href} className="mt-4 inline-flex min-h-tap items-center text-sm font-semibold text-groww-dark">
        {action} →
      </Link>
    </article>
  );
}

export function LearningCard({
  known,
  next,
  why,
  href,
}: {
  known: string[];
  next: string;
  why: string;
  href: string;
}) {
  return (
    <article className="rounded-2xl border border-line bg-white p-5 shadow-card">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">Your next skill</p>
      <p className="mt-3 text-sm text-muted">You understand:</p>
      <ul className="mt-1 space-y-1 text-sm">
        {known.map((item) => (
          <li key={item}>✓ {item}</li>
        ))}
      </ul>
      <p className="mt-3 text-sm">
        Next: <strong>{next}</strong>
      </p>
      <p className="mt-1 text-sm text-muted">Why? {why}</p>
      <Link to={href} className="mt-4 inline-flex min-h-tap font-semibold text-groww-dark">
        Learn {next.toLowerCase()} →
      </Link>
    </article>
  );
}

export function SimulationCard({
  title,
  description,
  minutes,
  difficulty,
  href,
}: {
  title: string;
  description: string;
  minutes: number;
  difficulty: string;
  href: string;
}) {
  return (
    <Link to={href} className="block rounded-2xl border border-line bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-float">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className="rounded-full bg-canvas px-2 py-1 text-[11px] font-semibold uppercase text-muted">{difficulty}</span>
      </div>
      <p className="mt-2 text-sm text-muted">{description}</p>
      <p className="mt-4 text-sm font-semibold">
        {minutes} min · Start →
      </p>
    </Link>
  );
}

export function RiskCard({ title, items, tone }: { title: string; items: string[]; tone: "good" | "warn" | "open" }) {
  const color = tone === "good" ? "text-groww-dark" : tone === "warn" ? "text-amber" : "text-muted";
  return (
    <section className="rounded-2xl border border-line bg-white p-5">
      <h3 className="font-semibold">{title}</h3>
      <ul className={cn("mt-3 space-y-2 text-sm", color)}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
