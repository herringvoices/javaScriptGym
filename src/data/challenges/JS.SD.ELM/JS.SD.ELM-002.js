import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.SD.ELM-002",
  title: "Render the App Shell",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.SD.ELM"],
  primaryStandard: "JS.SD.ELM",
  difficulty: 2,
  description: `
Use \`innerHTML\` to render the stable HTML structure for Potion Shelf.

The list should be empty for now. Later code will fill it from data.
  `.trim(),
  userStories: [
    "I can render more than plain text into the #app element.",
    "I can create a list container that later JavaScript can select.",
  ],
  acceptanceCriteria: [
    "Select #app and store it in a variable named app.",
    "Use app.innerHTML to render the shell.",
    "Include an h1 that says \"Potion Shelf\".",
    "Include a paragraph subtitle.",
    "Include an h2 that says \"Available Potions\".",
    "Include an empty ul with id=\"potion-list\".",
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
    <title>Render the App Shell</title>
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
      code: `const app = document.querySelector("#app");

// Replace this plain text with an innerHTML app shell.
app.textContent = "Potion Shelf ready.";
`,
    },
  },
  entry: "/index.html",
  hints: [
    "A template literal uses backticks, which makes multi-line HTML easier to write.",
    "The empty list should look like <ul id=\"potion-list\"></ul>.",
  ],
  tags: ["DOM", "innerHTML", "app-shell"],
  sandbox: { defaultPanel: "preview", showRightPanel: true, showExplorer: false },
};

export default challenge;
