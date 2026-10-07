import { useMemo, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { Button, ButtonLink, Badge } from "../components/ui/primitives";
import { useAppStore } from "../store/appStore";
import { formatINR, formatSignedINR } from "../utils/currency";
import { emit } from "../services/events";

const cards = [
  { id: "leverage", title: "Leverage", body: "A smaller amount of capital controls a larger position. Gains and losses both get louder." },
  { id: "margin", title: "Margin", body: "The capital you post to keep the position open. A move against you can demand more." },
  { id: "expiry", title: "Expiry", body: "The contract ends. Being right on direction can still lose if timing is wrong." },
  { id: "loss", title: "Loss mechanics", body: "A 5% underlying drop can take a much larger bite out of your capital when leveraged." },
];

export function FnoPage() {
  const marked = useAppStore((s) => s.fnoCards);
  const mark = useAppStore((s) => s.markFnoCard);
  const [open, setOpen] = useState<string | null>(null);
  const [price, setPrice] = useState(1000);
  const [size, setSize] = useState(50000);
  const [dir, setDir] = useState<"long" | "short">("long");
  const [move, setMove] = useState(0);
  const capital = 10000;

  const pnl = useMemo(() => {
    const newPrice = price * (1 + move / 100);
    const diff = ((newPrice - price) / price) * size;
    return dir === "long" ? diff : -diff;
  }, [price, size, dir, move]);

  const learned = ["leverage", "margin", "expiry"].every((id) => marked[id]);

  return (
    <div>
      <div className="rounded-3xl bg-amber-faint p-5">
        <div className="flex gap-3">
          <ShieldCheck />
          <div>
            <h1 className="text-2xl font-bold">Understand leverage before you use it.</h1>
            <p className="mt-1 text-sm">Illustrative simulation only. There is no real order placement here.</p>
          </div>
        </div>
      </div>

      <h2 className="mt-8 text-xl font-semibold">Learn in 30–45 seconds</h2>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {cards.map((c) => (
          <button key={c.id} className="rounded-2xl border border-line bg-white p-4 text-left" onClick={() => { setOpen(open === c.id ? null : c.id); mark(c.id); emit("CONCEPT_VIEWED", c.id === "loss" ? "loss-mechanics" : c.id); }}>
            <p className="font-semibold">{c.title}</p>
            {open === c.id && <p className="mt-2 text-sm text-muted">{c.body}</p>}
            {marked[c.id] && <p className="mt-2 text-xs text-groww-dark">Opened</p>}
          </button>
        ))}
      </div>

      <section className="mt-8 rounded-3xl bg-white p-5 shadow-card">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase text-muted">Virtual capital</p>
          <Badge tone="amber">Illustrative simulation only</Badge>
        </div>
        <p className="mt-1 text-3xl font-bold">{formatINR(capital)}</p>
        <label className="mt-4 block text-sm">
          Underlying price {formatINR(price)}
          <input className="w-full" type="range" min={800} max={1200} value={price} onChange={(e) => setPrice(Number(e.target.value))} />
        </label>
        <label className="mt-3 block text-sm">
          Position size {formatINR(size)}
          <input className="w-full" type="range" min={10000} max={80000} step={5000} value={size} onChange={(e) => setSize(Number(e.target.value))} />
        </label>
        <div className="mt-3 flex gap-2">
          <Button variant={dir === "long" ? "primary" : "secondary"} onClick={() => setDir("long")}>Direction: long</Button>
          <Button variant={dir === "short" ? "primary" : "secondary"} onClick={() => setDir("short")}>Short</Button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {[2, -2, -5, 5].map((m) => (
            <Button key={m} variant="secondary" onClick={() => setMove(m)}>
              {m > 0 ? "+" : ""}
              {m}%
            </Button>
          ))}
        </div>
        <div className={`mt-5 rounded-2xl p-4 ${pnl < 0 ? "bg-rose-50" : "bg-groww-faint"}`}>
          <p className="text-sm">Underlying: {formatINR(price)} → {formatINR(price * (1 + move / 100))}</p>
          <p className="text-sm">Position: {formatINR(size)}</p>
          <p className="text-sm">Capital: {formatINR(capital)}</p>
          <p className="mt-2 text-2xl font-bold">Illustrative P&L: {formatSignedINR(pnl)}</p>
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-line bg-white p-5">
        <p className="font-semibold">You understand:</p>
        <ul className="mt-2 text-sm">
          <li>{marked.leverage ? "✓" : "○"} leverage</li>
          <li>{marked.margin ? "✓" : "○"} margin</li>
          <li>{marked.expiry ? "✓" : "○"} expiry</li>
        </ul>
        <p className="mt-3 text-sm">Still learning: {marked.loss ? "✓ loss mechanics" : "○ loss mechanics"}</p>
        <ButtonLink className="mt-4" to="/sim/fno">
          {learned ? "Complete simulation" : "Complete simulation"}
        </ButtonLink>
      </section>
    </div>
  );
}
