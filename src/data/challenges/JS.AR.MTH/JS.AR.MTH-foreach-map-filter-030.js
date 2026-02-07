import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.AR.MTH-foreach-map-filter-030",
  title: "Emulate Map+Filter with forEach",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.PF.ITR", "JS.PF.CON"],
  primaryStandard: "JS.PF.ITR",
  difficulty: 3,
  description: `
Combine transformation and filtering in a single forEach loop.

Use forEach to both transform values (double them) and filter results
(keep only those greater than 7). This demonstrates how forEach can
replace multiple chained operations.
  `.trim(),
  userStories: [
    "I can perform complex logic inside forEach.",
    "I can combine transformation and filtering.",
    "I see the filtered, transformed array logged."
  ],
  acceptanceCriteria: [
    "Use ONE forEach loop.",
    "Double each number, then check if it's > 7.",
    "Push matching values to result array.",
    "Result should be [8] (only 4 doubled is 8, and 8 > 7).",
    "Log the result."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {"/main.js": {
      active: true,
      code: `// TODO: Double numbers and keep only those > 7

const nums = [1, 3, 4];

// Your code: use forEach to transform AND filter
// Double each: 1→2, 3→6, 4→8
// Keep only > 7: only 8 qualifies
// Expected result: [8]


// Log your result

`
    }
  },
  entry: "/main.js",
  hints: [
    "Initialize: const result = [];",
    "forEach: const doubled = n * 2; if (doubled > 7) result.push(doubled);",
    "Only 4 * 2 = 8 passes the > 7 test."
  ],
  tags: ["foreach", "array-methods", "transformation", "filtering", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" }
};

export default challenge;
