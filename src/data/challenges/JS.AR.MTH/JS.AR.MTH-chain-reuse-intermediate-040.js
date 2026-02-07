import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.AR.MTH-chain-reuse-intermediate-040",
  title: "Chain with Intermediate Reuse",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.AR.MTH"],
  primaryStandard: "JS.AR.MTH",
  difficulty: 2,
  description: `
Store intermediate results for reuse.

Sometimes you need both an intermediate value and the final result.
Store the filtered array, then use it to find a specific value.
  `.trim(),
  userStories: [
    "I can save intermediate chain results.",
    "I can reuse filtered data for multiple operations.",
    "I see both the count and found value logged."
  ],
  acceptanceCriteria: [
    "Filter numbers > 5.",
    "Store the filtered array length.",
    "Map filtered array to squares.",
    "Find first square > 50.",
    "Log both: filtered count (3) and found value (64)."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {"/main.js": {
      active: true,
      code: `// TODO: Store filtered count and find result

const nums = [4, 6, 8, 10];

// Your code:
// 1. Filter > 5 and store in a variable
// 2. Get its length (count)
// 3. Map to squares
// 4. Find first > 50
// Expected: count=3, found=64


// Log count and found value

`
    }
  },
  entry: "/main.js",
  hints: [
    "const filtered = nums.filter(n => n > 5);",
    "const count = filtered.length;",
    "const found = filtered.map(n => n * n).find(n => n > 50);"
  ],
  tags: ["filter", "map", "find", "array-methods", "chaining", "intermediate", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" }
};

export default challenge;
