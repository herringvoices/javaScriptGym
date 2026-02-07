import { useCallback, useEffect, useMemo, useRef, useState, useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Markdown from "../components/Markdown";
import StandardsBadges from "../components/StandardsBadges";
import challenges from "../data/challenges";
import standards from "../data/standards";
import useLocalStorage from "../hooks/useLocalStorage";
import { toSandpackFiles } from "../lib/sandpackAdapter";
import Callout from "../components/Callout";
import { loadMastered, saveMastered } from "../lib/mastery";
import MonacoWorkspace from "../components/MonacoWorkspace";
import ConsolePanel from "../components/ConsolePanel";
import { buildSrcDoc } from "../lib/buildSrcDoc";
// ChallengeTypes import removed (only CODE_AND_SEE exists now and not referenced directly)

const difficultyLabel = (value) => {
  // show "-" when value is missing or 0, otherwise stars for any positive integer
  const n = Number(value) || 0;
  return "★".repeat(n) || "-";
};

export default function ChallengePage() {
  const { challengeId } = useParams();
  const navigate = useNavigate();

  const challenge = useMemo(
    () => challenges.find((item) => item.id === challengeId),
    [challengeId]
  );

  if (!challenge) {
    return (
      <section className="space-y-6">
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold text-white">Challenge not found</h1>
          <p className="text-slate-300">
            That challenge id isn’t in the seed data yet. Pick another practice ticket from the list.
          </p>
        </header>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-400"
        >
          ← Back to challenges
        </button>
      </section>
    );
  }

  return <ChallengeWorkspace challenge={challenge} />;
}

function ChallengeWorkspace({ challenge }) {
  const storageKey = `playground:${challenge.id}:files`;
  const [savedFiles, setSavedFiles, resetSavedFiles] = useLocalStorage(storageKey, {});
  const [initialFiles, setInitialFiles] = useState(savedFiles ?? {});
  const previousIdRef = useRef(challenge.id);
  // Completion tracking shared key across app (same as ChallengesPage)
  const [completedIds, setCompletedIds] = useLocalStorage("completedChallenges", []);
  const isCompleted = completedIds.includes(challenge.id);
  const markComplete = () => setCompletedIds((prev) => (prev.includes(challenge.id) ? prev : [...prev, challenge.id]));
  const markIncomplete = () => setCompletedIds((prev) => prev.filter((id) => id !== challenge.id));

  // Mastery toggle for this challenge's primary standard
  const primaryStandard = challenge.primaryStandard || challenge.standards?.[0];
  const [isMastered, setIsMastered] = useState(() => (primaryStandard ? loadMastered().has(primaryStandard) : false));
  const [masteryToast, setMasteryToast] = useState(null); // { message }

  const toggleMastered = () => {
    if (!primaryStandard) return;
    const set = loadMastered();
    if (set.has(primaryStandard)) {
      set.delete(primaryStandard);
      saveMastered(set);
      setIsMastered(false);
      setMasteryToast({ message: "Unmarked as mastered." });
    } else {
      set.add(primaryStandard);
      saveMastered(set);
      setIsMastered(true);
      const meta = standards[primaryStandard];
      const label = meta?.title?.split("·")[1]?.trim() || meta?.title || primaryStandard;
      setMasteryToast({ message: `Marked ${label} as mastered.` });
    }
  };

  useEffect(() => {
    if (!masteryToast) return;
    const t = setTimeout(() => setMasteryToast(null), 3000);
    return () => clearTimeout(t);
  }, [masteryToast]);

  // Keep mastered flag in sync when navigating between challenges
  useEffect(() => {
    setIsMastered(primaryStandard ? loadMastered().has(primaryStandard) : false);
  }, [primaryStandard, challenge.id]);

  useEffect(() => {
    if (previousIdRef.current !== challenge.id) {
      previousIdRef.current = challenge.id;
      setInitialFiles(savedFiles ?? {});
    }
  }, [challenge.id, savedFiles]);

  // Always use new adapter (other challenge types removed)
  const setup = useMemo(() => {
    const savedObj = initialFiles ?? {};
    const files = toSandpackFiles(challenge, savedObj, { challengeId: challenge.id });
    const visibleFiles = Object.keys(files).filter((p) => !files[p].hidden);
    const activeFile = visibleFiles.find((p) => files[p].active) || visibleFiles[0];
    Object.keys(files).forEach((p) => { files[p].active = p === activeFile; });
    return {
      template: challenge.template || "vanilla",
      files,
      entry: challenge.entry || "/src/index.js",
      visibleFiles,
      activeFile,
    };
  }, [challenge, initialFiles]);

  const [filesState, setFilesState] = useState(setup.files);
  const [, setActiveFile] = useState(setup.activeFile);
  const [srcDoc, setSrcDoc] = useState("");
  const iframeRef = useRef(null);

  useEffect(() => {
    setFilesState(setup.files);
    setActiveFile(setup.activeFile);
    // Do not auto-run on challenge change; keep preview idle until user clicks Run
    setSrcDoc("");
  }, [setup.files, setup.activeFile]);

  const handleFileChange = useCallback((path, code) => {
    if (path.startsWith("/.playground")) return;
    const original = challenge.files?.[path]?.code;
    setFilesState((prev) => ({ ...prev, [path]: { ...prev[path], code } }));
    setSavedFiles((prev) => {
      const next = { ...prev };
      if (original !== undefined && original === code) delete next[path];
      else next[path] = { code };
      return next;
    });
  }, [challenge.files, setSavedFiles]);

  const handleResetStorage = useCallback(() => {
    // Clear mock API DB for this challenge if available
    if (typeof window !== "undefined" && window.__MOCK_DB__ && typeof window.__MOCK_DB__.reset === "function") {
      try {
        window.__MOCK_DB__.reset();
      } catch (e) {
        // ignore errors from test env
        void e;
      }
    }
    resetSavedFiles();
    setInitialFiles({});
    setFilesState(challenge.files);
  }, [resetSavedFiles, challenge.files]);

  return (
    <section className="space-y-6 flex flex-col flex-1 min-h-0 w-full">
      {masteryToast ? (
        <Callout type="tip" title="Saved">
          <p>{masteryToast.message}</p>
        </Callout>
      ) : null}

      <ChallengeSandboxUI
        challenge={challenge}
        files={filesState}
        entry={setup.entry}
        setActiveFile={setActiveFile}
        onFileChange={handleFileChange}
        onResetStorage={handleResetStorage}
        isCompleted={isCompleted}
        markComplete={markComplete}
        markIncomplete={markIncomplete}
        primaryStandard={primaryStandard}
        isMastered={isMastered}
        toggleMastered={toggleMastered}
        srcDoc={srcDoc}
        setSrcDoc={setSrcDoc}
        iframeRef={iframeRef}
      />

    </section>
  );
}

function ChallengeSandboxUI({
  challenge,
  files,
  entry,
  setActiveFile,
  onFileChange,
  onResetStorage,
  isCompleted,
  markComplete,
  markIncomplete,
  primaryStandard,
  isMastered,
  toggleMastered,
  srcDoc,
  setSrcDoc,
  iframeRef,
}) {
  const [showExplorer, setShowExplorer] = useState(
    challenge.sandbox?.showExplorer !== undefined ? challenge.sandbox.showExplorer : true
  );
  const [rightPanel, setRightPanel] = useState(
    challenge.sandbox?.defaultPanel ? challenge.sandbox.defaultPanel : "preview"
  );
  const [showDetailsColumn, setShowDetailsColumn] = useState(true);
  const [showEditorColumn, setShowEditorColumn] = useState(true);
  const [showRunnerColumn, setShowRunnerColumn] = useState(
    challenge.sandbox?.showRightPanel !== undefined ? challenge.sandbox.showRightPanel : true
  );
  const [consoleKey, setConsoleKey] = useState(0);
  const editorRef = useRef(null);
  const descriptionCopy = challenge.description || challenge.summary || "Description coming soon.";

  const handleRun = () => {
    try {
      setConsoleKey((k) => k + 1);
      const html = buildSrcDoc({ files, entry });
      setSrcDoc(html);
      setShowRunnerColumn(true);
    } catch (e) {
      console.error("Preview build failed", e);
    }
  };

  const handleReset = () => {
    onResetStorage?.();
    setSrcDoc("");
    setConsoleKey((k) => k + 1);
  };

  useLayoutEffect(() => {
    let raf1 = 0;
    let raf2 = 0;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        try {
          if (editorRef.current) editorRef.current.layout();
        } catch (e) {
          void e;
        }
        try {
          window.dispatchEvent(new Event("resize"));
        } catch (e) {
          void e;
        }
      });
    });
    return () => {
      if (raf1) cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
    };
  }, [showExplorer]);

  const visibleColumns = [showDetailsColumn, showEditorColumn, showRunnerColumn].filter(Boolean).length || 1;
  const gridTemplate =
    visibleColumns === 3
      ? "lg:grid-cols-[minmax(280px,1fr)_minmax(0,2fr)_minmax(320px,1.2fr)]"
      : visibleColumns === 2
      ? "lg:grid-cols-2"
      : "lg:grid-cols-1";

  const toggleClass = (active) =>
    `rounded-full border px-3 py-1 text-xs font-semibold transition ${
      active
        ? "border-brand-400 bg-brand-500/20 text-brand-200"
        : "border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white"
    }`;

  return (
    <div className="min-h-0 flex-1 flex-col space-y-2 w-full">
      <div className="flex flex-col gap-4 lg:flex-row w-full justify-between">
        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-300">
            <span className="text-brand-300">Workspace layout</span>
            <button
              type="button"
              className={toggleClass(showDetailsColumn)}
              onClick={() => setShowDetailsColumn((value) => !value)}
            >
              {showDetailsColumn ? "Hide details" : "Show details"}
            </button>
            <button
              type="button"
              className={toggleClass(showEditorColumn)}
              onClick={() => setShowEditorColumn((value) => !value)}
            >
              {showEditorColumn ? "Hide editor" : "Show editor"}
            </button>
            <button
              type="button"
              className={toggleClass(showRunnerColumn)}
              onClick={() => setShowRunnerColumn((value) => !value)}
            >
              {showRunnerColumn ? "Hide preview" : "Show preview"}
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-white">{challenge.title}</h2>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-4">
          <div className="flex flex-wrap items-center gap-2">
            {primaryStandard ? (
              <button
                type="button"
                onClick={toggleMastered}
                className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  isMastered
                    ? "border-brand-500/40 text-brand-300 hover:bg-brand-500/10"
                    : "border-slate-700 text-slate-200 hover:border-slate-500 hover:text-white"
                }`}
                title={isMastered ? "Unmark standard as mastered" : "Mark standard as mastered"}
              >
                {isMastered ? "Unmark mastered" : "Mark standard mastered"}
              </button>
            ) : null}

            {isCompleted ? (
              <button
                type="button"
                onClick={markIncomplete}
                className="inline-flex items-center rounded-full border border-emerald-500/40 px-4 py-2 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/10"
              >
                Mark incomplete
              </button>
            ) : (
              <button
                type="button"
                onClick={markComplete}
                className="inline-flex items-center rounded-full border border-emerald-500/40 px-4 py-2 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/10"
              >
                Mark complete
              </button>
            )}

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white"
            >
              Reset files
            </button>

            <span className="text-xs text-slate-400">Edits auto-save to your browser.</span>
          </div>
        </div>
      </div>

      <div className="w-screen ml-[calc(50%-50vw)] mr-[calc(50%-50vw)]">
        <div className={`grid gap-6 px-6 lg:px-8 ${gridTemplate}`}>
          {showDetailsColumn ? (
            <aside className="space-y-5 rounded-3xl border border-slate-800 bg-slate-950/80 p-5 text-sm text-slate-300 lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-7rem)] lg:overflow-auto">
              <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-slate-400">
                <span className="rounded-full bg-slate-900 px-2.5 py-0.5 text-slate-200">{challenge.id}</span>
                <span className="rounded-full bg-slate-900 px-2.5 py-0.5 text-slate-200">
                  Difficulty {difficultyLabel(challenge.difficulty)}
                </span>
            {isCompleted ? (
              <span className="rounded-full bg-emerald-600/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-300 ring-1 ring-inset ring-emerald-600/40">
                Completed
              </span>
            ) : null}
              </div>

              <div className="space-y-2">
                <p className="text-xs uppercase tracking-widest text-brand-300">Challenge</p>
                <h2 className="text-2xl font-semibold text-white">{challenge.title}</h2>
              </div>

              <StandardsBadges standards={challenge.standards} size="sm" />

              <div className="space-y-3">
                <Markdown className="prose prose-invert max-w-none text-sm text-slate-300">
                  {descriptionCopy}
                </Markdown>
              </div>

              {Array.isArray(challenge.userStories) && challenge.userStories.length > 0 ? (
                <div>
                  <h3 className="text-base font-semibold text-white">User stories</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
                    {challenge.userStories.map((story, idx) => (
                      <li key={idx}>{story}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {Array.isArray(challenge.acceptanceCriteria) && challenge.acceptanceCriteria.length > 0 ? (
                <div>
                  <h3 className="text-base font-semibold text-white">Acceptance criteria</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
                    {challenge.acceptanceCriteria.map((rule, idx) => (
                      <li key={idx}>{rule}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </aside>
          ) : null}

          {showEditorColumn ? (
            <section className="flex min-h-[480px] flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 px-4 py-3">
                <div>
                  <p className="text-xs uppercase tracking-widest text-brand-300">Editor</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowExplorer((value) => !value)}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                    showExplorer
                      ? "border-brand-400 bg-brand-500/20 text-brand-200"
                      : "border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white"
                  }`}
                >
                  {showExplorer ? "Hide file tree" : "Show file tree"}
                </button>
              </div>
              <div className="min-h-0 grow">
                <MonacoWorkspace
                  files={files}
                  onChange={onFileChange}
                  onActiveChange={setActiveFile}
                  showExplorer={showExplorer}
                  className="h-full"
                  onEditorMount={(ed) => {
                    editorRef.current = ed;
                    try {
                      ed.layout();
                    } catch (e) {
                      void e;
                    }
                  }}
                />
              </div>
            </section>
          ) : null}

          {showRunnerColumn ? (
            <section className="flex min-h-[480px] flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 px-4 py-3">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleRun}
                    className="inline-flex items-center rounded-full border border-emerald-500/40 px-4 py-2 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/10"
                    title="Build and load the preview"
                  >
                    Run preview
                  </button>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <button
                    type="button"
                    onClick={() => setRightPanel("preview")}
                    className={toggleClass(rightPanel === "preview")}
                  >
                    Preview
                  </button>
                  <button
                    type="button"
                    onClick={() => setRightPanel("console")}
                    className={toggleClass(rightPanel === "console")}
                  >
                    Console
                  </button>
                </div>
              </div>
              <div className="min-h-0 grow">
                <div className={rightPanel === "preview" ? "h-full" : "hidden"}>
                  {srcDoc ? (
                    <iframe
                      ref={iframeRef}
                      title="preview"
                      className="h-full w-full bg-white"
                      sandbox="allow-scripts allow-modals allow-forms allow-pointer-lock allow-popups allow-same-origin"
                      srcDoc={srcDoc}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center px-6 text-center text-sm text-slate-400">
                      Click “Run preview” to build and load your project.
                    </div>
                  )}
                </div>
                <div className={rightPanel === "console" ? "h-full" : "hidden"}>
                  <ConsolePanel key={consoleKey} />
                </div>
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
}
