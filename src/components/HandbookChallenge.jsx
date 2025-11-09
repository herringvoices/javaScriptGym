import React, { useMemo, useState, useEffect } from "react";

/**
 * HandbookChallenge
 * Amber callout-like panel for challenges embedded in handbook pages.
 *
 * Props:
 * - title?: string (defaults to "Challenge")
 * - children: main description/content (supports multiple lines)
 * - answers?: string | React.ReactNode | Array<string | React.ReactNode>
 * - hints?: string | React.ReactNode | Array<string | React.ReactNode>
 *   Provide one of answers or hints to enable a toggleable dropdown.
 * - toggleLabels?: { show?: string, hide?: string } (optional custom labels)
 */
export default function HandbookChallenge({
  title = "Challenge",
  children,
  answers,
  hints,
  toggleLabels,
}) {
  // Build the list of available panels and track which is selected.
  const availableModes = useMemo(() => {
    const modes = [];
    if (hints != null) modes.push("hints");
    if (answers != null) modes.push("answers");
    return modes;
  }, [answers, hints]);

  const [selected, setSelected] = useState(() => availableModes[0] || null);
  const [open, setOpen] = useState(false);

  // When props change, ensure selected stays valid (or resets to the first available).
  useEffect(() => {
    if (!availableModes.includes(selected)) {
      setSelected(availableModes[0] || null);
      setOpen(false);
    }
  }, [availableModes, selected]);

  const mode = selected; // current visible panel type
  const showLabel =
    (toggleLabels && toggleLabels.show) || (mode === "answers" ? "Show Answers" : "Show Hints");
  const hideLabel =
    (toggleLabels && toggleLabels.hide) || (mode === "answers" ? "Hide Answers" : "Hide Hints");

  function renderItems(value) {
    if (value == null) return null;
    if (Array.isArray(value)) {
      return (
        <ul className="list-disc space-y-2 pl-5">
          {value.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {typeof item === "string" ? <span className="whitespace-pre-wrap">{item}</span> : item}
            </li>
          ))}
        </ul>
      );
    }
    if (typeof value === "string") {
      return <pre className="m-0 whitespace-pre-wrap leading-relaxed">{value}</pre>;
    }
    return value; // React node
  }

  const panel = mode === "answers" ? renderItems(answers) : renderItems(hints);

  return (
    <div className="not-prose relative rounded-md border border-amber-500/40 bg-amber-500/10 p-4 text-sm text-slate-200">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="m-0 font-semibold tracking-wide text-amber-300">{title}</p>
          <div className="mt-2 space-y-3 leading-relaxed">{children}</div>
        </div>
        {availableModes.length > 1 && (
          <div className="flex items-center gap-2">
            {availableModes.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setSelected(m)}
                className={`px-2 py-1 text-xs rounded font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 ${
                  selected === m ? "bg-amber-600 text-white" : "bg-amber-500/10 text-slate-200"
                }`}
              >
                {m === "hints" ? "Hints" : "Answers"}
              </button>
            ))}
          </div>
        )}
        {mode && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="rounded-md bg-amber-600 px-3 py-1 text-xs font-semibold text-white shadow hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
          >
            {open ? hideLabel : showLabel}
          </button>
        )}
      </div>

      {mode && open ? (
        <div className="mt-3 rounded-md bg-amber-500/10 p-3 text-sm text-slate-100 ring-1 ring-inset ring-amber-500/20">
          {panel}
        </div>
      ) : null}
    </div>
  );
}
