import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import MonacoWorkspace from "./MonacoWorkspace";
import ConsolePanel from "./ConsolePanel";
import DiagramPanel from "./DiagramPanel";
import { toSandpackFiles } from "../lib/sandpackAdapter";
import { buildSrcDoc } from "../lib/buildSrcDoc";
import { dbmlToMermaidEr } from "../lib/dbmlToMermaidEr";
import { DIAGRAM_PANEL, getDiagramFiles, isValidPanelForFiles } from "../lib/diagramFiles";

const CONSOLE_HEIGHT = 220;

/**
 * HandbookWorkbench
 * Renders a two-row editor experience for a HandbookEntry:
 *  - Row 1: optional files list + editor
 *  - Row 2: Preview OR Console (toggle)
 *
 * Props:
 *  - entry: {
 *      id, standard,
 *      files: Array<{ path, content, readOnly?, hidden?, active? }>,
 *      entry: string,
 *      sandbox?: { runtime?: string },
 *      mock?: { apiSeed?: any, mockNet?: { slowMs?: number, failOnFirst?: boolean } }
 *    } | null
 */
export default function HandbookWorkbench({ entry, showConsole = true }) {
  const [showFiles, setShowFiles] = useState(false);
  const [bottomPanel, setBottomPanel] = useState(entry?.sandbox?.defaultPanel || DIAGRAM_PANEL.CONSOLE);
  // Removed compactConsole state
  // Storage scope: default to handbook when a standard is provided, otherwise project scope
  const storageKey = entry ? (entry.standard ? `handbook:${entry.standard}:${entry.id}` : `project:${entry.id}`) : null;
  // Live snapshot of saved edits for this storageKey. This ensures step changes (same key) pick up latest edits.
  const [savedSnapshot, setSavedSnapshot] = useState({}); // Record<string,string>
  useEffect(() => {
    if (!storageKey) {
      setSavedSnapshot({});
      return;
    }
    try {
      const raw = localStorage.getItem(storageKey);
      const parsed = raw ? JSON.parse(raw) : {};
      // Ensure it's a plain object of path->string
      const obj = {};
      Object.entries(parsed || {}).forEach(([p, v]) => { obj[p] = String(v ?? ""); });
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
    for (const f of entry.files || []) {
      fileMap[f.path] = {
        code: String(f.content ?? ""),
        readOnly: Boolean(f.readOnly),
        hidden: Boolean(f.hidden),
        active: Boolean(f.active),
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
    const visibleFiles = Object.keys(files).filter((p) => !files[p].hidden);
    const activeFile = visibleFiles.find((p) => files[p].active) || visibleFiles[0];
    Object.keys(files).forEach((p) => { files[p].active = p === activeFile; });
    return { files, entry: challengeLike.entry, activeFile };
  }, [entry, savedFilesForEntry]);

  const [filesState, setFilesState] = useState(model?.files || {});
  const [, setActiveFile] = useState(model?.activeFile || null);
  const [srcDoc, setSrcDoc] = useState("");
  const [previewFullScreen, setPreviewFullScreen] = useState(false);
  const iframeRef = useRef(null);
  const [consoleKey, setConsoleKey] = useState(0);
  const diagramFiles = useMemo(() => getDiagramFiles(filesState), [filesState]);
  const consoleHeight = showConsole ? CONSOLE_HEIGHT : 0;
  const editorHeight = showConsole ? `calc(100% - ${CONSOLE_HEIGHT}px)` : "100%";

  useEffect(() => {
    if (!model) return;
    const preferredPanel = entry?.sandbox?.defaultPanel || DIAGRAM_PANEL.CONSOLE;
    setFilesState(model.files);
    setActiveFile(model.activeFile);
    setSrcDoc(""); // don't auto-run when switching entries
    setBottomPanel(isValidPanelForFiles(preferredPanel, model.files) ? preferredPanel : DIAGRAM_PANEL.CONSOLE);
  }, [model, entry?.sandbox?.defaultPanel]);

  useEffect(() => {
    if (!isValidPanelForFiles(bottomPanel, filesState)) {
      const preferredPanel = entry?.sandbox?.defaultPanel || DIAGRAM_PANEL.CONSOLE;
      setBottomPanel(isValidPanelForFiles(preferredPanel, filesState) ? preferredPanel : DIAGRAM_PANEL.CONSOLE);
    }
  }, [bottomPanel, filesState, entry?.sandbox?.defaultPanel]);

  const handleRun = useCallback(() => {
    if (!model) return;
    try {
      setConsoleKey((k) => k + 1); // clear console on run
      const html = buildSrcDoc({ files: filesState, entry: model.entry });
      setSrcDoc(html);
    } catch (e) {
      console.error("Preview build failed", e);
    }
  }, [filesState, model]);

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
      // ignore storage errors
    }
  }, [storageKey]);

  // Flush pending saves on unmount or storageKey change
  useEffect(() => flushSave, [flushSave]);

  const onChange = useCallback((path, code) => {
    setFilesState((prev) => ({ ...prev, [path]: { ...prev[path], code } }));
    if (!storageKey) return;
    pendingSaveRef.current[path] = code;
    clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(flushSave, 500);
  }, [storageKey, flushSave]);

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

  if (!entry || !model) {
    return (
      <div className="rounded border border-slate-800 p-3 text-sm text-slate-300">Select a standard to load its editor.</div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowFiles((v) => !v)}
            className={`rounded-full border px-3 py-1 transition ${
              showFiles
                ? "border-brand-400 bg-brand-500/20 text-brand-200"
                : "border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white"
            }`}
          >
            {showFiles ? "Hide" : "Show"} files
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
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setBottomPanel(DIAGRAM_PANEL.PREVIEW)}
            className={`rounded-full border px-3 py-1 transition ${
              bottomPanel === DIAGRAM_PANEL.PREVIEW
                ? "border-brand-400 bg-brand-500/20 text-brand-200"
                : "border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white"
            }`}
          >
            Preview
          </button>
          <button
            type="button"
            onClick={() => setBottomPanel(DIAGRAM_PANEL.CONSOLE)}
            className={`rounded-full border px-3 py-1 transition ${
              bottomPanel === DIAGRAM_PANEL.CONSOLE
                ? "border-brand-400 bg-brand-500/20 text-brand-200"
                : "border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white"
            }`}
          >
            Console
          </button>
          {diagramFiles.hasSequence ? (
            <button
              type="button"
              onClick={() => setBottomPanel(DIAGRAM_PANEL.SEQUENCE)}
              className={`rounded-full border px-3 py-1 transition ${
                bottomPanel === DIAGRAM_PANEL.SEQUENCE
                  ? "border-brand-400 bg-brand-500/20 text-brand-200"
                  : "border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white"
              }`}
            >
              Sequence Diagram
            </button>
          ) : null}
          {diagramFiles.hasErd ? (
            <button
              type="button"
              onClick={() => setBottomPanel(DIAGRAM_PANEL.ERD)}
              className={`rounded-full border px-3 py-1 transition ${
                bottomPanel === DIAGRAM_PANEL.ERD
                  ? "border-brand-400 bg-brand-500/20 text-brand-200"
                  : "border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white"
              }`}
            >
              ERD
            </button>
          ) : null}
          {/* Compact toggle removed */}
        </div>
      </div>

      <div
        className="overflow-hidden rounded-lg border border-slate-800"
        style={{ height: "calc(100vh - 195px)" }}
      >
        <div
          className="flex w-full border-b border-slate-800"
          style={{ height: editorHeight }}
        >
          <MonacoWorkspace
            files={filesState}
            onChange={onChange}
            onActiveChange={(p) => setActiveFile(p)}
            showExplorer={showFiles}
            className="h-full flex-1"
          />
        </div>
        <div
          className="relative w-full overflow-hidden transition-[height] duration-200 ease-in-out"
          aria-hidden={!showConsole}
          style={{ height: consoleHeight }}
        >
          <div className={bottomPanel === DIAGRAM_PANEL.PREVIEW ? "h-full" : "pointer-events-none absolute inset-0 h-0 overflow-hidden"}>
            {srcDoc ? (
              <div style={{position: "relative", height: "100%", width: "100%"}}>
                <iframe
                  ref={iframeRef}
                  title="preview"
                  className={`h-full w-full bg-white transition-all duration-300 ${previewFullScreen ? "fixed top-0 left-0 w-screen h-screen z-50 rounded-none border-none" : ""}`}
                  style={previewFullScreen ? {border: "none", borderRadius: 0, margin: 0, padding: 0} : {}}
                  sandbox="allow-scripts allow-modals allow-forms allow-pointer-lock allow-popups allow-same-origin"
                  srcDoc={injectPreviewFullscreenButton(srcDoc)}
                />
                {previewFullScreen && (
                  <button
                    type="button"
                    onClick={() => setPreviewFullScreen(false)}
                    className="fixed top-4 right-4 z-[100] rounded bg-slate-900/80 px-4 py-2 text-white shadow hover:bg-slate-800"
                    style={{fontSize: 18}}
                    aria-label="Exit full screen"
                  >
                    × Exit Full Screen
                  </button>
                )}
              </div>
            ) : (
              <div className="flex h-full items-center justify-center text-slate-400 text-sm">
                Click Run to build and load the preview…
              </div>
            )}
          </div>
          <div className={bottomPanel === DIAGRAM_PANEL.CONSOLE ? "h-full" : "pointer-events-none absolute inset-0 h-0 overflow-hidden"}>
            <ConsolePanel key={consoleKey} compact={false} />
          </div>
          <div className={bottomPanel === DIAGRAM_PANEL.SEQUENCE ? "h-full" : "pointer-events-none absolute inset-0 h-0 overflow-hidden"}>
            <DiagramPanel
              title="Sequence Diagram"
              source={diagramFiles.sequence?.code || ""}
              emptyMessage="Add /sequenceDiagram.mmd to this workspace to render a sequence diagram."
            />
          </div>
          <div className={bottomPanel === DIAGRAM_PANEL.ERD ? "h-full" : "pointer-events-none absolute inset-0 h-0 overflow-hidden"}>
            <DiagramPanel
              title="ERD"
              source={dbmlToMermaidEr(diagramFiles.erd?.code || "")}
              emptyMessage="Add /erd.dbml to this workspace to render an ERD."
            />
          </div>
        </div>
      </div>
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
