import React, { useEffect, useState } from "react";
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
    const files = toSandpackFiles(challengeLike, {}, {
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
  }, [challengeLike]);

  if (!entry || !sandpackSetup) {
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
        <WorkbenchLayout showFiles={showFiles} bottomPanel={bottomPanel} />
      </SandpackProvider>
    </div>
  );
}

function WorkbenchLayout({ showFiles, bottomPanel }) {
  const { listen } = useSandpack();
  const [consoleKey, setConsoleKey] = useState(0);

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

  return (
    <SandpackLayout className="flex flex-col gap-0">
      {/* Row 1: files + editor */}
      <div className="flex min-h-[280px] w-full border-b border-slate-800">
        {showFiles ? (
          <div className="hidden min-w-[200px] max-w-[240px] border-r border-slate-800 bg-slate-950/80 lg:block">
            <SandpackFileExplorer autoHiddenFiles style={{ height: "100%" }} />
          </div>
        ) : null}
        <SandpackCodeEditor
          showTabs
          showLineNumbers
          showInlineErrors
          wrapContent
          extensions={getDefaultEditorExtensions()}
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
          <SandpackConsole key={consoleKey} showHeader showSyntaxError resetOnPreviewRestart style={{ height: "100%" }} />
        </div>
      </div>
    </SandpackLayout>
  );
}
