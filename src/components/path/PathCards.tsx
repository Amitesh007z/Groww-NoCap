import { Link } from "react-router-dom";
import type { InvestmentPath } from "../../types/goal";
import { Button } from "../ui/primitives";

export function PathCard({
  path,
  selected,
  onExplore,
}: {
  path: InvestmentPath;
  selected?: boolean;
  onExplore: () => void;
}) {
  return (
    <article className={`rounded-3xl border bg-white p-5 shadow-card ${selected ? "border-groww ring-2 ring-groww/20" : "border-line"}`}>
      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">{path.complexityLabel}</p>
      <h2 className="mt-2 text-2xl font-semibold">{path.title}</h2>
      <p className="mt-2 text-sm text-muted">
        Best for <b className="text-ink">{path.bestFor}</b>
      </p>
      <dl className="mt-4 space-y-1 text-sm">
        <div className="flex justify-between"><dt>Volatility</dt><dd className="font-medium">{path.volatility}</dd></div>
        <div className="flex justify-between"><dt>Learning</dt><dd className="font-medium">{path.learning}</dd></div>
        <div className="flex justify-between"><dt>Involvement</dt><dd className="font-medium">{path.involvement}</dd></div>
      </dl>
      <p className="mt-3 text-sm text-muted">
        <b className="text-ink">Trade-off:</b> {path.tradeOff}
      </p>
      <Button className="mt-5 w-full" variant={path.id === "explorer" ? "primary" : "secondary"} onClick={onExplore}>
        {path.id === "explorer" ? "Experience" : "Explore"}
      </Button>
    </article>
  );
}

export function PathComparison({ paths }: { paths: InvestmentPath[] }) {
  const rows = Object.keys(paths[0]?.comparison ?? {});
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr>
            <th className="pb-3 font-medium text-muted"> </th>
            {paths.map((p) => (
              <th key={p.id} className="pb-3 font-semibold">{p.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row} className="border-t border-line">
              <td className="py-3 text-muted">{row}</td>
              {paths.map((p) => (
                <td key={p.id} className="py-3 font-medium">{p.comparison[row]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 text-xs text-muted">Labels are relative. This demo does not show guaranteed returns.</p>
    </div>
  );
}

export function PathDetail({ path, onExperience, onCompare }: { path: InvestmentPath; onExperience: () => void; onCompare: () => void }) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted">Why this path?</p>
      <ul className="space-y-2 text-sm">
        {path.why.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      <div className="rounded-2xl bg-canvas p-4">
        <p className="text-xs font-semibold uppercase text-muted">Illustrative demo allocation</p>
        <div className="mt-3 flex gap-2 text-center text-sm">
          <div className="flex-1 rounded-xl bg-white p-3"><b>{path.allocation.core}%</b><div className="text-muted">Core</div></div>
          <div className="flex-1 rounded-xl bg-white p-3"><b>{path.allocation.explorer}%</b><div className="text-muted">Explorer</div></div>
          <div className="flex-1 rounded-xl bg-white p-3"><b>{path.allocation.learning}%</b><div className="text-muted">Learning</div></div>
        </div>
        <p className="mt-3 text-xs text-muted">Not personalized financial advice. Demo illustration only.</p>
      </div>
      <Button className="w-full" onClick={onExperience}>Experience this path</Button>
      <Button variant="secondary" className="w-full" onClick={onCompare}>Compare again</Button>
      <Link to="/sim" className="block text-center text-sm font-semibold text-groww-dark">Try a simulation</Link>
    </div>
  );
}
