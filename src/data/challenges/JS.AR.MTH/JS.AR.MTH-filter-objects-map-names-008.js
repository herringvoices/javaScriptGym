import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.AR.MTH-filter-objects-map-names-008",
  title: "Filter Active Users, Map Names",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.AR.MTH"],
  primaryStandard: "JS.AR.MTH",
  difficulty: 2,
  description: `
Chain filter and map to extract active user names.

Work with an array of user objects. First filter to keep only active users,
then map to extract just their names.
  `.trim(),
  userStories: [
    "I can filter objects based on a boolean property.",
    "I can map objects to extract a specific property.",
    "I see the array of active user names logged."
  ],
  acceptanceCriteria: [
    "Filter users where active is true.",
    "Map the filtered results to get just the name property.",
    "Result should be ['Ada', 'Edsger'].",
    "Log the array of names."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {"/main.js": {
      active: true,
      code: `// TODO: Get names of active users

const users = [
  { name: 'Ada', active: true },
  { name: 'Lin', active: false },
  { name: 'Edsger', active: true }
];

// Your code: chain .filter() and .map()
// Filter: keep where active === true
// Map: extract the name property
// Expected: ['Ada', 'Edsger']


// Log your result

`
    }
  },
  entry: "/main.js",
  hints: [
    "Start with users.filter(u => u.active).",
    "Chain .map(u => u.name).",
    "The result is an array of strings."
  ],
  tags: ["filter", "map", "array-methods", "objects", "chaining", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" }
};

export default challenge;
