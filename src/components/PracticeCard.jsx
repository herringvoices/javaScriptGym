import React, { useState } from "react";

export default function PracticeCard({ prompt, answer, children }) {
  const [open, setOpen] = useState(false);
  const body = children || (typeof answer === "string" ? <pre className="m-0 whitespace-pre-wrap">{answer}</pre> : answer);
  return (
    <div className="not-prose rounded-lg border border-slate-700 bg-slate-900/60 p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="m-0 font-medium text-slate-100">{prompt}</p>
        </div>
        <button
          type="button"
          className="rounded-md bg-brand-600 px-3 py-1 text-xs font-semibold text-white shadow hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
        >
          {open ? "Hide" : "Show"} Answer
        </button>
      </div>
      {open && (
        <div className="mt-3 rounded-md bg-slate-800/80 p-3 text-sm text-slate-200">
          {body}
        </div>
      )}
    </div>
  );
}
