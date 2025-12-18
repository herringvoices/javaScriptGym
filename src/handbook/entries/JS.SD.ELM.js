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
    <title>JS.SD.ELM Workbench</title>
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
      content: /*js*/ `export function getProfiles() {
  return [
    { id: 1, name: "Edgar Gullylog", role: "Lunch Monitor" },
    { id: 2, name: "Polly Frumpleton", role: "Snack Captain" },
    { id: 3, name: "Hugo Blint", role: "Tray Technician" },
  ];
}
`,
    },
    {
      path: "/scripts/ProfileItem.js",
      type: "javascript",
      content: /*js*/ ``,
    },
    {
      path: "/scripts/ProfileList.js",
      type: "javascript",
      content: /*js*/ ``,
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
