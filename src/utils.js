export function formatCurrency(value, currency = "USD") {
  if (typeof value !== "number") return "Not available";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatRange(range) {
  if (!range) return "Not available";

  const currency = range.currency || "USD";

  if (range.low === range.high) {
    return formatCurrency(range.low, currency);
  }

  return `${formatCurrency(range.low, currency)}–${formatCurrency(
    range.high,
    currency
  )}`;
}

export function sumFairMarketRange(collection, targetCurrency = "USD") {
  return collection.reduce(
    (acc, art) => {
      const range = art.estimates?.fairMarket;

      if (!range) {
        acc.skipped += 1;
        return acc;
      }

      if (range.currency !== targetCurrency) {
        acc.excludedCurrencyCount += 1;
        return acc;
      }

      acc.low += range.low;
      acc.high += range.high;
      return acc;
    },
    {
      low: 0,
      high: 0,
      currency: targetCurrency,
      skipped: 0,
      excludedCurrencyCount: 0,
    }
  );
}

export function getConfidenceClass(confidence) {
  switch (confidence) {
    case "High":
      return "bg-emerald-100 text-emerald-800";
    case "Medium":
      return "bg-blue-100 text-blue-800";
    case "Low":
      return "bg-amber-100 text-amber-800";
    case "Not enough evidence":
      return "bg-red-100 text-red-800";
    default:
      return "bg-stone-100 text-stone-800";
  }
}

export function clampScore(score) {
  if (typeof score !== "number") return 0;
  return Math.min(100, Math.max(0, score));
}

export function getScoreBarClass(score) {
  const safeScore = clampScore(score);
  if (safeScore >= 75) return "bg-emerald-500";
  if (safeScore >= 50) return "bg-blue-500";
  if (safeScore >= 25) return "bg-amber-500";
  return "bg-red-500";
}

export function getDocScoreLabel(score) {
  const safeScore = clampScore(score);
  if (safeScore >= 75) return "Strong documentation";
  if (safeScore >= 50) return "Moderate documentation";
  if (safeScore >= 25) return "Weak documentation";
  return "Insufficient documentation";
}

export function createId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `art-${Date.now()}`;
}
