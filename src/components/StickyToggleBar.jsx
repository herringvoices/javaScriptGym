import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faCircleInfo, faCode, faMap, faTerminal } from "@fortawesome/free-solid-svg-icons";

const railItems = [
  {
    key: "toc",
    icon: faMap,
    colorClass: "bg-cyan-300",
    buttonClass: "border-cyan-300/45 text-cyan-50 hover:bg-cyan-300/15",
  },
  {
    key: "handbook",
    icon: faBookOpen,
    colorClass: "bg-fuchsia-400",
    buttonClass: "border-fuchsia-400/45 text-fuchsia-50 hover:bg-fuchsia-400/15",
  },
  {
    key: "editor",
    icon: faCode,
    colorClass: "bg-emerald-400",
    buttonClass: "border-emerald-400/35 text-emerald-100 hover:bg-emerald-400/15",
  },
  {
    key: "console",
    icon: faTerminal,
    colorClass: "bg-amber-400",
    buttonClass: "border-amber-400/35 text-amber-100 hover:bg-amber-400/15",
  },
];

export default function StickyToggleBar({
  showTOC,
  showHandbook,
  showEditor,
  showConsole,
  onToggleTOC,
  onToggleHandbook,
  onToggleEditor,
  onToggleConsole,
  tocOffLabel = "Show Table of Contents",
  handbookOffLabel = "Show handbook",
  editorOffLabel = "Show editor",
  consoleOffLabel = "Show console",
  tocShortLabel = "Contents",
  handbookShortLabel = "Handbook",
  editorShortLabel,
  consoleShortLabel,
  tocKind = "contents",
}) {
  const tocIcon = tocKind === "details" ? faCircleInfo : faMap;
  const hiddenItems = railItems
    .map((item) => {
      if (item.key === "toc" && !showTOC) {
        return { ...item, icon: tocIcon, label: tocOffLabel, shortLabel: tocShortLabel, onClick: onToggleTOC };
      }
      if (item.key === "handbook" && !showHandbook) {
        return { ...item, label: handbookOffLabel, shortLabel: handbookShortLabel, onClick: onToggleHandbook };
      }
      if (item.key === "editor" && !showEditor) {
        return { ...item, label: editorOffLabel, shortLabel: editorShortLabel, onClick: onToggleEditor };
      }
      if (item.key === "console" && !showConsole) {
        return { ...item, label: consoleOffLabel, shortLabel: consoleShortLabel, onClick: onToggleConsole };
      }
      return null;
    })
    .filter(Boolean);

  if (!hiddenItems.length) return null;

  return (
    <aside
      className="js-visibility-rail group fixed left-0 top-28 z-40 hidden items-stretch lg:flex"
      aria-label="Hidden panels"
    >
      <div className="flex w-1.5 flex-col overflow-hidden rounded-r bg-slate-800/70 shadow-lg shadow-slate-950/30 ring-1 ring-white/10 transition-all group-hover:w-2 group-focus-within:w-2">
        {hiddenItems.map((item) => (
          <span key={item.key} className={`min-h-8 flex-1 ${item.colorClass}`} aria-hidden="true" />
        ))}
      </div>

      <div className="pointer-events-none -translate-x-2 opacity-0 transition-all duration-150 group-hover:pointer-events-auto group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-x-0 group-focus-within:opacity-100">
        <div className="ml-2 flex flex-col gap-2 rounded-r-lg border border-slate-700 bg-slate-950/92 p-2 shadow-2xl shadow-slate-950/40 backdrop-blur">
          {hiddenItems.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={item.onClick}
              className={`flex h-9 min-w-9 items-center gap-2 rounded-md border px-2 text-sm transition-colors ${item.buttonClass}`}
              title={item.label}
              aria-label={item.label}
              data-toc-toggle={item.key === "toc" ? "" : undefined}
            >
              <FontAwesomeIcon icon={item.icon} className="h-4 w-4 shrink-0" />
              <span className="whitespace-nowrap pr-1">{item.shortLabel || item.label.replace(/^Show\s+/i, "")}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
