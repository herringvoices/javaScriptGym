import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.AR.MTH-chain-order-matters-035",
  title: "Chain Order Matters",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.AR.MTH"],
  primaryStandard: "JS.AR.MTH",
  difficulty: 2,
  description: `
Demonstrate how chain order affects the result.

Create two different chains that produce different results:
- Path A: filter evens, then add 1
- Path B: add 1 to all, then filter evens

The order matters!
  `.trim(),
  userStories: [
    "I understand that chain order produces different results.",
    "I can predict the outcome of different chain sequences.",
    "I see both results logged."
  ],
  acceptanceCriteria: [
    "Create pathA: filter evens → [8], then map +1 → [9].",
    "Create pathB: map +1 → [4,6,9], then filter evens → [4,6].",
    "Log both arrays to show the difference."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {"/main.js": {
      active: true,
      code: `// TODO: Show how chain order changes results

const nums = [3, 5, 8];

// Path A: filter evens first, then add 1
// [3,5,8] → filter evens → [8] → map +1 → [9]


// Path B: add 1 first, then filter evens
// [3,5,8] → map +1 → [4,6,9] → filter evens → [4,6]


// Log both pathA and pathB

`
    }
  },
  entry: "/main.js",
  hints: [
    "pathA: nums.filter(n => n % 2 === 0).map(n => n + 1);",
    "pathB: nums.map(n => n + 1).filter(n => n % 2 === 0);",
    "Different order, different results!"
  ],
  tags: ["filter", "map", "array-methods", "chaining", "order", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" }
};

export default challenge;
