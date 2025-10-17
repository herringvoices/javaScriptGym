import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.PF.CON-101",
  title: "Movie Ticket Price",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.PF.CON"],
  primaryStandard: "JS.PF.CON",
  difficulty: 2,
  description: `
Given an **age**, show the exact label:

- \`Price: $8 (Child)\` for ages **under 13**
- \`Price: $10 (Teen)\` for ages **13–17**
- \`Price: $12 (Adult)\` for ages **18–64**
- \`Price: $9 (Senior)\` for ages **65+**

Write a chained \`if/else if/else\`. One return per branch.
    `.trim(),
  userStories: [
    "Entering an age and clicking Price shows exactly one label.",
    "Boundary ages map to the correct tier (12→Child, 13→Teen, 18→Adult, 65→Senior).",
  ],
  acceptanceCriteria: [
    "Use an if/else if/else chain (2+ else-if branches).",
    "Compare numbers, not strings.",
    "Render the exact strings above.",
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/index.html": {
      readOnly: true,
      code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Movie Ticket Price</title>
  </head>
  <body>
    <h1>Movie Ticket Price</h1>
    <label>Age: <input id="age-input" type="number" min="0" /></label>
    <button id="price-btn">Price</button>
    <p id="result"></p>
    <script type="module" src="/main.js"></script>
  </body>
</html>
`,
    },
    "/main.js": {
      code: `function ticketPriceLabel(age) {
  // TODO: if / else if / else chain:
  // <13   -> "Price: $8 (Child)"
  // 13-17 -> "Price: $10 (Teen)"
  // 18-64 -> "Price: $12 (Adult)"
  // 65+   -> "Price: $9 (Senior)"
}

document.querySelector("#price-btn").addEventListener("click", () => {
  const age = Number(document.querySelector("#age-input").value);
  document.querySelector("#result").textContent = ticketPriceLabel(age);
});

window.ticketPriceLabel = ticketPriceLabel;
`,
    },
  },
  entry: "/index.html",
  hints: [
    "Check the smallest group first (< 13), then 13–17, then 18–64, else 65+.",
    "Use else-if for each interior range.",
  ],
  tags: ["conditionals", "if-else-if", "ranges", "DOM"],
  sandbox: {
    defaultPanel: "preview",
    showRightPanel: true,
    showExplorer: true,
  },
};

export default challenge;
