import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.AR.MTH-foreach-sum-027",
  title: "Sum with forEach",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.PF.ITR", "JS.AR.MTH"],
  primaryStandard: "JS.PF.ITR",
  difficulty: 1,
  description: `
Calculate a sum using forEach.

forEach runs a function for each element. Unlike map, it doesn't return
a new array - it's used for side effects like accumulating values.
  `.trim(),
  userStories: [
    "I can use forEach to iterate through an array.",
    "I can accumulate a sum using an external variable.",
    "I see the total sum logged."
  ],
  acceptanceCriteria: [
    "Use forEach to iterate through the numbers.",
    "Add each number to a sum variable.",
    "Log the total (should be 8)."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {"/main.js": {
      active: true,
      code: `// TODO: Calculate sum using forEach

const nums = [2, 5, 1];

// Your code: initialize sum to 0
// Use forEach to add each number
// Expected sum: 8


// Log the sum

`
    }
  },
  entry: "/main.js",
  hints: [
    "Start with: let sum = 0;",
    "Use: nums.forEach(n => { sum += n; });",
    "forEach returns undefined, so you log the sum variable."
  ],
  tags: ["foreach", "array-methods", "accumulation", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" }
};

export default challenge;
