import React, { useId } from "react";

export default function TextInput({ label, placeholder, value, onChange }) {
  const inputId = useId();

  return (
    <div>
      <label
        htmlFor={inputId}
        className="mb-1 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      <input
        id={inputId}
        type="text"
        className="w-full rounded-md border border-stone-300 p-2 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
