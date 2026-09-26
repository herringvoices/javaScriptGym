function transformMermaidFences(node) {
  if (!node || !Array.isArray(node.children)) return;

  node.children = node.children.map((child) => {
    if (child?.type === "code" && child.lang === "mermaid") {
      return {
        type: "mdxJsxFlowElement",
        name: "MermaidDiagram",
        attributes: [
          {
            type: "mdxJsxAttribute",
            name: "source",
            value: child.value,
          },
        ],
        children: [],
      };
    }

    transformMermaidFences(child);
    return child;
  });
}

export default function remarkMermaidDiagrams() {
  return transformMermaidFences;
}
