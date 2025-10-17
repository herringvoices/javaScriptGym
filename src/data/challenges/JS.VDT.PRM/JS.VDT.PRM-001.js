import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.VDT.PRM-001",
  title: "Declare Some Basics",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.VDT.PRM"],
  primaryStandard: "JS.VDT.PRM",
  difficulty: 1,
  description: `
Declare four primitive values you choose (two strings, one number, one boolean) and log them.
Keep it simple—just declarations + logging (no calculations yet).
  `.trim(),
  userStories: [
    "I see variables for firstName, lastName, age, isHungry.",
    "Each variable logs to the console.",
  ],
  acceptanceCriteria: [
    "Use primitive literals (no quotes around numbers/booleans).",
    "Prefer const if you won't reassign inside this snippet.",
    "One console.log per variable or a single combined log—either is fine.",
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
  code: `// TODO: Declare four primitives then log them.
// Suggested names: firstName, lastName, age, isHungry (or similar)
// console.log(...) to verify.
`,
    },
  },
  entry: "/main.js",
  hints: ["Booleans are lowercase: true or false.", "Numbers: no quotes."],
  tags: ["primitives", "declaration", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
