import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.AR.MTH-chain-filter-map-032",
  title: "Chain Filter Then Map",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.AR.MTH"],
  primaryStandard: "JS.AR.MTH",
  difficulty: 1,
  description: `
Chain filter and map for a two-step transformation.

First filter to keep only even numbers, then map to double them.
Chaining methods creates a pipeline of transformations.
  `.trim(),
  userStories: [
    "I can chain filter and map methods.",
    "I understand method chaining order matters.",
    "I see the filtered and doubled results logged."
  ],
  acceptanceCriteria: [
    "Filter to keep even numbers.",
    "Map to double the remaining numbers.",
    "Result should be [4, 8].",
    "Log the result."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {"/main.js": {
      active: true,
      code: `// TODO: Filter evens then double them

const nums = [1, 2, 3, 4];

// Your code: chain .filter().map()
// Filter: keep evens → [2, 4]
// Map: double → [4, 8]
// Expected: [4, 8]


// Log your result

`
    }
  },
  entry: "/main.js",
  hints: [
    "Start with nums.filter(n => n % 2 === 0).",
    "Chain .map(n => n * 2).",
    "Each method returns an array, allowing the next to chain."
  ],
  tags: ["filter", "map", "array-methods", "chaining", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" }
};

export default challenge;
