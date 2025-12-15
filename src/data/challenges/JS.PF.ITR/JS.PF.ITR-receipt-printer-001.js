import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.PF.ITR-receipt-printer-001",
  title: "Receipt Printer",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.PF.ITR", "JS.VDT.COL"],
  primaryStandard: "JS.PF.ITR",
  prerequisiteStandards: ["JS.VDT.PRM", "JS.VDT.COL"],
  difficulty: 2,
  description: `Walk an array by index using a classic for loop. Print a numbered receipt line for each item.`.trim(),
  userStories: [
    "I can loop through an array using indexes.",
    "I can format a line that includes index plus value.",
  ],
  acceptanceCriteria: [
    "Use a for loop that starts at 0 and stops at items.length (no hard-coded stop).",
    "Log each item as a numbered line like '1) bread'.",
    "All items print exactly once.",
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// TODO: Print a numbered receipt using a for loop (index-based).

const items = ["bread", "milk", "eggs", "coffee"];

// Requirements:
// - Use a for loop with i
// - Use items.length in the stop condition
// - Log numbered lines (human numbering starts at 1)
//
// Example output shape:
// 1) bread
// 2) milk
// 3) eggs
// 4) coffee

`,
    },
  },
  entry: "/main.js",
  hints: ["Human numbering is i + 1.", "Stop condition should be i < items.length."],
  tags: ["iteration", "for-loop", "arrays", "indexing", "length"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
