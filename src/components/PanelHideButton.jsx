import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function PanelHideButton({ label, onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`hidden items-center gap-2 rounded-md border border-slate-600/60 bg-slate-950/35 px-2.5 py-1.5 text-xs font-medium text-slate-200 opacity-45 shadow-lg shadow-slate-950/20 backdrop-blur transition hover:border-slate-400/80 hover:bg-slate-900 hover:opacity-100 focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/70 lg:inline-flex ${className}`}
      aria-label={label}
      title={label}
    >
      <FontAwesomeIcon icon={faEyeSlash} className="h-3.5 w-3.5" />
      <span>{label.replace(/^Hide\s+/i, "")}</span>
    </button>
  );
}
