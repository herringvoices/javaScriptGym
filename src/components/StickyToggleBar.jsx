import { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getPanelMeta } from "./panelMetadata";

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
  const [ghostPanel, setGhostPanel] = useState(null);
  const [landingPanelKey, setLandingPanelKey] = useState(null);
  const [activeRestoreKey, setActiveRestoreKey] = useState(null);
  const tocMeta = getPanelMeta("toc", { tocKind });
  const panelItems = useMemo(
    () =>
      ([
        {
          ...tocMeta,
          label: tocOffLabel,
          shortLabel: tocShortLabel,
          onClick: onToggleTOC,
          hidden: !showTOC,
        },
        {
          ...getPanelMeta("handbook"),
          label: handbookOffLabel,
          shortLabel: handbookShortLabel,
          onClick: onToggleHandbook,
          hidden: !showHandbook,
        },
        {
          ...getPanelMeta("editor"),
          label: editorOffLabel,
          shortLabel: editorShortLabel,
          onClick: onToggleEditor,
          hidden: !showEditor,
        },
        {
          ...getPanelMeta("console"),
          label: consoleOffLabel,
          shortLabel: consoleShortLabel,
          onClick: onToggleConsole,
          hidden: !showConsole,
        },
      ]),
    [
      consoleOffLabel,
      consoleShortLabel,
      editorOffLabel,
      editorShortLabel,
      handbookOffLabel,
      handbookShortLabel,
      onToggleConsole,
      onToggleEditor,
      onToggleHandbook,
      onToggleTOC,
      showConsole,
      showEditor,
      showHandbook,
      showTOC,
      tocMeta,
      tocOffLabel,
      tocShortLabel,
    ]
  );
  const hiddenItems = useMemo(() => panelItems.filter((item) => item.hidden), [panelItems]);

  useEffect(() => {
    const handlePreview = (event) => {
      if (!event.detail) {
        setGhostPanel(null);
        return;
      }
      const meta = getPanelMeta(event.detail.panelKey);
      setGhostPanel({
        ...meta,
        label: `Hide ${event.detail.title || meta.key}`,
        shortLabel: event.detail.title || event.detail.eyebrow || meta.key,
      });
    };

    window.addEventListener("desktop-panel-rail-preview", handlePreview);
    return () => window.removeEventListener("desktop-panel-rail-preview", handlePreview);
  }, []);

  useEffect(() => {
    let timeoutId;
    const handleLanding = (event) => {
      const panelKey = event.detail?.panelKey;
      if (!panelKey) return;
      setLandingPanelKey(panelKey);
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => setLandingPanelKey(null), 900);
    };

    window.addEventListener("desktop-panel-rail-land", handleLanding);
    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("desktop-panel-rail-land", handleLanding);
    };
  }, []);

  const ghostIsAlreadyHidden = ghostPanel
    ? hiddenItems.some((item) => item.key === ghostPanel.key)
    : false;
  const railItems = useMemo(() => {
    if (!ghostPanel || ghostIsAlreadyHidden) return hiddenItems;

    return panelItems
      .map((item) => {
        if (item.hidden) return item;
        if (item.key === ghostPanel.key) {
          return {
            ...item,
            ...ghostPanel,
            ghost: true,
            label: `Hide ${ghostPanel.shortLabel || item.shortLabel || item.label}`,
            shortLabel: ghostPanel.shortLabel || item.shortLabel,
          };
        }
        return null;
      })
      .filter(Boolean);
  }, [ghostIsAlreadyHidden, ghostPanel, hiddenItems, panelItems]);

  if (!railItems.length) return null;

  const handleRestore = (item) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("desktop-panel-rail-preview", { detail: null }));
      window.dispatchEvent(new CustomEvent("desktop-panel-restore-preview", { detail: null }));
    }
    item.onClick();
  };

  const activateRestorePreview = (item) => {
    setActiveRestoreKey(item.key);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("desktop-panel-restore-preview", {
          detail: { panelKey: item.key },
        })
      );
    }
  };

  const clearRestorePreview = (item) => {
    setActiveRestoreKey((key) => (key === item.key ? null : key));
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("desktop-panel-restore-preview", { detail: null }));
    }
  };

  return (
    <aside
      className={`js-visibility-rail group fixed left-0 top-28 z-40 hidden items-stretch lg:flex ${ghostPanel ? "js-visibility-rail--previewing" : ""}`}
      aria-label="Hidden panels"
    >
      <div className="flex w-1.5 flex-col overflow-hidden rounded-r bg-slate-800/70 shadow-lg shadow-slate-950/30 ring-1 ring-white/10 transition-all group-hover:w-2 group-focus-within:w-2">
        {railItems.map((item) => (
          <span
            key={`${item.key}-${item.ghost ? "ghost" : "real"}`}
            className={`desktop-rail-spine min-h-8 flex-1 ${item.colorClass} ${item.ghost ? "desktop-rail-ghost-spine" : ""} ${landingPanelKey === item.key ? "desktop-rail-spine--landing" : ""} ${activeRestoreKey === item.key ? "desktop-rail-spine--active" : ""}`}
            style={{ "--rail-item-rgb": item.rgb }}
            aria-hidden="true"
          />
        ))}
      </div>

      <div className={`pointer-events-none -translate-x-2 opacity-0 transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100 ${ghostPanel ? "translate-x-0 opacity-100" : ""}`}>
        <div className="ml-2 flex flex-col gap-2 rounded-r-lg border border-slate-700 bg-slate-950/92 p-2 shadow-2xl shadow-slate-950/40 backdrop-blur">
          {railItems.map((item) => (
            item.ghost ? (
              <div
                key={`${item.key}-ghost`}
                className={`desktop-rail-ghost flex h-9 min-w-9 items-center gap-2 rounded-md border px-2 text-sm ${item.buttonClass}`}
                aria-hidden="true"
              >
                <FontAwesomeIcon icon={item.icon} className="h-4 w-4 shrink-0" />
                <span className="whitespace-nowrap pr-1">{item.shortLabel || item.label.replace(/^Hide\s+/i, "")}</span>
              </div>
            ) : (
              <button
                key={item.key}
                type="button"
                onClick={() => handleRestore(item)}
                onPointerDown={(event) => event.stopPropagation()}
                onMouseEnter={() => activateRestorePreview(item)}
                onMouseOver={() => activateRestorePreview(item)}
                onMouseMove={() => activateRestorePreview(item)}
                onMouseLeave={() => clearRestorePreview(item)}
                onPointerEnter={() => activateRestorePreview(item)}
                onPointerMove={() => activateRestorePreview(item)}
                onPointerLeave={() => clearRestorePreview(item)}
                onFocus={() => activateRestorePreview(item)}
                onBlur={() => clearRestorePreview(item)}
                className={`desktop-rail-item pointer-events-auto flex h-9 min-w-9 items-center gap-2 rounded-md border px-2 text-sm transition-colors ${item.buttonClass} ${landingPanelKey === item.key ? "desktop-rail-item--landing" : ""}`}
                style={{ "--rail-item-rgb": item.rgb }}
                title={item.label}
                aria-label={item.label}
                data-toc-toggle
              >
                <FontAwesomeIcon icon={item.icon} className="h-4 w-4 shrink-0" />
                <span className="whitespace-nowrap pr-1">{item.shortLabel || item.label.replace(/^Show\s+/i, "")}</span>
              </button>
            )
          ))}
        </div>
      </div>
    </aside>
  );
}
