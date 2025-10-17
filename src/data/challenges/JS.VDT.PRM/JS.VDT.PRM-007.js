import { ChallengeTemplates, ChallengeTypes } from "../../../types";

const challenge = {
  id: "JS.VDT.PRM-007",
  title: "DEBUG: Using let Again",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.VDT.PRM"],
  primaryStandard: "JS.VDT.PRM",
  difficulty: 1,
  description: `
A variable is declared twice with let when the second time should just reassign.
Fix it so the final log works without a syntax error.
  `.trim(),
  userStories: [
    "First log shows initial value.",
    "Second log shows updated value after reassignment.",
  ],
  acceptanceCriteria: [
    "Only declare the variable once; subsequent updates reuse it.",
    "Keep variable name the same.",
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// Broken starter:
let level = 1;
console.log('level:', level);
let level = level + 1; // ❌ redeclaration error
console.log('level:', level);

// FIX: Should just reassign.
`,
    },
  },
  entry: "/main.js",
  hints: ["You only need the keyword the first time.", "Later lines should reuse the existing binding."],
  tags: ["debugging", "redeclaration", "console"],
  sandbox: { showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
