import { useCallback, useEffect, useMemo, useRef, useState, useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Markdown from "../components/Markdown";
import StandardsBadges from "../components/StandardsBadges";
import challenges from "../data/challenges";
import standards from "../data/standards";
import useLocalStorage from "../hooks/useLocalStorage";
import { toSandpackFiles } from "../lib/sandpackAdapter";
import { useVirtualWorkspace } from "../lib/virtualWorkspace";
import Callout from "../components/Callout";
import { loadMastered, saveMastered } from "../lib/mastery";
import MonacoWorkspace from "../components/MonacoWorkspace";
import ConsolePanel from "../components/ConsolePanel";
import DiagramPanel from "../components/DiagramPanel";
import DesktopPanel from "../components/DesktopPanel";
import DesktopRestorePreview from "../components/DesktopRestorePreview";
import StickyToggleBar from "../components/StickyToggleBar";
import MobileAccordion from "../components/MobileAccordion";
import { buildSrcDoc } from "../lib/buildSrcDoc";
import { dbmlToMermaidEr } from "../lib/dbmlToMermaidEr";
import { DIAGRAM_PANEL, getDiagramFiles, isValidPanelForFiles } from "../lib/diagramFiles";
import useMediaQuery from "../hooks/useMediaQuery";
import useDesktopRestorePreview from "../hooks/useDesktopRestorePreview";
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

  const setup = useMemo(() => {
    const files = toSandpackFiles(challenge, {}, { challengeId: challenge.id });
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
  }, [challenge]);

  const virtualWorkspace = useVirtualWorkspace(setup.files, storageKey);
  const filesState = virtualWorkspace.workspace.files;
  const [, setActiveFile] = useState(setup.activeFile);
  const [srcDoc, setSrcDoc] = useState("");
  const [previewFullScreen, setPreviewFullScreen] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    setActiveFile(setup.activeFile);
    // Do not auto-run on challenge change; keep preview idle until user clicks Run
    setSrcDoc("");
  }, [setup.files, setup.activeFile]);

  const handleFileChange = useCallback((path, code) => {
    virtualWorkspace.setFileCode(path, code);
  }, [virtualWorkspace]);

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
    virtualWorkspace.reset();
  }, [virtualWorkspace]);

  useEffect(() => {
    function handleMsg(e) {
      if (e?.data === "__PREVIEW_FULLSCREEN__") setPreviewFullScreen((v) => !v);
    }
    window.addEventListener("message", handleMsg);
    return () => window.removeEventListener("message", handleMsg);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return undefined;
    document.body.classList.toggle("workbench-fullscreen-active", previewFullScreen);
    return () => {
      document.body.classList.remove("workbench-fullscreen-active");
    };
  }, [previewFullScreen]);

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
        folders={virtualWorkspace.workspace.folders}
        resetKey={virtualWorkspace.revision}
        entry={setup.entry}
        setActiveFile={setActiveFile}
        onFileChange={handleFileChange}
        onCreateFile={virtualWorkspace.createFile}
        onCreateFolder={virtualWorkspace.createFolder}
        onRename={virtualWorkspace.rename}
        onDelete={virtualWorkspace.remove}
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
        previewFullScreen={previewFullScreen}
        setPreviewFullScreen={setPreviewFullScreen}
      />

    </section>
  );
}

function ChallengeSandboxUI({
  challenge,
  files,
  folders,
  resetKey,
  entry,
  setActiveFile,
  onFileChange,
  onCreateFile,
  onCreateFolder,
  onRename,
  onDelete,
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
  previewFullScreen,
  setPreviewFullScreen,
}) {
  const [showExplorer, setShowExplorer] = useState(
    challenge.sandbox?.showExplorer !== undefined ? challenge.sandbox.showExplorer : true
  );
  const [rightPanel, setRightPanel] = useState(
    challenge.sandbox?.defaultPanel ? challenge.sandbox.defaultPanel : DIAGRAM_PANEL.PREVIEW
  );
  const [showDetailsColumn, setShowDetailsColumn] = useState(true);
  const [showEditorColumn, setShowEditorColumn] = useState(true);
  const [showRunnerColumn, setShowRunnerColumn] = useState(
    challenge.sandbox?.showRightPanel !== undefined ? challenge.sandbox.showRightPanel : true
  );
  const [consoleKey, setConsoleKey] = useState(0);
  const editorRef = useRef(null);
  const descriptionCopy = challenge.description || challenge.summary || "Description coming soon.";
  const diagramFiles = useMemo(() => getDiagramFiles(files), [files]);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const restorePreviewKey = useDesktopRestorePreview();

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

  useEffect(() => {
    if (!isValidPanelForFiles(rightPanel, files)) {
      const preferredPanel = challenge.sandbox?.defaultPanel || DIAGRAM_PANEL.PREVIEW;
      setRightPanel(isValidPanelForFiles(preferredPanel, files) ? preferredPanel : DIAGRAM_PANEL.PREVIEW);
    }
  }, [rightPanel, files, challenge.sandbox?.defaultPanel]);

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
  }, [showExplorer, showDetailsColumn, showEditorColumn, showRunnerColumn]);

  const gridTemplate = useMemo(() => {
    const columns = [];
    if (showDetailsColumn) columns.push("minmax(280px,1fr)");
    else if (restorePreviewKey === "details") columns.push("10px");
    if (showEditorColumn) columns.push("minmax(0,2fr)");
    else if (restorePreviewKey === "editor") columns.push("10px");
    if (showRunnerColumn) columns.push("minmax(320px,1.2fr)");
    else if (restorePreviewKey === "console") columns.push("10px");
    return columns.length ? columns.join(" ") : "minmax(0,1fr)";
  }, [restorePreviewKey, showDetailsColumn, showEditorColumn, showRunnerColumn]);

  const toggleClass = (active) =>
    `rounded-full border px-3 py-1 text-xs font-semibold transition ${
      active
        ? "border-brand-400 bg-brand-500/20 text-brand-200"
        : "border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white"
    }`;

  return (
    <div className="min-h-0 flex-1 flex-col space-y-2 w-full">
      <div className="flex flex-col gap-4 lg:flex-row w-full justify-between">
        <StickyToggleBar
          showTOC={showDetailsColumn}
          showHandbook={true}
          showEditor={showEditorColumn}
          showConsole={showRunnerColumn}
          onToggleTOC={() => setShowDetailsColumn((value) => !value)}
          onToggleHandbook={() => {}}
          onToggleEditor={() => setShowEditorColumn((value) => !value)}
          onToggleConsole={() => setShowRunnerColumn((value) => !value)}
          tocOffLabel="Show details"
          tocShortLabel="Details"
          tocKind="details"
          editorOffLabel="Show editor"
          editorShortLabel="Editor"
          consoleOffLabel="Show preview"
          consoleShortLabel="Preview"
        />
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

      {isDesktop ? (
      <div className="w-screen ml-[calc(50%-50vw)] mr-[calc(50%-50vw)]">
        <div
          className="grid grid-cols-1 gap-6 px-4 sm:px-6 lg:px-8 lg:[grid-template-columns:var(--challenge-grid-template)]"
          style={{ "--challenge-grid-template": gridTemplate }}
        >
          {showDetailsColumn ? (
            <DesktopPanel
              as="article"
              panelKey="toc"
              tocKind="details"
              eyebrow="Challenge"
              title="Details"
              onHide={() => setShowDetailsColumn(false)}
              variant="plain"
              className="prose prose-invert max-w-none text-slate-300"
              bodyClassName="pt-4"
            >
              <div className="not-prose mb-5 flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-slate-400">
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

              <div className="mb-5 space-y-2">
                <p className="not-prose text-xs uppercase tracking-widest text-brand-300">Challenge</p>
                <h2>{challenge.title}</h2>
              </div>

              <div className="not-prose mb-5">
                <StandardsBadges standards={challenge.standards} size="sm" />
              </div>

              <Markdown className="text-slate-300">
                {descriptionCopy}
              </Markdown>

              {Array.isArray(challenge.userStories) && challenge.userStories.length > 0 ? (
                <div className="mt-6">
                  <h3>User stories</h3>
                  <ul>
                    {challenge.userStories.map((story, idx) => (
                      <li key={idx}>{story}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {Array.isArray(challenge.acceptanceCriteria) && challenge.acceptanceCriteria.length > 0 ? (
                <div className="mt-6">
                  <h3>Acceptance criteria</h3>
                  <ul>
                    {challenge.acceptanceCriteria.map((rule, idx) => (
                      <li key={idx}>{rule}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </DesktopPanel>
          ) : restorePreviewKey === "details" ? (
            <DesktopRestorePreview panelKey="toc" tocKind="details" />
          ) : null}

          {showEditorColumn ? (
            <DesktopPanel
              panelKey="editor"
              eyebrow="Workspace"
              title="Editor"
              onHide={() => setShowEditorColumn(false)}
              actions={
                <div className="flex items-center gap-2">
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
              }
            >
              <MonacoWorkspace
                files={files}
                folders={folders}
                resetKey={resetKey}
                onChange={onFileChange}
                onCreateFile={onCreateFile}
                onCreateFolder={onCreateFolder}
                onRename={onRename}
                onDelete={onDelete}
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
            </DesktopPanel>
          ) : restorePreviewKey === "editor" ? (
            <DesktopRestorePreview panelKey="editor" />
          ) : null}

          {showRunnerColumn ? (
            <DesktopPanel
              panelKey="console"
              eyebrow="Run"
              title="Preview"
              onHide={() => setShowRunnerColumn(false)}
              bodyClassName="relative"
              actions={
                <>
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
                      onClick={() => setRightPanel(DIAGRAM_PANEL.PREVIEW)}
                      className={toggleClass(rightPanel === DIAGRAM_PANEL.PREVIEW)}
                    >
                      Preview
                    </button>
                    <button
                      type="button"
                      onClick={() => setRightPanel(DIAGRAM_PANEL.CONSOLE)}
                      className={toggleClass(rightPanel === DIAGRAM_PANEL.CONSOLE)}
                    >
                      Console
                    </button>
                    {diagramFiles.hasSequence ? (
                      <button
                        type="button"
                        onClick={() => setRightPanel(DIAGRAM_PANEL.SEQUENCE)}
                        className={toggleClass(rightPanel === DIAGRAM_PANEL.SEQUENCE)}
                      >
                        Sequence Diagram
                      </button>
                    ) : null}
                    {diagramFiles.hasErd ? (
                      <button
                        type="button"
                        onClick={() => setRightPanel(DIAGRAM_PANEL.ERD)}
                        className={toggleClass(rightPanel === DIAGRAM_PANEL.ERD)}
                      >
                        ERD
                      </button>
                    ) : null}
                  </div>
                </>
              }
            >
                <div className={`absolute inset-0 ${rightPanel === DIAGRAM_PANEL.PREVIEW ? "z-10" : "z-0 invisible"}`}>
                  {srcDoc ? (
                    <div style={{ position: "relative", height: "100%", width: "100%" }}>
                      <iframe
                        ref={iframeRef}
                        title="preview"
                        className={`h-full w-full bg-white transition-all duration-300 ${previewFullScreen ? "fixed top-0 left-0 w-screen h-screen z-50 rounded-none border-none" : ""}`}
                        style={previewFullScreen ? { border: "none", borderRadius: 0, margin: 0, padding: 0 } : {}}
                        sandbox="allow-scripts allow-modals allow-forms allow-pointer-lock allow-popups allow-same-origin"
                        srcDoc={injectPreviewFullscreenButton(srcDoc)}
                      />
                      {previewFullScreen && (
                        <button
                          type="button"
                          onClick={() => setPreviewFullScreen(false)}
                          className="fixed top-4 right-4 z-[100] rounded bg-slate-900/80 px-4 py-2 text-white shadow hover:bg-slate-800"
                          style={{ fontSize: 18 }}
                          aria-label="Exit full screen"
                        >
                          × Exit Full Screen
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="flex h-full items-center justify-center px-6 text-center text-sm text-slate-400">
                      Click Run preview to build and load your project.
                    </div>
                  )}
                </div>
                <div className={`absolute inset-0 ${rightPanel === DIAGRAM_PANEL.CONSOLE ? "z-10" : "z-0 invisible"}`}>
                  <ConsolePanel key={consoleKey} />
                </div>
                <div className={`absolute inset-0 ${rightPanel === DIAGRAM_PANEL.SEQUENCE ? "z-10" : "z-0 invisible"}`}>
                  <DiagramPanel
                    title="Sequence Diagram"
                    source={diagramFiles.sequence?.code || ""}
                    emptyMessage="Add /sequenceDiagram.mmd to this challenge to render a sequence diagram."
                  />
                </div>
                <div className={`absolute inset-0 ${rightPanel === DIAGRAM_PANEL.ERD ? "z-10" : "z-0 invisible"}`}>
                  <DiagramPanel
                    title="ERD"
                    source={dbmlToMermaidEr(diagramFiles.erd?.code || "")}
                    emptyMessage="Add /erd.dbml to this challenge to render an ERD."
                  />
              </div>
            </DesktopPanel>
          ) : restorePreviewKey === "console" ? (
            <DesktopRestorePreview panelKey="console" />
          ) : null}
        </div>
      </div>
      ) : (
        <div className="space-y-3">
          <MobileAccordion title="Details" eyebrow="Challenge" defaultOpen stickyHeader>
            <article className="prose prose-invert max-w-none text-slate-300">
              <div className="not-prose mb-5 flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-slate-400">
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

              <div className="mb-5 space-y-2">
                <p className="not-prose text-xs uppercase tracking-widest text-brand-300">Challenge</p>
                <h2>{challenge.title}</h2>
              </div>

              <div className="not-prose mb-5">
                <StandardsBadges standards={challenge.standards} size="sm" />
              </div>

              <Markdown className="text-slate-300">
                {descriptionCopy}
              </Markdown>

              {Array.isArray(challenge.userStories) && challenge.userStories.length > 0 ? (
                <div className="mt-6">
                  <h3>User stories</h3>
                  <ul>
                    {challenge.userStories.map((story, idx) => (
                      <li key={idx}>{story}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {Array.isArray(challenge.acceptanceCriteria) && challenge.acceptanceCriteria.length > 0 ? (
                <div className="mt-6">
                  <h3>Acceptance criteria</h3>
                  <ul>
                    {challenge.acceptanceCriteria.map((rule, idx) => (
                      <li key={idx}>{rule}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </article>
          </MobileAccordion>

          <MobileAccordion title="Editor" eyebrow="Workspace" defaultOpen stickyHeader contentClassName="p-0">
            <section className="flex h-[70vh] min-h-[420px] flex-col overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 px-4 py-3">
                <p className="text-xs uppercase tracking-widest text-brand-300">Editor</p>
                <button
                  type="button"
                  onClick={() => setShowExplorer((value) => !value)}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                    showExplorer
                      ? "border-brand-400 bg-brand-500/20 text-brand-200"
                      : "border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white"
                  }`}
                >
                  {showExplorer ? "Hide files" : "Show files"}
                </button>
              </div>
              <div className="min-h-0 grow">
                <MonacoWorkspace
                  files={files}
                  folders={folders}
                  resetKey={resetKey}
                  onChange={onFileChange}
                  onCreateFile={onCreateFile}
                  onCreateFolder={onCreateFolder}
                  onRename={onRename}
                  onDelete={onDelete}
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
          </MobileAccordion>

          <MobileAccordion title="Preview" eyebrow="Run" stickyHeader contentClassName="p-0">
            <section className="flex h-[70vh] min-h-[420px] flex-col overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 px-4 py-3">
                <button
                  type="button"
                  onClick={handleRun}
                  className="inline-flex items-center rounded-full border border-emerald-500/40 px-4 py-2 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/10"
                  title="Build and load the preview"
                >
                  Run preview
                </button>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                  <button type="button" onClick={() => setRightPanel(DIAGRAM_PANEL.PREVIEW)} className={toggleClass(rightPanel === DIAGRAM_PANEL.PREVIEW)}>
                    Preview
                  </button>
                  <button type="button" onClick={() => setRightPanel(DIAGRAM_PANEL.CONSOLE)} className={toggleClass(rightPanel === DIAGRAM_PANEL.CONSOLE)}>
                    Console
                  </button>
                  {diagramFiles.hasSequence ? (
                    <button type="button" onClick={() => setRightPanel(DIAGRAM_PANEL.SEQUENCE)} className={toggleClass(rightPanel === DIAGRAM_PANEL.SEQUENCE)}>
                      Sequence
                    </button>
                  ) : null}
                  {diagramFiles.hasErd ? (
                    <button type="button" onClick={() => setRightPanel(DIAGRAM_PANEL.ERD)} className={toggleClass(rightPanel === DIAGRAM_PANEL.ERD)}>
                      ERD
                    </button>
                  ) : null}
                </div>
              </div>
              <div className="relative min-h-0 grow">
                <div className={`absolute inset-0 ${rightPanel === DIAGRAM_PANEL.PREVIEW ? "z-10" : "z-0 invisible"}`}>
                  {srcDoc ? (
                    <iframe
                      ref={iframeRef}
                      title="preview"
                      className={`h-full w-full bg-white transition-all duration-300 ${previewFullScreen ? "fixed top-0 left-0 w-screen h-screen z-50 rounded-none border-none" : ""}`}
                      style={previewFullScreen ? { border: "none", borderRadius: 0, margin: 0, padding: 0 } : {}}
                      sandbox="allow-scripts allow-modals allow-forms allow-pointer-lock allow-popups allow-same-origin"
                      srcDoc={injectPreviewFullscreenButton(srcDoc)}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center px-6 text-center text-sm text-slate-400">
                      Click Run preview to build and load your project.
                    </div>
                  )}
                </div>
                <div className={`absolute inset-0 ${rightPanel === DIAGRAM_PANEL.CONSOLE ? "z-10" : "z-0 invisible"}`}>
                  <ConsolePanel key={consoleKey} />
                </div>
                <div className={`absolute inset-0 ${rightPanel === DIAGRAM_PANEL.SEQUENCE ? "z-10" : "z-0 invisible"}`}>
                  <DiagramPanel
                    title="Sequence Diagram"
                    source={diagramFiles.sequence?.code || ""}
                    emptyMessage="Add /sequenceDiagram.mmd to this challenge to render a sequence diagram."
                  />
                </div>
                <div className={`absolute inset-0 ${rightPanel === DIAGRAM_PANEL.ERD ? "z-10" : "z-0 invisible"}`}>
                  <DiagramPanel
                    title="ERD"
                    source={dbmlToMermaidEr(diagramFiles.erd?.code || "")}
                    emptyMessage="Add /erd.dbml to this challenge to render an ERD."
                  />
                </div>
              </div>
            </section>
          </MobileAccordion>
        </div>
      )}
    </div>
  );
}

function injectPreviewFullscreenButton(srcDoc) {
  if (!/<body[^>]*>/i.test(srcDoc)) return srcDoc;
  const btnScript = `
    <style>
      #__fullscreen-btn__ {
        position: fixed;
        top: 16px;
        right: 16px;
        z-index: 2147483647;
        background: rgba(30,41,59,0.85);
        color: #fff;
        border: none;
        border-radius: 6px;
        padding: 8px 14px;
        font-size: 15px;
        font-family: inherit;
        cursor: pointer;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s;
      }
      #__fullscreen-btn__.visible {
        opacity: 1;
        pointer-events: auto;
      }
    </style>
    <button id="__fullscreen-btn__" tabindex="0" aria-label="Full screen preview">⛶ Full Screen</button>
    <script>
      (function(){
        var btn = document.getElementById("__fullscreen-btn__");
        var hideTimer = null;
        function showBtn() {
          if (!btn) return;
          btn.classList.add("visible");
          clearTimeout(hideTimer);
          hideTimer = setTimeout(function () {
            if (!btn.matches(":hover")) btn.classList.remove("visible");
          }, 1800);
        }
        document.addEventListener("mousemove", showBtn);
        btn.addEventListener("mouseenter", function(){
          clearTimeout(hideTimer);
          btn.classList.add("visible");
        });
        btn.addEventListener("mouseleave", function(){
          hideTimer = setTimeout(function () { btn.classList.remove("visible"); }, 800);
        });
        btn.addEventListener("click", function(){
          window.parent.postMessage("__PREVIEW_FULLSCREEN__", "*");
        });
      })();
    </script>
  `;
  return srcDoc.replace(/(<body[^>]*>)/i, "$1" + btnScript);
}
