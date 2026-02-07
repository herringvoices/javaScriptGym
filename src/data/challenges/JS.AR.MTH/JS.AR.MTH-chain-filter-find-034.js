import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.AR.MTH-chain-filter-find-034",
  title: "Chain Filter Then Find",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.AR.MTH"],
  primaryStandard: "JS.AR.MTH",
  difficulty: 2,
  description: `
Narrow results with filter, then find a specific match.

First filter people by age, then find the first one matching
an additional criterion.
  `.trim(),
  userStories: [
    "I can chain filter and find methods.",
    "I can apply multiple search criteria in steps.",
    "I see the matching person's name logged."
  ],
  acceptanceCriteria: [
    "Filter people where age > 20.",
    "Find the first person with age > 40.",
    "Extract the name from the result.",
    "Log the name (should be 'Edsger')."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {"/main.js": {
      active: true,
      code: `// TODO: Filter age > 20, then find age > 40

const people = [
  { name: 'Ada', age: 30 },
  { name: 'Lin', age: 19 },
  { name: 'Edsger', age: 45 }
];

// Your code: chain .filter().find()
// Filter: age > 20 → removes Lin
// Find: age > 40 → finds Edsger
// Get name
// Expected: 'Edsger'


// Log the name

`
    }
  },
  entry: "/main.js",
  hints: [
    "Start with people.filter(p => p.age > 20).",
    "Chain .find(p => p.age > 40).",
    "Access .name on the result."
  ],
  tags: ["filter", "find", "array-methods", "chaining", "objects", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" }
};

export default challenge;
