import React from "react";

const typeStyles = {
  tip: {
    border: "border-emerald-500/40",
    bg: "bg-emerald-500/10",
    label: "text-emerald-300",
    title: "Tip",
  },
  warn: {
    border: "border-amber-500/40",
    bg: "bg-amber-500/10",
    label: "text-amber-300",
    title: "Warning",
  },
  note: {
    border: "border-brand-500/40",
    bg: "bg-brand-500/10",
    label: "text-brand-300",
    title: "Note",
  },
};

export default function Callout({ type = "note", title, children }) {
  const spec = typeStyles[type] || typeStyles.note;
  return (
    <div
      className={`not-prose relative rounded-md border ${spec.border} ${spec.bg} p-4 text-sm text-slate-200`}
    >
      <p className={`m-0 font-semibold tracking-wide ${spec.label}`}>
        {title || spec.title}
      </p>
      <div className="mt-2 space-y-3 leading-relaxed">{children}</div>
    </div>
  );
}
