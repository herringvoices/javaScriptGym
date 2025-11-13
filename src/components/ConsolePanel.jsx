import React from "react";

// Simple console panel that listens for messages from the preview iframe.
// Expected postMessage shape from iframe: { source: 'sandbox-console', type: 'log'|'warn'|'error'|'runtime-error', args: any[] }

export default function ConsolePanel({ className = "", compact = true }) {
	const [logs, setLogs] = React.useState([]);

	React.useEffect(() => {
		const onMsg = (e) => {
			const data = e?.data;
			if (!data || data.source !== "sandbox-console") return;
			setLogs((prev) => [
				...prev,
				{ type: data.type || "log", args: data.args || [], loc: data.loc || null },
			]);
		};
		window.addEventListener("message", onMsg);
		return () => window.removeEventListener("message", onMsg);
	}, []);

	return (
		<div className={`h-full w-full bg-slate-950 text-slate-200 ${className}`}>
			<div className="border-b border-slate-800 px-3 py-2 text-xs text-slate-400">Console</div>
			<div className="h-[calc(100%-36px)] overflow-auto p-3 text-sm leading-relaxed">
				{logs.length === 0 ? (
					<div className="text-slate-500">No console output yet…</div>
				) : (
					logs.map((row, idx) => (
						<div key={idx} className="mb-2">
							<span className={
								row.type === 'error' || row.type === 'runtime-error'
									? 'text-red-400'
									: row.type === 'warn'
									? 'text-amber-300'
									: 'text-slate-300'
							}>
								{row.type}:
							</span>
							<span className="ml-2 whitespace-pre-wrap break-words">
								{formatArgs(row.args, compact)}
							</span>
						</div>
					))
				)}
			</div>
		</div>
	);
}

function formatArgs(args, compact) {
	if (!args || args.length === 0) return "";
	try {
		return args
			.map((a) => {
				if (typeof a === "string") return a;
				if (compact) {
					try { return JSON.stringify(a); } catch { return String(a); }
				}
				try { return JSON.stringify(a, null, 2); } catch { return String(a); }
			})
			.join(" ");
	} catch {
		return args.map((a) => String(a)).join(" ");
	}
}

