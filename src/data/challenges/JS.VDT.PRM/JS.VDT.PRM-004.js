import { ChallengeTemplates, ChallengeTypes } from "../../../types";

const challenge = {
  id: "JS.VDT.PRM-004",
  title: "DEBUG: '25' Instead of 7",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.VDT.PRM"],
  primaryStandard: "JS.VDT.PRM",
  difficulty: 1,
  description: `
A calculation is producing two digits glued together as text instead of a numeric total.
Make a minimal change so numeric addition occurs.
  `.trim(),
  userStories: [
    "After fixing, output is a proper numeric sum.",
    "Minimal change—just ensure numeric addition.",
  ],
  acceptanceCriteria: [
    "Operands are numeric when added (no string concatenation).",
    "Keep structure similar; only adjust what's necessary.",
  ],
  template: ChallengeTemplates.VANILLA,
  files: { "/main.js": { code: `// Broken starter:
let a = "2"; // string form
let b = 5;    // number
const result = a + b; // currently concatenates
console.log(result);

// TODO: Adjust so this becomes numeric addition.
` } },
  entry: "/main.js",
  hints: ["Check typeof each operand.", "Both should be numbers before adding."],
  tags: ["debugging", "parsing", "operators", "console"],
  sandbox: { showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
