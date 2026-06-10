import { useMemo } from "react";
import { getPanelMeta } from "./panelMetadata";

export default function DesktopRestorePreview({ panelKey, tocKind }) {
  const meta = useMemo(() => getPanelMeta(panelKey, { tocKind }), [panelKey, tocKind]);

  return (
    <div
      className="desktop-restore-preview-slot self-start"
      style={{ "--restore-preview-rgb": meta.rgb }}
      aria-hidden="true"
    />
  );
}
