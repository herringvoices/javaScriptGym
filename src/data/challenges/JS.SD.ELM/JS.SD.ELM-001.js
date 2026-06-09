import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.SD.ELM-001",
  title: "Select the Mount Point",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.SD.ELM"],
  primaryStandard: "JS.SD.ELM",
  difficulty: 1,
  description: `
Select the page's mount point and place plain text inside it.

This is the smallest DOM update: find one element, then change its \`textContent\`.
  `.trim(),
  userStories: [
    "I can select the #app element with JavaScript.",
    "I can make the preview show a plain-text status message.",
  ],
  acceptanceCriteria: [
    "Use document.querySelector(\"#app\") or document.getElementById(\"app\") to select the mount point.",
    "Store the selected element in a variable named app.",
    "Set app.textContent to exactly \"Potion Shelf ready.\"",
    "Do not edit the HTML file.",
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
    <title>Select the Mount Point</title>
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
      code: `// Select #app, then set its textContent to:
// Potion Shelf ready.

`,
    },
  },
  entry: "/index.html",
  hints: ["The selector for an id starts with #.", "textContent treats the value as plain text."],
  tags: ["DOM", "querySelector", "textContent"],
  sandbox: { defaultPanel: "preview", showRightPanel: true, showExplorer: false },
};

export default challenge;
