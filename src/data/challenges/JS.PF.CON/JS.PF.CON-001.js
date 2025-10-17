import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.PF.CON-001",
  title: "Sourboom Age Gate",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.PF.CON"],
  primaryStandard: "JS.PF.CON",
  difficulty: 1,
  description: `
Sourboom candy is… intense. Only customers **18 or older** can buy it.
When the user enters their age and clicks **Check**, show one of these exact messages:

- \`✅ You can purchase Sourboom.\`
- \`🚫 Must be 18+.\`

Return the message from a helper function, then render it in the DOM.
    `.trim(),
  userStories: [
    "Entering an age and clicking Check shows exactly one message.",
    "Ages ≥ 18 show the ✅ message.",
    "Ages < 18 show the 🚫 message.",
  ],
  acceptanceCriteria: [
    "Use if/else with a numeric comparison.",
    "Coerce the input value to a number before comparing.",
    "Render the exact strings provided.",
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/index.html": {
      readOnly: true,
      code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Sourboom Age Gate</title>
  </head>
  <body>
    <h1>Sourboom Age Gate</h1>
    <label>Age: <input id="age-input" type="number" min="0" /></label>
    <button id="check-btn">Check</button>
    <p id="result"></p>
    <script type="module" src="/main.js"></script>
  </body>
</html>
`,
    },
    "/main.js": {
      code: `function canPurchaseSourboom(age) {
  // TODO: if (age >= 18) return "✅ You can purchase Sourboom.";
  // else return "🚫 Must be 18+.";
}

document.querySelector("#check-btn").addEventListener("click", () => {
  const age = Number(document.querySelector("#age-input").value);
  document.querySelector("#result").textContent = canPurchaseSourboom(age);
});

window.canPurchaseSourboom = canPurchaseSourboom;
`,
    },
  },
  entry: "/index.html",
  hints: [
    "Use Number(...) to coerce the input before comparing.",
    "Write if (age >= 18) { ... } else { ... } and return the strings.",
  ],
  tags: ["conditionals", "if-else", "numbers", "DOM"],
  sandbox: {
    defaultPanel: "preview",
    showRightPanel: true,
    showExplorer: true,
  },
};

export default challenge;
