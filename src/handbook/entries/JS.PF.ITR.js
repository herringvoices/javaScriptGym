// Handbook entry for Iteration

/** @type {import('./overview.js').HandbookEntry} */
const entry = {
  id: "JS.PF.ITR",
  standard: "JS.PF.ITR",
  files: [
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
  entry: "/main.js",
  sandbox: { runtime: "dom", defaultPanel: "console" },
  mock: undefined,
  handbookMarkdown: "",
  tags: [],
};

export default entry;
