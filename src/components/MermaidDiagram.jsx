import React, { useEffect, useMemo, useState } from "react";
import { renderMermaid } from "../lib/mermaidRenderer";

export default function MermaidDiagram({ source, title = "Rendered Mermaid diagram" }) {
  const [svg, setSvg] = useState("");
  const [error, setError] = useState("");
  const diagramSource = useMemo(() => String(source || "").trim(), [source]);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      setSvg("");
      setError("");

      if (!diagramSource) return;

      try {
        const result = await renderMermaid(diagramSource);

        if (!cancelled) setSvg(result.svg);
      } catch (err) {
        if (!cancelled) setError(err?.message || String(err));
      }
    }

    render();

    return () => {
      cancelled = true;
    };
  }, [diagramSource]);

  return (
    <div className="not-prose my-6 overflow-x-auto rounded-lg border border-slate-700 bg-slate-50 p-4 shadow-sm">
      {error ? (
        <div className="rounded border border-red-300 bg-red-50 p-4 text-sm text-red-800">
          <p className="m-0 font-semibold">Could not render diagram.</p>
          <pre className="mt-2 whitespace-pre-wrap text-xs">{error}</pre>
        </div>
      ) : svg ? (
        <div
          role="img"
          aria-label={title}
          className="min-w-fit [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <p className="m-0 text-center text-sm text-slate-500">Rendering diagram...</p>
      )}
    </div>
  );
}
