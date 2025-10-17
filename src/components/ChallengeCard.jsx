import Markdown from "./Markdown";
import StandardsBadges from "./StandardsBadges";

const difficultyLabel = (value) => "★".repeat(value ?? 0) || "-";

export default function ChallengeCard({ challenge, onSelect, isLocked = false }) {
  return (
    <button
      type="button"
      onClick={() => {
        if (isLocked) return; // suppress navigation when locked
        onSelect?.(challenge);
      }}
      title={isLocked ? "Locked by mastery order" : undefined}
      className={`group relative flex h-full flex-col rounded-2xl border p-5 text-left shadow-card transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
        isLocked
          ? "border-slate-800 bg-slate-900/60 opacity-80"
          : "border-slate-800 bg-slate-900/80 hover:-translate-y-1 hover:border-brand-500/60 hover:shadow-2xl focus-visible:outline-brand-400"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-300">
            {challenge.primaryStandard}
          </p>
          <h2 className="mt-1 text-lg font-semibold text-white">{challenge.title}</h2>
          {challenge.isCompleted ? (
            <span className="mt-2 inline-block rounded-full bg-emerald-600/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300 ring-1 ring-inset ring-emerald-600/40">
              Completed
            </span>
          ) : null}
          {isLocked ? (
            <span className="ml-2 mt-2 inline-block rounded-full bg-slate-700/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-300 ring-1 ring-inset ring-slate-700/60">
              Locked
            </span>
          ) : null}
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-200">
            {difficultyLabel(challenge.difficulty)}
          </span>
        </div>
      </div>
      <Markdown className="mt-3 text-left text-sm text-slate-300">
        {challenge.description}
      </Markdown>
      <StandardsBadges
        standards={challenge.standards}
        size="sm"
        className="mt-4"
      />
      <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
        <span>{challenge.challengeType.replaceAll("_", " ")}</span>
        {challenge.tags?.length ? <span>{challenge.tags.join(", ")}</span> : null}
      </div>
      {isLocked ? (
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-slate-950/20" />
      ) : null}
    </button>
  );
}
