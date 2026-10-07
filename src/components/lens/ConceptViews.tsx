import { useState } from "react";
import { Link } from "react-router-dom";
import type { Concept } from "../../types/concept";
import { Button, ButtonLink } from "../ui/primitives";
import { Drawer } from "../ui/overlays";

export function ConceptCard({ concept }: { concept: Concept }) {
  return (
    <Link to={`/lens/${concept.id}`} className="block rounded-2xl border border-line bg-white p-5 shadow-card transition hover:-translate-y-0.5">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-muted">{concept.category}</span>
      <h3 className="mt-2 text-lg font-semibold">{concept.title}</h3>
      <p className="mt-2 line-clamp-3 text-sm text-muted">{concept.what}</p>
      <p className="mt-4 text-sm font-semibold text-groww-dark">See example →</p>
    </Link>
  );
}

const stages = ["what", "why", "soWhat", "watchOut", "tryIt"] as const;

export function ConceptBody({ concept }: { concept: Concept }) {
  const [stage, setStage] = useState(0);
  const [drawer, setDrawer] = useState(false);
  const copy: Record<(typeof stages)[number], { label: string; text: string }> = {
    what: { label: "WHAT", text: concept.what },
    why: { label: "WHY", text: concept.why },
    soWhat: { label: "SO WHAT", text: concept.soWhat },
    watchOut: { label: "WATCH OUT", text: concept.watchOut },
    tryIt: { label: "TRY IT", text: concept.tryIt },
  };

  return (
    <div className="space-y-5">
      {stages.slice(0, stage + 1).map((key) => (
        <section key={key} className="rounded-2xl border border-line bg-white p-5">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">{copy[key].label}</p>
          <p className="mt-2 leading-7">{copy[key].text}</p>
        </section>
      ))}
      {stage < stages.length - 1 && (
        <Button variant="secondary" onClick={() => setStage(stage + 1)}>
          {stage === 0 ? "Why does it matter?" : stage === 1 ? "So what?" : stage === 2 ? "What should I watch out for?" : "Show me how to try it"}
        </Button>
      )}
      {concept.example && (
        <button className="w-full rounded-2xl bg-groww-faint p-5 text-left" onClick={() => setDrawer(true)}>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-groww-dark">Example</p>
          <p className="mt-2">{concept.example}</p>
        </button>
      )}
      {stage >= 4 && <ButtonLink to={concept.tryHref}>Try it</ButtonLink>}
      <p className="text-sm text-muted">Related</p>
      <div className="flex flex-wrap gap-2">
        {concept.related.map((id) => (
          <Link key={id} to={`/lens/${id}`} className="rounded-full border border-line px-3 py-2 text-sm">
            {id}
          </Link>
        ))}
      </div>
      <Drawer open={drawer} onClose={() => setDrawer(false)} title={`${concept.title} example`}>
        <p className="leading-7">{concept.example}</p>
      </Drawer>
    </div>
  );
}
