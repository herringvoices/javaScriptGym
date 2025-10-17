import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.PF.CON-002",
  title: "Free Shipping Banner",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.PF.CON"],
  primaryStandard: "JS.PF.CON",
  difficulty: 1,
  description: `
Orders **$50 or more** get free shipping. On click, show:

- \`✅ Free shipping applied.\` (when total >= 50)
- \`📦 $5 shipping added.\` (when total < 50)

Write a single \`if/else\`.
    `.trim(),
  userStories: [
    "Entering a cart total and clicking Apply shows exactly one message.",
    "Totals ≥ 50 show the free-shipping message.",
    "Totals < 50 show the $5 shipping message.",
  ],
  acceptanceCriteria: [
    "Use exactly one if/else.",
    "Coerce input to a number.",
    "Render the exact strings.",
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/index.html": {
      readOnly: true,
      code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Free Shipping Banner</title>
  </head>
  <body>
    <h1>Free Shipping</h1>
    <label>Cart Total: $<input id="total-input" type="number" min="0" step="0.01" /></label>
    <button id="apply-btn">Apply</button>
    <p id="result"></p>
    <script type="module" src="/main.js"></script>
  </body>
</html>
`,
    },
    "/main.js": {
      code: `function shippingMessage(total) {
  // TODO: single if/else returning:
  // "✅ Free shipping applied."
  // "📦 $5 shipping added."
}

document.querySelector("#apply-btn").addEventListener("click", () => {
  const total = Number(document.querySelector("#total-input").value);
  document.querySelector("#result").textContent = shippingMessage(total);
});

window.shippingMessage = shippingMessage;
`,
    },
  },
  entry: "/index.html",
  hints: [
    "if (total >= 50) … else …",
    "Return strings from your function; the click handler renders them.",
  ],
  tags: ["conditionals", "if-else", "numbers", "DOM"],
  sandbox: {
    defaultPanel: "preview",
    showRightPanel: true,
    showExplorer: true,
  },
};

export default challenge;
