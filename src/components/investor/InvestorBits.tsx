import { Link } from "react-router-dom";
import type { Knowledge } from "../../types/intelligence";
import { ProgressBar } from "../ui/primitives";

const labels: { key: keyof Knowledge; label: string }[] = [
  { key: "mutualFunds", label: "Mutual Funds" },
  { key: "stocks", label: "Stocks" },
  { key: "ipo", label: "IPO" },
  { key: "valuation", label: "Valuation" },
  { key: "fno", label: "F&O" },
];

export function InvestorDNA({ knowledge }: { knowledge: Knowledge }) {
  return (
    <div className="space-y-4">
      {labels.map((row) => (
        <div key={row.key}>
          <div className="mb-1 flex justify-between text-sm">
            <span>{row.label}</span>
            <span className="text-muted">{Math.round(knowledge[row.key] * 100)}%</span>
          </div>
          <ProgressBar value={knowledge[row.key] * 100} />
        </div>
      ))}
    </div>
  );
}

export function MissionCard({
  number,
  title,
  description,
  difficulty,
  minutes,
  href,
  done,
}: {
  number: string;
  title: string;
  description: string;
  difficulty: string;
  minutes: number;
  href: string;
  done?: boolean;
}) {
  return (
    <article className={`rounded-2xl border bg-white p-5 shadow-card ${done ? "border-groww" : "border-line"}`}>
      <div className="flex gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-canvas font-semibold">{done ? "✓" : number}</div>
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="mt-1 text-sm text-muted">{description}</p>
          <p className="mt-3 text-xs uppercase tracking-wide text-muted">
            {difficulty} · {minutes} min · +1 Investor Skill
          </p>
          <Link to={href} className="mt-3 inline-flex min-h-tap font-semibold text-groww-dark">
            {done ? "Review" : "Start"} →
          </Link>
        </div>
      </div>
    </article>
  );
}
