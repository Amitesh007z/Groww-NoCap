import { useState } from "react";
import { useParams } from "react-router-dom";
import { DecisionBrief } from "../components/cards/DecisionBrief";
import { Button, ButtonLink } from "../components/ui/primitives";
import { emit } from "../services/events";
import { usePortfolioStore } from "../store/portfolioStore";
import { useGoalStore } from "../store/goalStore";

const reasons = [
  "Long-term growth",
  "Diversification",
  "Valuation",
  "Learning",
  "Recommendation",
  "Market opportunity",
  "Other",
];

export function DecisionPage() {
  const { assetId = "nova" } = useParams();
  const name = assetId === "nova" ? "Nova Mobility" : assetId;
  const recordDecision = usePortfolioStore((s) => s.recordDecision);
  const addToCurrent = useGoalStore((s) => s.addToCurrent);
  const existing = usePortfolioStore((s) => s.decisions.find((d) => d.assetId === assetId));
  const [reason, setReason] = useState("Long-term growth");
  const [thesis, setThesis] = useState("Revenue growth will continue.");
  const [reconsider, setReconsider] = useState("");
  const [done, setDone] = useState(Boolean(existing));

  if (done) {
    return (
      <section className="rounded-3xl bg-white p-6 shadow-card">
        <p className="text-xs font-semibold uppercase text-muted">Demo decision recorded</p>
        <h1 className="mt-2 text-3xl font-bold">You chose to allocate ₹5,000.</h1>
        <p className="mt-3 text-sm">Reason: {existing?.reason ?? reason}</p>
        <p className="text-sm">Your thesis: {existing?.thesis ?? thesis}</p>
        <p className="text-sm">Review date: 6 months</p>
        <ButtonLink className="mt-6" to="/portfolio">
          View portfolio
        </ButtonLink>
      </section>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Before you decide</h1>
      <div className="mt-6">
        <DecisionBrief assetName={name} />
      </div>
      <section className="mt-6 rounded-2xl border border-line bg-white p-5">
        <h3 className="font-semibold">Why are you considering this?</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {reasons.map((r) => (
            <button key={r} className={`rounded-full border px-4 py-2 text-sm ${reason === r ? "border-groww bg-groww-faint" : "border-line"}`} onClick={() => setReason(r)}>
              {r}
            </button>
          ))}
        </div>
        <label className="mt-4 block text-sm">
          Your thesis
          <textarea className="mt-1 w-full rounded-xl border border-line p-3" value={thesis} onChange={(e) => setThesis(e.target.value)} />
        </label>
        <label className="mt-3 block text-sm">
          What would make you reconsider?
          <input className="mt-1 w-full rounded-xl border border-line px-3 py-3" value={reconsider} onChange={(e) => setReconsider(e.target.value)} />
        </label>
        <Button
          className="mt-5 w-full"
          onClick={() => {
            emit("DECISION_STARTED", assetId);
            recordDecision({
              id: `dec_${Date.now()}`,
              assetId,
              assetName: name,
              amount: 5000,
              reason,
              thesis,
              reconsider,
              reviewDate: "6 months",
              createdAt: new Date().toISOString(),
            });
            addToCurrent(5000);
            emit("DECISION_RECORDED", assetId);
            emit("PORTFOLIO_CHANGED", assetId);
            setDone(true);
          }}
        >
          Continue
        </Button>
      </section>
    </div>
  );
}
