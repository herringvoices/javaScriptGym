import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.AR.MTH-foreach-count-029",
  title: "Count with forEach",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.PF.ITR", "JS.PF.CON"],
  primaryStandard: "JS.PF.ITR",
  difficulty: 2,
  description: `
Count elements matching a condition using forEach.

Use forEach with a counter variable and a conditional to count how many
elements meet specific criteria.
  `.trim(),
  userStories: [
    "I can use conditionals inside forEach callbacks.",
    "I can count elements matching a predicate.",
    "I see the count logged."
  ],
  acceptanceCriteria: [
    "Use forEach to iterate through numbers.",
    "Increment a counter when a number is even.",
    "Log the count (should be 2)."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {"/main.js": {
      active: true,
      code: `// TODO: Count even numbers using forEach

const nums = [2, 5, 6, 7];

// Your code: initialize count to 0
// Use forEach with if condition
// Increment count when n % 2 === 0
// Expected count: 2


// Log the count

`
    }
  },
  entry: "/main.js",
  hints: [
    "Start with: let count = 0;",
    "Use forEach: nums.forEach(n => { if (n % 2 === 0) count++; });",
    "2 and 6 are even, so count is 2."
  ],
  tags: ["foreach", "array-methods", "conditionals", "counting", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" }
};

export default challenge;
