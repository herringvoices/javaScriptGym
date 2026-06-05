import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function MobileAccordion({
  title,
  eyebrow,
  defaultOpen = false,
  children,
  className = "",
  contentClassName = "",
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className={`lg:hidden rounded-lg border border-slate-800 bg-slate-950/80 ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
        aria-expanded={open}
      >
        <span className="min-w-0">
          {eyebrow ? (
            <span className="block text-xs font-semibold uppercase tracking-widest text-brand-300">
              {eyebrow}
            </span>
          ) : null}
          <span className="block truncate text-base font-semibold text-white">{title}</span>
        </span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`h-4 w-4 shrink-0 text-slate-300 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      {open ? (
        <div className={`border-t border-slate-800 px-4 py-4 ${contentClassName}`}>
          {children}
        </div>
      ) : null}
    </section>
  );
}
