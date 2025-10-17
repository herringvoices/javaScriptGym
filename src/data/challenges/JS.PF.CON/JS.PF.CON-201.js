import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.PF.CON-201",
  title: "Cart Discount Tiers",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.PF.CON"],
  primaryStandard: "JS.PF.CON",
  difficulty: 2,
  description: `
Cart totals earn tiered discounts:

- \`Discount: 0%\` for totals **below 50**
- \`Discount: 10%\` for totals **50–99.99**
- \`Discount: 15%\` for totals **100 or more**

Return the string from a helper function and wire it to the button.
    `.trim(),
  userStories: [
    "Entering a total and clicking Discount shows exactly one message.",
    "Totals under 50 show the 0% message.",
    "Totals between 50 and 99.99 show the 10% message.",
    "Totals 100 or more show the 15% message.",
  ],
  acceptanceCriteria: [
    "Implement an if/else-if/else chain covering all tiers.",
    "Expose discountLabel(total) on window.",
    "Update #result when clicking the Discount button.",
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/index.html": {
      readOnly: true,
      code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Cart Discount Tiers</title>
  </head>
  <body>
    <h1>Cart Discount Tiers</h1>
    <label>Total: $<input id="total-input" type="number" min="0" step="0.01" /></label>
    <button id="discount-btn">Discount</button>
    <p id="result"></p>
    <script type="module" src="/main.js"></script>
  </body>
</html>
`,
    },
    "/main.js": {
      code: `function discountLabel(total) {
  // TODO: return one of these strings based on total:
  // "Discount: 0%"   for totals < 50
  // "Discount: 10%"  for totals >= 50 and < 100
  // "Discount: 15%"  for totals >= 100
}

document.querySelector("#discount-btn").addEventListener("click", () => {
  const total = Number(document.querySelector("#total-input").value);
  document.querySelector("#result").textContent = discountLabel(total);
});

window.discountLabel = discountLabel;
`,
    },
  },
  entry: "/index.html",
  hints: [
    "Check totals >= 100 before totals >= 50 so the higher tier runs first.",
    "Return the discount string, then update the DOM in the click handler.",
  ],
  tags: ["conditionals", "if-else-if", "ordering", "DOM"],
  sandbox: {
    defaultPanel: "preview",
    showRightPanel: true,
    showExplorer: true,
  },
};

export default challenge;
