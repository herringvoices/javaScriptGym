import { useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getPanelMeta } from "./panelMetadata";

export default function DesktopRestorePreview({
  panelKey,
  tocKind,
  label,
  onRestore,
  expandDirection = "right",
  items,
}) {
  const meta = useMemo(() => getPanelMeta(panelKey, { tocKind }), [panelKey, tocKind]);
  const restoreLabel = label || `Show ${meta.key}`;
  const restoreItems = useMemo(
    () =>
      items?.length
        ? items
        : [
            {
              key: panelKey,
              panelKey,
              tocKind,
              label: restoreLabel,
              onRestore,
            },
          ],
    [items, label, onRestore, panelKey, restoreLabel, tocKind]
  );
  const [hoverY, setHoverY] = useState(null);
  const menuRef = useRef(null);

  const showButton = hoverY !== null;
  const buttonStyle = showButton
      ? {
        "--restore-button-y": `${hoverY}px`,
        "--restore-tab-width": `${restoreItems.length * 10.5 + 1.5}rem`,
      }
    : {
        "--restore-tab-width": `${restoreItems.length * 10.5 + 1.5}rem`,
      };

  const captureHoverY = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const minY = 20;
    const maxY = Math.max(minY, rect.height - 56);
    setHoverY((value) => value ?? Math.min(Math.max(event.clientY - rect.top, minY), maxY));
  };
  const hideWhenOutsideMenuBounds = (event) => {
    if (hoverY === null || !menuRef.current) return;
    const rect = menuRef.current.getBoundingClientRect();
    const outsideVerticalBounds = event.clientY < rect.top || event.clientY > rect.bottom;
    const outsideFarHorizontalEdge =
      expandDirection === "left" ? event.clientX < rect.left : event.clientX > rect.right;

    if (outsideVerticalBounds || outsideFarHorizontalEdge) {
      setHoverY(null);
    }
  };

  return (
    <div
      className="desktop-restore-preview-slot self-start"
      style={{ "--restore-preview-rgb": meta.rgb }}
      data-expand-direction={expandDirection}
      data-visible={showButton ? "true" : "false"}
      onPointerEnter={captureHoverY}
      onPointerMove={hideWhenOutsideMenuBounds}
      onPointerLeave={() => setHoverY(null)}
      onFocus={() => setHoverY((value) => value ?? 20)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHoverY(null);
      }}
    >
      <div
        className="desktop-restore-tab group"
        data-toc-toggle
        style={buttonStyle}
      >
        <span ref={menuRef} className="desktop-restore-tab-content">
          {restoreItems.map((item) => {
            const itemMeta = getPanelMeta(item.panelKey, { tocKind: item.tocKind });
            const itemLabel = item.label || `Show ${itemMeta.key}`;

            return (
              <button
                key={item.key}
                type="button"
                className="desktop-restore-menu-button"
                onClick={item.onRestore}
                aria-label={itemLabel}
                title={itemLabel}
                data-toc-toggle
                style={{ "--restore-item-rgb": itemMeta.rgb }}
              >
                <FontAwesomeIcon icon={itemMeta.icon} className="h-4 w-4 shrink-0" />
                <span className="whitespace-nowrap">{itemLabel}</span>
              </button>
            );
          })}
        </span>
      </div>
    </div>
  );
}
