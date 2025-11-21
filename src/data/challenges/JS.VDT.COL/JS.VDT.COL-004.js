import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.VDT.COL-add-snack-001",
  title: "Add a New Snack",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.VDT.COL"],
  primaryStandard: "JS.VDT.COL",
  difficulty: 2,
  description: `
Start with a snack list, add one more, and log the result.
  `.trim(),
  userStories: [
    "I start with an array of snack strings.",
    "I add a new snack to the end of the array.",
    "I log the updated array."
  ],
  acceptanceCriteria: [
    "Use a const snacks array with at least two initial items.",
    "Use snacks.push(...) to add a new snack.",
    "Do not reassign snacks; just change its contents.",
    "Log the updated array after pushing."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// TODO: Add a snack to the list.
// 1. Start with const snacks = [ ... ] with at least two snack names.
// 2. Use snacks.push("some new snack") to add one more.
// 3. Log the updated snacks array.

`,
    },
  },
  entry: "/main.js",
  hints: [],
  tags: ["arrays", "push", "mutation", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
