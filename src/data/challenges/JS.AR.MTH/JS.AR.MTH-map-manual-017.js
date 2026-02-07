import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.AR.MTH-map-manual-017",
  title: "Emulate Map Without Using Map",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.PF.ITR", "JS.AR.ACC"],
  primaryStandard: "JS.PF.ITR",
  difficulty: 3,
  description: `
Build your own map logic using a loop.

Recreate the behavior of map without using the built-in method.
Use a for loop to transform each number and build a new array.
  `.trim(),
  userStories: [
    "I understand how map works under the hood.",
    "I can use loops to build transformed arrays.",
    "I see the manually mapped array logged."
  ],
  acceptanceCriteria: [
    "Do NOT use the .map() method.",
    "Use a for loop or for...of loop.",
    "Build a new array containing squared numbers.",
    "Result should be [4, 9, 16].",
    "Log the result."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {"/main.js": {
      active: true,
      code: `// TODO: Square numbers without using .map()

const nums = [2, 3, 4];

// Your code: use a loop to build an array of squares
// Initialize an empty array
// Loop through nums
// Push n * n to the array
// Expected result: [4, 9, 16]


// Log your result

`
    }
  },
  entry: "/main.js",
  hints: [
    "Start with: const result = [];",
    "Loop: for (const n of nums) { ... }",
    "Inside the loop: result.push(n * n);"
  ],
  tags: ["loops", "array-methods", "iteration", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" }
};

export default challenge;
