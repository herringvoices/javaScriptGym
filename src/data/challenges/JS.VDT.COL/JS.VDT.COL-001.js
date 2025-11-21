import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.VDT.COL-snack-list-001",
  title: "Snack List",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.VDT.COL"],
  primaryStandard: "JS.VDT.COL",
  difficulty: 1,
  description: `
Make a simple list of favorite snacks and inspect it.
  `.trim(),
  userStories: [
    "I have an array with at least three snack names.",
    "I log the whole array once.",
    "I log a single snack from the array using its index."
  ],
  acceptanceCriteria: [
    "Use an array literal with at least three string values.",
    "Use const for the snacks array.",
    "Log the array once.",
    "Log one element by index (e.g. snacks[0])."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// TODO: Make a list of favorite snacks.
// 1. Create a const snacks = [...] array with at least three strings.
// 2. Log the whole snacks array.
// 3. Log ONE snack by index, like snacks[0].

`,
    },
  },
  entry: "/main.js",
  hints: [],
  tags: ["arrays", "strings", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
