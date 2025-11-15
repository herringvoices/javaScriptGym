import React, { useEffect, useMemo, useState } from "react";
import MonacoWorkspace from "./MonacoWorkspace";

// Simple editor-only workbench for projects. Persists edits per-project in localStorage.
export default function ProjectWorkbench({ projectId, entry, stepId }) {
	const storageKey = entry ? `project:${projectId}:files` : null;

	// Live snapshot of saved edits for this project to avoid stale reads on step changes
	const [savedSnapshot, setSavedSnapshot] = useState({}); // Record<string,string>
	useEffect(() => {
		if (!storageKey) {
			setSavedSnapshot({});
			return;
		}
		try {
			const raw = localStorage.getItem(storageKey);
			const parsed = raw ? JSON.parse(raw) : {};
			const obj = {};
			Object.entries(parsed || {}).forEach(([p, v]) => { obj[p] = String(v ?? ""); });
			setSavedSnapshot(obj);
		} catch {
			setSavedSnapshot({});
		}
	}, [storageKey]);

	const savedFiles = useMemo(() => {
		const map = {};
		Object.entries(savedSnapshot).forEach(([path, code]) => {
			map[path] = { code: String(code ?? "") };
		});
		return map;
	}, [savedSnapshot]);

	const model = useMemo(() => {
		if (!entry) return null;
		const base = {};
		for (const f of entry.files || []) {
			base[f.path] = {
				code: String(f.content ?? ""),
				readOnly: Boolean(f.readOnly),
				hidden: Boolean(f.hidden),
				active: Boolean(f.active),
			};
		}
		// Overlay saved edits
		for (const [path, spec] of Object.entries(savedFiles)) {
			if (!base[path]) base[path] = { code: "" };
			base[path] = { ...base[path], code: spec.code };
		}
		// Step-specific visibility: unhide module files only on cleanup step
		const isCleanup = /cleanup/i.test(String(stepId || ""));
		if (base["/data.js"]) base["/data.js"].hidden = !isCleanup;
		if (base["/functions.js"]) base["/functions.js"].hidden = !isCleanup;
		// main.js stays visible at all times
		// Activate first visible file
		const visible = Object.keys(base).filter((p) => !base[p]?.hidden);
		const active = visible.find((p) => base[p].active) || visible[0] || Object.keys(base)[0] || null;
		Object.keys(base).forEach((p) => { base[p].active = p === active; });
		return { files: base, activeFile: active };
	}, [entry, savedFiles, stepId]);

	const [files, setFiles] = useState(model?.files || {});

	useEffect(() => {
		if (!model) return;
		setFiles(model.files);
	}, [model]);

	const onChange = (path, code) => {
		setFiles((prev) => ({ ...prev, [path]: { ...prev[path], code } }));
		if (!storageKey) return;
		try {
			const snapshot = JSON.parse(localStorage.getItem(storageKey) || "{}");
			snapshot[path] = code;
			localStorage.setItem(storageKey, JSON.stringify(snapshot));
			setSavedSnapshot((prev) => ({ ...prev, [path]: code }));
		} catch {
			// ignore
		}
	};

	return (
		<div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-0 overflow-hidden">
			<div className="flex items-center justify-between gap-2 border-b border-slate-800 px-3 py-2 text-xs text-slate-400">
				<span>Editor</span>
				<span>Edits auto-save</span>
			</div>
			<div className="min-h-[540px] w-full">
				<MonacoWorkspace files={files} onChange={onChange} showExplorer={true} />
			</div>
		</div>
	);
}

