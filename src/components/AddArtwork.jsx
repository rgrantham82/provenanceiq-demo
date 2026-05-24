import React, { useState, useEffect, useRef } from "react";
import {
  Camera,
  AlertCircle,
  Lock,
  Search,
  Upload,
  CheckCircle,
} from "lucide-react";
import TextInput from "./TextInput";
import { createId } from "../utils";

export default function AddArtwork({ onSave, onCancel }) {
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const analysisTimeoutRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    medium: "Oil on canvas",
    dimensions: "",
    imageUrl: "",
    imageFile: null,
  });

  useEffect(() => {
    return () => {
      if (analysisTimeoutRef.current) {
        clearTimeout(analysisTimeoutRef.current);
      }
    };
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    setUploadError("");

    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    const maxSize = 10 * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
      setUploadError("Please upload a JPEG, PNG, or WEBP image.");
      event.target.value = "";
      return;
    }

    if (file.size > maxSize) {
      setUploadError("Please upload an image smaller than 10MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({
        ...prev,
        imageFile: file,
        imageUrl: String(reader.result),
      }));
    };
    reader.onerror = () => {
      setUploadError("The image could not be read. Try another file.");
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const handleAnalyze = () => {
    if (!formData.imageUrl) return;
    setIsAnalyzing(true);
    analysisTimeoutRef.current = setTimeout(() => {
      setIsAnalyzing(false);
      setStep(2);
    }, 1200);
  };

  const handleSave = () => {
    const newArtwork = {
      id: createId(),
      title: formData.title.trim() || "Untitled",
      artist: {
        name: formData.artist.trim() || "Unknown Artist",
        attributionType: formData.artist.trim() ? "user-provided" : "unknown",
        confidence: formData.artist.trim() ? "Medium" : "Low",
      },
      medium: formData.medium,
      date: "Unknown",
      dimensions: formData.dimensions.trim() || "Unknown",
      condition: "Not recorded",
      imageUrl: formData.imageUrl,
      docScore: 20,
      estimates: {
        fairMarket: { low: 100, high: 300, currency: "USD" },
        insuranceReplacement: { low: 250, high: 450, currency: "USD" },
        liquidation: { low: 50, high: 125, currency: "USD" },
        retailPrivateSale: { low: 200, high: 400, currency: "USD" },
      },
      confidence: "Low",
      triage:
        "Not enough data for a strong estimate. Upload signature close-ups, a reverse image, measurements, acquisition records, and any gallery or appraisal documents before relying on this range.",
      riskFlags: ["Incomplete documentation", "No reverse image uploaded"],
      documents: [
        { label: "Front Image", status: "uploaded" },
        { label: "Back Image", status: "missing" },
        { label: "Signature Detail", status: "missing" },
        { label: "Acquisition Record", status: "missing" },
        { label: "Prior Appraisal", status: "missing" },
      ],
    };
    onSave(newArtwork);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center justify-between border-b border-stone-200 pb-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-700">
            New Artwork Record
          </p>
          <h2 className="mt-1 font-serif text-2xl font-bold text-slate-900">
            Add Artwork to Vault
          </h2>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md text-sm text-slate-500 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2"
        >
          Cancel
        </button>
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <div>
            <input
              id="front-image-upload"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileUpload}
              className="sr-only"
            />
            <label
              htmlFor="front-image-upload"
              className="block cursor-pointer rounded-xl border-2 border-dashed border-stone-300 p-10 text-center transition-colors hover:bg-stone-50"
            >
              {formData.imageUrl ? (
                <div className="space-y-3">
                  <img
                    src={formData.imageUrl}
                    alt="Artwork preview"
                    className="mx-auto h-56 rounded object-cover shadow"
                  />
                  <p className="text-sm font-medium text-slate-700">
                    Replace front image
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center text-slate-500">
                  <Camera className="mb-3 h-10 w-10 text-stone-400" />
                  <p className="font-medium text-slate-700">
                    Upload front image
                  </p>
                  <p className="mt-1 text-xs">JPEG, PNG, or WEBP up to 10MB</p>
                </div>
              )}
            </label>
            {uploadError && (
              <p className="mt-2 flex items-center gap-2 text-sm text-red-700">
                <AlertCircle className="h-4 w-4" />
                {uploadError}
              </p>
            )}
          </div>

          <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-sm text-slate-500">
              <Lock className="h-4 w-4" />
              Your record is private by default in the eventual production app.
              This public demo stores data only in the browser session.
            </div>

            <div className="space-y-4">
              <TextInput
                label="Title, if known"
                placeholder="e.g. Woman in Red"
                value={formData.title}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, title: value }))
                }
              />
              <TextInput
                label="Artist, if known"
                placeholder="Leave blank if unknown"
                value={formData.artist}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, artist: value }))
                }
              />
              <TextInput
                label="Dimensions"
                placeholder="e.g. 18 × 24 in."
                value={formData.dimensions}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, dimensions: value }))
                }
              />
              <div>
                <label
                  htmlFor="medium"
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  Medium
                </label>
                <select
                  id="medium"
                  value={formData.medium}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      medium: event.target.value,
                    }))
                  }
                  className="w-full rounded-md border border-stone-300 p-2 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500"
                >
                  <option>Oil on canvas</option>
                  <option>Acrylic on canvas</option>
                  <option>Acrylic on panel</option>
                  <option>Watercolor on paper</option>
                  <option>Ink on paper</option>
                  <option>Mixed media</option>
                  <option>Print / edition</option>
                  <option>Photograph</option>
                  <option>Unknown</option>
                </select>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAnalyze}
            disabled={!formData.imageUrl || isAnalyzing}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-amber-700 py-3 font-medium text-white transition-colors hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2"
          >
            {isAnalyzing ? (
              <>
                <Search className="h-5 w-5 animate-pulse" />
                Generating preliminary object record...
              </>
            ) : (
              <>
                <Upload className="h-5 w-5" />
                Run AI Intake Analysis
              </>
            )}
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div className="flex gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
            <CheckCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <h4 className="font-medium">Intake Complete</h4>
              <p className="mt-1 text-sm">
                A preliminary profile has been generated. Review the details
                below before saving this record to your demo vault.
              </p>
            </div>
          </div>

          <div className="space-y-4 rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
            <div className="flex gap-4">
              <img
                src={formData.imageUrl}
                className="h-24 w-24 rounded object-cover shadow-sm"
                alt="Artwork thumbnail"
              />
              <div>
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  {formData.title || "Untitled"}
                </h3>
                <p className="text-slate-600">
                  {formData.artist || "Unknown Artist"}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {formData.medium}
                  {formData.dimensions ? ` • ${formData.dimensions}` : ""}
                </p>
                <p className="mt-2 text-xs font-medium text-amber-700">
                  Preliminary fair market estimate: $100–$300
                </p>
              </div>
            </div>

            <div className="flex gap-2 rounded border border-amber-100 bg-amber-50 p-3 text-sm text-amber-800">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <p>
                <strong>Low confidence:</strong> To improve this estimate,
                upload images of the signature, reverse side, frame, labels, and
                any existing purchase or provenance documentation.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="rounded-md border border-stone-300 bg-white py-3 font-medium text-slate-700 transition-colors hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2"
            >
              Edit Intake
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="rounded-md bg-slate-900 py-3 font-medium text-white transition-colors hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-700 focus:ring-offset-2"
            >
              Save to Collection Vault
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
