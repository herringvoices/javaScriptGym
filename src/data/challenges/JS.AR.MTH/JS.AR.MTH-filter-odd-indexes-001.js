import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.AR.MTH-filter-odd-indexes-001",
  title: "Filter Odd Indexes",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.AR.MTH", "JS.FN.HOF"],
  primaryStandard: "JS.AR.MTH",
  difficulty: 2,
  description: `
Use filter's index parameter to select items at odd positions.

Filter can access the element's index as a second parameter. Use this to filter
based on position rather than value.
  `.trim(),
  userStories: [
    "I can use filter with an index parameter to select specific positions.",
    "I see the filtered result logged to the console."
  ],
  acceptanceCriteria: [
    "Use the filter method with a callback that receives the index parameter.",
    "Keep only items at odd indexes (1, 3, 5, etc.).",
    "Log the result to verify the output is ['b', 'd']."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {"/main.js": {
      active: true,
      code: `// TODO: Use filter to get letters at odd indexes (1, 3, etc.)

const letters = ['a', 'b', 'c', 'd'];

// Your code: use filter with index parameter (_, i) => ...
// Expected result: ['b', 'd']


// Log your result to verify

`
    }
  },
  entry: "/main.js",
  hints: [
    "The filter callback can take two parameters: (element, index).",
    "Odd indexes are where index % 2 === 1.",
    "At index 1 is 'b', at index 3 is 'd'."
  ],
  tags: ["filter", "array-methods", "index-parameter", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" }
};

export default challenge;
