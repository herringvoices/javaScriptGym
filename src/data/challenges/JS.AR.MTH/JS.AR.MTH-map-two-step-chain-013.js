import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.AR.MTH-map-two-step-chain-013",
  title: "Two-Step Map Chain",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.AR.MTH"],
  primaryStandard: "JS.AR.MTH",
  difficulty: 2,
  description: `
Chain two map operations for a multi-step transformation.

First add 1 to each number, then multiply by 10. Chaining map methods
allows you to break complex transformations into simple steps.
  `.trim(),
  userStories: [
    "I can chain multiple map operations.",
    "I understand that each map creates a new array.",
    "I see the final transformed array logged."
  ],
  acceptanceCriteria: [
    "Chain two map operations.",
    "First map adds 1 to each number.",
    "Second map multiplies by 10.",
    "Result should be [20, 30].",
    "Log the result."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {"/main.js": {
      active: true,
      code: `// TODO: Chain two maps to transform numbers

const nums = [1, 2];

// Your code: chain .map().map()
// First: add 1 → [2, 3]
// Second: multiply by 10 → [20, 30]
// Expected: [20, 30]


// Log your result

`
    }
  },
  entry: "/main.js",
  hints: [
    "Start with nums.map(n => n + 1).",
    "Chain .map(n => n * 10).",
    "Each map operates on the result of the previous one."
  ],
  tags: ["map", "array-methods", "chaining", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" }
};

export default challenge;
