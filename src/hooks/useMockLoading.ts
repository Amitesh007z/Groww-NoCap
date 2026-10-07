import { useEffect, useState } from "react";

export function useMockLoading(ms = 420) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), ms);
    return () => window.clearTimeout(t);
  }, [ms]);

  return {
    loading,
    error,
    retry: () => {
      setError(false);
      setLoading(true);
      window.setTimeout(() => setLoading(false), ms);
    },
    fail: () => setError(true),
  };
}
