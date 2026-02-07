import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.AR.MTH-find-filter-chain-025",
  title: "Filter Then Find",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.AR.MTH"],
  primaryStandard: "JS.AR.MTH",
  difficulty: 2,
  description: `
Chain filter and find operations.

First filter to keep only active users, then find the first one whose
name starts with 'L'.
  `.trim(),
  userStories: [
    "I can chain filter and find methods.",
    "I can search within filtered results.",
    "I see the matching name logged."
  ],
  acceptanceCriteria: [
    "Filter users where active is true.",
    "Find the first user whose name starts with 'L'.",
    "Log the name (should be 'Lin')."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {"/main.js": {
      active: true,
      code: `// TODO: Filter active users then find name starting with 'L'

const users = [
  { name: 'Ada', active: true },
  { name: 'Lin', active: true },
  { name: 'Edsger', active: false }
];

// Your code: chain .filter() and .find()
// Filter: active === true
// Find: name starts with 'L'
// Expected: 'Lin'


// Log the name

`
    }
  },
  entry: "/main.js",
  hints: [
    "Start with users.filter(u => u.active).",
    "Chain .find(u => u.name.startsWith('L')).",
    "Access .name on the final result."
  ],
  tags: ["filter", "find", "array-methods", "chaining", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" }
};

export default challenge;
