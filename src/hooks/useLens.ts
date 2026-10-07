import { useMemo, useState } from "react";
import { concepts } from "../data/concepts";
import type { ConceptCategory } from "../types/concept";

export function useLens() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ConceptCategory | "All">("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return concepts.filter((c) => {
      const catOk = category === "All" || c.category === category;
      const text = `${c.title} ${c.what} ${c.why}`.toLowerCase();
      return catOk && (!q || text.includes(q));
    });
  }, [query, category]);

  return { query, setQuery, category, setCategory, filtered, all: concepts };
}
