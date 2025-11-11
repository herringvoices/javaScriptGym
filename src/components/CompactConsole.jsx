import React, { useEffect, useState, useRef } from "react";
import { useSandpack } from "@codesandbox/sandpack-react";

// Utility: stringify any value safely
function toText(value) {
  if (value == null) return "";
  if (value instanceof Error) return value.message || String(value);
  if (typeof value === "object") {
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }
  return String(value);
}

function trimError(text) {
  const line = String(text).split("\n")[0] || String(text);
  // Remove surrounding quotes if present
  return line.replace(/^"(.+)"$/, "$1");
}

/**
 * CompactConsole
 * A minimal console that shows logs and warnings normally, and collapses
 * errors to a single concise line (no long sandbox stack traces).
 */
export default function CompactConsole() {
  const { listen } = useSandpack();
  const [lines, setLines] = useState([]);
  const containerRef = useRef(null);

  // Auto-scroll on new lines
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [lines]);

  useEffect(() => {
    if (!listen) return;
    const unsubscribe = listen((message) => {
      // Clear on new compile start
      if (message.type === "sandpack/status" && message.status === "running") {
        setLines([]);
        return;
      }

      // Console events from sandbox
      if (message.type === "sandpack/console") {
        const method = message?.method || "log";
        const data = Array.isArray(message?.data) ? message.data : [];
        const text = data.map(toText).join(" ");
        setLines((prev) => [
          ...prev,
          {
            kind: method,
            text: method === "error" ? trimError(text) : text,
          },
        ]);
        return;
      }

      // Runtime/bundle errors (depending on Sandpack version)
      if (
        message.type === "sandpack/runtime-error" ||
        message.type === "sandpack/bundle-error" ||
        message.type === "sandpack/error"
      ) {
        const text = toText(message?.message || message?.data || message?.error || "");
        setLines((prev) => [
          ...prev,
          { kind: "error", text: trimError(text) },
        ]);
      }
    });
    return () => unsubscribe?.();
  }, [listen]);

  return (
    <div
      ref={containerRef}
      className="h-full w-full overflow-auto bg-slate-950 p-3 text-sm"
      style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}
    >
      {lines.length === 0 ? (
        <div className="text-slate-500">Console output will appear here…</div>
      ) : (
        <ul className="m-0 list-none space-y-1 p-0">
          {lines.map((line, idx) => (
            <li key={idx} className={
              line.kind === "error"
                ? "text-red-300"
                : line.kind === "warn"
                ? "text-amber-300"
                : "text-slate-200"
            }>
              {line.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
