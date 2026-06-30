export function Checklist({ children }) {
  return <ul className="not-prose my-6 space-y-2">{children}</ul>;
}

export function ChecklistItem({ children }) {
  return (
    <li className="flex items-start gap-3 text-slate-200">
      <input
        type="checkbox"
        className="mt-1 size-4 shrink-0 cursor-pointer accent-brand-500"
        aria-label={typeof children === "string" ? children : "Checklist item"}
      />
      <span className="leading-relaxed">{children}</span>
    </li>
  );
}
