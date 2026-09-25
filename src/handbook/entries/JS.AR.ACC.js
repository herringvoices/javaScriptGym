// Handbook entry for JS.AR.ACC (Arrays & Objects · Mutation and the "Wait… Why Did That Change?!" Bug)

/** @type {import('./overview.js').HandbookEntry} */
const entry = {
  id: "JS.AR.ACC-wb",
  standard: "JS.AR.ACC",
  files: [
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
  entry: "/main.js",
  sandbox: { runtime: "dom", defaultPanel: "console" },
  mock: undefined,
  handbookMarkdown: "",
  tags: [],
};

export default entry;
