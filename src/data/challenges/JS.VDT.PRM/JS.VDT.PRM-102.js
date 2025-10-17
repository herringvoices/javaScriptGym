import { ChallengeTemplates, ChallengeTypes } from "../../../types";

const challenge = {
  id: "JS.VDT.PRM-102",
  title: "DEBUG: Concatenation Instead of Addition",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.VDT.PRM"],
  primaryStandard: "JS.VDT.PRM",
  difficulty: 1,
  description: `
A subtotal helper is joining two numeric-looking inputs as text. Convert them so actual numeric addition occurs.
  `.trim(),
  userStories: [
    "After fixing, the console shows the numeric total (formatting optional).",
    "No conditionals or helper functions added.",
  ],
  acceptanceCriteria: [
    "Perform numeric (not string) addition.",
    "Keep variable names and basic structure recognizable.",
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// Broken starter:
let a = "2";
let b = "2";
let sum = a + b; // → "22"
console.log("Sum:", sum);

// Fix so it's numeric addition. Optionally format with toFixed(2).
`,
    },
  },
  entry: "/main.js",
  hints: ["Check typeof each input first.", "Convert both before adding."],
  tags: ["debugging", "parsing", "console"],
  sandbox: { showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
