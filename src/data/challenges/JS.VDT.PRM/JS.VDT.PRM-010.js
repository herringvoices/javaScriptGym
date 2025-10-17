import { ChallengeTemplates, ChallengeTypes } from "../../../types";

const challenge = {
  id: "JS.VDT.PRM-010",
  title: "DEBUG: Boolean in Quotes",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.VDT.PRM"],
  primaryStandard: "JS.VDT.PRM",
  difficulty: 1,
  description: `
A flag was stored as the string "true" instead of the boolean true.
Fix it so logic using the flag would behave correctly (no quotes).
  `.trim(),
  userStories: ["Console logs the real boolean true (not a string)."],
  acceptanceCriteria: [
    "Remove quotes—use a real boolean literal.",
    "Keep variable name the same.",
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// Broken starter:
const isReady = "true"; // ❌ string, not boolean
console.log('isReady type before:', typeof isReady, isReady);

// After fix, typeof should be 'boolean'.
// FIX below:
`,
    },
  },
  entry: "/main.js",
  hints: ["Use a boolean primitive (not a string).", "Compare typeof before and after."],
  tags: ["debugging", "booleans", "console"],
  sandbox: { showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
