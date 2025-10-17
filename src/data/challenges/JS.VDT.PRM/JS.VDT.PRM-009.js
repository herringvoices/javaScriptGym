import { ChallengeTemplates, ChallengeTypes } from "../../../types";

const challenge = {
  id: "JS.VDT.PRM-009",
  title: "DEBUG: Missing Quotes (String)",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.VDT.PRM"],
  primaryStandard: "JS.VDT.PRM",
  difficulty: 1,
  description: `
A developer intended a string but forgot quotes, causing a ReferenceError.
Fix the declaration so it logs the intended text.
  `.trim(),
  userStories: ["Console shows the intended phrase as a string."],
  acceptanceCriteria: [
    "Wrap the text in quotes (single or double).",
    "Do not change variable name or the actual phrase.",
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// Broken starter:
const greeting = Hello there; // ❌ should be a string literal
console.log(greeting);

// FIX: Add quotes so it becomes a proper string.
`,
    },
  },
  entry: "/main.js",
  hints: ["Represent the phrase as a string literal.", "Quotes required around text."],
  tags: ["debugging", "strings", "console"],
  sandbox: { showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
