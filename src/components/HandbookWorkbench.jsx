import React, { useEffect, useRef, useState } from "react";
import { EditorView } from "@codemirror/view";
import { dracula } from "@codesandbox/sandpack-themes";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackConsole,
  SandpackFileExplorer,
  useSandpack,
} from "@codesandbox/sandpack-react";
import { getDefaultEditorExtensions } from "../lib/editorExtensions";
import { toSandpackFiles } from "../lib/sandpackAdapter";

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
export default function HandbookWorkbench({ entry }) {
  const [showFiles, setShowFiles] = useState(true);
  const [bottomPanel, setBottomPanel] = useState("console"); // "console" | "preview"
  const storageKey = entry ? `handbook:${entry.standard}:${entry.id}` : null;

  // Load any saved edits for this entry from localStorage
  const savedFilesForEntry = React.useMemo(() => {
    if (!storageKey) return {};
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return {};
      const parsed = JSON.parse(raw); // { "/path": "code", ... }
      const mapped = {};
      Object.entries(parsed).forEach(([path, code]) => {
        mapped[path] = { code: String(code ?? "") };
      });
      return mapped;
    } catch {
      return {};
    }
  }, [storageKey]);

  // Build a pseudo-challenge to leverage the Sandpack adapter (fetch mock, bridge, etc)
  const challengeLike = React.useMemo(() => {
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

    const template = "vanilla"; // DOM/vanilla default for handbook entries
    const tagList = entry.mock ? ["mock-fetch"] : [];

    return {
      id: `handbook:${entry.standard}:${entry.id}`,
      template,
      files: fileMap,
      entry: entry.entry || "/index.html",
      mock: entry.mock,
      tags: tagList,
      sandbox: {},
    };
  }, [entry]);

  const sandpackSetup = React.useMemo(() => {
    if (!challengeLike) return null;
    const files = toSandpackFiles(challengeLike, savedFilesForEntry, {
      challengeId: challengeLike.id,
      apiSeed: challengeLike.mock?.apiSeed,
      mockNet: challengeLike.mock?.mockNet,
    });

    const visibleFiles = Object.keys(files).filter((p) => !files[p].hidden);
    const activeFile = visibleFiles.find((p) => files[p].active) || visibleFiles[0];
    Object.keys(files).forEach((p) => {
      files[p].active = p === activeFile;
    });

    return {
      template: challengeLike.template,
      files,
      customSetup: { entry: challengeLike.entry },
      options: { visibleFiles, activeFile },
    };
  }, [challengeLike, savedFilesForEntry]);

  if (!entry || !sandpackSetup) {
    return (
      <div className="rounded border border-slate-800 p-3 text-sm text-slate-300">Select a standard to load its editor.</div>
    );
  }

  return (
    // Increase base font size for all Sandpack panes (explicit values to avoid theme overrides)
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
        </div>
      </div>

      <SandpackProvider
        template={sandpackSetup.template}
        files={sandpackSetup.files}
        customSetup={sandpackSetup.customSetup}
        theme={dracula}
        options={{
          ...sandpackSetup.options,
          showLineNumbers: true,
          wrapContent: true,
          editorHeight: 360,
          recompileMode: "delayed",
          recompileDelay: 600,
        }}
      >
        <WorkbenchLayout showFiles={showFiles} bottomPanel={bottomPanel} storageKey={storageKey} />
      </SandpackProvider>
    </div>
  );
}

function WorkbenchLayout({ showFiles, bottomPanel, storageKey }) {
  const { listen, sandpack } = useSandpack();
  const [consoleKey, setConsoleKey] = useState(0);
  const saveTimerRef = useRef(null);

  useEffect(() => {
    if (!listen) return undefined;
    const unsub = listen((message) => {
      if (message.type === "sandpack/status" && message.status === "running") {
        // Clear console whenever a fresh run starts
        setConsoleKey((k) => k + 1);
      }
    });
    return () => unsub?.();
  }, [listen]);

  // Persist current editor files (debounced) to localStorage
  useEffect(() => {
    if (!storageKey) return;
    const files = sandpack?.files || {};
    // Debounce to avoid excessive writes while typing
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      try {
        const snapshot = {};
        Object.entries(files).forEach(([path, spec]) => {
          // Skip injected bridge/mocks and internal files
          if (path.startsWith("/__")) return;
          if (spec && typeof spec.code === "string") {
            snapshot[path] = spec.code;
          }
        });
        localStorage.setItem(storageKey, JSON.stringify(snapshot));
      } catch {
        // ignore quota/privacy errors
      }
    }, 300);
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [sandpack?.files, storageKey]);

  return (
    <SandpackLayout className="flex flex-col gap-0">
      {/* Row 1: files + editor */}
      <div className="flex min-h-[280px] w-full border-b border-slate-800">
        {showFiles ? (
          <div className="hidden min-w-[200px] max-w-[240px] border-r border-slate-800 bg-slate-950/80 lg:block">
            <SandpackFileExplorer autoHiddenFiles style={{ height: "100%", fontSize: "var(--sp-font-size)" }} />
          </div>
        ) : null}
        <SandpackCodeEditor
          showTabs
          showLineNumbers
          showInlineErrors
          wrapContent
          extensions={[
            ...getDefaultEditorExtensions(),
            // Drive editor font size from the same CSS var as other panes
            EditorView.theme(
              {
                "&": { fontSize: "1.25rem", lineHeight: "1.6" },
                ".cm-content": {
                  fontSize: "1.25rem",
                  whiteSpace: "pre-wrap",
                  overflowWrap: "anywhere",
                },
                ".cm-line": { wordBreak: "break-word" },
                ".cm-gutters": { fontSize: "1.25rem" },
              },
              { dark: true }
            ),
          ]}
          style={{ height: "100%" }}
          className="flex-1"
        />
      </div>

      {/* Row 2: preview OR console (keep both mounted, toggle visibility) */}
      <div className="relative min-h-[220px] w-full">
        <div className={bottomPanel === "preview" ? "h-full" : "pointer-events-none absolute inset-0 h-0 overflow-hidden"}>
          <SandpackPreview showOpenInCodeSandbox={false} showRefreshButton style={{ height: "100%" }} />
        </div>
        <div className={bottomPanel === "console" ? "h-full" : "pointer-events-none absolute inset-0 h-0 overflow-hidden"}>
          <SandpackConsole
            key={consoleKey}
            showHeader
            showSyntaxError
            resetOnPreviewRestart
            style={{ height: "100%", fontSize: "1.25rem" }}
          />
        </div>
      </div>
    </SandpackLayout>
  );
}
