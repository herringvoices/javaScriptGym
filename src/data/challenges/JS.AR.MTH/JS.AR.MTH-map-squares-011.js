import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.AR.MTH-map-squares-011",
  title: "Map Numbers to Squares",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.AR.MTH"],
  primaryStandard: "JS.AR.MTH",
  difficulty: 2,
  description: `
Transform an array of numbers into their squares.

Use map to create a new array where each number is squared (multiplied by itself).
  `.trim(),
  userStories: [
    "I can use map to transform each element in an array.",
    "I see the squared numbers logged to the console."
  ],
  acceptanceCriteria: [
    "Use the map method to square each number.",
    "Result should be [4, 25, 36].",
    "Log the result array."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {"/main.js": {
      active: true,
      code: `// TODO: Map numbers to their squares

const nums = [2, 5, 6];

// Your code: use map to create squares
// 2 squared = 4
// 5 squared = 25
// 6 squared = 36
// Expected result: [4, 25, 36]


// Log your result

`
    }
  },
  entry: "/main.js",
  hints: [
    "Use nums.map(n => n * n).",
    "Or nums.map(n => n ** 2) using the exponentiation operator.",
    "Map creates a new array with the same length."
  ],
  tags: ["map", "array-methods", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" }
};

export default challenge;
