import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.VDT.MTH-price-format-001",
  title: "Price Display",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.VDT.MTH", ],
  primaryStandard: "JS.VDT.MTH",
  prerequisiteStandards: ["JS.VDT.PRM", "JS.VDT.MTH"],
  difficulty: 2,
  description: `Format a number for display as money.
Use toFixed(2) and notice what type it returns.
 `.trim(),
  userStories: [
    "I can format a number with a fixed number of decimals.",
    "I can check whether the formatted result is a string or a number.",
  ],
  acceptanceCriteria: [
    "Create a number named rawTotal with decimals.",
    "Create displayTotal using rawTotal.toFixed(2).",
    "Log displayTotal and typeof displayTotal.",
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// TODO: Format a total for display.

const rawTotal = 19.9;

// 1) Create displayTotal using rawTotal.toFixed(2).
// 2) Log displayTotal.
// 3) Log typeof displayTotal.

`,
    },
  },
  entry: "/main.js",
  hints: ["toFixed returns a string."],
  tags: ["methods", "numbers", "toFixed", "typeof", "display"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
