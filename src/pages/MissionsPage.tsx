import { useState } from "react";
import { missions } from "../data/missions";
import { MissionCard } from "../components/investor/InvestorBits";
import { useLearningStore } from "../store/learningStore";
import { useSimulationStore } from "../store/simulationStore";
import { ButtonLink } from "../components/ui/primitives";
import { nextSkill } from "../services/intelligenceEngine";
import { useInvestorContext } from "../hooks/useInvestorContext";

export function MissionsPage() {
  const completed = useLearningStore((s) => s.completedMissions);
  const viewed = useLearningStore((s) => s.viewedConcepts);
  const sims = useSimulationStore((s) => s.completed);
  const ctx = useInvestorContext();
  const skill = nextSkill(ctx);
  const [celebrate, setCelebrate] = useState(completed.includes("pe-mission"));

  const doneFor = (id: string) => {
    if (id === "pe-mission") return completed.includes(id) || viewed.includes("pe");
    if (id === "correction-mission") return sims.covid === true;
    if (id === "ipo-mission") return viewed.includes("ipo") || sims.ipo === true;
    if (id === "leverage-mission") return sims.fno === true;
    return completed.includes(id);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Small steps. Real understanding.</h1>
      <p className="mt-2 text-muted">Learning missions help you make progress without chasing activity.</p>
      {celebrate && (
        <section className="mt-5 rounded-3xl bg-groww-faint p-5">
          <p className="font-bold">MISSION COMPLETE ✓</p>
          <p className="mt-2 text-sm">You learned:</p>
          <ul className="mt-1 text-sm">
            <li>✓ What P/E measures</li>
            <li>✓ Why context matters</li>
            <li>✓ Why high P/E ≠ automatically bad</li>
          </ul>
          <p className="mt-3 text-sm">
            New skill: Valuation Basics. Your next recommended skill: {skill.title}
          </p>
          <ButtonLink className="mt-3" to={skill.href}>
            Continue
          </ButtonLink>
        </section>
      )}
      <div className="mt-6 grid gap-4">
        {missions.map((m) => (
          <div key={m.id} onClick={() => m.id === "pe-mission" && setCelebrate(true)}>
            <MissionCard
              number={m.number}
              title={m.title}
              description={m.description}
              difficulty={m.difficulty}
              minutes={m.minutes}
              href={m.href}
              done={doneFor(m.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
