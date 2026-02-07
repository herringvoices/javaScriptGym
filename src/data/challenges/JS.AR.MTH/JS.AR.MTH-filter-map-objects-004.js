import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.AR.MTH-filter-map-objects-004",
  title: "Filter Then Map to Objects",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.AR.MTH"],
  primaryStandard: "JS.AR.MTH",
  difficulty: 3,
  description: `
Chain filter and map to transform data.

First filter to keep only even numbers, then map each to an object with a value property.
  `.trim(),
  userStories: [
    "I can chain filter and map operations.",
    "I can create objects from primitive values.",
    "I see the result array of objects logged."
  ],
  acceptanceCriteria: [
    "Filter to keep only even numbers.",
    "Map each number to an object: {value: n}.",
    "The result should be [{value: 2}, {value: 4}].",
    "Log the result."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {"/main.js": {
      active: true,
      code: `// TODO: Filter evens, then map to objects

const nums = [1, 2, 3, 4];

// Your code: chain .filter().map()
// Filter: keep even numbers (n % 2 === 0)
// Map: transform to {value: n}
// Expected: [{value: 2}, {value: 4}]


// Log your result

`
    }
  },
  entry: "/main.js",
  hints: [
    "Start with nums.filter(n => n % 2 === 0).",
    "Chain .map(n => ({value: n})).",
    "Note the parentheses around the object literal in the arrow function."
  ],
  tags: ["filter", "map", "array-methods", "chaining", "objects", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" }
};

export default challenge;
