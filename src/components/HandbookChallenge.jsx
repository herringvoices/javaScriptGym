import React, { useEffect, useId, useState } from "react";

function normalizeLegacyTitle(title) {
  return title
    .replace(/^(?:[A-Z.]+\s+)?Challenge\s+[A-Z]*\d+\s*[·:.-]\s*/i, "")
    .replace(/^[A-Z]\d+-\d+\s*·\s*/i, "")
    .trim();
}

function renderLegacyInlineText(value) {
  if (typeof value !== "string") return value;

  const parts = value.split(/(<code>.*?<\/code>|`[^`]+`)/g).filter(Boolean);

  return parts.map((part, index) => {
    if (part.startsWith("<code>") && part.endsWith("</code>")) {
      return <code key={index}>{part.slice(6, -7)}</code>;
    }

    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={index}>{part.slice(1, -1)}</code>;
    }

    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

function renderBlockValue(value) {
  if (typeof value === "string") {
    return <pre className="m-0 whitespace-pre-wrap font-mono leading-relaxed">{value}</pre>;
  }

  return value;
}

/**
 * HandbookChallenge
 * A required practice checkpoint embedded in handbook pages.
 *
 * Preferred authoring contract:
 * - title: short, active description of the learner's task
 * - children: task instructions
 * - expected?: expected observable result, when useful
 * - hints?: Array<React.ReactNode> of progressively stronger nudges
 * - solution?: canonical working solution
 *
 * `answers`, non-array hints, legacy challenge-number title prefixes, and
 * simple inline-code strings are retained temporarily for older handbook
 * pages. New content should use the preferred contract above.
 */
export default function HandbookChallenge({
  title = "Practice this step",
  children,
  expected,
  hints = [],
  solution,
  answers,
}) {
  const headingId = useId();
  const hintItems = Array.isArray(hints) ? hints : hints == null ? [] : [hints];
  const resolvedSolution = solution ?? answers;
  const displayTitle = normalizeLegacyTitle(title);

  const [revealedHintCount, setRevealedHintCount] = useState(0);
  const [solutionOpen, setSolutionOpen] = useState(false);

  useEffect(() => {
    setRevealedHintCount(0);
    setSolutionOpen(false);
  }, [title]);

  const visibleHints = hintItems.slice(0, revealedHintCount);
  const allHintsVisible = hintItems.length > 0 && revealedHintCount >= hintItems.length;

  function handleHintClick() {
    if (allHintsVisible) {
      setRevealedHintCount(0);
      return;
    }

    setRevealedHintCount((count) => Math.min(count + 1, hintItems.length));
  }

  const hintButtonLabel =
    revealedHintCount === 0
      ? "Show a hint"
      : allHintsVisible
        ? "Hide hints"
        : "Show another hint";

  return (
    <section
      aria-labelledby={headingId}
      className="not-prose my-10 overflow-hidden rounded-xl border border-brand-400/40 bg-slate-900 text-slate-200 shadow-card ring-1 ring-inset ring-brand-500/10"
    >
      <div className="h-1 bg-gradient-to-r from-brand-400 via-brand-500 to-transparent" />

      <div className="px-5 py-6 sm:px-6 sm:py-7">
        <p className="m-0 text-xs font-bold uppercase tracking-[0.2em] text-brand-300">
          Your turn
        </p>
        <h3 id={headingId} className="m-0 mt-1.5 text-xl font-semibold leading-snug text-white sm:text-2xl">
          {displayTitle}
        </h3>

        <div className="mt-5 space-y-3 text-sm leading-7 text-slate-200 sm:text-[0.95rem]">
          {children}
        </div>

        {expected != null ? (
          <div className="mt-6 overflow-hidden rounded-lg border border-slate-700/90 bg-slate-950/70">
            <div className="border-b border-slate-800 px-4 py-2.5 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-slate-400">
              Expected result
            </div>
            <div className="p-4 text-sm text-slate-100">{renderBlockValue(expected)}</div>
          </div>
        ) : null}
      </div>

      {(hintItems.length > 0 || resolvedSolution != null) && (
        <div className="flex flex-col gap-3 border-t border-slate-700/80 bg-slate-950/35 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-3">
            {hintItems.length > 0 ? (
              <button
                type="button"
                onClick={handleHintClick}
                aria-expanded={revealedHintCount > 0}
                className="rounded-md border border-brand-400/40 bg-brand-500/10 px-3 py-2 text-xs font-semibold text-brand-200 transition hover:border-brand-300/70 hover:bg-brand-500/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
              >
                {hintButtonLabel}
              </button>
            ) : null}

            {revealedHintCount > 0 ? (
              <span className="text-xs text-slate-500">
                Hint {revealedHintCount} of {hintItems.length}
              </span>
            ) : null}
          </div>

          {resolvedSolution != null ? (
            <button
              type="button"
              onClick={() => setSolutionOpen((open) => !open)}
              aria-expanded={solutionOpen}
              className="w-fit rounded-md border border-slate-600 bg-slate-800/70 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:border-slate-500 hover:bg-slate-800 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
            >
              {solutionOpen ? "Hide solution" : "View solution"}
            </button>
          ) : null}
        </div>
      )}

      {visibleHints.length > 0 ? (
        <div className="space-y-3 border-t border-slate-800 bg-slate-950/30 px-5 py-5 sm:px-6">
          {visibleHints.map((hint, index) => (
            <div
              key={index}
              className="rounded-lg border border-brand-400/20 bg-brand-500/5 px-4 py-3 text-sm leading-relaxed text-slate-200"
            >
              <p className="m-0 mb-1 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-brand-300">
                Hint {index + 1}
              </p>
              <div>{renderLegacyInlineText(hint)}</div>
            </div>
          ))}
        </div>
      ) : null}

      {resolvedSolution != null && solutionOpen ? (
        <div className="border-t border-slate-800 bg-slate-950/60 px-5 py-5 sm:px-6">
          <p className="m-0 mb-3 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-slate-400">
            Solution
          </p>
          <div className="text-sm text-slate-100">{renderBlockValue(resolvedSolution)}</div>
        </div>
      ) : null}
    </section>
  );
}
