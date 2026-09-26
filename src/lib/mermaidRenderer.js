import mermaid from "mermaid";

let initialized = false;
let diagramCount = 0;

export function ensureMermaidInitialized() {
  if (initialized) return;

  mermaid.initialize({
    startOnLoad: false,
    securityLevel: "strict",
    theme: "default",
  });

  initialized = true;
}

export async function renderMermaid(source) {
  ensureMermaidInitialized();

  diagramCount += 1;
  const id = `mermaid-diagram-${diagramCount}`;

  await mermaid.parse(source);
  return mermaid.render(id, source);
}
