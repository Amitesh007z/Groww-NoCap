import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { conceptById } from "../data/concepts";
import { ConceptBody } from "../components/lens/ConceptViews";
import { emit } from "../services/events";
import { Button } from "../components/ui/primitives";
import { useLearningStore } from "../store/learningStore";

export function LensDetailPage() {
  const { conceptId = "" } = useParams();
  const concept = conceptById[conceptId];
  const completed = useLearningStore((s) => s.completedMissions);
  const navigate = useNavigate();

  useEffect(() => {
    if (concept) emit("CONCEPT_VIEWED", concept.id);
  }, [concept]);

  if (!concept) {
    return (
      <p>
        Concept not found. <Link to="/lens">Back to Lens</Link>
      </p>
    );
  }

  const peDone = completed.includes("pe-mission");

  return (
    <div>
      <Link to="/lens" className="text-sm font-medium">
        ← Back to Lens
      </Link>
      <p className="mt-4 text-xs font-semibold uppercase text-muted">Groww Lens · 90 sec</p>
      <h1 className="mt-1 text-3xl font-bold">{concept.title}</h1>
      <p className="mt-2 max-w-2xl text-muted">{concept.what}</p>
      <div className="mt-6">
        <ConceptBody concept={concept} />
      </div>
      {concept.id === "pe" && (
        <section className="mt-6 rounded-2xl border border-line bg-white p-5">
          {peDone ? (
            <p className="text-sm font-semibold text-groww-dark">MISSION COMPLETE ✓ Valuation Basics unlocked.</p>
          ) : (
            <Button
              onClick={() => {
                emit("MISSION_COMPLETED", "pe-mission");
                navigate("/missions");
              }}
            >
              I understand P/E
            </Button>
          )}
        </section>
      )}
    </div>
  );
}
