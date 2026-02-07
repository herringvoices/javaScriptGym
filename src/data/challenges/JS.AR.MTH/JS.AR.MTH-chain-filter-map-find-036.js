import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.AR.MTH-chain-filter-map-find-036",
  title: "Three-Step Chain: Filter-Map-Find",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.AR.MTH"],
  primaryStandard: "JS.AR.MTH",
  difficulty: 3,
  description: `
Chain three array methods in sequence.

Build a pipeline: filter to keep evens, map to square them,
then find the first square greater than 50.
  `.trim(),
  userStories: [
    "I can chain three array methods together.",
    "I understand multi-step data transformations.",
    "I see the found value logged."
  ],
  acceptanceCriteria: [
    "Filter to keep only even numbers.",
    "Map to square each number.",
    "Find the first square > 50.",
    "Result should be 64 (8 squared).",
    "Log the result."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {"/main.js": {
      active: true,
      code: `// TODO: Filter evens → square → find first > 50

const nums = [4, 5, 6, 7, 8];

// Your code: chain .filter().map().find()
// Filter: evens → [4, 6, 8]
// Map: squares → [16, 36, 64]
// Find: first > 50 → 64
// Expected: 64


// Log your result

`
    }
  },
  entry: "/main.js",
  hints: [
    "nums.filter(n => n % 2 === 0)",
    ".map(n => n * n)",
    ".find(n => n > 50);"
  ],
  tags: ["filter", "map", "find", "array-methods", "chaining", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" }
};

export default challenge;
