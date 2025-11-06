// New-style HandbookEntry for the "overview" standard.
// This demonstrates the editor+preview/console workbench alongside the handbook markdown.

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
        "console.clear();\n\n" +
        "const items = [\"apples\", \"bananas\", \"cherries\"];\n" +
        "console.log(\"We have\", items.length, \"items:\", items);\n\n" +
        "document.querySelector(\"#list\").innerHTML = items.map(function(x){ return '<li>' + x + '</li>'; }).join(\"\");\n",
    },
  ],
  entry: "/index.html",
  sandbox: {
    runtime: "dom",
    html: "<div id='app'></div>",
  },
  mock: undefined,
  handbookMarkdown: `# Welcome to the Handbook Workbench

This page shows the new layout:

- Toggle the Table of Contents, Handbook, and Editor using the header buttons.
- The editor panel has two rows: (1) Files + Editor; (2) Preview or Console.
- Changes compile live; use the Console to inspect logs.

### Tips

- Click a file in the sidebar to switch editors.
- Switch the bottom panel between Preview and Console.
- Use Reset in the Challenge pages to clear local changes; here simply edit and experiment.
`,
  tags: ["intro"],
};

export default entry;
