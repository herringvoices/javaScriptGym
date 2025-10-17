import { ChallengeTemplates, ChallengeTypes } from "../../../types";

const challenge = {
  id: "JS.VDT.PRM-005",
  title: "DEBUG: Can't Reassign const",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.VDT.PRM"],
  primaryStandard: "JS.VDT.PRM",
  difficulty: 1,
  description: `
A score value needs to increase but the current declaration prevents updating.
Adjust the declaration so both logs run without changing the arithmetic.
  `.trim(),
  userStories: [
    "First log shows initial number.",
    "Second log shows incremented number.",
  ],
  acceptanceCriteria: [
    "Allow the variable to change without renaming it.",
    "No extra logs or conditionals added.",
  ],
  template: ChallengeTemplates.VANILLA,
  files: { "/main.js": { code: `// Broken starter:
const score = 10; // prevents later increase
console.log('score:', score);
score = score + 1; // error currently
console.log('score:', score);

// TODO: Make this increment work. Keep name & logs.
` } },
  entry: "/main.js",
  hints: ["Choose a declaration that permits updating.", "Mutable binding needed."],
  tags: ["debugging", "let-vs-const", "console"],
  sandbox: { showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
