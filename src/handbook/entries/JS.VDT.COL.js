// Handbook entry for JS.VDT.COL (Variables & Data Types · Collections)

/** @type {import('./overview.js').HandbookEntry} */
const entry = {
  id: "JS.VDT.COL-wb",
  standard: "JS.VDT.COL",
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
        "    <title>Collections Workbench</title>\n" +
        "  </head>\n" +
        "  <body>\n" +
        "    <main>\n" +
        "      <h1>Collections</h1>\n" +
        "      <div id=\"app\"></div>\n" +
        "    </main>\n" +
        "    <script type=\"module\" src=\"/main.js\"></script>\n" +
        "  </body>\n" +
        "</html>",
    },
    {
      path: "/main.js",
      active: true,
      content: "",
    },
  ],
  entry: "/index.html",
  sandbox: { runtime: "dom" },
  mock: undefined,
  handbookMarkdown: "",
  tags: [],
};

export default entry;
