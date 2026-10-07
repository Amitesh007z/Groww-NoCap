import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "../data/paths";
import { PathCard, PathComparison, PathDetail } from "../components/path/PathCards";
import { Modal } from "../components/ui/overlays";
import { Button } from "../components/ui/primitives";
import { emit } from "../services/events";
import type { PathId } from "../types/goal";
import { useUserStore } from "../store/userStore";
import { useGoal } from "../hooks/useGoal";
import { formatCompactINR } from "../utils/currency";

export function PathPage() {
  const { goal } = useGoal();
  const selected = useUserStore((s) => s.selectedPathId);
  const [compare, setCompare] = useState(false);
  const [detail, setDetail] = useState<PathId | null>(selected ?? null);
  const navigate = useNavigate();
  const active = paths.find((p) => p.id === detail);

  return (
    <div>
      <h1 className="text-3xl font-bold">Your Financial Path</h1>
      <p className="mt-2 text-muted">Three possible ways to move toward {formatCompactINR(goal.targetAmount)}.</p>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {paths.map((path) => (
          <PathCard
            key={path.id}
            path={path}
            selected={selected === path.id}
            onExplore={() => {
              setDetail(path.id);
              emit("PATH_SELECTED", path.id);
            }}
          />
        ))}
      </div>
      <Button variant="secondary" className="mt-6" onClick={() => setCompare(true)}>
        Compare paths
      </Button>
      <Modal open={compare} onClose={() => setCompare(false)} title="Path comparison">
        <PathComparison paths={paths} />
      </Modal>
      <Modal open={Boolean(active)} onClose={() => setDetail(null)} title={active?.title ?? "Path"}>
        {active && (
          <PathDetail
            path={active}
            onCompare={() => {
              setDetail(null);
              setCompare(true);
            }}
            onExperience={() => {
              emit("PATH_SELECTED", active.id);
              navigate(active.id === "explorer" ? "/sim/covid" : "/sim");
            }}
          />
        )}
      </Modal>
    </div>
  );
}
