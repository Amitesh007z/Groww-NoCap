const formatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function formatINR(value: number): string {
  return formatter.format(Math.round(value));
}

export function formatCompactINR(value: number): string {
  const abs = Math.abs(value);
  if (abs >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
  if (abs >= 100000) {
    const lakh = value / 100000;
    return Number.isInteger(lakh) ? `₹${lakh}L` : `₹${lakh.toFixed(lakh >= 10 ? 0 : 2)}L`;
  }
  return formatINR(value);
}

export function formatSignedINR(value: number): string {
  const sign = value > 0 ? "+" : value < 0 ? "−" : "";
  return `${sign}${formatINR(Math.abs(value))}`;
}
