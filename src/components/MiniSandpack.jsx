import React, { useEffect, useRef, useState, useCallback } from "react";
import { sandpackDark } from "@codesandbox/sandpack-themes"; // theme object
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackConsole,
} from "@codesandbox/sandpack-react";
import { useSandpack } from "@codesandbox/sandpack-react";
import { createSandpackSetup } from "../lib/sandpack";
// Removed persistence hook as tabs/buttons were removed

/**
 * MiniSandpack - lightweight inline code playground for handbook examples.
 * Props:
 * - files: Record<path, { code: string }>
 * - entry: optional entry file path
 * - template: one of: react, vanilla, static (defaults to vanilla)
 * - showConsole: boolean
 *      false (default): preview only (no tabs)
 *      true: tabs appear and user can switch between Preview / Console
 * - switchToConsoleOnRun: boolean (default true)
 *      When true and console is enabled, pressing Run (or Ctrl/Cmd+Enter) will
 *      automatically activate the Console tab so learners immediately see output.
 *
 * Implementation details:
 * - We always keep the preview iframe mounted so that
 * the runtime executes and emits console logs even when the Console tab is
 * active (unmounting it would reset execution). We hide inactive panels with
 * CSS instead of conditional unmounting.
 * - Run button triggers a manual re-execution (helpful after clearing console).
 * - Keyboard shortcut: Ctrl+Enter / Cmd+Enter to Run; Ctrl+Shift+L to Clear console.
 */
export default function MiniSandpack({
  files = {},
  entry,
  template = "vanilla",
  showConsole = false,
  showPreview = true,
  // Unused props kept for backward compatibility but no longer active:
  // defaultTab, persistTab, storageKey, switchToConsoleOnRun
  height = 200,
}) {
  // Removed tab persistence & switching: always show preview; console (if enabled) shown under preview.

  const challengeLike = {
    template,
    entry,
    files: Object.fromEntries(
      Object.entries(files).map(([path, code]) => [path, { code, active: false }])
    ),
  };

  const setup = createSandpackSetup(challengeLike);

  const consoleRef = useRef(null);
  const [consoleKey] = useState(0); // retained for potential future console reset

  // Inner playground UI that consumes Sandpack context
  function PlaygroundInner() {
    const sandpackCtx = useSandpack();

    // Log every code change from the active editor file
    const logRef = useRef({});
    const activeFileRef = useRef(null);

    const handleEditorChange = useCallback(
      (newCode) => {
        const activeFile = sandpackCtx?.sandpack?.state?.activeFile;
        activeFileRef.current = activeFile;
        if (activeFile) {
          // Avoid logging duplicate lines when Sandpack triggers intermediate states
          if (logRef.current[activeFile] !== newCode) {
            logRef.current[activeFile] = newCode;
            // Single consolidated console output per change
            console.log("[MiniSandpack change]", activeFile, newCode);
          }
        }
      },
      [sandpackCtx]
    );

    // Also watch for changes to any file via Sandpack state (covers programmatic updates)
    useEffect(() => {
      const files = sandpackCtx?.sandpack?.state?.files || {};
      Object.entries(files).forEach(([path, spec]) => {
        if (logRef.current[path] !== spec.code) {
          logRef.current[path] = spec.code;
          console.log("[MiniSandpack change]", path, spec.code);
        }
      });
    }, [sandpackCtx?.sandpack?.state?.files]);

    return (
      // Main sandbox layout wrapper supplied by Sandpack
      <SandpackLayout style={{ borderRadius: 0 }}>
        {/* Code Editor region */}
        <div className="w-full">
          <SandpackCodeEditor showTabs showLineNumbers onChange={handleEditorChange} />
        </div>
        {/* Output panels always visible (console optional) */}
        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          {/* Keep preview iframe mounted whenever console is needed so runtime executes. */}
          {(showPreview || showConsole) && (
            <div
              className={showPreview ? "bg-slate-950 ring-0" : "bg-slate-950 ring-0 hidden"}
            >
              <SandpackPreview style={{ height }} />
            </div>
          )}
          {showConsole && (
            <div>
              <SandpackConsole
                key={consoleKey}
                ref={consoleRef}
                style={{ height, fontSize: 12, background: "#0f172a", color: "#e2e8f0" }}
                showHeader={false}
                showSetupProgress
              />
            </div>
          )}
          {!showPreview && !showConsole && (
            <div className="text-xs text-slate-400 px-2 py-1 border border-slate-700 rounded bg-slate-900">
              (Preview output disabled)
            </div>
          )}
        </div>
      </SandpackLayout>
    );
  }

  return (
    // Outer container: provides dark themed frame + SandpackProvider context
    <div className="not-prose my-4 mini-sp">
      <SandpackProvider
        template={setup.template}
        files={Object.fromEntries(
          Object.entries(setup.files).map(([path, spec]) => [path, spec.code])
        )}
        customSetup={{ entry: setup.customSetup.entry }}
        // Apply a dark theme object (other imports available from sandpack-react or sandpack-themes)
        theme={sandpackDark}
        options={{
          externalResources: [],
          visibleFiles: setup.options.visibleFiles,
          activeFile: setup.options.activeFile,
          recompileMode: "immediate", // immediate so preview updates automatically on each change
        }}
      >
        {/* Child component consumes context and renders UI */}
        <PlaygroundInner />
      </SandpackProvider>
    </div>
  );
}
