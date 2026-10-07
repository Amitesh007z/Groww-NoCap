import { useState } from "react";
import { novaIpo, ipoLessons } from "../data/ipo";
import { Badge, Button, ButtonLink } from "../components/ui/primitives";
import { StatCard } from "../components/cards/Cards";
import { Modal } from "../components/ui/overlays";
import { useAppStore } from "../store/appStore";
import { emit } from "../services/events";

export function IPOPage() {
  const [lesson, setLesson] = useState<(typeof ipoLessons)[number] | null>(null);
  const marked = useAppStore((s) => s.ipoLessons);
  const mark = useAppStore((s) => s.markIpoLesson);
  const understood = Object.keys(marked).length;

  return (
    <div>
      <div className="flex items-center gap-2">
        <Badge tone="amber">DEMO DATA</Badge>
        <p className="text-xs font-semibold uppercase text-muted">IPO</p>
      </div>
      <h1 className="mt-2 text-3xl font-bold">{novaIpo.name}</h1>
      <p className="mt-2 text-muted">{novaIpo.about}</p>
      <section className="mt-6 rounded-3xl bg-white p-5 shadow-card">
        <div className="grid gap-3 md:grid-cols-4">
          <StatCard label="Price band" value={novaIpo.priceBand} />
          <StatCard label="Lot size" value={String(novaIpo.lotSize)} />
          <StatCard label="Issue size" value={novaIpo.issueSize} />
          <StatCard label="Subscription" value={novaIpo.subscription} />
        </div>
      </section>

      <h2 className="mt-8 text-xl font-semibold">IPO in 60 seconds</h2>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {ipoLessons.map((item, i) => (
          <button
            key={item.id}
            className="rounded-2xl border border-line bg-white p-4 text-left"
            onClick={() => {
              setLesson(item);
              mark(item.id);
            }}
          >
            <span className="text-xs text-muted">0{i + 1}</span>
            <p className="font-semibold">{item.title}</p>
            {marked[item.id] && <p className="text-xs text-groww-dark">Opened</p>}
          </button>
        ))}
      </div>

      <section className="mt-8 rounded-2xl border border-line bg-white p-5">
        <h3 className="font-semibold">Your understanding</h3>
        <ul className="mt-3 space-y-1 text-sm">
          <li>Business model ✓ Strong</li>
          <li>IPO mechanics {understood >= 3 ? "✓ Strong" : "◐ Developing"}</li>
          <li>Financials ◐ Developing</li>
          <li>Valuation ! Needs attention</li>
        </ul>
        <div className="mt-4 flex flex-wrap gap-3">
          <ButtonLink to="/lens/pe">Learn valuation</ButtonLink>
          <ButtonLink variant="secondary" to="/sim/ipo">
            Explore simulation
          </ButtonLink>
          <ButtonLink variant="secondary" to="/decision/nova">
            Make my decision
          </ButtonLink>
        </div>
      </section>

      <Modal open={Boolean(lesson)} onClose={() => setLesson(null)} title={lesson?.title ?? ""}>
        <p className="leading-7">{lesson?.body}</p>
        <Button
          className="mt-4"
          onClick={() => {
            emit("CONCEPT_VIEWED", "ipo");
            setLesson(null);
          }}
        >
          Got it
        </Button>
      </Modal>
    </div>
  );
}
