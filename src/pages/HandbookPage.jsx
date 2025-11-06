import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { Link, useParams } from "react-router-dom";
import standards, { standardOrder } from "../data/standards";
import { handbookChapters, loadHandbookEntry } from "../handbook/manifest";
import HandbookMDXProvider from "../handbook/MDXProvider";
import HandbookWorkbench from "../components/HandbookWorkbench";

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, "-");

export default function HandbookPage() {
  const { standardId } = useParams();

  const resolvedId = standards[standardId] ? standardId : standardOrder[0];
  const meta = standards[resolvedId];

  // Header toggles for TOC / handbook / editor
  const [showTOC, setShowTOC] = useState(true);
  const [showHandbook, setShowHandbook] = useState(true);
  const [showEditor, setShowEditor] = useState(true);

  // New-style entry loader (preferred)
  const [entry, setEntry] = useState(null);
  const [entryError, setEntryError] = useState(null);
  const [loadingEntry, setLoadingEntry] = useState(false);

  // Legacy MDX fallback
  const hasMdx = Boolean(handbookChapters[resolvedId]);
  const [mdxModule, setMdxModule] = useState(null);
  const [mdxError, setMdxError] = useState(null);
  const [loadingMdx, setLoadingMdx] = useState(false);

  // Load new-style entry if available
  useEffect(() => {
    let cancelled = false;
    setEntry(null);
    setEntryError(null);
    setLoadingEntry(true);
    loadHandbookEntry(resolvedId)
      .then((val) => {
        if (cancelled) return;
        setEntry(val);
      })
      .catch((err) => {
        if (cancelled) return;
        setEntry(null);
        setEntryError(err);
      })
      .finally(() => {
        if (!cancelled) setLoadingEntry(false);
      });
    return () => {
      cancelled = true;
    };
  }, [resolvedId]);

  // Load legacy MDX if present
  useEffect(() => {
    let cancelled = false;
    if (!hasMdx) {
      setMdxModule(null);
      setLoadingMdx(false);
      return;
    }
    setLoadingMdx(true);
    handbookChapters[resolvedId]()
      .then((mod) => {
        if (!cancelled) {
          setMdxModule(mod);
          setMdxError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setMdxError(err);
          setMdxModule(null);
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingMdx(false);
      });
    return () => {
      cancelled = true;
    };
  }, [resolvedId, hasMdx]);

  // Generate TOC from either MDX frontmatter/content (simplified: rely on legacy for now) or legacy bodyMd.
  const sections = useMemo(() => {
    const md = entry?.handbookMarkdown || (meta?.bodyMd ?? "");
    if (!md) return [];
    const matches = [...md.matchAll(/^###\s+(.*)$/gm)];
    return matches.map(([, heading]) => ({ heading, href: `#${slugify(heading)}` }));
  }, [entry?.handbookMarkdown, meta]);

  const standardNav = standardOrder
    .map((id) => standards[id])
    .filter(Boolean)
    .map((item) => ({
      id: item.id,
      title: item.title,
      short: item.short,
      isActive: item.id === resolvedId,
    }));

  // NEW: unified toggle button styles consistent with brand
  const toggleBtnClass = (isOn) =>
    `inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm transition-colors
     focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/70
     ${isOn
       ? "bg-brand-600 text-white border-brand-600 hover:bg-brand-500"
       : "bg-slate-900/60 text-slate-200 border-slate-700 hover:bg-slate-800"}`;

  if (!meta) {
    return (
      <article className="space-y-4">
        <h1 className="text-3xl font-semibold text-white">Standard not found</h1>
        <p className="text-slate-300">
          We couldn’t find that handbook entry. Pick another standard from the menu.
        </p>
      </article>
    );
  }

  return (
    // Full-bleed wrapper to span entire viewport width even inside AppLayout's max-w container
    <div className="w-screen ml-[calc(50%-50vw)] mr-[calc(50%-50vw)]">
      <div className="space-y-4 px-6 lg:px-8">
        {/* Header with toggles */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-brand-500/40 bg-brand-500/10 p-4 text-sm text-slate-200">
          <div>
            <p className="text-sm uppercase tracking-widest text-brand-300">JavaScript Handbook</p>
            <h1 className="mt-0 text-2xl font-semibold">{meta.title}</h1>
          </div>
          <div className="flex gap-2">
            <button
              className={toggleBtnClass(showTOC)}
              aria-pressed={showTOC}
              onClick={() => setShowTOC((v) => !v)}
            >
              {showTOC ? "Hide Table of Contents" : "Show Table of Contents"}
            </button>
            <button
              className={toggleBtnClass(showHandbook)}
              aria-pressed={showHandbook}
              onClick={() => setShowHandbook((v) => !v)}
            >
              {showHandbook ? "Hide handbook" : "Show handbook"}
            </button>
            <button
              className={toggleBtnClass(showEditor)}
              aria-pressed={showEditor}
              onClick={() => setShowEditor((v) => !v)}
            >
              {showEditor ? "Hide editor" : "Show editor"}
            </button>
          </div>
        </div>

        {/* Body with three columns: 1:2:2 when all three visible; 1:1 when two visible; 1 when one visible */}
        {(() => {
          const visibleCount = [showTOC, showHandbook, showEditor].filter(Boolean).length;
          const gridColsLg =
            visibleCount >= 3
              ? "lg:grid-cols-[1fr_2fr_2fr]"
              : visibleCount === 2
              ? "lg:grid-cols-2"
              : "lg:grid-cols-1";
          return (
            <div className={`grid gap-8 ${gridColsLg}`}>
              <aside className={showTOC ? "space-y-6" : "hidden"}>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-300">
                    Standards
                  </p>
                  <ul className="mt-3 space-y-1">
                    {standardNav.map((item) => (
                      <li key={item.id}>
                        <Link
                          to={`/handbook/${item.id}`}
                          className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                            item.isActive
                              ? "bg-brand-500 text-white shadow"
                              : "text-slate-200 hover:bg-slate-800 hover:text-white"
                          }`}
                          aria-current={item.isActive ? "page" : undefined}
                        >
                          <span className="block font-medium">{item.title}</span>
                          <span className="block text-xs text-slate-300">{item.short}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {sections.length > 0 ? (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-300">
                      On this page
                    </p>
                    <ul className="mt-3 space-y-1">
                      {sections.map((section) => (
                        <li key={section.href}>
                          <a
                            href={section.href}
                            className="block rounded-md px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                          >
                            {section.heading}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </aside>

              <article className={`prose prose-invert max-w-none ${showHandbook ? "block" : "hidden"}`}>
                {entry && entry.handbookMarkdown ? (
                  <ReactMarkdown
                    rehypePlugins={[rehypeSlug]}
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h2: (props) => <h2 {...props} className="text-2xl font-semibold" />,
                      h3: (props) => <h3 {...props} className="text-xl font-semibold" />,
                      code: (props) => (
                        <code
                          {...props}
                          className="rounded bg-slate-900 px-1.5 py-0.5 text-xs font-medium text-brand-200"
                        />
                      ),
                      pre: (props) => (
                        <pre {...props} className="overflow-auto rounded-lg bg-slate-900 p-4 text-sm shadow-inner" />
                      ),
                    }}
                  >
                    {entry.handbookMarkdown}
                  </ReactMarkdown>
                ) : hasMdx ? (
                  <div>
                    {loadingMdx && <p className="text-sm text-slate-400">Loading content…</p>}
                    {mdxError && (
                      <p className="text-sm text-red-400">Failed to load chapter: {mdxError.message}</p>
                    )}
                    {mdxModule && (
                      <HandbookMDXProvider>
                        <mdxModule.default />
                      </HandbookMDXProvider>
                    )}
                  </div>
                ) : meta.bodyMd ? (
                  <ReactMarkdown
                    rehypePlugins={[rehypeSlug]}
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h2: (props) => <h2 {...props} className="text-2xl font-semibold" />,
                      h3: (props) => <h3 {...props} className="text-xl font-semibold" />,
                      code: (props) => (
                        <code
                          {...props}
                          className="rounded bg-slate-900 px-1.5 py-0.5 text-xs font-medium text-brand-200"
                        />
                      ),
                      pre: (props) => (
                        <pre {...props} className="overflow-auto rounded-lg bg-slate-900 p-4 text-sm shadow-inner" />
                      ),
                    }}
                  >
                    {meta.bodyMd}
                  </ReactMarkdown>
                ) : loadingEntry ? (
                  <p className="text-sm text-slate-400">Loading content…</p>
                ) : (
                  <p className="text-sm text-slate-400">Content coming soon…</p>
                )}
              </article>

              <section
                className={
                  showEditor
                    ? "sticky top-4 self-start max-h-[calc(100vh-8rem)] overflow-auto"
                    : "hidden"
                }
              >
                {entryError ? (
                  <div className="rounded border border-red-800 bg-red-950 p-3 text-sm text-red-300">
                    Failed to load entry: {entryError.message}
                  </div>
                ) : loadingEntry && !entry ? (
                  <div className="rounded border border-slate-800 p-3 text-sm text-slate-300">Loading editor…</div>
                ) : (
                  <HandbookWorkbench entry={entry} />
                )}
              </section>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
