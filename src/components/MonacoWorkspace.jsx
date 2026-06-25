import React from "react";
import Editor from "@monaco-editor/react";
import { VscChevronDown, VscChevronRight, VscEdit, VscFile, VscFolder, VscFolderOpened, VscNewFile, VscNewFolder, VscTrash, VscClose } from "react-icons/vsc";
import { buildAutoImportSuggestions } from "../lib/autoImports";

export default function MonacoWorkspace({ files = {}, folders = [], resetKey, onChange, onCreateFile, onCreateFolder, onRename, onDelete, onActiveChange, showExplorer = true, className = "", onEditorMount }) {
  const [activePath, setActivePath] = React.useState(() => firstVisibleFile(files));
  const [openPaths, setOpenPaths] = React.useState(() => new Set(firstVisibleFile(files) ? [firstVisibleFile(files)] : []));
  const [expanded, setExpanded] = React.useState(() => new Set(["/"]));
  const [draft, setDraft] = React.useState(null);
  const [error, setError] = React.useState("");
  const [monacoApi, setMonacoApi] = React.useState(null);
  const editorRef = React.useRef(null);
  const filesRef = React.useRef(files);
  const activePathRef = React.useRef(activePath);
  filesRef.current = files;
  activePathRef.current = activePath;
  const rows = React.useMemo(() => buildRows(files, folders, expanded), [files, folders, expanded]);
  const activeFile = activePath ? files[activePath] : null;

  React.useEffect(() => { setDraft(null); setError(""); }, [resetKey]);

  React.useEffect(() => {
    const visible = Object.keys(files).filter((path) => !files[path]?.hidden);
    setOpenPaths((previous) => new Set([...previous].filter((path) => visible.includes(path))));
    if (!activePath || !visible.includes(activePath)) setActivePath(visible[0] || null);
  }, [files, activePath]);
  React.useEffect(() => { if (activePath) onActiveChange?.(activePath); }, [activePath, onActiveChange]);
  React.useEffect(() => {
    if (!monacoApi) return undefined;
    const provider = monacoApi.languages.registerCompletionItemProvider("javascript", {
      provideCompletionItems(model, position) {
        const code = model.getValue();
        const word = model.getWordUntilPosition(position);
        const range = new monacoApi.Range(position.lineNumber, word.startColumn, position.lineNumber, word.endColumn);
        const suggestions = buildAutoImportSuggestions({ files: filesRef.current, activePath: activePathRef.current, code }).map((item) => ({
          label: item.name,
          filterText: item.name,
          insertText: item.name,
          range,
          kind: item.kind === "function" ? monacoApi.languages.CompletionItemKind.Function : item.kind === "class" ? monacoApi.languages.CompletionItemKind.Class : monacoApi.languages.CompletionItemKind.Variable,
          detail: item.detail,
          sortText: `0-auto-import-${item.name}`,
          additionalTextEdits: [{ range: new monacoApi.Range(...offsetToPosition(model, item.importOffset), ...offsetToPosition(model, item.importOffset)), text: item.importText }],
        }));
        return { suggestions };
      },
    });
    return () => provider.dispose();
  }, [monacoApi]);
  const select = (path) => { setActivePath(path); setOpenPaths((prev) => new Set([...prev, path])); for (const folder of parentFolders(path)) setExpanded((prev) => new Set([...prev, folder])); };
  const beginCreate = (kind, parent = "/") => { setDraft({ kind, parent, value: "" }); setError(""); setExpanded((prev) => new Set([...prev, parent])); };
  const submitDraft = (event) => {
    event.preventDefault();
    const value = draft?.value?.trim(); if (!value) return;
    const target = joinPath(draft.parent, value);
    try {
      if (draft.kind === "file") { onCreateFile?.(target); select(target); } else onCreateFolder?.(target);
      setDraft(null); setError("");
    } catch (cause) { setError(cause.message || "Unable to create item."); }
  };
  const rename = (path, target) => { try { onRename?.(path, target); if (activePath === path) setActivePath(target); setOpenPaths((prev) => new Set([...prev].map((item) => item === path ? target : item.startsWith(`${path}/`) ? `${target}${item.slice(path.length)}` : item))); } catch (cause) { setError(cause.message || "Unable to rename item."); } };
  const remove = (row) => { if (row.kind === "folder" && !window.confirm(`Delete ${row.name} and its contents?`)) return; try { onDelete?.(row.path); setError(""); } catch (cause) { setError(cause.message || "Unable to delete item."); } };
  const beforeMount = React.useCallback((monaco) => {
    if (!monaco.languages.getLanguages().some((language) => language.id === "mermaid")) monaco.languages.register({ id: "mermaid" });
    monaco.editor.defineTheme("dracula", { base: "vs-dark", inherit: true, rules: [{ token: "", foreground: "F8F8F2", background: "282A36" }, { token: "comment", foreground: "6272A4" }], colors: { "editor.background": "#282A36", "editor.foreground": "#F8F8F2", "editor.selectionBackground": "#44475A", "editor.lineHighlightBackground": "#44475A44", "editorCursor.foreground": "#F8F8F2", "editorLineNumber.foreground": "#6272A4" } });
  }, []);
  const mount = React.useCallback((editor, monaco) => {
    editorRef.current = editor;
    setMonacoApi(monaco);
    onEditorMount?.(editor, monaco);
  }, [onEditorMount]);
  const handOffWheelAtEditorBoundary = React.useCallback((event) => {
    const editor = editorRef.current;
    if (!editor || event.defaultPrevented || !event.deltaY) return;

    const layout = editor.getLayoutInfo();
    const scrollTop = editor.getScrollTop();
    const maxScrollTop = Math.max(0, editor.getScrollHeight() - layout.height);
    const atTop = scrollTop <= 1;
    const atBottom = scrollTop >= maxScrollTop - 1;
    const shouldHandOff = event.deltaY < 0 ? atTop : atBottom;
    if (!shouldHandOff) return;

    const multiplier = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
    event.preventDefault();
    event.stopPropagation();
    window.scrollBy({ top: event.deltaY * multiplier, left: event.deltaX * multiplier, behavior: "auto" });
  }, []);
  const visibleTabs = [...openPaths].filter((path) => !files[path]?.hidden);

  return <div className={`flex w-full min-h-0 grow flex-col lg:flex-row ${className}`}>
    {showExplorer && <aside className="flex h-48 w-full shrink-0 flex-col border-b border-slate-800 bg-slate-950/80 lg:h-full lg:w-64 lg:border-b-0 lg:border-r">
      <div className="flex items-center justify-between border-b border-slate-800 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-400"><span>Explorer</span><span className="flex gap-1"><IconButton title="New file" onClick={() => beginCreate("file")}><VscNewFile /></IconButton><IconButton title="New folder" onClick={() => beginCreate("folder")}><VscNewFolder /></IconButton></span></div>
      {error && <p className="px-3 pt-2 text-xs text-rose-300">{error}</p>}
      <ul className="min-h-0 overflow-auto p-1 text-sm">
        {draft?.parent === "/" && <DraftRow draft={draft} setDraft={setDraft} submit={submitDraft} cancel={() => setDraft(null)} depth={0} />}
        {rows.map((row) => <li key={row.path}>
          <div className={`group flex items-center rounded ${row.kind === "file" && activePath === row.path ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800/60"}`} style={{ paddingLeft: `${row.depth * 14 + 5}px` }}>
            {row.kind === "folder" ? <button type="button" className="flex min-w-0 grow items-center gap-1.5 py-1.5 text-left" onClick={() => setExpanded((prev) => { const next = new Set(prev); next.has(row.path) ? next.delete(row.path) : next.add(row.path); return next; })}><span className="text-slate-500">{expanded.has(row.path) ? <VscChevronDown /> : <VscChevronRight />}</span>{expanded.has(row.path) ? <VscFolderOpened className="text-sky-300" /> : <VscFolder className="text-sky-300" />}<span className="truncate">{row.name}</span></button> : <button type="button" className="flex min-w-0 grow items-center gap-2 py-1.5 text-left" onClick={() => select(row.path)}><VscFile className="shrink-0 text-slate-400" /><span className="truncate">{row.name}</span>{row.file.readOnly && <span className="text-[10px] text-slate-500">RO</span>}</button>}
            {row.kind === "folder" || row.file?.origin === "user" ? <span className="hidden shrink-0 gap-0.5 pr-1 group-hover:flex">{row.kind === "folder" && <><IconButton title="New file" onClick={() => beginCreate("file", row.path)}><VscNewFile /></IconButton><IconButton title="New folder" onClick={() => beginCreate("folder", row.path)}><VscNewFolder /></IconButton></>}{(row.file?.origin === "user" || row.kind === "folder" && row.userFolder) && <><IconButton title="Rename" onClick={() => { const next = window.prompt("New name", row.name); if (next) rename(row.path, joinPath(parentOf(row.path), next)); }}><VscEdit /></IconButton><IconButton title="Delete" onClick={() => remove(row)}><VscTrash /></IconButton></>}</span> : null}
          </div>
          {draft?.parent === row.path && <DraftRow draft={draft} setDraft={setDraft} submit={submitDraft} cancel={() => setDraft(null)} depth={row.depth + 1} />}
        </li>)}
      </ul>
    </aside>}
    <div className="flex min-w-0 min-h-0 grow flex-col"><div className="flex min-h-9 items-center gap-1 overflow-x-auto border-b border-slate-800 bg-slate-950/70 px-2">{visibleTabs.map((path) => <div key={path} className={`flex items-center gap-1 rounded px-2 py-1 text-sm ${path === activePath ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800/50"}`}><button type="button" onClick={() => select(path)} title={path}>{basename(path)}</button><button type="button" className="text-slate-500 hover:text-white" aria-label={`Close ${basename(path)}`} onClick={() => setOpenPaths((prev) => { const next = new Set(prev); next.delete(path); if (path === activePath) setActivePath([...next][0] || firstVisibleFile(files)); return next; })}><VscClose /></button></div>)}</div>
      <div className="min-h-0 grow" onWheelCapture={handOffWheelAtEditorBoundary}>{activeFile ? <Editor path={activeFile.path} value={activeFile.code} language={languageFor(activeFile.path)} theme="dracula" beforeMount={beforeMount} onMount={mount} onChange={(value) => onChange?.(activeFile.path, value ?? "")} options={{ readOnly: Boolean(activeFile.readOnly), fontSize: 16, minimap: { enabled: false }, scrollBeyondLastLine: false, wordWrap: "on" }} height="100%" /> : <div className="p-4 text-slate-400">No file selected.</div>}</div>
    </div>
  </div>;
}

function IconButton({ title, onClick, children }) { return <button type="button" title={title} aria-label={title} onClick={(event) => { event.stopPropagation(); onClick(); }} className="rounded p-1 text-slate-400 hover:bg-slate-700 hover:text-white">{children}</button>; }
function DraftRow({ draft, setDraft, submit, cancel, depth }) { return <li className="flex gap-1 py-1" style={{ paddingLeft: `${depth * 14 + 24}px` }}><form className="flex min-w-0 gap-1" onSubmit={submit}><input autoFocus value={draft.value} onChange={(event) => setDraft({ ...draft, value: event.target.value })} onBlur={(event) => { if (!event.currentTarget.value) cancel(); }} placeholder={draft.kind === "file" ? "filename.js" : "folder name"} className="min-w-0 rounded border border-sky-500 bg-slate-900 px-1 py-0.5 text-xs text-white outline-none" /><button className="text-xs text-sky-300" type="submit">Add</button></form></li>; }
function firstVisibleFile(files) { return Object.keys(files).find((path) => !files[path]?.hidden) || null; }
function parentOf(path) { const idx = path.lastIndexOf("/"); return idx <= 0 ? "/" : path.slice(0, idx); }
function joinPath(parent, child) { return `${parent === "/" ? "" : parent}/${child}`.replace(/\\/g, "/").replace(/\/+/g, "/").replace(/^/, "/"); }
function basename(path) { return path.slice(path.lastIndexOf("/") + 1); }
function parentFolders(path) { const parts = path.split("/").filter(Boolean); return parts.slice(0, -1).map((_, index) => `/${parts.slice(0, index + 1).join("/")}`); }
function buildRows(files, explicitFolders, expanded) { const root = { path: "/", children: new Map() }; const addFolder = (path, userFolder = false) => { let node = root; let current = ""; for (const name of path.split("/").filter(Boolean)) { current += `/${name}`; if (!node.children.has(name)) node.children.set(name, { kind: "folder", path: current, name, children: new Map(), userFolder: false }); node = node.children.get(name); } if (userFolder) node.userFolder = true; };
  explicitFolders.forEach((path) => addFolder(path, true)); Object.entries(files).forEach(([path, file]) => { if (file.hidden) return; const parts = path.split("/").filter(Boolean); addFolder(parts.slice(0, -1).join("/")); let node = root; for (const name of parts.slice(0, -1)) node = node.children.get(name); node.children.set(parts.at(-1), { kind: "file", path, name: parts.at(-1), file }); });
  const rows = []; const walk = (node, depth) => [...node.children.values()].sort((a, b) => a.kind === b.kind ? a.name.localeCompare(b.name) : a.kind === "folder" ? -1 : 1).forEach((child) => { rows.push({ ...child, depth }); if (child.kind === "folder" && expanded.has(child.path)) walk(child, depth + 1); }); walk(root, 0); return rows; }
function languageFor(path) { if (/\.html?$/i.test(path)) return "html"; if (/\.(js|jsx|mjs|cjs)$/i.test(path)) return "javascript"; if (/\.ts$/i.test(path)) return "typescript"; if (/\.tsx$/i.test(path)) return "typescriptreact"; if (/\.css$/i.test(path)) return "css"; if (/\.json$/i.test(path)) return "json"; if (/\.mdx?$/i.test(path)) return "markdown"; if (/\.(mmd|mermaid)$/i.test(path)) return "mermaid"; return "plaintext"; }
function offsetToPosition(model, offset) { const position = model.getPositionAt(offset); return [position.lineNumber, position.column]; }
