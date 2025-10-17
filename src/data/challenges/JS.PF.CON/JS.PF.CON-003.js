import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.PF.CON-003",
  title: "Password Length Helper",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.PF.CON"],
  primaryStandard: "JS.PF.CON",
  difficulty: 1,
  description: `
When the user types a password and clicks **Check**, show:

- \`✅ Looks good.\` if the password length is **8 or more**.
- \`🔒 Too short (min 8).\` otherwise.

Write a single \`if/else\`.
    `.trim(),
  userStories: [
    "Clicking Check displays one message in #result.",
    "Length ≥ 8 shows the success message.",
    "Length < 8 shows the short message.",
  ],
  acceptanceCriteria: [
    "Use exactly one if/else.",
    ".length to compare the number of characters.",
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
    <title>Password Length Helper</title>
  </head>
  <body>
    <h1>Password Helper</h1>
    <label>Password: <input id="pw-input" type="password" /></label>
    <button id="check-btn">Check</button>
    <p id="result"></p>
    <script type="module" src="/main.js"></script>
  </body>
</html>
`,
    },
    "/main.js": {
      code: `function passwordFeedback(password) {
  // TODO: single if/else returning:
  // "✅ Looks good."
  // "🔒 Too short (min 8)."
}

document.querySelector("#check-btn").addEventListener("click", () => {
  const password = document.querySelector("#pw-input").value;
  document.querySelector("#result").textContent = passwordFeedback(password);
});

window.passwordFeedback = passwordFeedback;
`,
    },
  },
  entry: "/index.html",
  hints: [
    "Use if (pw.length >= 8) … else …",
    "Return the strings rather than logging them.",
  ],
  tags: ["conditionals", "if-else", "strings", "DOM"],
  sandbox: {
    defaultPanel: "preview",
    showRightPanel: true,
    showExplorer: true,
  },
};

export default challenge;
