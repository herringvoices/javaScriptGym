import { useEffect } from "react";
import { createPortal } from "react-dom";

const modalRoot = typeof document !== "undefined" ? document.body : null;

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !modalRoot) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm"
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose?.();
        }
      }}
    >
      <div className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full border border-transparent bg-slate-800/80 px-3 py-1 text-sm text-slate-200 transition-colors hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
        >
          Close
        </button>
        <div className="max-h-[90vh] overflow-y-auto p-8">
          {title ? (
            <h2 id="modal-title" className="text-2xl font-semibold text-white">
              {title}
            </h2>
          ) : null}
          <div className="mt-4 space-y-4 text-slate-200">{children}</div>
        </div>
      </div>
    </div>,
    modalRoot
  );
}
