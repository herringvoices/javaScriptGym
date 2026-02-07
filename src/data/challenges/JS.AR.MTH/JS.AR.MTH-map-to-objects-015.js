import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.AR.MTH-map-to-objects-015",
  title: "Map Primitives to Objects",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.AR.MTH", "JS.VDT.COL"],
  primaryStandard: "JS.AR.MTH",
  difficulty: 3,
  description: `
Transform numbers into objects with multiple properties.

Map each number to an object containing both the original value and
its double. This is useful for enriching data.
  `.trim(),
  userStories: [
    "I can map primitives to objects.",
    "I can create objects with multiple derived properties.",
    "I see the array of objects logged."
  ],
  acceptanceCriteria: [
    "Map each number to an object with two properties.",
    "Each object should have {original: n, double: n*2}.",
    "Result: [{original:1, double:2}, {original:2, double:4}].",
    "Log the result."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {"/main.js": {
      active: true,
      code: `// TODO: Map numbers to objects with original and double

const nums = [1, 2];

// Your code: map to objects
// Each object: {original: n, double: n*2}
// Expected: [{original:1, double:2}, {original:2, double:4}]


// Log your result

`
    }
  },
  entry: "/main.js",
  hints: [
    "Use nums.map(n => ({original: n, double: n * 2})).",
    "Note the parentheses around the object literal.",
    "Without parens, the {} would be interpreted as a function body."
  ],
  tags: ["map", "array-methods", "objects", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" }
};

export default challenge;
