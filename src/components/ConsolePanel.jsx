import React from "react";
import { ObjectInspector } from "react-inspector";

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
							<div className="whitespace-pre-wrap break-words">
								<ConsoleArgs args={row.args} compact={compact} />
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
}

const draculaTheme = {
	BASE_FONT_FAMILY: "Menlo, monospace",
	BASE_FONT_SIZE: "11px",
	BASE_LINE_HEIGHT: 1.2,
	BASE_BACKGROUND_COLOR: "#282a36",
	BASE_COLOR: "#f8f8f2",
	OBJECT_PREVIEW_ARRAY_MAX_PROPERTIES: 10,
	OBJECT_PREVIEW_OBJECT_MAX_PROPERTIES: 5,
	OBJECT_NAME_COLOR: "#ff79c6",
	OBJECT_VALUE_NULL_COLOR: "#6272a4",
	OBJECT_VALUE_UNDEFINED_COLOR: "#6272a4",
	OBJECT_VALUE_REGEXP_COLOR: "#ff5555",
	OBJECT_VALUE_STRING_COLOR: "#f1fa8c",
	OBJECT_VALUE_SYMBOL_COLOR: "#ffb86c",
	OBJECT_VALUE_NUMBER_COLOR: "#bd93f9",
	OBJECT_VALUE_BOOLEAN_COLOR: "#bd93f9",
	OBJECT_VALUE_FUNCTION_PREFIX_COLOR: "#8be9fd",
	HTML_TAG_COLOR: "#8be9fd",
	HTML_TAGNAME_COLOR: "#8be9fd",
	HTML_TAGNAME_TEXT_TRANSFORM: "lowercase",
	HTML_ATTRIBUTE_NAME_COLOR: "#50fa7b",
	HTML_ATTRIBUTE_VALUE_COLOR: "#f1fa8c",
	HTML_COMMENT_COLOR: "#6272a4",
	HTML_DOCTYPE_COLOR: "#6272a4",
	ARROW_COLOR: "#6272a4",
	ARROW_MARGIN_RIGHT: 3,
	ARROW_FONT_SIZE: 12,
	ARROW_ANIMATION_DURATION: "0",
	TREENODE_FONT_FAMILY: "Menlo, monospace",
	TREENODE_FONT_SIZE: "11px",
	TREENODE_LINE_HEIGHT: 1.2,
	TREENODE_PADDING_LEFT: 12,
	TABLE_BORDER_COLOR: "#44475a",
	TABLE_TH_BACKGROUND_COLOR: "#1f2029",
	TABLE_TH_HOVER_COLOR: "#232530",
	TABLE_SORT_ICON_COLOR: "#f8f8f2",
	TABLE_DATA_BACKGROUND_IMAGE:
		"linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0) 50%, rgba(189, 147, 249, 0.08) 50%, rgba(189, 147, 249, 0.08))",
	TABLE_DATA_BACKGROUND_SIZE: "128px 32px",
};

function ConsoleArgs({ args, compact }) {
	if (!args || args.length === 0) return null;
	return (
		<>
			{args.map((a, i) => (
				<React.Fragment key={i}>
					{i > 0 ? " " : null}
					<ConsoleArg value={a} compact={compact} />
				</React.Fragment>
			))}
		</>
	);
}

function ConsoleArg({ value, compact }) {
	const decoded = decodeSentinel(value, compact);
	if (decoded != null) {
		return <span>{decoded}</span>;
	}

	const t = typeof value;
	if (t === "string" || t === "number" || t === "boolean" || value == null) {
		return <span>{String(value)}</span>;
	}

	// Objects/arrays: render as expandable tree.
	// Compact mode keeps the tree collapsed; full mode opens a couple levels.
	return (
		<span className="inline-block align-top">
			<ObjectInspector
				name={null}
				data={value}
				theme={draculaTheme}
				expandLevel={compact ? 0 : 2}
			/>
		</span>
	);
}

function decodeSentinel(a, compact) {
	if (!a || typeof a !== "object") return null;

	if (a.__type === "undefined") return "undefined";
	if (a.__type === "null") return "null";
	if (a.__type === "circular") return "[Circular]";
	if (a.__type === "truncated") return "[Truncated]";
	if (a.__type === "unserializable") return "[Unserializable]";
	if (a.__type === "function") return `[Function ${a.name || "anonymous"}]`;
	if (a.__type === "bigint") return a.value || "[BigInt]";
	if (a.__type === "date") return a.value || "[Date]";
	if (a.__type === "regexp") return a.value || "[RegExp]";
	if (a.__type === "error") {
		if (compact) return `${a.name || "Error"}: ${a.message || ""}`.trim();
		return null; // render as tree in full mode
	}

	return null;
}

