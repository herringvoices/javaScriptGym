import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.SD.ELM-003",
  title: "Render Potion Data",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.SD.ELM", "JS.AR.MTH"],
  primaryStandard: "JS.SD.ELM",
  prerequisiteStandards: ["JS.VDT.COL", "JS.AR.MTH"],
  difficulty: 3,
  description: `
Render an array of potion objects into the empty list.

Turn each potion into an \`<li>\` string, join the strings together, then set the list's \`innerHTML\`.
  `.trim(),
  userStories: [
    "I can select an element that was already rendered in the HTML.",
    "I can turn data into visible list items.",
  ],
  acceptanceCriteria: [
    "Select #potion-list and store it in a variable named potionList.",
    "Use potions.map(...) to create one li string per potion.",
    "Use join(\"\") to combine the li strings into one HTML string.",
    "Set potionList.innerHTML to the combined string.",
    "Every potion name from the potions array appears in the preview.",
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/index.html": {
      readOnly: true,
      code: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Render Potion Data</title>
  </head>
  <body>
    <div id="app">
      <header>
        <h1>Potion Shelf</h1>
        <p>Rare brews, trusted classics, and mystery blends.</p>
      </header>

      <main>
        <section>
          <h2>Available Potions</h2>
          <ul id="potion-list"></ul>
        </section>
      </main>
    </div>
    <script type="module" src="/main.js"></script>
  </body>
</html>
`,
    },
    "/main.js": {
      active: true,
      code: `const potions = [
  { id: 1, name: "Mender's Sip" },
  { id: 2, name: "Ember Tonic" },
  { id: 3, name: "Glacier Draught" },
  { id: 4, name: "Quiet-Step Elixir" }
];

// TODO:
// 1. Select #potion-list.
// 2. Use map to turn each potion into an <li> string.
// 3. Use join("") to combine the strings.
// 4. Set potionList.innerHTML.

`,
    },
  },
  entry: "/index.html",
  hints: [
    "The callback receives one potion object at a time.",
    "A list item can be built with `<li>${potion.name}</li>`.",
  ],
  tags: ["DOM", "innerHTML", "map", "join", "render"],
  sandbox: { defaultPanel: "preview", showRightPanel: true, showExplorer: true },
};

export default challenge;
