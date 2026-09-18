/**
 * Multiline MDX JSX is parsed as flow content, even inside an explicit <p>.
 * Unwrap the implicit Markdown paragraph there; retain the author's <p>, its
 * attributes, and inline formatting. Ordinary Markdown paragraphs stay intact.
 */
export default function remarkMdxParagraphs() {
  return function transform(tree) {
    function visit(node) {
      if (!Array.isArray(node.children)) return;
      if (node.type === 'mdxJsxFlowElement' && node.name === 'p') {
        node.children = node.children.flatMap((child, index) => child.type === 'paragraph'
          ? [...(index > 0 ? [{ type: 'text', value: '\n' }] : []), ...child.children]
          : [child]);
      }
      node.children.forEach(visit);
    }
    visit(tree);
  };
}
