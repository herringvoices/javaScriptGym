import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.AR.MTH-chain-to-object-038",
  title: "Chain to Build Object",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.AR.MTH"],
  primaryStandard: "JS.AR.MTH",
  difficulty: 2,
  description: `
Chain methods to produce an object result.

Filter, map to objects, then find a specific one. The final result
is an object, not a primitive value.
  `.trim(),
  userStories: [
    "I can chain methods that produce objects.",
    "I can transform primitives to objects in chains.",
    "I see the found object logged."
  ],
  acceptanceCriteria: [
    "Filter numbers > 2.",
    "Map each to an object {v: n}.",
    "Find the first object where v > 4.",
    "Result should be {v: 5}.",
    "Log the object."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {"/main.js": {
      active: true,
      code: `// TODO: Chain to find object with v > 4

const nums = [1, 2, 3, 5];

// Your code: chain filter → map → find
// Filter: > 2 → [3, 5]
// Map: to {v: n} → [{v:3}, {v:5}]
// Find: v > 4 → {v: 5}
// Expected: {v: 5}


// Log your result

`
    }
  },
  entry: "/main.js",
  hints: [
    "nums.filter(n => n > 2)",
    ".map(n => ({v: n}))",
    ".find(obj => obj.v > 4);"
  ],
  tags: ["filter", "map", "find", "array-methods", "chaining", "objects", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" }
};

export default challenge;
