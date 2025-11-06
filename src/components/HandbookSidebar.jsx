import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import standards, { standardOrder } from "../data/standards";
import { handbookStructure } from "../handbook/manifest";

export default function HandbookSidebar({ currentStandardId, currentChapterId }) {
  const items = useMemo(() => {
    return standardOrder
      .map((id) => standards[id])
      .filter(Boolean)
      .map((meta) => {
        const node = handbookStructure[meta.id];
        return {
          id: meta.id,
          title: meta.title,
          short: meta.short,
          hasChapters: Boolean(node?.chapters?.length),
          chapters: node?.chapters || [],
        };
      });
  }, []);

  const [open, setOpen] = useState(() => new Set([currentStandardId]));

  function toggle(id) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <nav className="space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-300">Standards</p>
        <ul className="mt-3 space-y-1">
          {items.map((item) => {
            const isActiveStandard = item.id === currentStandardId;
            const expanded = open.has(item.id);
            return (
              <li key={item.id} className="rounded-md">
                <div className={`flex items-center justify-between ${isActiveStandard ? "bg-brand-500 text-white" : "text-slate-200 hover:bg-slate-800 hover:text-white"} rounded-md px-3 py-2`}>
                  <Link
                    to={`/handbook/${item.id}`}
                    className="min-w-0 flex-1"
                    aria-current={isActiveStandard ? "page" : undefined}
                    onClick={() => {
                      // Ensure the active standard opens on click
                      if (item.hasChapters) {
                        setOpen((prev) => new Set(prev).add(item.id));
                      }
                    }}
                  >
                    <span className="block truncate font-medium">{item.title}</span>
                    <span className="block truncate text-xs opacity-80">{item.short}</span>
                  </Link>
                  {item.hasChapters ? (
                    <button
                      type="button"
                      aria-expanded={expanded}
                      aria-controls={`chapters-${item.id}`}
                      className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded text-xs text-slate-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
                      onClick={() => toggle(item.id)}
                      title={expanded ? "Collapse" : "Expand"}
                    >
                      <FontAwesomeIcon icon={expanded ? faChevronDown : faChevronRight} className="text-sm" />
                      <span className="sr-only">{expanded ? "Collapse" : "Expand"} {item.title}</span>
                    </button>
                  ) : null}
                </div>

                {item.hasChapters && expanded ? (
                  <ul id={`chapters-${item.id}`} className="mt-1 space-y-1 pl-3">
                    {item.chapters.map((ch, idx) => {
                      const isActiveChapter = isActiveStandard && currentChapterId === ch.id;
                      return (
                        <li key={ch.id}>
                          <Link
                            to={`/handbook/${item.id}/${ch.id}`}
                            className={`block rounded-md px-3 py-1.5 text-sm ${isActiveChapter ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`}
                          >
                            <span className="mr-2 text-xs opacity-70">{idx + 1}</span>
                            {ch.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
