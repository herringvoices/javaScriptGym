import { faBookOpen, faCircleInfo, faCode, faMap, faTerminal } from "@fortawesome/free-solid-svg-icons";

export const panelMeta = {
  toc: {
    key: "toc",
    icon: faMap,
    colorClass: "bg-cyan-300",
    buttonClass: "border-cyan-300/45 text-cyan-50 hover:bg-cyan-300/15",
    textClass: "text-cyan-200",
    borderClass: "border-cyan-300/45",
    rgb: "103, 232, 249",
    hex: "#67e8f9",
  },
  details: {
    key: "details",
    icon: faCircleInfo,
    colorClass: "bg-cyan-300",
    buttonClass: "border-cyan-300/45 text-cyan-50 hover:bg-cyan-300/15",
    textClass: "text-cyan-200",
    borderClass: "border-cyan-300/45",
    rgb: "103, 232, 249",
    hex: "#67e8f9",
  },
  handbook: {
    key: "handbook",
    icon: faBookOpen,
    colorClass: "bg-fuchsia-400",
    buttonClass: "border-fuchsia-400/45 text-fuchsia-50 hover:bg-fuchsia-400/15",
    textClass: "text-fuchsia-200",
    borderClass: "border-fuchsia-400/45",
    rgb: "232, 121, 249",
    hex: "#e879f9",
  },
  editor: {
    key: "editor",
    icon: faCode,
    colorClass: "bg-emerald-400",
    buttonClass: "border-emerald-400/35 text-emerald-100 hover:bg-emerald-400/15",
    textClass: "text-emerald-200",
    borderClass: "border-emerald-400/35",
    rgb: "52, 211, 153",
    hex: "#34d399",
  },
  console: {
    key: "console",
    icon: faTerminal,
    colorClass: "bg-amber-400",
    buttonClass: "border-amber-400/35 text-amber-100 hover:bg-amber-400/15",
    textClass: "text-amber-200",
    borderClass: "border-amber-400/35",
    rgb: "251, 191, 36",
    hex: "#fbbf24",
  },
};

export function getPanelMeta(panelKey, options = {}) {
  if (panelKey === "toc" && options.tocKind === "details") {
    return panelMeta.details;
  }
  return panelMeta[panelKey] || panelMeta.toc;
}
