// New-style HandbookEntry for the "overview" standard with a comments section added.
// Demonstrates the editor+preview/console workbench alongside the handbook markdown.

/**
 * @typedef {Object} HandbookFile
 * @property {string} path
 * @property {string} content
 * @property {boolean=} active
 * @property {boolean=} hidden
 * @property {boolean=} readOnly
 * @property {"code"|"asset"|"html"=} type
 *
 * @typedef {Object} HandbookSandbox
 * @property {"browser"|"dom"|"node"=} runtime
 * @property {string=} html
 *
 * @typedef {Object} HandbookMock
 * @property {Record<string, any>=} apiSeed
 * @property {{ slowMs?: number, failOnFirst?: boolean }=} mockNet
 *
 * @typedef {Object} HandbookEntry
 * @property {string} id
 * @property {string} standard
 * @property {HandbookFile[]} files
 * @property {string} entry
 * @property {HandbookSandbox} sandbox
 * @property {HandbookMock=} mock
 * @property {string} handbookMarkdown
 * @property {string[]=} tags
 */

/** @type {HandbookEntry} */
const entry = {
  id: "overview-editor-intro",
  standard: "overview",
  files: [
    {
      path: "/main.js",
      active: true,
      content:
        "// Try editing and watch Console & Preview update\n" +
        "console.log(\"Hello, handbook!\");\n\n" +
        "// Tip: Ctrl+/ (Cmd+/ on Mac) toggles comments on the selected line(s).\n" +
        "// console.log(\"This line is commented out and won't run.\");\n\n" +
        "// End-of-line comment example: the code still runs, the comment is ignored.\n" +
        "console.log(\"Right here\"); // This note is for humans only\n",
    },
  ],
  entry: "/main.js",
  sandbox: {
    runtime: "dom",
    defaultPanel: "console",
  },
  mock: undefined,
  handbookMarkdown: "",
  tags: ["intro"],
};

export default entry;
