import React from "react";
import Editor from "@monaco-editor/react";

// MonacoWorkspace renders a file explorer and Monaco editor backed by a normalized sandbox state.
export default function MonacoWorkspace({ files = {}, onChange, onActiveChange, showExplorer = true, className = "", onEditorMount }) {
	const [{ filesByPath, activePath, expandedFolders }, setSandbox] = React.useState(() => {
		const normalized = toFilesByPath({ files });
		const initialActive = resolveActivePath(null, normalized);
		const folders = new Set(["/"]);
		if (initialActive) {
			for (const folder of parentFoldersOf(initialActive)) {
				folders.add(folder);
			}
		}
		return { filesByPath: normalized, activePath: initialActive, expandedFolders: folders };
	});

	const editorRef = React.useRef(null);
	const monacoRef = React.useRef(null);
	const modelsRef = React.useRef(new Map());
	const changeSubscriptionRef = React.useRef(null);
	const isApplyingExternalEditRef = React.useRef(false);
	const lastNotifiedActiveRef = React.useRef(null);
	const [isEditorReady, setIsEditorReady] = React.useState(false);

	const activeFile = React.useMemo(() => (activePath ? filesByPath.get(activePath) || null : null), [filesByPath, activePath]);
	const explorerRows = React.useMemo(() => buildExplorerRows(filesByPath, expandedFolders), [filesByPath, expandedFolders]);
	const tabPaths = React.useMemo(() => getTabPaths(filesByPath), [filesByPath]);

	React.useEffect(() => {
		const normalized = toFilesByPath({ files });
		setSandbox((prev) => {
			let nextActive = prev.activePath;
			if (nextActive && (!normalized.has(nextActive) || normalized.get(nextActive)?.hidden)) {
				nextActive = null;
			}
			if (!nextActive) {
				nextActive = resolveActivePath(prev.activePath, normalized);
			}
			const folders = new Set(prev.expandedFolders);
			folders.add("/");
			if (nextActive) {
				for (const folder of parentFoldersOf(nextActive)) {
					folders.add(folder);
				}
			}
			return { filesByPath: normalized, activePath: nextActive, expandedFolders: folders };
		});
	}, [files]);

	React.useEffect(() => {
		if (!activePath) return;
		setSandbox((prev) => {
			if (!prev.activePath) return prev;
			const folders = new Set(prev.expandedFolders);
			let changed = false;
			for (const folder of parentFoldersOf(prev.activePath)) {
				if (!folders.has(folder)) {
					folders.add(folder);
					changed = true;
				}
			}
			if (!folders.has("/")) {
				folders.add("/");
				changed = true;
			}
			return changed ? { ...prev, expandedFolders: folders } : prev;
		});
	}, [activePath]);

	React.useEffect(() => {
		if (!activePath || lastNotifiedActiveRef.current === activePath) return;
		lastNotifiedActiveRef.current = activePath;
		try {
			onActiveChange?.(activePath);
		} catch (e) {
			void e;
		}
	}, [activePath, onActiveChange]);

	React.useEffect(() => {
		const models = modelsRef.current;
		const editor = editorRef.current;
		for (const [path, model] of models) {
			if (filesByPath.has(path)) continue;
			if (editor && editor.getModel() === model) {
				editor.setModel(null);
			}
			model.dispose();
			models.delete(path);
		}
	}, [filesByPath]);

	React.useEffect(() => {
		const editor = editorRef.current;
		const monaco = monacoRef.current;
		if (!editor || !monaco) return;

		const file = activeFile;
		if (!file) {
			editor.setModel(null);
			changeSubscriptionRef.current?.dispose();
			changeSubscriptionRef.current = null;
			return;
		}

		const model = getOrCreateModel(modelsRef.current, monaco, file);
		if (editor.getModel() !== model) {
			editor.setModel(model);
		}
		editor.updateOptions({ readOnly: Boolean(file.readOnly) });
		if (model.getValue() !== file.content) {
			isApplyingExternalEditRef.current = true;
			model.setValue(file.content);
			isApplyingExternalEditRef.current = false;
		}

		changeSubscriptionRef.current?.dispose();
		changeSubscriptionRef.current = model.onDidChangeContent(() => {
			if (isApplyingExternalEditRef.current) return;
			const nextContent = model.getValue();
			setSandbox((prev) => {
				const existing = prev.filesByPath.get(file.path);
				if (!existing || existing.content === nextContent) return prev;
				const next = new Map(prev.filesByPath);
				next.set(file.path, { ...existing, content: nextContent });
				return { ...prev, filesByPath: next };
			});
			try {
				onChange?.(file.path, nextContent);
			} catch (e) {
				void e;
			}
		});

		return () => {
			changeSubscriptionRef.current?.dispose();
			changeSubscriptionRef.current = null;
		};
	}, [activeFile, onChange, isEditorReady]);

	React.useEffect(() => () => {
		changeSubscriptionRef.current?.dispose();
		for (const model of modelsRef.current.values()) {
			model.dispose();
		}
		modelsRef.current.clear();
	}, []);

	const beforeMount = React.useCallback((monaco) => {
		try {
			const languages = monaco.languages.getLanguages();
			if (!languages.some((language) => language.id === "mermaid")) {
				monaco.languages.register({ id: "mermaid" });
			}
		} catch (e) {
			void e;
		}

		try {
			monaco.editor.defineTheme("dracula", {
				base: "vs-dark",
				inherit: true,
				rules: [
					{ token: "", foreground: "F8F8F2", background: "282A36" },
					{ token: "comment", foreground: "6272A4" },
					{ token: "keyword", foreground: "FF79C6" },
					{ token: "number", foreground: "BD93F9" },
					{ token: "string", foreground: "F1FA8C" },
					{ token: "type.identifier", foreground: "8BE9FD" },
					{ token: "delimiter", foreground: "F8F8F2" },
				],
				colors: {
					"editor.background": "#282A36",
					"editor.foreground": "#F8F8F2",
					"editor.selectionBackground": "#44475A",
					"editor.lineHighlightBackground": "#44475A44",
					"editorCursor.foreground": "#F8F8F2",
					"editorWhitespace.foreground": "#44475A",
					"editorLineNumber.foreground": "#6272A4",
					"editorLineNumber.activeForeground": "#F8F8F2",
					"editorIndentGuide.background": "#44475A55",
					"editorIndentGuide.activeBackground": "#6272A4",
				},
			});
		} catch (e) {
			void e;
		}
	}, []);

	const handleEditorMount = React.useCallback((editor, monaco) => {
		editorRef.current = editor;
		monacoRef.current = monaco;
		setIsEditorReady(true);
		try {
			onEditorMount?.(editor, monaco);
		} catch (e) {
			void e;
		}
		// Ensure the current active file is synced once the editor is ready.
		if (activeFile) {
			const model = getOrCreateModel(modelsRef.current, monaco, activeFile);
			editor.setModel(model);
		}
	}, [activeFile, onEditorMount]);

	const handleFolderToggle = React.useCallback((path) => {
		setSandbox((prev) => {
			const folders = new Set(prev.expandedFolders);
			if (folders.has(path)) folders.delete(path);
			else folders.add(path);
			return { ...prev, expandedFolders: folders };
		});
	}, []);

	const handleFileSelect = React.useCallback((path) => {
		setSandbox((prev) => (prev.activePath === path ? prev : { ...prev, activePath: path }));
	}, []);

	return (
		<div className={`flex w-full min-h-0 grow ${className}`}>
			{showExplorer ? (
				<div className="hidden lg:block h-full w-60 shrink-0 border-r border-slate-800 bg-slate-950/80">
					<div className="px-3 py-2 text-xs text-slate-400 border-b border-slate-800">Files</div>
					{explorerRows.length ? (
						<ul className="max-h-[calc(100%-36px)] overflow-auto p-2 text-sm">
							{explorerRows.map((row) => (
								<li key={row.path}>
									{row.kind === "folder" ? (
										<button
											type="button"
											className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-slate-300 hover:bg-slate-800/50"
											onClick={() => handleFolderToggle(row.path)}
											style={{ paddingLeft: `${row.depth * 14}px` }}
										>
											<span className="text-xs text-slate-400">{expandedFolders.has(row.path) ? "v" : ">"}</span>
											<span className="truncate">{row.name}</span>
										</button>
									) : (
										<button
											type="button"
											className={`flex w-full items-center justify-between rounded px-2 py-1.5 text-left ${row.path === activePath ? "bg-slate-800/70 text-white" : "text-slate-300 hover:bg-slate-800/50"}`}
											onClick={() => handleFileSelect(row.path)}
											style={{ paddingLeft: `${row.depth * 14 + 16}px` }}
											title={row.path}
										>
											<span className="truncate">{row.name}</span>
											{row.readOnly ? (
												<span className="ml-2 text-[10px] uppercase text-slate-400">RO</span>
											) : null}
										</button>
									)}
								</li>
							))}
						</ul>
					) : (
						<div className="p-3 text-xs text-slate-500">No files visible.</div>
					)}
				</div>
			) : null}

			<div className="flex min-w-0 min-h-0 grow flex-col">
				<div className="flex items-center gap-1 border-b border-slate-800 bg-slate-950/70 px-2 py-1">
					{tabPaths.map((path) => (
						<button
							key={path}
							type="button"
							className={`rounded px-2 py-1 text-sm ${path === activePath ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800/50"}`}
							onClick={() => handleFileSelect(path)}
							title={path}
						>
							{basename(path)}
						</button>
					))}
				</div>
				<div className="min-h-0 grow">
					{activeFile ? (
						<Editor
							path={activeFile.path}
							theme="dracula"
							beforeMount={beforeMount}
							onMount={handleEditorMount}
							options={{
								readOnly: Boolean(activeFile.readOnly),
								fontSize: 16,
								minimap: { enabled: false },
								scrollBeyondLastLine: false,
								wordWrap: "on",
							}}
							height="100%"
						/>
					) : (
						<div className="p-4 text-slate-400">No file selected.</div>
					)}
				</div>
			</div>
		</div>
	);
}

function normalizePath(path) {
	let p = String(path || "");
	p = p.replace(/\\/g, "/");
	if (!p.startsWith("/")) p = "/" + p;
	p = p.replace(/\/+/g, "/");
	if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
	return p;
}

function toFilesByPath(input) {
	const map = new Map();
	if (!input || !input.files) return map;
	if (Array.isArray(input.files)) {
		for (const spec of input.files) {
			if (!spec || !spec.path) continue;
			const path = normalizePath(spec.path);
			map.set(path, {
				path,
				content: String(spec.content ?? spec.code ?? ""),
				readOnly: Boolean(spec.readOnly),
				hidden: Boolean(spec.hidden),
				isActive: Boolean(spec.active),
			});
		}
		return map;
	}
	for (const [rawPath, spec] of Object.entries(input.files)) {
		if (!rawPath) continue;
		const path = normalizePath(rawPath);
		const value = spec || {};
		map.set(path, {
			path,
			content: String(value.content ?? value.code ?? ""),
			readOnly: Boolean(value.readOnly),
			hidden: Boolean(value.hidden),
			isActive: Boolean(value.active),
		});
	}
	return map;
}

function resolveActivePath(previousActive, filesByPath) {
	if (previousActive && filesByPath.has(previousActive) && !filesByPath.get(previousActive)?.hidden) {
		return previousActive;
	}
	for (const file of filesByPath.values()) {
		if (file.isActive && !file.hidden) return file.path;
	}
	for (const file of filesByPath.values()) {
		if (!file.hidden) return file.path;
	}
	const first = filesByPath.keys().next().value;
	return first || null;
}

function parentFoldersOf(path) {
	const parts = normalizePath(path).split("/").filter(Boolean);
	const folders = [];
	let acc = "";
	for (let i = 0; i < parts.length - 1; i += 1) {
		acc += `/${parts[i]}`;
		folders.push(acc || "/");
	}
	return folders;
}

function buildExplorerRows(filesByPath, expandedFolders) {
	const root = { kind: "folder", path: "/", name: "/", children: new Map() };
	for (const file of filesByPath.values()) {
		if (file.hidden) continue;
		const parts = normalizePath(file.path).split("/").filter(Boolean);
		let node = root;
		let currentPath = "";
		for (let i = 0; i < parts.length; i += 1) {
			const segment = parts[i];
			const nextPath = `${currentPath}/${segment}`;
			const isFile = i === parts.length - 1;
			if (isFile) {
				node.children.set(segment, { kind: "file", path: normalizePath(nextPath), name: segment });
			} else {
				if (!node.children.has(segment)) {
					node.children.set(segment, {
						kind: "folder",
						path: normalizePath(nextPath),
						name: segment,
						children: new Map(),
					});
				}
				node = node.children.get(segment);
			}
			currentPath = nextPath;
		}
	}

	const rows = [];
	const walk = (node, depth) => {
		const children = Array.from(node.children.values()).sort((a, b) => {
			if (a.kind === b.kind) return a.name.localeCompare(b.name);
			return a.kind === "folder" ? -1 : 1;
		});
		for (const child of children) {
			if (child.kind === "folder") {
				rows.push({ kind: "folder", path: child.path, name: child.name, depth });
				if (expandedFolders.has(child.path)) {
					walk(child, depth + 1);
				}
			} else {
				const file = filesByPath.get(child.path);
				rows.push({ kind: "file", path: child.path, name: child.name, depth, readOnly: Boolean(file?.readOnly) });
			}
		}
	};
	walk(root, 0);
	return rows;
}

function getTabPaths(filesByPath) {
	const paths = [];
	for (const file of filesByPath.values()) {
		if (!file.hidden) paths.push(file.path);
	}
	return paths;
}

function getOrCreateModel(cache, monaco, file) {
	const key = file.path;
	let model = cache.get(key);
	if (!model) {
		const segments = normalizePath(key).split("/").filter(Boolean).map((segment) => encodeURIComponent(segment));
		const uri = monaco.Uri.parse(`inmemory://sandbox/${segments.join("/") || "index"}`);
		model = monaco.editor.getModel(uri) || monaco.editor.createModel(file.content, guessLanguage(file.path), uri);
		cache.set(key, model);
	}
	return model;
}

function basename(path) {
	if (!path) return "";
	const idx = path.lastIndexOf("/");
	return idx >= 0 ? path.slice(idx + 1) : path;
}

function guessLanguage(path) {
	if (!path) return "plaintext";
	if (/\.html?$/i.test(path)) return "html";
	if (/\.(js|jsx|mjs|cjs)$/i.test(path)) return "javascript";
	if (/\.ts$/i.test(path)) return "typescript";
	if (/\.tsx$/i.test(path)) return "typescriptreact";
	if (/\.css$/i.test(path)) return "css";
	if (/\.json$/i.test(path)) return "json";
	if (/\.mdx?$/i.test(path)) return "markdown";
	if (/\.(mmd|mermaid)$/i.test(path)) return "mermaid";
	if (/\.dbml$/i.test(path)) return "plaintext";
	return "plaintext";
}

