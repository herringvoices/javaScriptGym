import { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { useParams, Link } from "react-router-dom";
import standards, { standardOrder } from "../data/standards";
import { handbookChapters, loadHandbookEntry, getChapterLoader, getChaptersForStandard } from "../handbook/manifest";
import HandbookMDXProvider from "../handbook/MDXProvider";
import HandbookWorkbench from "../components/HandbookWorkbench";
import HandbookSidebar from "../components/HandbookSidebar";
import StickyToggleBar from "../components/StickyToggleBar";
import DesktopPanel from "../components/DesktopPanel";
import MobileAccordion from "../components/MobileAccordion";
import useMediaQuery from "../hooks/useMediaQuery";

// Removed page-level heading TOC ("On this page"); keep file lean.

export default function HandbookPage() {
  const { standardId, chapterId } = useParams();

  const resolvedId = standards[standardId] ? standardId : standardOrder[0];
  const meta = standards[resolvedId];

  // Header toggles for TOC / handbook / editor
  const [showTOC, setShowTOC] = useState(true);
  const [showHandbook, setShowHandbook] = useState(true);
  const [showEditor, setShowEditor] = useState(true);
  const [showConsole, setShowConsole] = useState(false);
  const tocRef = useRef(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

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

  // Ensure navigating via previous/next lands at the top of the page
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, [resolvedId, chapterId]);

  useEffect(() => {
    if (!showTOC || typeof document === "undefined") return undefined;

    const handlePointerDown = (event) => {
      if (tocRef.current?.contains(event.target)) return;
      if (event.target.closest("[data-toc-toggle]")) return;
      setShowTOC(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [showTOC]);

  const gridTemplate = useMemo(() => {
    const columns = [];
    if (showTOC) columns.push("minmax(220px,0.75fr)");
    if (showHandbook) columns.push("minmax(280px,1fr)");
    if (showEditor) columns.push("minmax(0,2fr)");
    if (showConsole) columns.push("minmax(320px,1.2fr)");
    return columns.length ? columns.join(" ") : "minmax(0,1fr)";
  }, [showTOC, showHandbook, showEditor, showConsole]);

  // No per-page TOC; sidebar now focuses on standards and chapters.

  // Legacy standardNav retained for potential future use (e.g., breadcrumbs). Removed from rendering.

  // Button class logic moved into StickyToggleBar for reuse

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
      <div className="space-y-4 px-4 sm:px-6 lg:px-8">
        {/* Header with toggles */}
        <div className="rounded-md border border-brand-500/40 bg-brand-500/10 p-4 text-sm text-slate-200">
          <p className="text-sm uppercase tracking-widest text-brand-300">JavaScript Handbook</p>
          <h1 className="mt-0 text-2xl font-semibold">{meta.title}</h1>
        </div>

        {/* Sticky toggle controls bar */}
        <StickyToggleBar
          showTOC={showTOC}
          showHandbook={showHandbook}
          showEditor={showEditor}
          showConsole={showConsole}
          onToggleTOC={() => setShowTOC((v) => !v)}
          onToggleHandbook={() => setShowHandbook((v) => !v)}
          onToggleEditor={() => setShowEditor((v) => !v)}
          onToggleConsole={() => setShowConsole((v) => !v)}
          tocOnLabel="Hide Table of Contents"
          tocOffLabel="Show Table of Contents"
          handbookOnLabel="Hide handbook"
          handbookOffLabel="Show handbook"
          editorOnLabel="Hide editor"
          editorOffLabel="Show editor"
          consoleOnLabel="Hide console"
          consoleOffLabel="Show console"
        />

        {/* Body columns are weighted like challenges, with TOC as an extra optional column. */}
        {isDesktop ? (
            <div
              className="grid grid-cols-1 gap-6 lg:[grid-template-columns:var(--handbook-grid-template)]"
              style={{ "--handbook-grid-template": gridTemplate }}
            >
              {showTOC ? (
                <DesktopPanel
                  ref={tocRef}
                  as="aside"
                  panelKey="toc"
                  eyebrow="Handbook"
                  title="Contents"
                  onHide={() => setShowTOC(false)}
                  bodyClassName="overflow-auto"
                >
                  <HandbookSidebar currentStandardId={resolvedId} currentChapterId={chapterId} />
                </DesktopPanel>
              ) : null}

              {showHandbook ? (
                <DesktopPanel
                  as="article"
                  panelKey="handbook"
                  eyebrow="JavaScript Handbook"
                  title={meta.title}
                  onHide={() => setShowHandbook(false)}
                  variant="plain"
                  className="prose prose-invert max-w-none"
                  bodyClassName="pt-4"
                >
                  <HandbookArticleBody
                    chapterId={chapterId}
                    chapterModule={chapterModule}
                    chapterError={chapterError}
                    loadingChapter={loadingChapter}
                    entry={entry}
                    hasMdx={hasMdx}
                    mdxModule={mdxModule}
                    mdxError={mdxError}
                    loadingMdx={loadingMdx}
                    meta={meta}
                    loadingEntry={loadingEntry}
                    resolvedId={resolvedId}
                  />
                </DesktopPanel>
              ) : null}

              <div className="contents">
                {entryError ? (
                  <div className={showEditor ? "rounded border border-red-800 bg-red-950 p-3 text-sm text-red-300" : "hidden"}>
                    Failed to load entry: {entryError.message}
                  </div>
                ) : loadingEntry && !entry ? (
                  <div className={showEditor ? "rounded border border-slate-800 p-3 text-sm text-slate-300" : "hidden"}>Loading editor…</div>
                ) : (
                  <HandbookWorkbench
                    entry={entry}
                    showEditor={showEditor}
                    showRunner={showConsole}
                    onShowRunnerChange={setShowConsole}
                    onHideEditor={() => setShowEditor(false)}
                    onHideRunner={() => setShowConsole(false)}
                  />
                )}
              </div>
            </div>
        ) : (
          <div className="space-y-3">
            <MobileAccordion title="Contents" eyebrow="Handbook" stickyHeader>
              <HandbookSidebar currentStandardId={resolvedId} currentChapterId={chapterId} />
            </MobileAccordion>

            <MobileAccordion title="Handbook" eyebrow={meta.title} defaultOpen stickyHeader contentClassName="prose prose-invert max-w-none">
              <HandbookArticleBody
                chapterId={chapterId}
                chapterModule={chapterModule}
                chapterError={chapterError}
                loadingChapter={loadingChapter}
                entry={entry}
                hasMdx={hasMdx}
                mdxModule={mdxModule}
                mdxError={mdxError}
                loadingMdx={loadingMdx}
                meta={meta}
                loadingEntry={loadingEntry}
                resolvedId={resolvedId}
              />
            </MobileAccordion>

            <MobileAccordion title="Workspace" eyebrow="Code" defaultOpen stickyHeader>
              {entryError ? (
                <div className="rounded border border-red-800 bg-red-950 p-3 text-sm text-red-300">
                  Failed to load entry: {entryError.message}
                </div>
              ) : loadingEntry && !entry ? (
                <div className="rounded border border-slate-800 p-3 text-sm text-slate-300">Loading editor...</div>
              ) : (
                <HandbookWorkbench
                  entry={entry}
                  showEditor
                  showRunner={showConsole}
                  onShowRunnerChange={setShowConsole}
                />
              )}
            </MobileAccordion>
          </div>
        )}
      </div>
    </div>
  );
}

const markdownComponents = {
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
};

function HandbookArticleBody({
  chapterId,
  chapterModule,
  chapterError,
  loadingChapter,
  entry,
  hasMdx,
  mdxModule,
  mdxError,
  loadingMdx,
  meta,
  loadingEntry,
  resolvedId,
}) {
  return (
    <>
      <HandbookContent
        chapterId={chapterId}
        chapterModule={chapterModule}
        chapterError={chapterError}
        loadingChapter={loadingChapter}
        entry={entry}
        hasMdx={hasMdx}
        mdxModule={mdxModule}
        mdxError={mdxError}
        loadingMdx={loadingMdx}
        meta={meta}
        loadingEntry={loadingEntry}
      />
      <HandbookChapterNavigation resolvedId={resolvedId} chapterId={chapterId} />
    </>
  );
}

function HandbookContent({
  chapterId,
  chapterModule,
  chapterError,
  loadingChapter,
  entry,
  hasMdx,
  mdxModule,
  mdxError,
  loadingMdx,
  meta,
  loadingEntry,
}) {
  if (chapterId && chapterModule) {
    const Chapter = chapterModule.default;

    return (
      <div>
        {loadingChapter && <p className="text-sm text-slate-400">Loading chapter...</p>}
        {chapterError && (
          <p className="text-sm text-red-400">Failed to load chapter: {chapterError.message}</p>
        )}
        {Chapter && (
          <HandbookMDXProvider>
            <Chapter />
          </HandbookMDXProvider>
        )}
      </div>
    );
  }

  if (entry && entry.handbookMarkdown) {
    return (
      <ReactMarkdown
        rehypePlugins={[rehypeSlug]}
        remarkPlugins={[remarkGfm]}
        components={markdownComponents}
      >
        {entry.handbookMarkdown}
      </ReactMarkdown>
    );
  }

  if (hasMdx) {
    const LegacyChapter = mdxModule?.default;

    return (
      <div>
        {loadingMdx && <p className="text-sm text-slate-400">Loading content...</p>}
        {mdxError && (
          <p className="text-sm text-red-400">Failed to load chapter: {mdxError.message}</p>
        )}
        {LegacyChapter && (
          <HandbookMDXProvider>
            <LegacyChapter />
          </HandbookMDXProvider>
        )}
      </div>
    );
  }

  if (meta.bodyMd) {
    return (
      <ReactMarkdown
        rehypePlugins={[rehypeSlug]}
        remarkPlugins={[remarkGfm]}
        components={markdownComponents}
      >
        {meta.bodyMd}
      </ReactMarkdown>
    );
  }

  if (loadingEntry) {
    return <p className="text-sm text-slate-400">Loading content...</p>;
  }

  return <p className="text-sm text-slate-400">Content coming soon...</p>;
}

function HandbookChapterNavigation({ resolvedId, chapterId }) {
  const globalSequence = standardOrder.flatMap((sid) => {
    const metaForSid = standards[sid];
    if (!metaForSid) return [];

    const chapters = getChaptersForStandard(sid);
    const base = [{ standardId: sid, id: null, title: metaForSid.title, isIntro: true }];
    if (!chapters || chapters.length === 0) return base;

    return base.concat(
      chapters.map((chapter) => ({
        standardId: sid,
        id: chapter.id,
        title: chapter.title,
        isIntro: false,
      }))
    );
  });

  const currentIndex = globalSequence.findIndex((node) =>
    node.standardId === resolvedId && (chapterId ? node.id === chapterId : node.id === null)
  );

  if (currentIndex === -1) return null;

  const prev = currentIndex > 0 ? globalSequence[currentIndex - 1] : null;
  const next = currentIndex < globalSequence.length - 1 ? globalSequence[currentIndex + 1] : null;
  const makeHref = (node) =>
    !node || node.isIntro || !node.id
      ? `/handbook/${node.standardId}`
      : `/handbook/${node.standardId}/${node.id}`;

  const btnClass =
    "inline-flex min-w-0 items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/70";
  const inactiveClass = "opacity-40 cursor-not-allowed";
  const prevClass = "bg-slate-900/60 text-slate-200 border-slate-700 hover:bg-slate-800";
  const nextClass = "bg-brand-600 text-white border-brand-600 hover:bg-brand-500";

  return (
    <nav aria-label="Chapter navigation" className="mt-10 border-t border-slate-700 pt-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        {prev ? (
          <Link to={makeHref(prev)} className={`${btnClass} ${prevClass} sm:max-w-[48%]`}>
            <span className="text-lg" aria-hidden="true">←</span>
            <span className="flex min-w-0 flex-col text-left">
              <span className="text-xs uppercase tracking-wide text-brand-300">Previous</span>
              <span className="truncate">{prev.isIntro ? `${standards[prev.standardId]?.title || "Intro"}` : prev.title}</span>
            </span>
          </Link>
        ) : (
          <span className={`${btnClass} ${inactiveClass}`} aria-disabled>
            <span className="text-lg" aria-hidden="true">←</span>
            <span className="flex flex-col text-left">
              <span className="text-xs uppercase tracking-wide">Previous</span>
              -
            </span>
          </span>
        )}

        {next ? (
          <Link to={makeHref(next)} className={`${btnClass} ${nextClass} justify-end sm:max-w-[48%] sm:ml-auto`}>
            <span className="flex min-w-0 flex-col text-right">
              <span className="text-xs uppercase tracking-wide text-brand-200">Next</span>
              <span className="truncate">{next.isIntro ? `${standards[next.standardId]?.title || "Intro"}` : next.title}</span>
            </span>
            <span className="text-lg" aria-hidden="true">→</span>
          </Link>
        ) : (
          <span className={`${btnClass} ${inactiveClass} justify-end sm:ml-auto`} aria-disabled>
            <span className="flex flex-col text-right">
              <span className="text-xs uppercase tracking-wide">Next</span>
              -
            </span>
            <span className="text-lg" aria-hidden="true">→</span>
          </span>
        )}
      </div>
    </nav>
  );
}
