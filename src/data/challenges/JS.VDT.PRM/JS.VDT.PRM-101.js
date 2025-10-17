import { ChallengeTemplates, ChallengeTypes } from "../../../types";

const challenge = {
  id: "JS.VDT.PRM-101",
  title: "DEBUG: Reassigning a const",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.VDT.PRM"],
  primaryStandard: "JS.VDT.PRM",
  difficulty: 1,
  description: `
A teammate wrote this to track a score. It crashes. Fix it without adding conditionals.
  `.trim(),
  userStories: [
    "Fix only what's necessary for reassignment to work.",
    "Console shows 1 then 2 after the fix.",
  ],
  acceptanceCriteria: [
    "Allow the variable to update between logs.",
    "Keep the rest of the logic intact.",
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// Broken starter:
const score = 1;   // ❌ this will cause an error when reassigned
console.log(score);
score = score + 1;
console.log(score);

// Fix it so both logs work.
`,
    },
  },
  entry: "/main.js",
  hints: ["Choose a declaration that allows reassignment.", "The crash is due to immutability of the binding."],
  tags: ["debugging", "let-vs-const", "console"],
  sandbox: { showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
