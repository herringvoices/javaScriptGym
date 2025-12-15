import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.PF.CON-feature-flags-001",
  title: "Feature Flags",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.PF.CON",],
  primaryStandard: "JS.PF.CON",
  prerequisiteStandards: ["JS.VDT.PRM"],
  difficulty: 2,
  description: `Use booleans and logical operators to decide access.
No conditionals yet - just compute the boolean.
 `.trim(),
  userStories: [
    "I can combine booleans with &&, ||, and ! to produce one final boolean.",
    "I see one console.log that shows the final access decision.",
  ],
  acceptanceCriteria: [
    "Log ONE line that includes a computed boolean named canAccess.",
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// TODO: Compute access with primitives.
// Make variables for:
// - isLoggedIn (boolean)
// - isBanned (boolean)
// - isPremium (boolean)
// - age (number)
//
// Create a boolean named canAccess using ONE expression that combines conditions.
// Rules:
// - must be logged in
// - must NOT be banned
// - must be premium OR age >= 18
//
// Then log ONE line that includes canAccess.
// Example shape (yours can differ):
// "Access allowed: true"

`,
    },
  },
  entry: "/main.js",
  hints: [],
  tags: ["primitives", "booleans", "comparisons", "logical-operators", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
