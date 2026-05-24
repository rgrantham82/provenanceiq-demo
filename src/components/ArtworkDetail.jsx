import React, { useState } from "react";
import {
  ChevronRight,
  FileText,
  CheckCircle,
  AlertCircle,
  DollarSign,
} from "lucide-react";
import {
  clampScore,
  formatRange,
  getConfidenceClass,
  getScoreBarClass,
  getDocScoreLabel,
} from "../utils";

export default function ArtworkDetail({ art, onBack }) {
  const [valPurpose, setValPurpose] = useState("curiosity");

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center rounded-md text-sm text-slate-500 transition-colors hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2"
      >
        <ChevronRight className="mr-1 h-4 w-4 rotate-180" />
        Back to Collection
      </button>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <section className="space-y-6">
          <div className="overflow-hidden rounded-xl border border-stone-200 bg-stone-100 shadow-sm">
            <img
              src={art.imageUrl}
              alt={art.title}
              className="max-h-[600px] w-full object-cover"
            />
          </div>

          <ArtworkMetadata art={art} />
          <RiskFlags flags={art.riskFlags} />
        </section>

        <section className="space-y-6">
          <DocumentationScore art={art} />
          <ValuationPanel
            art={art}
            valPurpose={valPurpose}
            setValPurpose={setValPurpose}
          />

          <div className="space-y-3">
            <button
              type="button"
              className="w-full rounded-lg bg-slate-900 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-700 focus:ring-offset-2"
            >
              Request Qualified Appraiser Review
            </button>

            <button
              type="button"
              className="w-full rounded-lg border border-stone-300 bg-white py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2"
            >
              Export Collector Advisory PDF
            </button>

            <p className="px-3 text-center text-[11px] leading-relaxed text-slate-400">
              ProvenanceIQ provides AI-assisted valuation guidance for collection
              management. Formal appraisals for tax, insurance, estate, donation,
              or legal purposes must be completed by a qualified appraiser.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

function ArtworkMetadata({ art }) {
  const artistName = art.artist?.name || "Unknown Artist";
  const artistConfidence = art.artist?.confidence || "Low";
  const attributionType = art.artist?.attributionType || "unknown";

  return (
    <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-700">
            Artwork Record
          </p>
          <h2 className="mt-2 font-serif text-2xl font-bold text-slate-900">
            {art.title}
          </h2>
          <p className="text-lg text-slate-600">{artistName}</p>
        </div>

        <span
          className={`rounded px-2 py-1 text-xs font-medium ${getConfidenceClass(
            artistConfidence
          )}`}
        >
          {attributionType}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
        <MetadataItem label="Medium" value={art.medium} />
        <MetadataItem label="Date" value={art.date} />
        <MetadataItem label="Dimensions" value={art.dimensions} />
        <MetadataItem label="Condition" value={art.condition} />
      </div>
    </div>
  );
}

function MetadataItem({ label, value }) {
  return (
    <div>
      <span className="block text-[10px] uppercase tracking-wider text-slate-400">
        {label}
      </span>
      <span className="text-slate-900">{value || "Not recorded"}</span>
    </div>
  );
}

function DocumentationScore({ art }) {
  const score = clampScore(art.docScore);
  const documents = art.documents ?? [];
  const uploadedDocs = documents.filter((doc) => doc.status === "uploaded");
  const missingDocs = documents.filter((doc) => doc.status === "missing");

  return (
    <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
      <div className="mb-2 flex items-end justify-between">
        <h3 className="flex items-center gap-2 font-serif text-lg font-bold text-slate-900">
          <FileText className="h-5 w-5 text-amber-700" />
          Documentation Score
        </h3>

        <span className="font-serif text-2xl text-slate-900">
          {score}
          <span className="text-sm text-slate-400">/100</span>
        </span>
      </div>

      <div
        className="mb-4 h-2.5 w-full rounded-full bg-stone-100"
        role="progressbar"
        aria-label="Documentation score"
        aria-valuenow={score}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          className={`h-2.5 rounded-full ${getScoreBarClass(score)}`}
          style={{ width: `${score}%` }}
        />
      </div>

      <p className="mb-4 text-sm text-slate-600">
        {getDocScoreLabel(score)}. Stronger records improve valuation confidence
        and make appraiser review easier.
      </p>

      <div className="space-y-4 text-sm">
        <div>
          <p className="mb-2 font-medium text-slate-700">Files in Vault:</p>
          {uploadedDocs.length > 0 ? (
            <ul className="space-y-1">
              {uploadedDocs.map((doc) => (
                <li key={doc.label} className="flex items-center text-slate-600">
                  <CheckCircle className="mr-2 h-3.5 w-3.5 text-emerald-500" />
                  {doc.label}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-500">No documents uploaded yet.</p>
          )}
        </div>

        {missingDocs.length > 0 && (
          <div>
            <p className="mb-2 font-medium text-amber-700">Missing Evidence:</p>
            <ul className="space-y-1">
              {missingDocs.map((doc) => (
                <li key={doc.label} className="flex items-center text-amber-700">
                  <AlertCircle className="mr-2 h-3.5 w-3.5" />
                  {doc.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function RiskFlags({ flags = [] }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
      <h3 className="mb-3 flex items-center gap-2 font-serif text-lg font-bold text-slate-900">
        <AlertCircle className="h-5 w-5 text-amber-700" />
        Risk Flags
      </h3>

      {flags.length > 0 ? (
        <ul className="space-y-2">
          {flags.map((flag) => (
            <li key={flag} className="flex gap-2 text-sm text-slate-700">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
              <span>{flag}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="flex items-center gap-2 text-sm text-slate-600">
          <CheckCircle className="h-4 w-4 text-emerald-500" />
          No major risk flags recorded from the current evidence.
        </p>
      )}
    </div>
  );
}

function ValuationPanel({ art, valPurpose, setValPurpose }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h3 className="flex items-center gap-2 font-serif text-lg font-bold text-slate-900">
          <DollarSign className="h-5 w-5 text-emerald-600" />
          Preliminary Valuation
        </h3>
        <span
          className={`rounded px-2 py-1 text-xs font-medium ${getConfidenceClass(
            art.confidence
          )}`}
        >
          {art.confidence} Confidence
        </span>
      </div>

      <div className="mb-6 flex gap-2 rounded-lg bg-stone-100 p-1">
        <ValuationPurposeButton
          label="Curiosity"
          value="curiosity"
          activeValue={valPurpose}
          onClick={setValPurpose}
        />
        <ValuationPurposeButton
          label="Sale"
          value="sale"
          activeValue={valPurpose}
          onClick={setValPurpose}
        />
        <ValuationPurposeButton
          label="Insurance"
          value="insurance"
          activeValue={valPurpose}
          onClick={setValPurpose}
        />
      </div>

      {valPurpose === "curiosity" && (
        <EstimateDisplay
          label="Estimated Fair Market Range"
          value={formatRange(art.estimates?.fairMarket)}
          note="A preliminary collection-management estimate based on the currently available object record."
        />
      )}

      {valPurpose === "sale" && (
        <div className="space-y-3">
          <EstimateMiniRow
            label="Quick-sale / liquidation"
            value={formatRange(art.estimates?.liquidation)}
          />
          <EstimateMiniRow
            label="Fair market range"
            value={formatRange(art.estimates?.fairMarket)}
          />
          <EstimateMiniRow
            label="Retail / private-sale asking range"
            value={formatRange(art.estimates?.retailPrivateSale)}
          />

          <p className="rounded border border-stone-200 bg-stone-50 p-3 text-xs leading-relaxed text-slate-500">
            Sale value depends heavily on venue, timeline, buyer pool, artist
            recognition, condition, and documentation. A fast sale usually
            produces a lower number than a patient private or gallery-style sale.
          </p>
        </div>
      )}

      {valPurpose === "insurance" && (
        <EstimateDisplay
          label="Estimated Replacement Value"
          value={formatRange(art.estimates?.insuranceReplacement)}
          note="For collection planning only. Confirm requirements with your insurer or a qualified appraiser before scheduling coverage."
        />
      )}

      <div className="mt-4 rounded border border-amber-100 bg-amber-50/60 p-3 text-xs leading-relaxed text-slate-600">
        <strong>Why this estimate?</strong> This range considers available
        metadata, condition, documentation strength, attribution confidence, and
        comparable-market assumptions. It is not a certified appraisal.
      </div>

      <div className="mt-4 border-t border-stone-100 pt-4">
        <h4 className="mb-1 text-sm font-medium text-slate-900">
          Recommendation: Is it worth appraising?
        </h4>
        <p className="text-sm leading-relaxed text-slate-600">{art.triage}</p>
      </div>
    </div>
  );
}

function ValuationPurposeButton({ label, value, activeValue, onClick }) {
  const active = value === activeValue;
  return (
    <button
      type="button"
      onClick={() => onClick(value)}
      aria-pressed={active}
      className={`flex-1 rounded-md py-1.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2 ${
        active
          ? "bg-white text-slate-900 shadow"
          : "text-slate-500 hover:text-slate-700"
      }`}
    >
      {label}
    </button>
  );
}

function EstimateDisplay({ label, value, note }) {
  return (
    <div className="rounded-lg border border-stone-100 bg-stone-50 px-4 py-5 text-center">
      <span className="mb-1 block text-xs uppercase tracking-widest text-slate-500">
        {label}
      </span>
      <span className="block font-serif text-4xl text-slate-900">{value}</span>
      {note && (
        <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-slate-500">
          {note}
        </p>
      )}
    </div>
  );
}

function EstimateMiniRow({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-stone-100 bg-stone-50 p-3">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="font-serif text-lg text-slate-900">{value}</span>
    </div>
  );
}
