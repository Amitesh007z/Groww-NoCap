export function clamp(n: number, min = 0, max = 1): number {
  return Math.min(max, Math.max(min, n));
}

export function percent(part: number, whole: number): number {
  if (whole <= 0) return 0;
  return Math.round((part / whole) * 100);
}

export function labelFromScore(score: number): "Low" | "Moderate" | "High" | "Strong" {
  if (score >= 75) return "Strong";
  if (score >= 60) return "High";
  if (score >= 40) return "Moderate";
  return "Low";
}

export function behaviorLabel(score: number): "Low" | "Moderate" | "High" | "Strong" {
  return labelFromScore(score);
}
