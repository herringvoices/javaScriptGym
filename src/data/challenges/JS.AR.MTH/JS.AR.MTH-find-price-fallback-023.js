import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.AR.MTH-find-price-fallback-023",
  title: "Find Price or Default",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.AR.MTH", "JS.PF.CON"],
  primaryStandard: "JS.AR.MTH",
  difficulty: 2,
  description: `
Find a number in an array or return a default.

Work with a simple array of numbers. Find the first one greater than 20,
or return -1 if none exist.
  `.trim(),
  userStories: [
    "I can use find with primitive arrays.",
    "I can provide fallback values for unsuccessful searches.",
    "I see the found value or -1 logged."
  ],
  acceptanceCriteria: [
    "Use find to get the first price > 20.",
    "If found, use that value; if undefined, use -1.",
    "Log the result (should be 25)."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {"/main.js": {
      active: true,
      code: `// TODO: Find first price > 20 or return -1

const prices = [5, 12, 25, 30];

// Your code: use find to get first price > 20
// If not found, use -1
// Expected: 25


// Log the price or -1

`
    }
  },
  entry: "/main.js",
  hints: [
    "const found = prices.find(p => p > 20);",
    "Use found !== undefined ? found : -1.",
    "Or use nullish coalescing: found ?? -1."
  ],
  tags: ["find", "array-methods", "fallback", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" }
};

export default challenge;
