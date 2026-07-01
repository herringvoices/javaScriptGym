import React, { useCallback, useMemo } from "react";
import MonacoWorkspace from "./MonacoWorkspace";
import { useVirtualWorkspace } from "../lib/virtualWorkspace";

// Editor-only project workbench using the same protected virtual workspace as challenges.
export default function ProjectWorkbench({ projectId, entry, stepId }) {
  const storageKey = entry ? `project:${projectId}:files` : null;
  const seedFiles = useMemo(() => {
    const files = {};
    for (const file of entry?.files || []) files[file.path] = { code: String(file.content ?? ""), readOnly: Boolean(file.readOnly), hidden: Boolean(file.hidden), active: Boolean(file.active) };
    const isCleanup = /cleanup/i.test(String(stepId || ""));
    if (files["/data.js"]) files["/data.js"].hidden = !isCleanup;
    if (files["/functions.js"]) files["/functions.js"].hidden = !isCleanup;
    return files;
  }, [entry, stepId]);
  const virtualWorkspace = useVirtualWorkspace(seedFiles, storageKey);
  const handleReset = useCallback(() => {
    const confirmed = window.confirm("Reset this editor workspace to the starter files? This will remove files and folders you created.");
    if (!confirmed) return;
    virtualWorkspace.reset();
  }, [virtualWorkspace]);
  return <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/70 p-0">
    <div className="flex items-center justify-between gap-2 border-b border-slate-800 px-3 py-2 text-xs text-slate-400">
      <span>Editor</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleReset}
          className="rounded-full border border-slate-700 px-3 py-1 font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white"
        >
          Reset files
        </button>
        <span>Edits auto-save</span>
      </div>
    </div>
    <div className="min-h-[540px] w-full"><MonacoWorkspace files={virtualWorkspace.workspace.files} folders={virtualWorkspace.workspace.folders} resetKey={virtualWorkspace.revision} onChange={virtualWorkspace.setFileCode} onCreateFile={virtualWorkspace.createFile} onCreateFolder={virtualWorkspace.createFolder} onRename={virtualWorkspace.rename} onDelete={virtualWorkspace.remove} showExplorer /></div>
  </div>;
}
