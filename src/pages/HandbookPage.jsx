import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { useParams } from "react-router-dom";
import standards, { standardOrder } from "../data/standards";
import { handbookChapters, loadHandbookEntry, getChapterLoader } from "../handbook/manifest";
import HandbookMDXProvider from "../handbook/MDXProvider";
import HandbookWorkbench from "../components/HandbookWorkbench";
import HandbookSidebar from "../components/HandbookSidebar";

// Removed page-level heading TOC ("On this page"); keep file lean.

export default function HandbookPage() {
  const { standardId, chapterId } = useParams();

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

  // Chapter-specific MDX (new sidebar chapters)
  const [chapterModule, setChapterModule] = useState(null);
  const [chapterError, setChapterError] = useState(null);
  const [loadingChapter, setLoadingChapter] = useState(false);

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

  // Load chapter module if chapterId present and structure declares it
  useEffect(() => {
    let cancelled = false;
    setChapterModule(null);
    setChapterError(null);
    setLoadingChapter(false);
    if (!chapterId) return;
    const loader = getChapterLoader(resolvedId, chapterId);
    if (!loader) return;
    setLoadingChapter(true);
    loader()
      .then((mod) => {
        if (!cancelled) {
          setChapterModule(mod);
          setChapterError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setChapterError(err);
          setChapterModule(null);
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingChapter(false);
      });
    return () => {
      cancelled = true;
    };
  }, [resolvedId, chapterId]);

  // No per-page TOC; sidebar now focuses on standards and chapters.

  // Legacy standardNav retained for potential future use (e.g., breadcrumbs). Removed from rendering.

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
                <HandbookSidebar currentStandardId={resolvedId} currentChapterId={chapterId} />
              </aside>

              <article className={`prose prose-invert max-w-none ${showHandbook ? "block" : "hidden"}`}>
                {chapterId && chapterModule ? (
                  <div>
                    {loadingChapter && (
                      <p className="text-sm text-slate-400">Loading chapter…</p>
                    )}
                    {chapterError && (
                      <p className="text-sm text-red-400">Failed to load chapter: {chapterError.message}</p>
                    )}
                    {chapterModule && (
                      <HandbookMDXProvider>
                        <chapterModule.default />
                      </HandbookMDXProvider>
                    )}
                  </div>
                ) : entry && entry.handbookMarkdown ? (
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
