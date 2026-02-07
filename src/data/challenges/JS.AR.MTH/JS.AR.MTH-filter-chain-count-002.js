import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.AR.MTH-filter-chain-count-002",
  title: "Chained Filter Count",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.AR.MTH"],
  primaryStandard: "JS.AR.MTH",
  difficulty: 2,
  description: `
Chain two filters together and count the final result.

Apply multiple filter operations in sequence: first keep numbers greater than 5,
then keep only the even ones. Count the results.
  `.trim(),
  userStories: [
    "I can chain filter methods to apply multiple conditions.",
    "I can get the length of the final filtered array.",
    "I see the count logged to the console."
  ],
  acceptanceCriteria: [
    "Chain two filter operations together.",
    "First filter keeps numbers > 5.",
    "Second filter keeps even numbers.",
    "Log the length of the final array (should be 2)."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {"/main.js": {
      active: true,
      code: `// TODO: Chain filters to count even numbers > 5

const nums = [4, 7, 8, 10, 11];

// Your code: chain .filter().filter() then get .length
// First filter: numbers > 5 → [7, 8, 10, 11]
// Second filter: evens → [8, 10]
// Length should be 2


// Log the count

`
    }
  },
  entry: "/main.js",
  hints: [
    "Start with nums.filter(n => n > 5).",
    "Chain another .filter(n => n % 2 === 0).",
    "Get the .length property of the result."
  ],
  tags: ["filter", "array-methods", "chaining", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" }
};

export default challenge;
