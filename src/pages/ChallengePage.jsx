import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  SandpackConsole,
  SandpackCodeEditor,
  SandpackFileExplorer,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
  useSandpack,
} from "@codesandbox/sandpack-react";
import CompactConsole from "../components/CompactConsole";
import { dracula } from "@codesandbox/sandpack-themes";
import { useNavigate, useParams } from "react-router-dom";
import Markdown from "../components/Markdown";
import StandardsBadges from "../components/StandardsBadges";
import challenges from "../data/challenges";
import standards from "../data/standards";
import useLocalStorage from "../hooks/useLocalStorage";
import { toSandpackFiles } from "../lib/sandpackAdapter";
import { getDefaultEditorExtensions } from "../lib/editorExtensions";
import Modal from "../components/Modal";
import Callout from "../components/Callout";
import { loadMastered, saveMastered } from "../lib/mastery";
import { EditorView } from "@codemirror/view";
import { getBundlerURL } from "../lib/getBundlerURL";
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
  const sandpackSetup = useMemo(() => {
    // Build files map via new adapter then normalize into shape SandpackProvider expects
    const savedObj = initialFiles ?? {};
    const files = toSandpackFiles(challenge, savedObj, {
      challengeId: challenge.id,
    });
    // Pick active file
    const visibleFiles = Object.keys(files).filter((p) => !files[p].hidden);
    const activeFile = visibleFiles.find((p) => files[p].active) || visibleFiles[0];
    Object.keys(files).forEach((p) => {
      files[p].active = p === activeFile;
    });
    return {
      template: challenge.template || "vanilla",
      files,
      customSetup: { entry: challenge.entry || "/src/index.js" },
      options: { visibleFiles, activeFile },
    };
  }, [challenge, initialFiles]);

  // Decide at runtime whether to use local vendored bundler or Sandpack's online bundler
  const bundlerURL = getBundlerURL();

  const handleFileChange = useCallback(
    (path, code) => {
      if (path.startsWith("/.playground")) return;
      const original = challenge.files?.[path]?.code;
      setSavedFiles((prev) => {
        const next = { ...prev };
        if (original !== undefined && original === code) {
          delete next[path];
        } else {
          next[path] = { code };
        }
        return next;
      });
    },
    [challenge.files, setSavedFiles]
  );

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
  }, [resetSavedFiles]);

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

      <SandpackProvider
        template={sandpackSetup.template}
        files={sandpackSetup.files}
        customSetup={sandpackSetup.customSetup}
        theme={dracula}
        bundlerURL={bundlerURL}
        options={{
          ...sandpackSetup.options,
          showLineNumbers: true,
          wrapContent: true,
          editorHeight: 540,
          recompileMode: "delayed",
          recompileDelay: 1000,
        }}
      >
        <ChallengeSandboxUI
          challenge={challenge}
          entryPath={sandpackSetup.options.activeFile}
          onFileChange={handleFileChange}
          onResetStorage={handleResetStorage}
          setSavedFiles={setSavedFiles}
          isCompleted={isCompleted}
          markComplete={markComplete}
          markIncomplete={markIncomplete}
          primaryStandard={primaryStandard}
          isMastered={isMastered}
          toggleMastered={toggleMastered}
        />
      </SandpackProvider>
    </section>
  );
}

function ChallengeSandboxUI({ challenge, onFileChange, onResetStorage, setSavedFiles, isCompleted, markComplete, markIncomplete, primaryStandard, isMastered, toggleMastered }) {
  const { sandpack, listen } = useSandpack();
  // Removed unused clientId state
  const [isCompiling, setIsCompiling] = useState(false);
  // Remount key to force-clear SandpackConsole between runs
  const [consoleKey, setConsoleKey] = useState(0);
  // Removed unused isRunning state
  const [showExplorer, setShowExplorer] = useState(
    challenge.sandbox?.showExplorer !== undefined ? challenge.sandbox.showExplorer : true
  );
  // Controls visibility of the entire right panel (preview/console)
  const [showRightPanel, setShowRightPanel] = useState(
    challenge.sandbox?.showRightPanel !== undefined ? challenge.sandbox.showRightPanel : true
  );
  const [rightPanel, setRightPanel] = useState(
    challenge.sandbox?.defaultPanel ? challenge.sandbox.defaultPanel : "preview"
  );
  const [compactConsole, setCompactConsole] = useState(true);
  // identify value mode removed
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const liveRef = useRef(null); // kept for future announcements

  useEffect(() => {
    if (!listen) return undefined;

    const unsubscribe = listen((message) => {
      // NOTE: We only rely on this for compile status now; file change events may differ across Sandpack versions.
      if (message.type === "sandpack/client-connected") {
        // Removed unused clientId assignment
      }

      if (message.type === "sandpack/status") {
        const compiling = message.status === "running";
        setIsCompiling(compiling);
        // Clear console at the very start of a new run
        if (compiling) {
          setConsoleKey((k) => k + 1);
        }
      }
    });

    return () => unsubscribe?.();
  }, [listen, onFileChange]);

  // Robust diff-based persistence: whenever sandpack.files changes, compute deltas vs original challenge files.
  useEffect(() => {
    if (!sandpack?.files) return;
    if (!setSavedFiles) return;
    const originals = challenge.files || {};
    const diff = {};
    // Compare original challenge files.
    Object.entries(originals).forEach(([path, spec]) => {
      const current = sandpack.files[path];
      if (current && typeof current.code === "string" && current.code !== spec.code) {
        diff[path] = { code: current.code };
      }
    });
    // Include any user-added non-playground files that aren't part of the seed.
    Object.entries(sandpack.files).forEach(([path, spec]) => {
      if (path.startsWith("/.playground")) return;
      if (!originals[path]) {
        diff[path] = { code: spec.code };
      }
    });
    // Only write if something actually changed (shallow compare by keys + codes length)
    setSavedFiles((prev) => {
      const prevKeys = Object.keys(prev || {});
      const nextKeys = Object.keys(diff);
      if (prevKeys.length === nextKeys.length && prevKeys.every((k) => prev[k]?.code === diff[k]?.code)) {
        return prev; // no change
      }
      return diff; // may be empty object (means fully reverted)
    });
  }, [sandpack?.files, challenge.id, setSavedFiles, challenge.files]);

  // When challenge changes, reset sandbox UI state to its declared defaults
  useEffect(() => {
    setShowExplorer(
      challenge.sandbox?.showExplorer !== undefined ? challenge.sandbox.showExplorer : true
    );
    setShowRightPanel(
      challenge.sandbox?.showRightPanel !== undefined ? challenge.sandbox.showRightPanel : true
    );
    setRightPanel(
      challenge.sandbox?.defaultPanel ? challenge.sandbox.defaultPanel : "preview"
    );
  }, [
    challenge.id,
    challenge.sandbox?.showExplorer,
    challenge.sandbox?.showRightPanel,
    challenge.sandbox?.defaultPanel,
  ]);

  // Test & completion messaging removed





  const handleReset = () => {
    if (!sandpack) return;
    Object.entries(challenge.files ?? {}).forEach(([path, spec]) => {
      if (typeof spec.code === "string") {
        sandpack.updateFile(path, spec.code);
      }
    });
    onResetStorage?.();
    // identify value state removed
  };







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
          {isCompiling ? "Compiling latest changes…" : "Edits auto-save to your browser."}
        </span>
      </div>

      {/* Identify Value challenge type removed */}

      {/* Sandpack area */}
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
              <button
                type="button"
                onClick={() => setCompactConsole((v) => !v)}
                className={`rounded-full border px-3 py-1 transition ${
                  compactConsole
                    ? "border-brand-400 bg-brand-500/20 text-brand-200"
                    : "border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white"
                }`}
                title="Toggle compact (stackless) console"
              >
                {compactConsole ? "Compact" : "Full"}
              </button>
            </div>
          </div>

          <SandpackLayout className="flex flex-col gap-0 lg:flex-row">
            {showExplorer ? (
              <div className="hidden min-w-[200px] max-w-[240px]   border-b border-slate-800 bg-slate-950/80 lg:block lg:border-b-0 lg:border-r">
                <SandpackFileExplorer autoHiddenFiles style={{ height: "100%" }} />
              </div>
            ) : null}
            <SandpackCodeEditor
              showTabs
              showLineNumbers
              showInlineErrors
              wrapContent
              extensions={[
                ...getDefaultEditorExtensions(),
                EditorView.theme(
                  {
                    "&": { fontSize: "1rem", lineHeight: "1.5" },      // editor surface
                    // Ensure long lines wrap even in read-only files
                    ".cm-content": {
                      fontSize: "1rem",
                      whiteSpace: "pre-wrap",
                      overflowWrap: "anywhere",
                    },
                    ".cm-line": { wordBreak: "break-word" },
                    ".cm-gutters": { fontSize: "1rem" },                // line numbers
                  },
                  { dark: true }
                )
              ]}
              style={{ height: "100%" }}
              className={`flex-1 border-b border-slate-800 lg:border-b-0 ${showRightPanel ? "lg:border-r" : ""}`}
            />
            {/* Always keep the SandpackPreview mounted so the sandbox client (runtime) stays alive.
                We toggle visibility instead of conditionally rendering; otherwise the console
                would have no connected client and user logs would never appear. */}
            <div
              className={
                showRightPanel
                  ? "min-h-[320px] flex-1 bg-slate-950/80 relative"
                  : "min-h-[0] flex-1 bg-slate-950/80 relative hidden lg:block" // hide from flex layout when not shown (still mounted if needed)
              }
              style={showRightPanel ? {} : { display: "none" }}
            >
              <div
                className={
                  rightPanel === "preview"
                    ? "h-full"
                    : "pointer-events-none absolute inset-0 h-0 overflow-hidden"
                }
              >
                <SandpackPreview
                  showOpenInCodeSandbox={false}
                  showRefreshButton
                  style={{ height: "100%" }}
                />
              </div>
              <div
                className={
                  rightPanel === "console"
                    ? "h-full"
                    : "pointer-events-none absolute inset-0 h-0 overflow-hidden"
                }
              >
                {compactConsole ? (
                  <CompactConsole />
                ) : (
                  <SandpackConsole
                    key={consoleKey}
                    showHeader
                    showSyntaxError
                    resetOnPreviewRestart
                    style={{ height: "100%" }}
                  />
                )}
              </div>
            </div>
          </SandpackLayout>
          {/* Test results & completion panels removed */}
        </div>
      </div>
    </div>
  );
}
