import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/primitives";
import { useAppStore } from "../../store/appStore";
import { useInvestorContext } from "../../hooks/useInvestorContext";
import { Drawer } from "../ui/overlays";

const prompts = [
  "Why is P/E important?",
  "Why is my portfolio down?",
  "What is an IPO?",
  "Why does F&O have higher risk?",
  "Why am I seeing this recommendation?",
];

export function AssistantPanel() {
  const open = useAppStore((s) => s.assistantOpen);
  const setOpen = useAppStore((s) => s.setAssistantOpen);
  const ctx = useInvestorContext();
  const [q, setQ] = useState("");
  const [asked, setAsked] = useState<string | null>(null);
  const navigate = useNavigate();

  const answer = useMemo(() => {
    const query = (asked || "").toLowerCase();
    if (!query) return "";
    if (query.includes("p/e") || query.includes("valuation")) {
      return "P/E is a way to ask how much you are paying for earnings. A high P/E is not automatically expensive. You're seeing valuation because you're exploring stocks and this skill is still developing.";
    }
    if (query.includes("down") || query.includes("portfolio")) {
      if (ctx.marketContext.dropActive) {
        return "The demo market is down 8.2% and this illustrative portfolio is down 6.8%. Your goal remains on track. Nothing requires action right now — that's Groww Guard, not a trade prompt.";
      }
      return "This mock portfolio is still up overall versus invested capital. Short-term moves can look loud next to a 5-year goal.";
    }
    if (query.includes("ipo")) {
      return "An IPO is when a company lists publicly. Nova Mobility is fictional demo data. Subscription and GMP are not a thesis.";
    }
    if (query.includes("f&o") || query.includes("fno") || query.includes("leverage")) {
      return "F&O uses leverage, so a small underlying move can become a large P&L move. This product will not place a real order. Experience it with ₹10,000 virtual capital first.";
    }
    if (query.includes("recommendation") || query.includes("seeing this")) {
      return "Recommendations here come from deterministic demo rules on your goal, knowledge, simulations, and market context — not a live financial AI, and not a buy list.";
    }
    return "Groww will help you understand what you're deciding. It will not tell you what you should buy. Try one of the suggested questions.";
  }, [asked, ctx.marketContext.dropActive]);

  return (
    <Drawer open={open} onClose={() => setOpen(false)} title="Ask Groww">
      <p className="text-sm text-muted">Why is this important? Answers are predefined for this demo.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {prompts.map((p) => (
          <button
            key={p}
            className="rounded-full border border-line px-3 py-2 text-left text-sm hover:bg-canvas"
            onClick={() => setAsked(p)}
          >
            {p}
          </button>
        ))}
      </div>
      <form
        className="mt-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (q.trim()) setAsked(q.trim());
        }}
      >
        <label className="text-sm font-medium" htmlFor="ask">
          Your question
        </label>
        <input
          id="ask"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="mt-1 w-full rounded-xl border border-line px-3 py-3"
          placeholder="Ask about a concept, not a stock tip"
        />
        <Button className="mt-3 w-full" type="submit">
          Ask
        </Button>
      </form>
      {asked && (
        <div className="mt-5 rounded-2xl bg-canvas p-4 text-sm leading-6">
          <p className="font-semibold">{asked}</p>
          <p className="mt-2">{answer}</p>
          <Button
            variant="secondary"
            className="mt-3"
            onClick={() => {
              setOpen(false);
              navigate("/lens");
            }}
          >
            Open Groww Lens
          </Button>
        </div>
      )}
    </Drawer>
  );
}
