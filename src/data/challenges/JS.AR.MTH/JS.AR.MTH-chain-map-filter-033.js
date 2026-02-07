import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.AR.MTH-chain-map-filter-033",
  title: "Chain Map Then Filter",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.AR.MTH"],
  primaryStandard: "JS.AR.MTH",
  difficulty: 1,
  description: `
Transform first, then filter the results.

Convert words to uppercase, then filter to keep only those longer than 2 characters.
Notice how the order of operations affects the outcome.
  `.trim(),
  userStories: [
    "I can chain map then filter.",
    "I understand how transformation affects filtering.",
    "I see the uppercase long words logged."
  ],
  acceptanceCriteria: [
    "Map words to uppercase.",
    "Filter to keep only those with length > 2.",
    "Result should be ['CODE', 'MAP'].",
    "Log the result."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {"/main.js": {
      active: true,
      code: `// TODO: Uppercase then filter by length

const words = ['hi', 'code', 'map'];

// Your code: chain .map().filter()
// Map: to uppercase → ['HI', 'CODE', 'MAP']
// Filter: length > 2 → ['CODE', 'MAP']
// Expected: ['CODE', 'MAP']


// Log your result

`
    }
  },
  entry: "/main.js",
  hints: [
    "Start with words.map(w => w.toUpperCase()).",
    "Chain .filter(w => w.length > 2).",
    "'HI' has length 2, so it's excluded."
  ],
  tags: ["map", "filter", "array-methods", "chaining", "string-methods", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" }
};

export default challenge;
