// Handbook entry for JS.SD.ELM (State & DOM · Element Selection & Manipulation)

/** @type {import('./overview.js').HandbookEntry} */
const entry = {
  id: "JS.SD.ELM-wb",
  standard: "JS.SD.ELM",
  files: [
    {
      path: "/index.html",
      type: "html",
      readOnly: true,
      content: /*html*/ `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Potion Shelf</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/scripts/main.js"></script>
  </body>
</html>`,
    },
    {
      path: "/scripts/database.js",
      type: "javascript",
      readOnly: true,
      content: /*js*/ `export function getPotions() {
  return [
    { id: 1, name: "Mender's Sip", baseId: 1, ingredientId: 1 },
    { id: 2, name: "Ember Tonic", baseId: 2, ingredientId: 2 },
    { id: 3, name: "Glacier Draught", baseId: 3, ingredientId: 3 },
    { id: 4, name: "Moonwake Elixir", baseId: 1, ingredientId: 4 },
    { id: 5, name: "Stormroot Philter", baseId: 2, ingredientId: 5 },
  ];
}
`,
    },
    {
      path: "/scripts/main.js",
      type: "javascript",
      active: true,
      content: /*js*/ ``,
    },
  ],
  entry: "/index.html",
  sandbox: { runtime: "dom", defaultPanel: "preview" },
  mock: undefined,
  handbookMarkdown: "",
  tags: [],
};

export default entry;
