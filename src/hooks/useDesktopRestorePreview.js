import { useEffect, useState } from "react";

export default function useDesktopRestorePreview() {
  const [previewKey, setPreviewKey] = useState(null);

  useEffect(() => {
    const handlePreview = (event) => {
      setPreviewKey(event.detail?.panelKey || null);
    };

    window.addEventListener("desktop-panel-restore-preview", handlePreview);
    return () => window.removeEventListener("desktop-panel-restore-preview", handlePreview);
  }, []);

  return previewKey;
}
