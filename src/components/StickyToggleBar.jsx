export default function StickyToggleBar({
  // Visibility states
  showTOC,
  showHandbook,
  showEditor,
  showConsole,
  // Toggle handlers
  onToggleTOC,
  onToggleHandbook,
  onToggleEditor,
  onToggleConsole,
  // Labels
  tocOnLabel = "Hide Table of Contents",
  tocOffLabel = "Show Table of Contents",
  handbookOnLabel = "Hide handbook",
  handbookOffLabel = "Show handbook",
  editorOnLabel = "Hide editor",
  editorOffLabel = "Show editor",
  consoleOnLabel = "Hide console",
  consoleOffLabel = "Show console",
}) {
  const toggleBtnClass = (isOn) =>
    `inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm transition-colors
     focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/70
     ${isOn
       ? "bg-brand-600 text-white border-brand-600 hover:bg-brand-500"
       : "bg-slate-900/60 text-slate-200 border-slate-700 hover:bg-slate-800"}`;

  return (
    <div className="sticky top-0 z-30 -mx-1 rounded-md bg-slate-900/70 backdrop-blur supports-[backdrop-filter]:bg-slate-900/50 border border-slate-700 px-2 py-2">
      <div className="flex items-center justify-between px-4 gap-2 text-xs sm:text-sm">
        <div>
          <button
            className={toggleBtnClass(showTOC)}
            aria-pressed={showTOC}
            onClick={onToggleTOC}
          >
            {showTOC ? tocOnLabel : tocOffLabel}
          </button>
        </div>
        <div>
          <button
            className={toggleBtnClass(showHandbook)}
            aria-pressed={showHandbook}
            onClick={onToggleHandbook}
          >
            {showHandbook ? handbookOnLabel : handbookOffLabel}
          </button>
        </div>
        <div className="flex gap-2">
          <button
            className={toggleBtnClass(showEditor)}
            aria-pressed={showEditor}
            onClick={onToggleEditor}
          >
            {showEditor ? editorOnLabel : editorOffLabel}
          </button>
          <button
            className={toggleBtnClass(showConsole)}
            aria-pressed={showConsole}
            onClick={onToggleConsole}
          >
            {showConsole ? consoleOnLabel : consoleOffLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
