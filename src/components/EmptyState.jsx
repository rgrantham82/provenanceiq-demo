import React from "react";
import { ShieldAlert } from "lucide-react";

export default function EmptyState({ title, message, actionLabel, onAction }) {
  return (
    <div className="rounded-xl border border-dashed border-stone-300 bg-white p-10 text-center">
      <ShieldAlert className="mx-auto mb-3 h-10 w-10 text-stone-300" />
      <h2 className="font-serif text-xl font-bold text-slate-900">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">{message}</p>

      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 rounded-md bg-amber-700 px-4 py-2 text-sm font-medium text-white hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
