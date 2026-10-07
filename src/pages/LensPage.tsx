import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useLens } from "../hooks/useLens";
import { ConceptCard } from "../components/lens/ConceptViews";
import type { ConceptCategory } from "../types/concept";

const cats: (ConceptCategory | "All")[] = ["All", "Stocks", "Mutual Funds", "IPO", "F&O", "Portfolio", "Basics"];

export function LensPage() {
  const { query, setQuery, category, setCategory, filtered } = useLens();
  const [params] = useSearchParams();

  useEffect(() => {
    const q = params.get("q");
    if (q) setQuery(q);
  }, [params, setQuery]);

  return (
    <div>
      <h1 className="text-3xl font-bold">Understand what you're investing in.</h1>
      <label className="mt-4 block">
        <span className="sr-only">Search a term, metric or product</span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="min-h-tap w-full rounded-2xl border border-line bg-white px-4"
          placeholder="Search a term, metric or product..."
        />
      </label>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
        {cats.map((c) => (
          <button
            key={c}
            className={`min-h-tap whitespace-nowrap rounded-full border px-4 ${category === c ? "border-groww bg-groww-faint" : "border-line bg-white"}`}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((concept) => (
          <ConceptCard key={concept.id} concept={concept} />
        ))}
      </div>
    </div>
  );
}
