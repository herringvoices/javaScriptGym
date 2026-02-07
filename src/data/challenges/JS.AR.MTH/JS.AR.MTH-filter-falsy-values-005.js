import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.AR.MTH-filter-falsy-values-005",
  title: "Remove Falsy Values",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.AR.MTH", "JS.VDT.PRM"],
  primaryStandard: "JS.AR.MTH",
  difficulty: 2,
  description: `
Use filter to remove all falsy values from an array.

Falsy values in JavaScript include: false, 0, "", null, undefined, and NaN.
Filter can keep only truthy values.
  `.trim(),
  userStories: [
    "I can filter an array to remove falsy values.",
    "I understand which values are falsy in JavaScript.",
    "I see only truthy values in the result."
  ],
  acceptanceCriteria: [
    "Use filter with Boolean or a truthy check.",
    "Result should be [1, 'hi', true].",
    "Log the cleaned array."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {"/main.js": {
      active: true,
      code: `// TODO: Remove falsy values from the array

const arr = [0, 1, '', "hi", false, true];

// Your code: use filter to keep only truthy values
// Falsy values: 0, '', false
// Truthy values: 1, "hi", true
// Expected result: [1, "hi", true]


// Log your result

`
    }
  },
  entry: "/main.js",
  hints: [
    "You can use arr.filter(Boolean) to remove falsy values.",
    "Or use arr.filter(v => v) - truthy values pass the test.",
    "Falsy: false, 0, '', null, undefined, NaN."
  ],
  tags: ["filter", "array-methods", "truthy-falsy", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" }
};

export default challenge;
