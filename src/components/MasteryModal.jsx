import { useEffect, useMemo, useState } from "react";
import Modal from "./Modal";
import { loadMastered, saveMastered } from "../lib/mastery";
import standards, { standardOrder } from "../data/standards";

export default function MasteryModal({ open, onClose }) {
  const [mastered, setMastered] = useState(() => loadMastered());

  // keep in sync when reopened
  useEffect(() => {
    if (open) setMastered(loadMastered());
  }, [open]);

  const list = useMemo(() => standardOrder.filter((id) => id !== "overview"), []);

  const toggle = (id) => {
    setMastered((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      saveMastered(next);
      return next;
    });
  };

  return (
    <Modal isOpen={open} onClose={onClose} title="Standards I Know">
      <p className="text-sm text-slate-300">
        Check the standards you&apos;ve already mastered. This gates which challenges appear unlocked.
      </p>
      <div className="mt-2 grid grid-cols-1 gap-2">
        {list.map((id) => {
          const meta = standards[id];
          const label = meta?.title || id;
          return (
            <label key={id} className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/70 p-3 hover:border-brand-500/40">
              <input
                type="checkbox"
                className="h-4 w-4 accent-brand-500"
                checked={mastered.has(id)}
                onChange={() => toggle(id)}
              />
              <span className="text-sm text-slate-200">{label}</span>
            </label>
          );
        })}
      </div>
      <div className="flex justify-end pt-4">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-brand-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-200"
        >
          Done
        </button>
      </div>
    </Modal>
  );
}
