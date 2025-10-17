export default function ChallengeFilters({
  categories = [],
  difficulties = [],
  selectedCategory,
  selectedDifficulty,
  onCategoryChange,
  onDifficultyChange,
  onRandom,
  isRandomDisabled = false,
  hideCompleted = false,
  onHideCompletedChange,
}) {
  return (
    <div className="flex flex-wrap items-end gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-inner">
      <div className="flex flex-col">
        <label htmlFor="category" className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Category
        </label>
        <select
          id="category"
          value={selectedCategory ?? ""}
          onChange={(event) => onCategoryChange?.(event.target.value || null)}
          className="mt-1 min-w-[200px] rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/60"
        >
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="difficulty" className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Difficulty
        </label>
        <select
          id="difficulty"
          value={selectedDifficulty ?? ""}
          onChange={(event) => onDifficultyChange?.(event.target.value ? Number(event.target.value) : null)}
          className="mt-1 min-w-[160px] rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/60"
        >
          <option value="">All difficulties</option>
          {difficulties.map((difficulty) => (
            <option key={difficulty.value} value={difficulty.value}>
              {difficulty.label}
            </option>
          ))}
        </select>
      </div>

      <div className="ml-auto flex items-center gap-5">
        <div className="flex items-center gap-2">
          <input
            id="hideCompleted"
            type="checkbox"
            checked={hideCompleted}
            onChange={(e) => onHideCompletedChange?.(e.target.checked)}
            className="h-4 w-4 cursor-pointer rounded border-slate-600 bg-slate-800 text-brand-500 focus:ring-brand-400"
          />
            <label
              htmlFor="hideCompleted"
              className="select-none text-xs font-semibold uppercase tracking-wider text-slate-400"
            >
              Hide Completed
            </label>
        </div>
        <button
          type="button"
          onClick={onRandom}
          disabled={isRandomDisabled}
          className="inline-flex items-center gap-2 rounded-full border border-transparent bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-brand-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-200 disabled:cursor-not-allowed disabled:border-slate-700 disabled:bg-slate-800 disabled:text-slate-400"
        >
          Random challenge
        </button>
      </div>
    </div>
  );
}
