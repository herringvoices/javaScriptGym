import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import MonacoWorkspace from "./MonacoWorkspace";
import ConsolePanel from "./ConsolePanel";
import { toSandpackFiles } from "../lib/sandpackAdapter";
import { buildSrcDoc } from "../lib/buildSrcDoc";

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
  const [bottomPanel, setBottomPanel] = useState("console");
  const [compactConsole, setCompactConsole] = useState(true);
  // Storage scope: default to handbook when a standard is provided, otherwise project scope
  const storageKey = entry ? (entry.standard ? `handbook:${entry.standard}:${entry.id}` : `project:${entry.id}`) : null;

  const savedFilesForEntry = useMemo(() => {
    if (!storageKey) return {};
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      const mapped = {};
      Object.entries(parsed).forEach(([path, code]) => {
        mapped[path] = { code: String(code ?? "") };
      });
      return mapped;
    } catch {
      return {};
    }
  }, [storageKey]);

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
  const iframeRef = useRef(null);
  const [consoleKey, setConsoleKey] = useState(0);

  useEffect(() => {
    if (!model) return;
    setFilesState(model.files);
    setActiveFile(model.activeFile);
    setSrcDoc(""); // don't auto-run when switching entries
  }, [model]);

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

  const onChange = useCallback((path, code) => {
    setFilesState((prev) => ({ ...prev, [path]: { ...prev[path], code } }));
    if (!storageKey) return;
    try {
      const snapshot = JSON.parse(localStorage.getItem(storageKey) || "{}");
      snapshot[path] = code;
      localStorage.setItem(storageKey, JSON.stringify(snapshot));
    } catch {
      // ignore storage errors
    }
  }, [storageKey]);

  if (!entry || !model) {
    return (
      <div className="rounded border border-slate-800 p-3 text-sm text-slate-300">Select a standard to load its editor.</div>
    );
  }

  // We keep a single fixed-height container and adjust the console area's height
  // so the editor grows/shrinks instead of reflowing the console to the end.

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
            onClick={() => setBottomPanel("preview")}
            className={`rounded-full border px-3 py-1 transition ${
              bottomPanel === "preview"
                ? "border-brand-400 bg-brand-500/20 text-brand-200"
                : "border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white"
            }`}
          >
            Preview
          </button>
          <button
            type="button"
            onClick={() => setBottomPanel("console")}
            className={`rounded-full border px-3 py-1 transition ${
              bottomPanel === "console"
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

      {/* Fixed-height bordered container that contains editor (flex-1) and console (fixed height) */}
      <div className="rounded-lg border border-slate-800 overflow-hidden">
        <div className="flex h-[540px] min-h-0 flex-col">
          <div className="flex min-h-0 w-full flex-1 border-b border-slate-800">
            <MonacoWorkspace
              files={filesState}
              onChange={onChange}
              onActiveChange={(p) => setActiveFile(p)}
              showExplorer={showFiles}
              className="flex-1"
            />
          </div>
          <div
            className={`${showConsole ? "h-[220px]" : "h-0"} relative w-full transition-[height] duration-200 ease-in-out`}
            aria-hidden={!showConsole}
          >
            <div className={bottomPanel === "preview" ? "h-full" : "pointer-events-none absolute inset-0 h-0 overflow-hidden"}>
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
            <div className={bottomPanel === "console" ? "h-full" : "pointer-events-none absolute inset-0 h-0 overflow-hidden"}>
              <ConsolePanel key={consoleKey} compact={compactConsole} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
