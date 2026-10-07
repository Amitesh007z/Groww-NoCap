import { cn } from "../../utils/cn";
import { formatINR } from "../../utils/currency";
import { Pause, Play, RotateCcw, TrendingDown, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export function SimulationChoice({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "min-h-tap rounded-2xl border px-4 py-4 text-left text-base font-semibold transition",
        selected ? "border-groww bg-groww-faint" : "border-line bg-white hover:bg-canvas",
      )}
    >
      {label}
    </button>
  );
}

export function GuardCard({
  market,
  portfolio,
}: {
  market: number;
  portfolio: number;
}) {
  return (
    <section className="rounded-3xl border border-line bg-white p-6 shadow-card">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">Market drop</p>
      <h2 className="mt-2 text-2xl font-semibold">Let's put this in context.</h2>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-rose-50 p-4">
          <p className="text-xs text-muted">Market</p>
          <p className="text-2xl font-bold text-danger">{market}%</p>
        </div>
        <div className="rounded-2xl bg-rose-50 p-4">
          <p className="text-xs text-muted">Your portfolio</p>
          <p className="text-2xl font-bold text-danger">{portfolio}%</p>
        </div>
      </div>
    </section>
  );
}

export function PortfolioCard({
  name,
  invested,
  current,
}: {
  name: string;
  invested: number;
  current: number;
}) {
  const pnl = current - invested;
  return (
    <div className="flex items-center justify-between rounded-2xl border border-line bg-white px-4 py-4">
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-muted">Invested {formatINR(invested)}</p>
      </div>
      <div className="text-right">
        <p className="font-semibold">{formatINR(current)}</p>
        <p className={pnl >= 0 ? "text-sm text-groww-dark" : "text-sm text-danger"}>
          {pnl >= 0 ? "+" : ""}
          {formatINR(pnl)}
        </p>
      </div>
    </div>
  );
}

type Candle = {
  label: string;
  open: number;
  high: number;
  low: number;
  close: number;
};

const replayCandles: Candle[] = [
  { label: "09:30", open: 100, high: 103, low: 99, close: 102 },
  { label: "10:00", open: 102, high: 104, low: 101, close: 103 },
  { label: "10:30", open: 103, high: 103, low: 98, close: 99 },
  { label: "11:00", open: 99, high: 100, low: 94, close: 95 },
  { label: "11:30", open: 95, high: 97, low: 91, close: 92 },
  { label: "12:00", open: 92, high: 94, low: 88, close: 90 },
  { label: "12:30", open: 90, high: 93, low: 89, close: 92 },
  { label: "13:00", open: 92, high: 96, low: 91, close: 95 },
  { label: "13:30", open: 95, high: 99, low: 94, close: 98 },
  { label: "14:00", open: 98, high: 101, low: 97, close: 100 },
  { label: "14:30", open: 100, high: 104, low: 99, close: 103 },
  { label: "15:00", open: 103, high: 108, low: 102, close: 107 },
];

const ipoCandles: Candle[] = [
  { label: "Listing", open: 430, high: 486, low: 424, close: 468 },
  { label: "Day 2", open: 468, high: 478, low: 448, close: 452 },
  { label: "Day 5", open: 452, high: 460, low: 425, close: 431 },
  { label: "Day 10", open: 431, high: 438, low: 396, close: 404 },
  { label: "Day 20", open: 404, high: 419, low: 384, close: 392 },
  { label: "Month 2", open: 392, high: 410, low: 380, close: 401 },
  { label: "Month 3", open: 401, high: 426, low: 395, close: 418 },
];

const portfolioCandles: Candle[] = [
  { label: "Month 1", open: 100, high: 102, low: 99, close: 101 },
  { label: "Month 3", open: 101, high: 104, low: 100, close: 103 },
  { label: "Month 6", open: 103, high: 106, low: 101, close: 102 },
  { label: "Month 9", open: 102, high: 103, low: 96, close: 98 },
  { label: "Year 1", open: 98, high: 102, low: 95, close: 101 },
  { label: "Year 2", open: 101, high: 110, low: 100, close: 108 },
  { label: "Year 3", open: 108, high: 116, low: 106, close: 114 },
];

export function CandleChart({ cursor, candles = replayCandles }: { cursor: number; candles?: Candle[] }) {
  const visible = candles.slice(0, cursor + 1);
  const min = Math.floor((Math.min(...candles.map((candle) => candle.low)) - 5) / 10) * 10;
  const max = Math.ceil((Math.max(...candles.map((candle) => candle.high)) + 5) / 10) * 10;
  const chartWidth = 760;
  const chartHeight = 280;
  const y = (value: number) => chartHeight - ((value - min) / (max - min)) * chartHeight;
  const x = (index: number) => 34 + index * ((chartWidth - 60) / Math.max(1, candles.length - 1));
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-[#101817]">
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight + 34}`} className="h-[280px] w-full" role="img" aria-label="Illustrative market candlestick chart">
        {[min, Math.round((min + max) / 2), max].map((level) => (
          <g key={level}>
            <line x1="28" y1={y(level)} x2={chartWidth - 10} y2={y(level)} stroke="#29403d" strokeDasharray="3 5" />
            <text x="4" y={y(level) + 4} fill="#78918c" fontSize="11">{level}</text>
          </g>
        ))}
        {visible.map((candle, index) => {
          const green = candle.close >= candle.open;
          const top = y(Math.max(candle.open, candle.close));
          const bodyHeight = Math.max(4, Math.abs(y(candle.close) - y(candle.open)));
          return (
            <g key={candle.label}>
              <line x1={x(index)} x2={x(index)} y1={y(candle.high)} y2={y(candle.low)} stroke={green ? "#36c99b" : "#f07d87"} strokeWidth="2" />
              <rect x={x(index) - 9} y={top} width="18" height={bodyHeight} rx="2" fill={green ? "#36c99b" : "#f07d87"} />
              {index % 2 === 0 && <text x={x(index) - 17} y={chartHeight + 22} fill="#78918c" fontSize="10">{candle.label}</text>}
            </g>
          );
        })}
        {cursor < candles.length - 1 && <line x1={x(cursor)} x2={x(cursor)} y1="10" y2={chartHeight} stroke="#f3c969" strokeDasharray="4 4" />}
      </svg>
    </div>
  );
}

export type MarketReplayConfig = {
  title?: string;
  eyebrow?: string;
  symbol?: string;
  description?: string;
  candles?: Candle[];
  initialCash?: number;
  initialUnits?: number;
  unitSize?: number;
  actionLabel?: string;
};

export function MarketReplay({ config = {} }: { config?: MarketReplayConfig }) {
  const candles = config.candles ?? replayCandles;
  const initialCash = config.initialCash ?? 30000;
  const initialUnits = config.initialUnits ?? 700;
  const unitSize = config.unitSize ?? 100;
  const title = config.title ?? "Trade the move, not the headline.";
  const eyebrow = config.eyebrow ?? "MARKET REPLAY · PAPER TRADING";
  const symbol = config.symbol ?? "NOCAP 100";
  const description = config.description ?? "Historical-style illustrative data. No real order is placed.";
  const [cursor, setCursor] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState<1 | 2>(1);
  const [cash, setCash] = useState(initialCash);
  const [units, setUnits] = useState(initialUnits);
  const [averagePrice, setAveragePrice] = useState(candles[0].open);
  const [orders, setOrders] = useState<string[]>([]);
  const done = cursor === candles.length - 1;
  const current = candles[cursor];
  const currentPrice = current.close;
  const equity = cash + units * currentPrice;
  const startingEquity = initialCash + initialUnits * candles[0].open;
  const pnl = equity - startingEquity;
  const percent = (pnl / startingEquity) * 100;
  const marketChange = ((current.close - candles[0].open) / candles[0].open) * 100;

  useEffect(() => {
    if (!playing || done) return;
    const timer = window.setInterval(() => setCursor((value) => Math.min(value + 1, candles.length - 1)), 1300 / speed);
    return () => window.clearInterval(timer);
  }, [playing, speed, done]);

  useEffect(() => {
    if (done) setPlaying(false);
  }, [done]);

  const action = (kind: "hold" | "buy" | "sell") => {
    if (kind === "buy" && cash >= currentPrice * unitSize) {
      setCash((value) => value - currentPrice * unitSize);
      setUnits((value) => value + unitSize);
      setAveragePrice((value) => (value * units + currentPrice * unitSize) / (units + unitSize));
      setOrders((value) => [...value, `Bought ${unitSize} units at ₹${currentPrice}`]);
    } else if (kind === "sell" && units >= unitSize) {
      setCash((value) => value + currentPrice * unitSize);
      setUnits((value) => value - unitSize);
      setOrders((value) => [...value, `Sold ${unitSize} units at ₹${currentPrice}`]);
    } else {
      setOrders((value) => [...value, `Held at ₹${currentPrice}`]);
    }
  };

  const reset = () => {
    setCursor(0); setPlaying(false); setCash(initialCash); setUnits(initialUnits); setAveragePrice(candles[0].open); setOrders([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link to="/sim" className="text-sm font-medium">← All simulations</Link>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted">{eyebrow}</p>
          <h1 className="mt-1 text-2xl font-bold md:text-3xl">{title}</h1>
          <p className="mt-1 text-sm text-muted">{description}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="min-h-tap rounded-xl border border-line bg-white px-3 text-sm font-semibold" onClick={reset}><RotateCcw size={15} className="mr-2 inline" />Reset</button>
          <button className="min-h-tap rounded-xl bg-groww px-4 text-sm font-semibold text-white" onClick={() => setPlaying((value) => !value)}>
            {playing ? <Pause size={15} className="mr-2 inline" /> : <Play size={15} className="mr-2 inline" />}{playing ? "Pause" : "Play market"}
          </button>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        <StatCard label="Price" value={`₹${currentPrice}`} />
        <StatCard label="Market move" value={`${marketChange >= 0 ? "+" : ""}${marketChange.toFixed(1)}%`} tone={marketChange < 0 ? "danger" : "positive"} />
        <StatCard label="Your equity" value={formatINR(equity)} />
        <StatCard label="P&L" value={`${pnl >= 0 ? "+" : ""}${formatINR(pnl)} (${percent.toFixed(1)}%)`} tone={pnl < 0 ? "danger" : "positive"} />
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <section className="rounded-3xl bg-white p-4 shadow-card md:p-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div><h2 className="font-semibold">{symbol}</h2><p className="text-xs text-muted">{current.label} · OHLC ₹{current.open} / ₹{current.high} / ₹{current.low} / ₹{current.close}</p></div>
            <div className="flex items-center gap-1 rounded-lg bg-canvas p-1 text-xs font-semibold"><span className="px-2 text-muted">Speed</span>{([1, 2] as const).map((value) => <button key={value} className={cn("rounded-md px-2 py-1", speed === value ? "bg-white shadow-sm" : "text-muted")} onClick={() => setSpeed(value)}>{value}×</button>)}</div>
          </div>
          <CandleChart cursor={cursor} candles={candles} />
          <div className="mt-3 flex items-center justify-between text-xs text-muted"><span>Drag the timeline to inspect each candle</span><input className="w-1/2 accent-[#00b386]" type="range" min="0" max={candles.length - 1} value={cursor} onChange={(event) => { setPlaying(false); setCursor(Number(event.target.value)); }} /></div>
        </section>

        <aside className="space-y-4">
          <section className="rounded-3xl bg-white p-5 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Your position</p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm"><div><span className="text-muted">Units</span><strong className="mt-1 block text-lg">{units}</strong></div><div><span className="text-muted">Avg. price</span><strong className="mt-1 block text-lg">₹{averagePrice.toFixed(2)}</strong></div><div><span className="text-muted">Cash</span><strong className="mt-1 block text-lg">{formatINR(cash)}</strong></div><div><span className="text-muted">Position</span><strong className="mt-1 block text-lg">{formatINR(units * currentPrice)}</strong></div></div>
          </section>
          <section className="rounded-3xl border border-line bg-white p-5 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Make a decision</p>
            <p className="mt-2 text-sm leading-6">The candle is only information. Your job is to decide what your plan allows.</p>
            <div className="mt-4 grid grid-cols-3 gap-2"><button onClick={() => action("buy")} className="min-h-tap rounded-xl border border-groww bg-groww-faint text-sm font-semibold text-groww-dark"><TrendingUp size={15} className="mx-auto mb-1" />Buy {unitSize}</button><button onClick={() => action("hold")} className="min-h-tap rounded-xl border border-line bg-white text-sm font-semibold"><span className="mx-auto mb-1 block">—</span>Hold</button><button onClick={() => action("sell")} className="min-h-tap rounded-xl border border-rose-200 bg-rose-50 text-sm font-semibold text-danger"><TrendingDown size={15} className="mx-auto mb-1" />Sell {unitSize}</button></div>
          </section>
          <section className="rounded-3xl bg-canvas p-4"><p className="text-xs font-semibold uppercase tracking-wide text-muted">Order log</p><div className="mt-2 max-h-24 space-y-1 overflow-auto text-xs text-muted">{orders.length ? orders.slice(-4).map((order, index) => <p key={`${order}-${index}`}>{order}</p>) : <p>Your actions will appear here.</p>}</div></section>
        </aside>
      </div>

      {done ? <section className="rounded-3xl bg-groww-faint p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-wide text-groww-dark">Replay complete</p><h2 className="mt-1 text-xl font-bold">You managed a full market move.</h2><p className="mt-1 text-sm text-muted">Review your decisions. This outcome is illustrative, not predictive.</p></div><Link to="/lens/volatility" className="min-h-tap rounded-xl bg-groww px-4 py-3 text-sm font-semibold text-white">Reflect on volatility →</Link></div></section> : <section className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900"><b>Real-market habit:</b> you can pause, inspect the chart, and act only when your plan supports it. This simulator does not give investment advice.</section>}
    </div>
  );
}

function StatCard({ label, value, tone }: { label: string; value: string; tone?: "positive" | "danger" }) {
  return <div className="rounded-2xl border border-line bg-white p-4 shadow-card"><p className="text-xs text-muted">{label}</p><p className={cn("mt-1 text-lg font-bold", tone === "positive" ? "text-groww-dark" : tone === "danger" ? "text-danger" : "")}>{value}</p></div>;
}

export function LeveragedReplay() {
  const [cursor, setCursor] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [direction, setDirection] = useState<"long" | "short">("long");
  const [leverage, setLeverage] = useState(5);
  const [margin, setMargin] = useState(10000);
  const candles = replayCandles.map((candle) => ({ ...candle, open: 1000 + (candle.open - 100) * 10, high: 1000 + (candle.high - 100) * 10, low: 1000 + (candle.low - 100) * 10, close: 1000 + (candle.close - 100) * 10 }));
  const current = candles[cursor];
  const exposure = margin * leverage;
  const rawPnl = ((current.close - 1000) / 1000) * exposure;
  const pnl = direction === "long" ? rawPnl : -rawPnl;
  const equity = margin + pnl;
  const done = cursor === candles.length - 1;

  useEffect(() => {
    if (!playing || done) return;
    const timer = window.setInterval(() => setCursor((value) => Math.min(value + 1, candles.length - 1)), 1200);
    return () => window.clearInterval(timer);
  }, [playing, done, candles.length]);
  useEffect(() => { if (done) setPlaying(false); }, [done]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3"><div><Link to="/sim" className="text-sm font-medium">← All simulations</Link><p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted">F&O REPLAY · LEVERAGED PAPER TRADING</p><h1 className="mt-1 text-2xl font-bold md:text-3xl">Feel leverage in real time.</h1><p className="mt-1 text-sm text-muted">The underlying moves candle by candle. Your margin moves with it.</p></div><div className="flex gap-2"><button className="min-h-tap rounded-xl border border-line bg-white px-3 text-sm font-semibold" onClick={() => { setCursor(0); setPlaying(false); }}><RotateCcw size={15} className="mr-2 inline" />Reset</button><button className="min-h-tap rounded-xl bg-groww px-4 text-sm font-semibold text-white" onClick={() => setPlaying((value) => !value)}>{playing ? <Pause size={15} className="mr-2 inline" /> : <Play size={15} className="mr-2 inline" />}{playing ? "Pause" : "Play market"}</button></div></div>
      <div className="grid gap-3 md:grid-cols-4"><StatCard label="Underlying" value={`₹${current.close.toLocaleString("en-IN")}`} /><StatCard label="Exposure" value={formatINR(exposure)} /><StatCard label="Margin equity" value={formatINR(equity)} tone={equity < margin ? "danger" : "positive"} /><StatCard label="Leveraged P&L" value={`${pnl >= 0 ? "+" : ""}${formatINR(pnl)}`} tone={pnl < 0 ? "danger" : "positive"} /></div>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]"><section className="rounded-3xl bg-white p-4 shadow-card md:p-5"><div className="mb-3"><h2 className="font-semibold">NOCAP FUTURES · 5 minute</h2><p className="text-xs text-muted">{current.label} · Entry ₹1,000</p></div><CandleChart cursor={cursor} candles={candles} /><div className="mt-3 flex items-center justify-between text-xs text-muted"><span>Underlying timeline</span><input className="w-1/2 accent-[#00b386]" type="range" min="0" max={candles.length - 1} value={cursor} onChange={(event) => { setPlaying(false); setCursor(Number(event.target.value)); }} /></div></section><aside className="rounded-3xl bg-white p-5 shadow-card"><p className="text-xs font-semibold uppercase tracking-wide text-muted">Position setup</p><label className="mt-4 block text-sm">Margin <b>{formatINR(margin)}</b><input className="mt-2 w-full accent-[#00b386]" type="range" min="2000" max="10000" step="1000" value={margin} onChange={(event) => setMargin(Number(event.target.value))} /></label><label className="mt-4 block text-sm">Leverage <b>{leverage}×</b><input className="mt-2 w-full accent-[#00b386]" type="range" min="1" max="10" value={leverage} onChange={(event) => setLeverage(Number(event.target.value))} /></label><div className="mt-4 grid grid-cols-2 gap-2"><button className={cn("min-h-tap rounded-xl border text-sm font-semibold", direction === "long" ? "border-groww bg-groww-faint text-groww-dark" : "border-line")} onClick={() => setDirection("long")}>Long</button><button className={cn("min-h-tap rounded-xl border text-sm font-semibold", direction === "short" ? "border-groww bg-groww-faint text-groww-dark" : "border-line")} onClick={() => setDirection("short")}>Short</button></div><p className="mt-5 rounded-xl bg-canvas p-3 text-xs leading-5 text-muted"><b className="text-ink">Mark-to-market:</b> every candle changes your unrealised P&L. At 5× leverage, a 5% move affects roughly 25% of your margin.</p></aside></div>
      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900"><b>Virtual only:</b> this demonstrates leverage, margin and loss mechanics. It is not a broker, order book, or investment recommendation.</section>
    </div>
  );
}
