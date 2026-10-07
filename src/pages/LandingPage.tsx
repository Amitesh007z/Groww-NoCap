import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "../components/ui/primitives";
import { Brand } from "../components/ui/Brand";

export function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white px-6 py-10 md:px-16">
      <Brand />
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted">Groww NoCap · Demo</p>
      <div className="mx-auto mt-16 grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold text-groww-dark">Don't just invest.</p>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            Become an investor.
          </h1>
          <p className="mt-5 max-w-lg text-lg text-muted">
            Start with what you want. Learn what you need. Experience before you risk. Decide with confidence.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink to="/onboarding" className="px-6 py-3">
              Build my path <ArrowRight size={16} />
            </ButtonLink>
            <ButtonLink to="/home" variant="secondary">
              Skip to demo home
            </ButtonLink>
          </div>
          <p className="mt-4 text-xs text-muted">Educational demo · No real money, KYC, or advice.</p>
        </div>
        <div className="rounded-3xl border border-line bg-canvas p-6 shadow-card">
          <p className="text-xs font-semibold uppercase text-muted">Your goal</p>
          <p className="mt-2 text-4xl font-bold">₹10L</p>
          <p className="mt-1 text-sm text-groww-dark">4 months ahead · illustrative trajectory</p>
          <div className="mt-6 space-y-2 text-sm">
            {["Understand", "Simulate", "Decide", "Guard"].map((step, i) => (
              <div key={step} className="flex items-center gap-3 rounded-2xl bg-white p-3">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-groww-faint text-xs font-bold">{i + 1}</span>
                {step}
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="absolute bottom-6 text-sm text-muted">
        <Link to="/help" className="font-medium text-ink">
          How this demo works
        </Link>
      </p>
    </main>
  );
}
