import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.AR.MTH-filter-dynamic-threshold-007",
  title: "Filter with Dynamic Threshold",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.AR.MTH", "JS.FN.BAS"],
  primaryStandard: "JS.AR.MTH",
  difficulty: 2,
  description: `
Use a variable threshold in your filter predicate.

Filter callbacks can reference variables from the outer scope. Use the limit
variable to filter numbers greater than the threshold.
  `.trim(),
  userStories: [
    "I can use external variables in filter predicates.",
    "I can filter based on dynamic conditions.",
    "I see numbers greater than the limit logged."
  ],
  acceptanceCriteria: [
    "Use the limit variable in the filter callback.",
    "Keep only numbers strictly greater than limit (> not >=).",
    "Result should be [11, 15].",
    "Log the result."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {"/main.js": {
      active: true,
      code: `// TODO: Filter numbers greater than the limit

const nums = [5, 9, 10, 11, 15];
const limit = 10;

// Your code: filter nums where n > limit
// Expected result: [11, 15]


// Log your result

`
    }
  },
  entry: "/main.js",
  hints: [
    "The filter callback can access variables from outside: n => n > limit.",
    "Use strict greater than (>) not greater-or-equal (>=).",
    "10 is equal to limit, so it should be excluded."
  ],
  tags: ["filter", "array-methods", "closure", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" }
};

export default challenge;
