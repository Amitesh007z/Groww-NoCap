import { resetDemo } from "../store/appStore";
import { Button, ButtonLink } from "../components/ui/primitives";

export function SettingsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Settings</h1>
      <p className="mt-2 text-muted">This is a demo product. Reset to replay the evaluator script.</p>
      <div className="mt-6 rounded-2xl border border-line bg-white p-5">
        <p className="font-semibold">DEMO MODE</p>
        <p className="mt-2 text-sm text-muted">Clears onboarding, simulations, missions, and demo decisions from this browser.</p>
        <Button className="mt-4" variant="danger" onClick={resetDemo}>
          Reset Demo
        </Button>
      </div>
      <ButtonLink className="mt-6" to="/help" variant="secondary">
        Help
      </ButtonLink>
    </div>
  );
}

export function HelpPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold">How this demo works</h1>
      <p className="mt-3 leading-7 text-muted">
        Groww NoCap is an educational prototype. Numbers are coherent demo data, not live markets. Nothing here is advice, brokerage, or a real order.
      </p>
      <ol className="mt-6 list-decimal space-y-2 pl-5 text-sm">
        <li>Start with a goal.</li>
        <li>Compare three paths.</li>
        <li>Experience a market replay.</li>
        <li>Open Groww Lens on P/E.</li>
        <li>Record a demo decision.</li>
        <li>Trigger Guard from Home.</li>
        <li>See Investor DNA update.</li>
      </ol>
    </div>
  );
}
