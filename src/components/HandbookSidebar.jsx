import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import standards, { standardOrder } from "../data/standards";
import { handbookStructure } from "../handbook/manifest";

export default function HandbookSidebar({ currentStandardId, currentChapterId }) {
  // Helper: derive parent standard group id (e.g., "JS.VDT" from "JS.VDT.PRM")
  function getGroupId(id) {
    if (!id || typeof id !== "string") return null;
    const parts = id.split(".");
    if (parts.length < 3) return null; // e.g., "overview" or already a group id
    return parts.slice(0, 2).join(".");
  }

  // Helper: derive group title and substandard title from meta.title using the " · " separator
  function splitTitle(title) {
    if (!title) return { groupTitle: null, subTitle: null };
    const sep = " · ";
    if (title.includes(sep)) {
      const [groupTitle, subTitle] = title.split(sep);
      return { groupTitle, subTitle };
    }
    return { groupTitle: null, subTitle: title };
  }

  // Build grouped structure: standard group -> substandard -> chapters
  const { groups, ungrouped } = useMemo(() => {
    const groupMap = new Map();
    const ungroupedItems = [];

    for (const id of standardOrder) {
      const meta = standards[id];
      if (!meta) continue;
      const node = handbookStructure[meta.id];
      const hasChapters = Boolean(node?.chapters?.length);
      const chapters = node?.chapters || [];

      const parentId = getGroupId(meta.id);
      if (!parentId) {
        // e.g., "overview" – keep as a single top-level item
        ungroupedItems.push({
          id: meta.id,
          title: meta.title,
          short: meta.short,
          hasChapters,
          chapters,
        });
        continue;
      }

      // Determine group title from any sibling's title
      const { groupTitle, subTitle } = splitTitle(meta.title);
      const groupTitleFinal = groupTitle || parentId;

      if (!groupMap.has(parentId)) {
        groupMap.set(parentId, {
          id: parentId,
          title: groupTitleFinal,
          substandards: [],
        });
      }

      groupMap.get(parentId).substandards.push({
        id: meta.id,
        title: subTitle || meta.title,
        short: meta.short,
        hasChapters,
        chapters,
      });
    }

    // Preserve the order based on first appearance in standardOrder
    const orderedGroupIds = [];
    for (const id of standardOrder) {
      const parentId = getGroupId(id);
      if (parentId && !orderedGroupIds.includes(parentId)) orderedGroupIds.push(parentId);
    }
    const groups = orderedGroupIds.map((gid) => groupMap.get(gid)).filter(Boolean);
    return { groups, ungrouped: ungroupedItems };
  }, []);

  // Open state: track both groups (g:ID) and substandards (s:ID)
  const defaultOpen = () => {
    const set = new Set();
    const grp = getGroupId(currentStandardId);
    if (grp) set.add(`g:${grp}`);
    if (currentStandardId) set.add(`s:${currentStandardId}`);
    return set;
  };
  // NOTE: useState was previously passed the function reference (defaultOpen) instead of its result.
  // Calling defaultOpen() ensures initial expansion reflects current route context.
  const [open, setOpen] = useState(defaultOpen());
  const navigate = useNavigate();

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
          {/* Ungrouped items (e.g., Overview) */}
          {ungrouped.map((item) => {
            const isActive = item.id === currentStandardId;
            const expanded = open.has(`s:${item.id}`);
            return (
              <li key={item.id} className="rounded-md">
                <div className={`flex items-center justify-between ${isActive ? "bg-brand-500 text-white" : "text-slate-200 hover:bg-slate-800 hover:text-white"} rounded-md px-3 py-2`}>
                  <Link
                    to={`/handbook/${item.id}`}
                    className="min-w-0 flex-1"
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => {
                      if (item.hasChapters) setOpen((prev) => new Set(prev).add(`s:${item.id}`));
                    }}
                  >
                    <span className="block truncate font-medium">{item.title}</span>
                    {item.short ? <span className="block truncate text-xs opacity-80">{item.short}</span> : null}
                  </Link>
                  {item.hasChapters ? (
                    <button
                      type="button"
                      aria-expanded={expanded}
                      aria-controls={`chapters-${item.id}`}
                      className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded text-xs text-slate-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
                      onClick={() => toggle(`s:${item.id}`)}
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
                      const isActiveChapter = isActive && currentChapterId === ch.id;
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

          {/* Grouped items: Standard -> Substandard -> Chapter */}
          {groups.map((group) => {
            const groupKey = `g:${group.id}`;
            const groupExpanded = open.has(groupKey);
            const isGroupActive = group.substandards.some((s) => s.id === currentStandardId);
            return (
              <li key={group.id} className="rounded-md">
                <div
                  className={`flex cursor-pointer items-center justify-between ${isGroupActive ? "bg-slate-800 text-white" : "text-slate-200 hover:bg-slate-800 hover:text-white"} rounded-md px-3 py-2`}
                  role="link"
                  tabIndex={0}
                  onClick={() => {
                    // Navigate to first substandard and expand group (and that substandard if it has chapters)
                    const first = group.substandards[0];
                    if (first) {
                      setOpen((prev) => {
                        const next = new Set(prev);
                        next.add(groupKey);
                        next.add(`s:${first.id}`);
                        return next;
                      });
                      navigate(`/handbook/${first.id}`);
                    } else {
                      // Fallback: just toggle group if no substandards
                      toggle(groupKey);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      const first = group.substandards[0];
                      if (first) {
                        setOpen((prev) => {
                          const next = new Set(prev);
                          next.add(groupKey);
                          next.add(`s:${first.id}`);
                          return next;
                        });
                        navigate(`/handbook/${first.id}`);
                      } else {
                        toggle(groupKey);
                      }
                    }
                  }}
                >
                  <div className="min-w-0 flex-1" aria-label={`${group.title} group`}>
                    <span className="block truncate font-semibold">{group.title}</span>
                  </div>
                  <button
                    type="button"
                    aria-expanded={groupExpanded}
                    aria-controls={`group-${group.id}`}
                    className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded text-xs text-slate-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggle(groupKey);
                    }}
                    title={groupExpanded ? "Collapse" : "Expand"}
                  >
                    <FontAwesomeIcon icon={groupExpanded ? faChevronDown : faChevronRight} className="text-sm" />
                    <span className="sr-only">{groupExpanded ? "Collapse" : "Expand"} {group.title}</span>
                  </button>
                </div>

                {groupExpanded ? (
                  <ul id={`group-${group.id}`} className="mt-1 space-y-1 pl-3">
                    {group.substandards.map((sub) => {
                      const isActiveSub = sub.id === currentStandardId;
                      const subKey = `s:${sub.id}`;
                      const subExpanded = open.has(subKey);
                      return (
                        <li key={sub.id}>
                          <div className={`flex items-center justify-between ${isActiveSub ? "bg-brand-500 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"} rounded-md px-3 py-1.5`}>
                            <Link
                              to={`/handbook/${sub.id}`}
                              className="min-w-0 flex-1 text-sm"
                              aria-current={isActiveSub ? "page" : undefined}
                              onClick={() => {
                                if (sub.hasChapters) setOpen((prev) => new Set(prev).add(subKey));
                              }}
                            >
                              <span className="block truncate font-medium">{sub.title}</span>
                              {sub.short ? <span className="block truncate text-xs opacity-80">{sub.short}</span> : null}
                            </Link>
                            {sub.hasChapters ? (
                              <button
                                type="button"
                                aria-expanded={subExpanded}
                                aria-controls={`chapters-${sub.id}`}
                                className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded text-xs text-slate-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
                                onClick={() => toggle(subKey)}
                                title={subExpanded ? "Collapse" : "Expand"}
                              >
                                <FontAwesomeIcon icon={subExpanded ? faChevronDown : faChevronRight} className="text-sm" />
                                <span className="sr-only">{subExpanded ? "Collapse" : "Expand"} {sub.title}</span>
                              </button>
                            ) : null}
                          </div>

                          {sub.hasChapters && subExpanded ? (
                            <ul id={`chapters-${sub.id}`} className="mt-1 space-y-1 pl-3">
                              {sub.chapters.map((ch, idx) => {
                                const isActiveChapter = isActiveSub && currentChapterId === ch.id;
                                return (
                                  <li key={ch.id}>
                                    <Link
                                      to={`/handbook/${sub.id}/${ch.id}`}
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
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
