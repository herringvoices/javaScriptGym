// Centralized CodeMirror 6 extensions for Sandpack editors
// Provides a VS Code-like editing experience: theme, autocompletion,
// auto-close brackets/tags, bracket matching, and active line highlight.

import { autocompletion } from "@codemirror/autocomplete";
import { closeBrackets } from "@codemirror/autocomplete";
import { autoCloseTags } from "@codemirror/lang-html";
import { bracketMatching } from "@codemirror/language";
import { highlightActiveLine } from "@codemirror/view";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

/**
 * Small, safe custom completions example.
 * Extend or replace as needed for your curriculum.
 */
export function customCompletionSource(context) {
  const word = context.matchBefore(/\w*/);
  if (!word) return null;
  if (word.from === word.to && !context.explicit) return null;
  return {
    from: word.from,
    options: [
      { label: "console.log", type: "function", apply: "console.log($1)" },
      { label: "useEffect", type: "function", info: "React hook", apply: "useEffect(() => {\n  $1\n}, [])" },
      { label: "querySelector", type: "function", apply: "document.querySelector('$1')" },
    ],
  };
}

/**
 * Build the default set of CodeMirror extensions we want in Sandpack.
 * Includes a VS Code-like theme and editor UX.
 *
 * @param {object} [opts]
 * @param {boolean} [opts.withCustomCompletions=true]
 * @returns {import("@codemirror/state").Extension[]}
 */
export function getDefaultEditorExtensions() {
  const extensions = [
    // Theme first so downstream extensions can adjust if needed
    vscodeDark,
    // Editor UX
  closeBrackets(),
  autoCloseTags,
    bracketMatching(),
    highlightActiveLine(),
    // Register autocompletion once; avoid override conflicts with Sandpack's config.
    autocompletion(),
  ];

  return extensions;
}
