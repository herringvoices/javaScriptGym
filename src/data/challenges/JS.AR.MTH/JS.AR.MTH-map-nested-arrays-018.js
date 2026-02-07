import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.AR.MTH-map-nested-arrays-018",
  title: "Map to Nested Duplicate Arrays",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.AR.MTH", "JS.VDT.COL"],
  primaryStandard: "JS.AR.MTH",
  difficulty: 3,
  description: `
Transform each number into an array containing that number twice.

Map can return any type of value, including arrays. This creates
a nested array structure (array of arrays).
  `.trim(),
  userStories: [
    "I can map values to arrays.",
    "I understand nested array structures.",
    "I see the array of arrays logged."
  ],
  acceptanceCriteria: [
    "Map each number to an array [n, n].",
    "Result should be [[1, 1], [3, 3]].",
    "Log the nested array structure."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {"/main.js": {
      active: true,
      code: `// TODO: Map each number to [n, n]

const nums = [1, 3];

// Your code: map to nested arrays
// 1 → [1, 1]
// 3 → [3, 3]
// Expected: [[1, 1], [3, 3]]


// Log your result

`
    }
  },
  entry: "/main.js",
  hints: [
    "Use nums.map(n => [n, n]).",
    "Return an array literal with the number twice.",
    "The result is an array of arrays."
  ],
  tags: ["map", "array-methods", "nested-arrays", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" }
};

export default challenge;
