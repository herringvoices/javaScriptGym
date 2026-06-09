import { useLayoutEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function MobileAccordion({
  title,
  eyebrow,
  defaultOpen = false,
  stickyHeader = false,
  rememberScroll = true,
  children,
  className = "",
  contentClassName = "",
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [hasOpened, setHasOpened] = useState(defaultOpen);
  const sectionRef = useRef(null);
  const savedScrollOffsetRef = useRef(0);
  const restoreOnOpenRef = useRef(false);
  const headerClassName = [
    "flex w-full items-center justify-between gap-3 px-4 py-3 text-left",
    stickyHeader ? "sticky top-0 z-30 rounded-t-lg bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:bg-slate-950/85" : "",
  ]
    .filter(Boolean)
    .join(" ");
  const handleToggle = () => {
    if (open) {
      if (rememberScroll && sectionRef.current && typeof window !== "undefined") {
        savedScrollOffsetRef.current = Math.max(0, window.scrollY - sectionRef.current.offsetTop);
      }
    } else {
      setHasOpened(true);
      restoreOnOpenRef.current = rememberScroll;
    }
    setOpen((value) => !value);
  };

  useLayoutEffect(() => {
    if (!open || !restoreOnOpenRef.current || !sectionRef.current || typeof window === "undefined") {
      return undefined;
    }

    let firstFrame = 0;
    let secondFrame = 0;
    restoreOnOpenRef.current = false;

    firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        const sectionTop = sectionRef.current?.offsetTop ?? 0;
        window.scrollTo({
          top: sectionTop + savedScrollOffsetRef.current,
          behavior: "auto",
        });
      });
    });

    return () => {
      if (firstFrame) window.cancelAnimationFrame(firstFrame);
      if (secondFrame) window.cancelAnimationFrame(secondFrame);
    };
  }, [open]);

  return (
    <section
      ref={sectionRef}
      className={`lg:hidden rounded-lg border border-slate-800 bg-slate-950/80 ${className}`}
    >
      <button
        type="button"
        onClick={handleToggle}
        className={headerClassName}
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
      {hasOpened ? (
        <div
          className={`border-t border-slate-800 px-4 py-4 ${contentClassName}`}
          hidden={!open}
        >
          {children}
        </div>
      ) : null}
    </section>
  );
}
