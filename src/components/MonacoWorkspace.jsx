import React from "react";
import Editor from "@monaco-editor/react";

// Minimal Monaco workspace: file explorer (left) + editor (right with tabs)
// Props:
// - files: Record<path, { code, readOnly?, hidden?, active? }>
// - onChange(path, code)
// - onActiveChange?(path)
// - showExplorer?: boolean

export default function MonacoWorkspace({ files = {}, onChange, onActiveChange, showExplorer = true, className = "", onEditorMount }) {
	const visibleFiles = React.useMemo(() => Object.keys(files).filter((p) => !files[p]?.hidden), [files]);
	const [activePath, setActivePath] = React.useState(() => {
		const explicit = Object.keys(files).find((p) => files[p]?.active && !files[p]?.hidden);
		return explicit || visibleFiles[0] || Object.keys(files)[0] || null;
	});

	React.useEffect(() => {
		const explicit = Object.keys(files).find((p) => files[p]?.active && !files[p]?.hidden);
		const next = explicit || (visibleFiles.includes(activePath) ? activePath : visibleFiles[0]);
		if (next && next !== activePath) setActivePath(next);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(visibleFiles), JSON.stringify(Object.keys(files)), JSON.stringify(Object.values(files).map(f=>f.active))]);

	const spec = activePath ? files[activePath] : null;
	const language = guessLanguage(activePath);

	const beforeMount = React.useCallback((monaco) => {
		try {
			monaco.editor.defineTheme('dracula', {
				base: 'vs-dark',
				inherit: true,
				rules: [
					{ token: '', foreground: 'F8F8F2', background: '282A36' },
					{ token: 'comment', foreground: '6272A4' },
					{ token: 'keyword', foreground: 'FF79C6' },
					{ token: 'number', foreground: 'BD93F9' },
					{ token: 'string', foreground: 'F1FA8C' },
					{ token: 'type.identifier', foreground: '8BE9FD' },
					{ token: 'delimiter', foreground: 'F8F8F2' },
				],
				colors: {
					'editor.background': '#282A36',
					'editor.foreground': '#F8F8F2',
					'editor.selectionBackground': '#44475A',
					'editor.lineHighlightBackground': '#44475A44',
					'editorCursor.foreground': '#F8F8F2',
					'editorWhitespace.foreground': '#44475A',
					'editorLineNumber.foreground': '#6272A4',
					'editorLineNumber.activeForeground': '#F8F8F2',
					'editorIndentGuide.background': '#44475A55',
					'editorIndentGuide.activeBackground': '#6272A4',
				}
			});
		} catch (e) {
			// ignore theme define errors in environments where monaco isn't ready
			void e;
		}
	}, []);

	const handleTabClick = (path) => {
		setActivePath(path);
		onActiveChange?.(path);
	};

	return (
		<div className={`flex w-full min-h-0 grow ${className}`}>
			{showExplorer ? (
				<div className="hidden lg:block h-full w-56 shrink-0 border-r border-slate-800 bg-slate-950/80">
					<div className="px-3 py-2 text-xs text-slate-400 border-b border-slate-800">Files</div>
					<ul className="max-h-[calc(100%-36px)] overflow-auto p-2 text-sm">
						{visibleFiles.map((p) => (
							<li key={p}>
								<button
									type="button"
									className={`w-full text-left rounded px-2 py-1.5 hover:bg-slate-800/50 ${p===activePath? 'bg-slate-800/70 text-white' : 'text-slate-300'}`}
									onClick={() => handleTabClick(p)}
									title={p}
								>
									{p}
									{files[p]?.readOnly ? <span className="ml-2 text-[10px] uppercase text-slate-400">RO</span> : null}
								</button>
							</li>
						))}
					</ul>
				</div>
			) : null}

			<div className="flex min-w-0 min-h-0 grow flex-col">
				<div className="flex items-center gap-1 border-b border-slate-800 bg-slate-950/70 px-2 py-1">
					{visibleFiles.map((p) => (
						<button
							key={p}
							type="button"
							className={`rounded px-2 py-1 text-sm ${p===activePath? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-800/50'}`}
							onClick={() => handleTabClick(p)}
							title={p}
						>
							{basename(p)}
						</button>
					))}
				</div>
				<div className="min-h-0 grow">
					{spec ? (
						<Editor
							key={activePath}
							path={activePath}
							language={language}
							theme="dracula"
							value={spec.code}
							beforeMount={beforeMount}
							onMount={(editor, monaco) => { try { onEditorMount && onEditorMount(editor, monaco); } catch (e) { void e; } }}
							options={{
								readOnly: !!spec.readOnly,
								fontSize: 16,
								minimap: { enabled: false },
								scrollBeyondLastLine: false,
								wordWrap: 'on',
							}}
							onChange={(val) => onChange?.(activePath, val ?? "")}
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

function basename(p) {
	if (!p) return "";
	const i = p.lastIndexOf("/");
	return i >= 0 ? p.slice(i + 1) : p;
}

function guessLanguage(path) {
	if (!path) return "plaintext";
	if (/\.html?$/i.test(path)) return "html";
	if (/\.(js|jsx|mjs|cjs)$/i.test(path)) return "javascript";
	if (/\.css$/i.test(path)) return "css";
	if (/\.json$/i.test(path)) return "json";
	if (/\.mdx?$/i.test(path)) return "markdown";
	return "plaintext";
}

