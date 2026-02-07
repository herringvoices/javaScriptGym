import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.AR.MTH-filter-manual-010",
  title: "Emulate Filter Without Using Filter",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.PF.ITR", "JS.AR.ACC"],
  primaryStandard: "JS.PF.ITR",
  difficulty: 3,
  description: `
Build your own filter logic using a loop.

Recreate the behavior of filter without using the built-in method.
Use a for loop to check each number and build a new array of evens.
  `.trim(),
  userStories: [
    "I understand how filter works under the hood.",
    "I can use loops to build new arrays based on conditions.",
    "I see the manually filtered array logged."
  ],
  acceptanceCriteria: [
    "Do NOT use the .filter() method.",
    "Use a for loop or for...of loop.",
    "Build a new array containing only even numbers.",
    "Result should be [2, 4, 6].",
    "Log the result."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {"/main.js": {
      active: true,
      code: `// TODO: Filter evens without using .filter()

const nums = [1, 2, 3, 4, 5, 6];

// Your code: use a loop to build an array of evens
// Initialize an empty array
// Loop through nums
// If n is even, push it
// Expected result: [2, 4, 6]


// Log your result

`
    }
  },
  entry: "/main.js",
  hints: [
    "Start with: const result = [];",
    "Loop: for (const n of nums) { ... }",
    "Inside the loop: if (n % 2 === 0) result.push(n);"
  ],
  tags: ["loops", "array-methods", "iteration", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" }
};

export default challenge;
