import React from "react";
import { AlertCircle, CheckCircle } from "lucide-react";
import EmptyState from "./EmptyState";
import {
  clampScore,
  sumFairMarketRange,
  formatRange,
  getConfidenceClass,
  getScoreBarClass,
  getDocScoreLabel,
} from "../utils";

export default function Dashboard({ collection, onSelect }) {
  const totalRange = sumFairMarketRange(collection, "USD");
  const actionNeededCount = collection.filter((art) => art.docScore < 50).length;
  const lowConfidenceCount = collection.filter(
    (art) => art.confidence === "Low" || art.confidence === "Not enough evidence"
  ).length;

  return (
    <div className="space-y-8">
      <header>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-700">
          Private Collection Vault
        </p>
        <h1 className="mt-2 font-serif text-3xl font-bold text-slate-900">
          My Collection
        </h1>
        <p className="mt-2 max-w-2xl text-slate-500">
          Manage, document, and evaluate your artwork inventory with conservative
          AI-assisted guidance and clear evidence tracking.
        </p>
      </header>

      <section
        aria-label="Collection summary"
        className="grid grid-cols-1 gap-4 md:grid-cols-4"
      >
        <DashboardMetric
          label="Estimated Total Value (USD)"
          value={formatRange(totalRange)}
          note="AI-assisted fair market range"
          accent="amber"
        />
        <DashboardMetric
          label="Items in Vault"
          value={collection.length}
          note="Private artwork records"
        />
        <DashboardMetric
          label="Action Needed"
          value={actionNeededCount}
          note="Weak documentation"
          accent={actionNeededCount > 0 ? "amber" : "emerald"}
        />
        <DashboardMetric
          label="Low Confidence"
          value={lowConfidenceCount}
          note="Needs stronger evidence"
          accent={lowConfidenceCount > 0 ? "red" : "emerald"}
        />
      </section>

      {totalRange.excludedCurrencyCount > 0 && (
        <p className="rounded-lg border border-amber-100 bg-amber-50 p-3 text-sm text-amber-800">
          {totalRange.excludedCurrencyCount} artwork record(s) were excluded from
          the total because they use a non-USD currency.
        </p>
      )}

      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="font-serif text-xl font-bold text-slate-900">
              Artwork Records
            </h2>
            <p className="text-sm text-slate-500">
              Select an artwork to review valuation, documentation, and risk flags.
            </p>
          </div>
        </div>

        {collection.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {collection.map((art) => (
              <ArtworkCard key={art.id} art={art} onSelect={onSelect} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No artwork records yet"
            message="Add your first artwork to begin building a private collection vault."
          />
        )}
      </section>
    </div>
  );
}

function DashboardMetric({ label, value, note, accent = "slate" }) {
  const accentClasses = {
    slate: "bg-stone-100 text-slate-600",
    amber: "bg-amber-50 text-amber-700",
    emerald: "bg-emerald-50 text-emerald-700",
    red: "bg-red-50 text-red-700",
  };

  return (
    <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
      <div className="text-xs font-medium uppercase tracking-wider text-slate-500">
        {label}
      </div>
      <div className="mt-2 font-serif text-2xl text-slate-900">{value}</div>
      <div
        className={`mt-2 inline-block rounded px-2 py-1 text-xs ${
          accentClasses[accent] || accentClasses.slate
        }`}
      >
        {note}
      </div>
    </div>
  );
}

function ArtworkCard({ art, onSelect }) {
  const score = clampScore(art.docScore);
  const artistName = art.artist?.name || "Unknown Artist";

  return (
    <button
      type="button"
      onClick={() => onSelect(art.id)}
      className="group overflow-hidden rounded-xl border border-stone-200 bg-white text-left shadow-sm transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2"
    >
      <div className="relative aspect-square overflow-hidden bg-stone-100">
        <img
          src={art.imageUrl}
          alt={art.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute right-3 top-3">
          <span
            className={`flex items-center gap-1 rounded px-2 py-1 text-xs font-medium shadow-sm ${getConfidenceClass(
              art.confidence
            )}`}
          >
            {art.confidence === "High" ? (
              <CheckCircle className="h-3 w-3" />
            ) : (
              <AlertCircle className="h-3 w-3" />
            )}
            {art.confidence}
          </span>
        </div>
      </div>

      <div className="border-t border-stone-100 p-4">
        <h3 className="truncate font-serif text-lg font-bold text-slate-900">
          {art.title}
        </h3>
        <p className="truncate text-sm text-slate-500">{artistName}</p>

        <div className="mt-3 flex items-center justify-between gap-4">
          <span className="text-sm font-medium text-slate-900">
            {formatRange(art.estimates?.fairMarket)}
          </span>
          <span className="whitespace-nowrap text-xs text-slate-400">
            {score}/100
          </span>
        </div>

        <div className="mt-2 h-1.5 w-full rounded-full bg-stone-100">
          <div
            className={`h-1.5 rounded-full ${getScoreBarClass(score)}`}
            style={{ width: `${score}%` }}
          />
        </div>

        <p className="mt-2 text-xs text-slate-500">
          {getDocScoreLabel(score)}
        </p>
      </div>
    </button>
  );
}
