import React, { useEffect, useMemo, useRef, useState } from "react";
import mermaid from "mermaid";

let initialized = false;

function ensureMermaidInitialized() {
  if (initialized) return;

  mermaid.initialize({
    startOnLoad: false,
    securityLevel: "strict",
    theme: "default",
  });

  initialized = true;
}

function makeDiagramId() {
  return `diagram-${Math.random().toString(36).slice(2)}`;
}

export default function DiagramPanel({
  source,
  title = "Diagram",
  emptyMessage = "No diagram source found.",
}) {
  const [fullScreen, setFullScreen] = useState(false);
  const containerRef = useRef(null);
  const dragRef = useRef(null);
  const [svg, setSvg] = useState("");
  const [error, setError] = useState("");
  const [zoom, setZoom] = useState(1);

  const diagramSource = useMemo(() => String(source || "").trim(), [source]);

  useEffect(() => {
    let cancelled = false;

    async function renderDiagram() {
      ensureMermaidInitialized();

      setError("");
      setSvg("");

      if (!diagramSource) return;

      try {
        const id = makeDiagramId();

        await mermaid.parse(diagramSource);
        const result = await mermaid.render(id, diagramSource);

        if (!cancelled) {
          setSvg(result.svg);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err?.message || String(err));
        }
      }
    }

    renderDiagram();

    return () => {
      cancelled = true;
    };
  }, [diagramSource]);

  const zoomIn = () => setZoom((value) => Math.min(3, Number((value + 0.1).toFixed(2))));
  const zoomOut = () => setZoom((value) => Math.max(0.25, Number((value - 0.1).toFixed(2))));
  const resetZoom = () => setZoom(1);

  useEffect(() => {
    if (typeof document === "undefined") return undefined;

    document.body.classList.toggle("workbench-fullscreen-active", fullScreen);
    return () => {
      document.body.classList.remove("workbench-fullscreen-active");
    };
  }, [fullScreen]);

  const handlePointerDown = (event) => {
    const container = containerRef.current;
    if (!container) return;

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      scrollLeft: container.scrollLeft,
      scrollTop: container.scrollTop,
    };

    container.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event) => {
    const container = containerRef.current;
    const drag = dragRef.current;

    if (!container || !drag) return;

    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;

    container.scrollLeft = drag.scrollLeft - dx;
    container.scrollTop = drag.scrollTop - dy;
  };

  const endDrag = (event) => {
    const container = containerRef.current;
    const drag = dragRef.current;

    if (container && drag) {
      container.releasePointerCapture?.(drag.pointerId || event.pointerId);
    }

    dragRef.current = null;
  };

  return (
    <div
      className={`flex min-h-0 flex-col bg-white text-slate-950 ${
        fullScreen ? "fixed top-0 left-0 w-screen h-screen z-50 rounded-none border-none" : "h-full"
      }`}
      style={fullScreen ? { border: "none", borderRadius: 0, margin: 0, padding: 0 } : {}}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 px-3 py-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          {title}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={zoomOut}
            className="rounded border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100"
          >
            -
          </button>
          <span className="min-w-12 text-center text-xs text-slate-500">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            onClick={zoomIn}
            className="rounded border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100"
          >
            +
          </button>
          <button
            type="button"
            onClick={resetZoom}
            className="rounded border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={() => setFullScreen((value) => !value)}
            className="ml-2 rounded border border-indigo-400 bg-indigo-100 px-2 py-1 text-xs font-semibold text-indigo-700 hover:bg-indigo-200"
            aria-label={fullScreen ? "Exit full screen" : "Full screen"}
          >
            {fullScreen ? "Exit Full Screen" : "Full Screen"}
          </button>
        </div>
      </div>
      <div
        ref={containerRef}
        className="min-h-0 flex-1 cursor-grab overflow-auto bg-slate-50 active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {!diagramSource ? (
          <div className="flex h-full items-center justify-center p-6 text-center text-sm text-slate-500">
            {emptyMessage}
          </div>
        ) : error ? (
          <div className="m-4 rounded border border-red-300 bg-red-50 p-4 text-sm text-red-800">
            <p className="font-semibold">Could not render diagram.</p>
            <pre className="mt-2 whitespace-pre-wrap text-xs">{error}</pre>
          </div>
        ) : svg ? (
          <div
            className="inline-block min-h-full min-w-full p-6"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: "top left",
            }}
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        ) : (
          <div className="flex h-full items-center justify-center p-6 text-center text-sm text-slate-500">
            Rendering diagram...
          </div>
        )}
      </div>
    </div>
  );
}
