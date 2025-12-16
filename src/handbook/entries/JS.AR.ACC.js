// Handbook entry for JS.AR.ACC (Arrays & Objects · Mutation and the "Wait… Why Did That Change?!" Bug)

/** @type {import('./overview.js').HandbookEntry} */
const entry = {
  id: "JS.AR.ACC-wb",
  standard: "JS.AR.ACC",
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
        "    <title>Arrays & Objects · Mutation Workbench</title>\n" +
        "  </head>\n" +
        "  <body>\n" +
        "    <main>\n" +
        "      <h1>Arrays & Objects · Mutation</h1>\n" +
        "      <div id=\"app\"></div>\n" +
        "    </main>\n" +
        "    <script type=\"module\" src=\"/main.js\"></script>\n" +
        "  </body>\n" +
        "</html>",
    },
    {
      path: "/main.js",
      active: true,
        content: /*js*/ `//JS.AR.ACC
//This becomes the id for the next car added to the production line
let nextId = 1
//The production line sent out to the various Hondord dealerships
const productionLine = []
//Blueprints for each car.
const hondordGrove = {make: "Hondord", model: "Grove", color: "beige", year: 3026}
const hondordOrchard = {make: "Hondord", model: "Orchard", color: "beige", year: 3026}
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
