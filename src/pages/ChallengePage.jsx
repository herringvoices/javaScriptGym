import { useCallback, useEffect, useMemo, useRef, useState, useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Markdown from "../components/Markdown";
import StandardsBadges from "../components/StandardsBadges";
import challenges from "../data/challenges";
import standards from "../data/standards";
import useLocalStorage from "../hooks/useLocalStorage";
import { toSandpackFiles } from "../lib/sandpackAdapter";
import Modal from "../components/Modal";
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

  return <ChallengeWorkspace challenge={challenge} navigate={navigate} />;
}

function ChallengeWorkspace({ challenge, navigate }) {
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
    <section className="space-y-6">
      {masteryToast ? (
        <Callout type="tip" title="Saved">
          <p>{masteryToast.message}</p>
        </Callout>
      ) : null}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="rounded-full border border-slate-700 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-300 transition hover:border-slate-500 hover:text-white"
            >
              ← Challenges
            </button>
            {isCompleted ? (
              <span className="rounded-full bg-emerald-600/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-300 ring-1 ring-inset ring-emerald-600/40">
                Completed
              </span>
            ) : null}
          </div>
          <h1 className="text-3xl font-semibold text-white">{challenge.title}</h1>
          <span className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-200">
            Difficulty {difficultyLabel(challenge.difficulty)}
          </span>
        </div>

        {/* <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="space-y-3">

            <Markdown className="max-w-3xl text-sm text-slate-300">
              {challenge.description}
            </Markdown>
          </div>
        </div>

        <StandardsBadges standards={challenge.standards} /> */}
      </header>

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

function ChallengeSandboxUI({ challenge, files, entry, setActiveFile, onFileChange, onResetStorage, isCompleted, markComplete, markIncomplete, primaryStandard, isMastered, toggleMastered, srcDoc, setSrcDoc, iframeRef }) {
    const [showExplorer, setShowExplorer] = useState(
      challenge.sandbox?.showExplorer !== undefined ? challenge.sandbox.showExplorer : true
    );
    const [showRightPanel, setShowRightPanel] = useState(
      challenge.sandbox?.showRightPanel !== undefined ? challenge.sandbox.showRightPanel : true
    );
    const [rightPanel, setRightPanel] = useState(
      challenge.sandbox?.defaultPanel ? challenge.sandbox.defaultPanel : "preview"
    );
  // Removed compact/pretty toggle for console in Challenge view; default to compact formatting
    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const liveRef = useRef(null);
    const [consoleKey, setConsoleKey] = useState(0);
  const editorRef = useRef(null);

    const handleRun = () => {
      try {
        // Clear console by remounting it
        setConsoleKey((k) => k + 1);
        const html = buildSrcDoc({ files, entry });
        setSrcDoc(html);
      } catch (e) {
        console.error("Preview build failed", e);
      }
    };

    const handleReset = () => {
      onResetStorage?.();
    };

    // Force Monaco to relayout when columns show/hide
    useLayoutEffect(() => {
      // ensure DOM has applied final sizes before relayout
      let raf1 = 0, raf2 = 0;
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => {
          try { editorRef.current && editorRef.current.layout(); } catch (e) { void e; }
          try { window.dispatchEvent(new Event('resize')); } catch (e) { void e; }
        });
      });
      return () => {
        if (raf1) cancelAnimationFrame(raf1);
        if (raf2) cancelAnimationFrame(raf2);
      };
    }, [showRightPanel, showExplorer]);

    return (
    <div className="space-y-6">
      <Modal
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
        title={`${challenge.id} — ${challenge.title}`}
      >
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm">
              <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-slate-200">
                Type: {challenge.challengeType.replaceAll("_", " ")}
              </span>
              <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-slate-200">
                Difficulty {difficultyLabel(challenge.difficulty)}
              </span>
            </div>
            <StandardsBadges standards={challenge.standards} />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">Description</h3>
            <Markdown className="mt-2 text-sm text-slate-300">{challenge.description}</Markdown>
          </div>

          {Array.isArray(challenge.userStories) && challenge.userStories.length > 0 ? (
            <div>
              <h3 className="text-lg font-semibold text-white">User stories</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
                {challenge.userStories.map((story, idx) => (
                  <li key={idx}>{story}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {Array.isArray(challenge.acceptanceCriteria) && challenge.acceptanceCriteria.length > 0 ? (
            <div>
              <h3 className="text-lg font-semibold text-white">Acceptance criteria</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
                {challenge.acceptanceCriteria.map((rule, idx) => (
                  <li key={idx}>{rule}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </Modal>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setIsInfoOpen(true)}

          className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-brand-400 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-400"
        >
          View Challenge Info
        </button>
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
        {/* Test / completion buttons removed */}
        <span className="text-xs text-slate-400">
          Edits auto-save to your browser.
        </span>
      </div>

      {/* Workspace area */}
      <div className="w-screen ml-[calc(50%-50vw)] mr-[calc(50%-50vw)]">
        <div className="rounded-3xl border w-full border-slate-800 bg-slate-950/70 [--sp-font-size:1rem]">
          {/* Live region for accessibility */}
          <div aria-live="polite" ref={liveRef} className="sr-only" />
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 px-4 py-3">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <button
                type="button"
                onClick={() => setShowExplorer((value) => !value)}
                className={`rounded-full border px-3 py-1 transition ${
                  showExplorer
                    ? "border-brand-400 bg-brand-500/20 text-brand-200"
                    : "border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white"
                }`}
              >
                {showExplorer ? "Hide" : "Show"} file tree
              </button>
              <button
                type="button"
                onClick={() => setShowRightPanel((value) => !value)}
                className={`rounded-full border px-3 py-1 transition ${
                  showRightPanel
                    ? "border-brand-400 bg-brand-500/20 text-brand-200"
                    : "border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white"
                }`}
              >
                {showRightPanel ? "Hide" : "Show"} {rightPanel === "console" ? "console" : "preview"}
              </button>
              <button
                type="button"
                onClick={handleRun}
                className="rounded-full border px-3 py-1 transition border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10"
                title="Build and run the preview"
              >
                Run
              </button>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <button
                type="button"
                onClick={() => setRightPanel("preview")}
                className={`rounded-full border px-3 py-1 transition ${
                  rightPanel === "preview"
                    ? "border-brand-400 bg-brand-500/20 text-brand-200"
                    : "border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white"
                }`}
              >
                Preview
              </button>
              <button
                type="button"
                onClick={() => setRightPanel("console")}
                className={`rounded-full border px-3 py-1 transition ${
                  rightPanel === "console"
                    ? "border-brand-400 bg-brand-500/20 text-brand-200"
                    : "border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white"
                }`}
              >
                Console
              </button>
              {/* Compact toggle removed in Challenge view */}
            </div>
          </div>
          <div className="flex flex-col gap-0 lg:flex-row">
            <MonacoWorkspace
              files={files}
              onChange={onFileChange}
              onActiveChange={setActiveFile}
              showExplorer={showExplorer}
              className={`min-w-0 flex-1 ${showRightPanel ? 'lg:border-r lg:border-slate-800' : ''}`}
              onEditorMount={(ed) => { editorRef.current = ed; try { ed.layout(); } catch (e) { void e; } }}
            />

            {showRightPanel ? (
              <div className="min-h-[320px] min-w-0 flex-1 bg-slate-950/80 relative">
                <div className={rightPanel === "preview" ? "h-full" : "pointer-events-none absolute inset-0 h-0 overflow-hidden"}>
                  {srcDoc ? (
                    <iframe
                      ref={iframeRef}
                      title="preview"
                      className="h-full w-full bg-white"
                      sandbox="allow-scripts allow-modals allow-forms allow-pointer-lock allow-popups allow-same-origin"
                      srcDoc={srcDoc}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-slate-400 text-sm">
                      Click Run to build and load the preview…
                    </div>
                  )}
                </div>
                <div className={rightPanel === "console" ? "h-full" : "pointer-events-none absolute inset-0 h-0 overflow-hidden"}>
                  <ConsolePanel key={consoleKey} />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
