import React, { useState } from "react";
import { ShieldAlert, Plus, Home } from "lucide-react";
import Dashboard from "./components/Dashboard";
import ArtworkDetail from "./components/ArtworkDetail";
import AddArtwork from "./components/AddArtwork";
import EmptyState from "./components/EmptyState";
import { initialCollection } from "./mockData";

export default function App() {
  const [currentView, setCurrentView] = useState("dashboard");
  const [collection, setCollection] = useState(initialCollection);
  const [selectedArtId, setSelectedArtId] = useState(null);

  const navigate = (view, id = null) => {
    setSelectedArtId(id);
    setCurrentView(view);
  };

  const selectedArt = collection.find((art) => art.id === selectedArtId);

  const handleSaveArtwork = (newArt) => {
    setCollection((prev) => [...prev, newArt]);
    navigate("dashboard");
  };

  return (
    <div className="min-h-screen bg-[#f9f8f6] font-sans text-slate-800">
      <nav className="sticky top-0 z-10 border-b border-stone-200 bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
          <button
            type="button"
            className="flex items-center gap-2 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2"
            onClick={() => navigate("dashboard")}
            aria-label="Go to ProvenanceIQ dashboard"
          >
            <ShieldAlert className="h-6 w-6 text-amber-700" />
            <span className="font-serif text-xl font-bold tracking-tight text-slate-900">
              Provenance<span className="text-amber-700">IQ</span>
            </span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Go to dashboard"
              aria-current={currentView === "dashboard" ? "page" : undefined}
              onClick={() => navigate("dashboard")}
              className={`rounded-md p-2 transition-colors hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2 ${
                currentView === "dashboard"
                  ? "text-amber-700"
                  : "text-slate-500"
              }`}
            >
              <Home className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => navigate("add")}
              className="flex items-center gap-2 rounded-md bg-amber-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2"
            >
              <Plus className="h-4 w-4" />
              Add Artwork
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-4 py-8">
        {currentView === "dashboard" && (
          <Dashboard
            collection={collection}
            onSelect={(id) => navigate("detail", id)}
          />
        )}

        {currentView === "detail" &&
          (selectedArt ? (
            <ArtworkDetail
              art={selectedArt}
              onBack={() => navigate("dashboard")}
            />
          ) : (
            <EmptyState
              title="Artwork not found"
              message="This artwork record could not be located. Return to the dashboard and choose another item."
              actionLabel="Back to Dashboard"
              onAction={() => navigate("dashboard")}
            />
          ))}

        {currentView === "add" && (
          <AddArtwork
            onSave={handleSaveArtwork}
            onCancel={() => navigate("dashboard")}
          />
        )}
      </main>
    </div>
  );
}
