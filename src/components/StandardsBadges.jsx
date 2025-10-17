import { useId, useState } from "react";
import standards from "../data/standards";

const sizeStyles = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

export default function StandardsBadges({
  standards: standardIds = [],
  size = "md",
  className = "",
}) {
  const [activeId, setActiveId] = useState(null);
  const baseId = useId();

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {standardIds.map((id) => {
        const meta = standards[id];
        if (!meta) return null;

        const tooltipId = `${baseId}-${id}`;
        const isVisible = activeId === id;

        return (
          <div
            key={id}
            className="relative"
            onMouseEnter={() => setActiveId(id)}
            onMouseLeave={() => setActiveId(null)}
          >
            <a
              href={`/handbook/${id}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1 rounded-full border border-brand-400/40 bg-brand-500/10 px-3 py-1 font-medium text-brand-200 transition-colors hover:bg-brand-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400 ${
                sizeStyles[size] ?? sizeStyles.md
              }`}
              onFocus={() => setActiveId(id)}
              onBlur={() => setActiveId(null)}
              aria-describedby={isVisible ? tooltipId : undefined}
            >
              <span>{meta.id}</span>
            </a>
            {isVisible ? (
              <div
                id={tooltipId}
                role="tooltip"
                className="absolute left-1/2 top-full z-10 mt-2 w-56 -translate-x-1/2 rounded-lg border border-slate-700 bg-slate-900/95 p-3 text-xs text-slate-200 shadow-lg"
              >
                <p className="font-semibold text-brand-200">{meta.title}</p>
                <p className="mt-1 text-slate-300">{meta.short}</p>
                <p className="mt-2 text-[10px] uppercase tracking-wider text-slate-500">
                  Opens handbook in new tab
                </p>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
