import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.SD.ELM-004",
  title: "Create a Render Function",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.SD.ELM", "JS.FN.BAS", "JS.AR.MTH"],
  primaryStandard: "JS.SD.ELM",
  prerequisiteStandards: ["JS.FN.BAS", "JS.AR.MTH"],
  difficulty: 3,
  description: `
Group the full DOM update process inside a function named \`render\`.

The page should look the same after the refactor. The difference is that the render pipeline now has one clear name.
  `.trim(),
  userStories: [
    "I can move DOM update code into a reusable function.",
    "I can call render() once to build the page from data.",
  ],
  acceptanceCriteria: [
    "Declare a function named render.",
    "Inside render, select #app.",
    "Inside render, set app.innerHTML to the Potion Shelf shell.",
    "Inside render, select #potion-list after the shell has been created.",
    "Inside render, use map and join(\"\") to create the potion list HTML.",
    "Call render() at the bottom of the file.",
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
    <title>Create a Render Function</title>
  </head>
  <body>
    <div id="app"></div>
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

function PotionItem(potion) {
  return "<li>" + potion.name + "</li>";
}

// TODO: Create a render function that:
// - selects #app
// - renders the Potion Shelf shell with #potion-list
// - selects #potion-list after the shell exists
// - renders every potion into the list

// Call render() after you define it.
`,
    },
  },
  entry: "/index.html",
  hints: [
    "The #potion-list element does not exist until after app.innerHTML runs.",
    "The page should show the same list, but the render work should live inside render().",
  ],
  tags: ["DOM", "render", "functions", "map", "join"],
  sandbox: { defaultPanel: "preview", showRightPanel: true, showExplorer: true },
};

export default challenge;
