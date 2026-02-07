import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.AR.MTH-chain-manual-041",
  title: "Manual Chain Without Built-ins",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.PF.ITR", "JS.PF.CON"],
  primaryStandard: "JS.PF.ITR",
  difficulty: 3,
  description: `
Implement a chain manually using loops.

Without using filter, map, or find, recreate their combined behavior
using loops. Find the first squared even number greater than 20.
  `.trim(),
  userStories: [
    "I understand how chained methods work under the hood.",
    "I can implement complex logic with basic loops.",
    "I see the manually found value logged."
  ],
  acceptanceCriteria: [
    "Do NOT use .filter(), .map(), or .find().",
    "Use for loops or for...of loops.",
    "Find first even number, square it, check if > 20.",
    "Result should be 36 (6 squared).",
    "Log the result."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {"/main.js": {
      active: true,
      code: `// TODO: Find first even square > 20 without array methods

const nums = [2, 3, 5, 6];

// Your code: use a loop
// For each number:
//   - Check if even
//   - Square it
//   - If > 20, save and break
// Expected: 36


// Log your result

`
    }
  },
  entry: "/main.js",
  hints: [
    "let result; for (const n of nums) { ... }",
    "if (n % 2 === 0) { const squared = n * n; ... }",
    "if (squared > 20) { result = squared; break; }"
  ],
  tags: ["loops", "iteration", "manual", "break", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" }
};

export default challenge;
