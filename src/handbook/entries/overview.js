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
      path: "/index.html",
      type: "html",
      readOnly: true,
      content:
        "<!doctype html>\n" +
        "<html>\n" +
        "  <head>\n" +
        "    <meta charset=\"utf-8\" />\n" +
        "    <title>Handbook Workbench</title>\n" +
        "  </head>\n" +
        "  <body>\n" +
        "    <main>\n" +
        "      <h1 id=\"title\">Handbook Workbench</h1>\n" +
        "      <p id=\"message\">Open the Console, then edit /main.js and watch it re-run.</p>\n" +
        "      <ul id=\"list\"></ul>\n" +
        "    </main>\n" +
        "    <script type=\"module\" src=\"/main.js\"></script>\n" +
        "  </body>\n" +
        "</html>",
    },
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
  entry: "/index.html",
  sandbox: {
    runtime: "dom",
    html: "<div id='app'></div>",
  },
  mock: undefined,
  handbookMarkdown: "",
  tags: ["intro"],
};

export default entry;
