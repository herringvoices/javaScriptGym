// Handbook entry for Iteration

/** @type {import('./overview.js').HandbookEntry} */
const entry = {
  id: "JS.PF.ITR",
  standard: "JS.PF.ITR",
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
        "    <title>Iteration Basics Workbench</title>\n" +
        "  </head>\n" +
        "  <body>\n" +
        "    <main>\n" +
        "      <h1>Iteration · Basics</h1>\n" +
        "      <div id=\"app\"></div>\n" +
        "    </main>\n" +
        "    <script type=\"module\" src=\"/main.js\"></script>\n" +
        "  </body>\n" +
        "</html>",
    },
    {
      path: "/main.js",
      active: true,
        content: `
const heroes = [
  { id: 1, name: "Crimson Phoenix" },
  { id: 2, name: "Neon Volt" },
  { id: 3, name: "Star Sentinel" },
];

const powerVault = [
  { id: 1, description: "Plasma flight",      heroId: 1 },
  { id: 2, description: "Electro-kinesis",    heroId: 2 },
  { id: 3, description: "Stellar shield",     heroId: 3 },
  { id: 4, description: "Tactical genius",    heroId: 1 },
];

  `,
    },
  ],
  entry: "/index.html",
  sandbox: { runtime: "dom" },
  mock: undefined,
  handbookMarkdown: "",
  tags: [],
};

export default entry;
