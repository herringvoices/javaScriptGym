import { forwardRef, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { getPanelMeta } from "./panelMetadata";

const DesktopPanel = forwardRef(function DesktopPanel({
  panelKey,
  tocKind,
  eyebrow,
  title,
  onHide,
  actions = null,
  children,
  as: Element = "section",
  variant = "framed",
  className = "",
  bodyClassName = "",
}, ref) {
  const meta = useMemo(() => getPanelMeta(panelKey, { tocKind }), [panelKey, tocKind]);

  const signalRailPreview = (active) => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(
      new CustomEvent("desktop-panel-rail-preview", {
        detail: active ? { panelKey: meta.key, title, eyebrow } : null,
      })
    );
  };

  const handleHide = () => {
    if (!onHide) return;
    signalRailPreview(false);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("desktop-panel-rail-land", {
          detail: { panelKey: meta.key },
        })
      );
    }
    onHide();
  };

  const rootClassName =
    variant === "framed"
      ? "desktop-panel flex h-screen min-h-[480px] flex-col self-start overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 animate-fade-in lg:sticky lg:top-0"
      : "desktop-panel self-start animate-fade-in";
  const bodyClass =
    variant === "framed"
      ? `desktop-panel-body relative min-h-0 grow ${bodyClassName}`
      : `desktop-panel-body ${bodyClassName}`;
  const headerTopClass = "top-0";

  return (
    <Element
      ref={ref}
      className={`${rootClassName} ${className}`}
      style={{ "--panel-rgb": meta.rgb, "--panel-color": meta.hex }}
      data-panel-key={meta.key}
    >
      <div
        className={`desktop-panel-header not-prose sticky ${headerTopClass} z-20 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-slate-950/95 px-4 py-3 backdrop-blur ${meta.borderClass}`}
      >
        <div className="min-w-0">
          {eyebrow ? (
            <p className={`text-xs font-semibold uppercase tracking-widest ${meta.textClass}`}>
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-0 truncate text-sm font-semibold text-white">{title}</h2>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2">
          {actions}
          {onHide ? (
            <button
              type="button"
              onClick={handleHide}
              onMouseEnter={() => {
                signalRailPreview(true);
              }}
              onMouseLeave={() => {
                signalRailPreview(false);
              }}
              onPointerEnter={() => {
                signalRailPreview(true);
              }}
              onPointerLeave={() => {
                signalRailPreview(false);
              }}
              onFocus={() => {
                signalRailPreview(true);
              }}
              onBlur={() => {
                signalRailPreview(false);
              }}
              className={`desktop-panel-hide-button inline-flex items-center gap-2 rounded-md border bg-slate-950/35 px-2.5 py-1.5 text-xs font-medium text-slate-200 shadow-lg shadow-slate-950/20 backdrop-blur transition hover:bg-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/70 ${meta.borderClass}`}
              aria-label={`Hide ${title}`}
              title={`Hide ${title}`}
            >
              <FontAwesomeIcon icon={faEyeSlash} className="h-3.5 w-3.5" />
              <span>Hide</span>
            </button>
          ) : null}
        </div>
      </div>
      <div className={bodyClass}>{children}</div>
    </Element>
  );
});

export default DesktopPanel;
