import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import MonacoWorkspace from "./MonacoWorkspace";
import ConsolePanel from "./ConsolePanel";
import DiagramPanel from "./DiagramPanel";
import PanelHideButton from "./PanelHideButton";
import MobileAccordion from "./MobileAccordion";
import { toSandpackFiles } from "../lib/sandpackAdapter";
import { buildSrcDoc } from "../lib/buildSrcDoc";
import { dbmlToMermaidEr } from "../lib/dbmlToMermaidEr";
import { DIAGRAM_PANEL, getDiagramFiles, isValidPanelForFiles } from "../lib/diagramFiles";
import useMediaQuery from "../hooks/useMediaQuery";

export default function HandbookWorkbench({
  entry,
  showEditor = true,
  showRunner = false,
  showConsole,
  onShowRunnerChange,
  onHideEditor,
  onHideRunner,
}) {
  const [showFiles, setShowFiles] = useState(false);
  const [bottomPanel, setBottomPanel] = useState(entry?.sandbox?.defaultPanel || DIAGRAM_PANEL.CONSOLE);
  const storageKey = entry ? (entry.standard ? `handbook:${entry.standard}:${entry.id}` : `project:${entry.id}`) : null;
  const [savedSnapshot, setSavedSnapshot] = useState({});

  useEffect(() => {
    if (!storageKey) {
      setSavedSnapshot({});
      return;
    }
    try {
      const raw = localStorage.getItem(storageKey);
      const parsed = raw ? JSON.parse(raw) : {};
      const obj = {};
      Object.entries(parsed || {}).forEach(([path, value]) => {
        obj[path] = String(value && typeof value === "object" && "code" in value ? value.code ?? "" : value ?? "");
      });
      setSavedSnapshot(obj);
    } catch {
      setSavedSnapshot({});
    }
  }, [storageKey]);

  const savedFilesForEntry = useMemo(() => {
    const mapped = {};
    Object.entries(savedSnapshot).forEach(([path, code]) => {
      mapped[path] = { code: String(code ?? "") };
    });
    return mapped;
  }, [savedSnapshot]);

  const model = useMemo(() => {
    if (!entry) return null;
    const fileMap = {};
    for (const file of entry.files || []) {
      fileMap[file.path] = {
        code: String(file.content ?? ""),
        readOnly: Boolean(file.readOnly),
        hidden: Boolean(file.hidden),
        active: Boolean(file.active),
      };
    }

    const challengeLike = {
      id: `handbook:${entry.standard}:${entry.id}`,
      template: "vanilla",
      files: fileMap,
      entry: entry.entry || "/index.html",
      mock: entry.mock,
      tags: entry.mock ? ["mock-fetch"] : [],
    };

    const files = toSandpackFiles(challengeLike, savedFilesForEntry, {
      challengeId: challengeLike.id,
      apiSeed: challengeLike.mock?.apiSeed,
      mockNet: challengeLike.mock?.mockNet,
    });
    const visibleFiles = Object.keys(files).filter((path) => !files[path].hidden);
    const activeFile = visibleFiles.find((path) => files[path].active) || visibleFiles[0];
    Object.keys(files).forEach((path) => {
      files[path].active = path === activeFile;
    });
    return { files, entry: challengeLike.entry, activeFile };
  }, [entry, savedFilesForEntry]);

  const [filesState, setFilesState] = useState(model?.files || {});
  const [, setActiveFile] = useState(model?.activeFile || null);
  const [srcDoc, setSrcDoc] = useState("");
  const [previewFullScreen, setPreviewFullScreen] = useState(false);
  const editorRef = useRef(null);
  const iframeRef = useRef(null);
  const [consoleKey, setConsoleKey] = useState(0);
  const diagramFiles = useMemo(() => getDiagramFiles(filesState), [filesState]);
  const runnerVisible = showConsole ?? showRunner;
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    if (!model) return;
    const preferredPanel = entry?.sandbox?.defaultPanel || DIAGRAM_PANEL.CONSOLE;
    setFilesState(model.files);
    setActiveFile(model.activeFile);
    setSrcDoc("");
    setBottomPanel(isValidPanelForFiles(preferredPanel, model.files) ? preferredPanel : DIAGRAM_PANEL.CONSOLE);
  }, [model, entry?.sandbox?.defaultPanel]);

  useEffect(() => {
    if (!isValidPanelForFiles(bottomPanel, filesState)) {
      const preferredPanel = entry?.sandbox?.defaultPanel || DIAGRAM_PANEL.CONSOLE;
      setBottomPanel(isValidPanelForFiles(preferredPanel, filesState) ? preferredPanel : DIAGRAM_PANEL.CONSOLE);
    }
  }, [bottomPanel, filesState, entry?.sandbox?.defaultPanel]);

  useEffect(() => {
    let raf1 = 0;
    let raf2 = 0;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        try {
          editorRef.current?.layout();
        } catch (error) {
          void error;
        }
      });
    });
    return () => {
      if (raf1) cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
    };
  }, [showEditor, runnerVisible, showFiles]);

  const handleRun = useCallback(() => {
    if (!model) return;
    try {
      setConsoleKey((key) => key + 1);
      const html = buildSrcDoc({ files: filesState, entry: model.entry });
      setSrcDoc(html);
      onShowRunnerChange?.(true);
    } catch (error) {
      console.error("Preview build failed", error);
    }
  }, [filesState, model, onShowRunnerChange]);

  const pendingSaveRef = useRef({});
  const saveTimerRef = useRef(null);

  const flushSave = useCallback(() => {
    clearTimeout(saveTimerRef.current);
    saveTimerRef.current = null;
    if (!storageKey || Object.keys(pendingSaveRef.current).length === 0) return;
    try {
      const snapshot = JSON.parse(localStorage.getItem(storageKey) || "{}");
      Object.assign(snapshot, pendingSaveRef.current);
      localStorage.setItem(storageKey, JSON.stringify(snapshot));
      const flushed = pendingSaveRef.current;
      pendingSaveRef.current = {};
      setSavedSnapshot((prev) => ({ ...prev, ...flushed }));
    } catch {
      // Ignore storage errors; edits still live in component state for this session.
    }
  }, [storageKey]);

  useEffect(() => flushSave, [flushSave]);

  const onChange = useCallback((path, code) => {
    setFilesState((prev) => ({ ...prev, [path]: { ...prev[path], code } }));
    if (!storageKey) return;
    pendingSaveRef.current[path] = code;
    clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(flushSave, 500);
  }, [storageKey, flushSave]);

  useEffect(() => {
    function handleMsg(event) {
      if (event?.data === "__PREVIEW_FULLSCREEN__") setPreviewFullScreen((value) => !value);
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

  const toggleClass = (active) =>
    `rounded-full border px-3 py-1 transition ${
      active
        ? "border-brand-400 bg-brand-500/20 text-brand-200"
        : "border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white"
    }`;

  if (!entry || !model) {
    return (
      <section className={showEditor ? "rounded border border-slate-800 p-3 text-sm text-slate-300" : "hidden"}>
        Select a standard to load its editor.
      </section>
    );
  }

  const editorPanel = (
    <section className={isDesktop ? "sticky top-[4rem] flex h-[calc(100vh-8rem)] min-h-[480px] flex-col self-start overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 animate-fade-in" : "flex h-[70vh] min-h-[420px] flex-col overflow-hidden"}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 px-4 py-3 text-xs text-slate-400">
        <p className="text-xs uppercase tracking-widest text-brand-300">Editor</p>
        <div className="flex items-center gap-2">
          {onHideEditor ? (
            <PanelHideButton label="Hide editor" onClick={onHideEditor} />
          ) : null}
          <button
            type="button"
            onClick={() => setShowFiles((value) => !value)}
            className={toggleClass(showFiles)}
          >
            {showFiles ? "Hide" : "Show"} files
          </button>
          <button
            type="button"
            onClick={handleRun}
            className="rounded-full border border-emerald-500/40 px-3 py-1 text-emerald-300 transition hover:bg-emerald-500/10"
            title="Build and run the preview"
          >
            Run
          </button>
        </div>
      </div>
      <div className="min-h-0 grow">
        <MonacoWorkspace
          files={filesState}
          onChange={onChange}
          onActiveChange={(path) => setActiveFile(path)}
          showExplorer={showFiles}
          className="h-full flex-1"
          onEditorMount={(editor) => {
            editorRef.current = editor;
            try {
              editor.layout();
            } catch (error) {
              void error;
            }
          }}
        />
      </div>
    </section>
  );

  const runnerPanel = runnerVisible ? (
    <section className={isDesktop ? "sticky top-[4rem] flex h-[calc(100vh-8rem)] min-h-[480px] flex-col self-start overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 animate-fade-in" : "flex h-[70vh] min-h-[420px] flex-col overflow-hidden"}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 px-4 py-3 text-xs text-slate-400">
        {onHideRunner ? (
          <PanelHideButton label="Hide console" onClick={onHideRunner} />
        ) : (
          <span />
        )}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setBottomPanel(DIAGRAM_PANEL.PREVIEW)}
            className={toggleClass(bottomPanel === DIAGRAM_PANEL.PREVIEW)}
          >
            Preview
          </button>
          <button
            type="button"
            onClick={() => setBottomPanel(DIAGRAM_PANEL.CONSOLE)}
            className={toggleClass(bottomPanel === DIAGRAM_PANEL.CONSOLE)}
          >
            Console
          </button>
          {diagramFiles.hasSequence ? (
            <button
              type="button"
              onClick={() => setBottomPanel(DIAGRAM_PANEL.SEQUENCE)}
              className={toggleClass(bottomPanel === DIAGRAM_PANEL.SEQUENCE)}
            >
              Sequence Diagram
            </button>
          ) : null}
          {diagramFiles.hasErd ? (
            <button
              type="button"
              onClick={() => setBottomPanel(DIAGRAM_PANEL.ERD)}
              className={toggleClass(bottomPanel === DIAGRAM_PANEL.ERD)}
            >
              ERD
            </button>
          ) : null}
        </div>
      </div>
      <div className="relative min-h-0 grow overflow-hidden">
        <div className={`absolute inset-0 ${bottomPanel === DIAGRAM_PANEL.PREVIEW ? "z-10" : "z-0 invisible"}`}>
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
                  Exit Full Screen
                </button>
              )}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center px-6 text-center text-sm text-slate-400">
              Click Run to build and load the preview.
            </div>
          )}
        </div>
        <div className={`absolute inset-0 ${bottomPanel === DIAGRAM_PANEL.CONSOLE ? "z-10" : "z-0 invisible"}`}>
          <ConsolePanel key={consoleKey} compact={false} />
        </div>
        <div className={`absolute inset-0 ${bottomPanel === DIAGRAM_PANEL.SEQUENCE ? "z-10" : "z-0 invisible"}`}>
          <DiagramPanel
            title="Sequence Diagram"
            source={diagramFiles.sequence?.code || ""}
            emptyMessage="Add /sequenceDiagram.mmd to this workspace to render a sequence diagram."
          />
        </div>
        <div className={`absolute inset-0 ${bottomPanel === DIAGRAM_PANEL.ERD ? "z-10" : "z-0 invisible"}`}>
          <DiagramPanel
            title="ERD"
            source={dbmlToMermaidEr(diagramFiles.erd?.code || "")}
            emptyMessage="Add /erd.dbml to this workspace to render an ERD."
          />
        </div>
      </div>
    </section>
  ) : null;

  if (!isDesktop) {
    return (
      <div className="space-y-3">
        <MobileAccordion title="Editor" eyebrow="Workspace" defaultOpen contentClassName="p-0">
          {editorPanel}
        </MobileAccordion>
        <MobileAccordion title="Preview" eyebrow="Run" contentClassName="p-0">
          {runnerPanel || (
            <div className="px-4 py-6 text-sm text-slate-400">
              Run the editor to open the preview.
            </div>
          )}
        </MobileAccordion>
      </div>
    );
  }

  return (
    <>
      {editorPanel}
      {runnerPanel}
    </>
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
    <button id="__fullscreen-btn__" tabindex="0" aria-label="Full screen preview">Full Screen</button>
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
