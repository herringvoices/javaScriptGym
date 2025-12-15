import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.PF.ITR-restock-report-001",
  title: "Restock Report",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.PF.ITR", "JS.PF.CON", "JS.VDT.COL"],
  primaryStandard: "JS.PF.ITR",
  prerequisiteStandards: ["JS.VDT.PRM", "JS.VDT.COL", "JS.PF.CON"],
  difficulty: 4,
  description: `Loop plus if plus push. Collect item names that need restocking.`.trim(),
  userStories: [
    "I can loop over records and check a condition per item.",
    "I can build a list of matches in a new array.",
  ],
  acceptanceCriteria: [
    "Create const restockList = [];",
    "Loop inventory with for...of.",
    "If item.quantity <= reorderPoint, push item.name into restockList.",
    "Log restockList after the loop.",
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// TODO: Build a restock list using a loop plus if.

const inventory = [
  { name: "printer paper", quantity: 1 },
  { name: "dry erase markers", quantity: 6 },
  { name: "sticky notes", quantity: 2 },
  { name: "snacks", quantity: 0 },
];

const reorderPoint = 2;

// Requirements:
// - restockList starts empty
// - for...of loop over inventory
// - if quantity <= reorderPoint, push the name
// - log restockList at the end

`,
    },
  },
  entry: "/main.js",
  hints: ["Pattern: loop, if, push, log after."],
  tags: ["iteration", "for-of", "conditionals", "arrays-of-objects", "filtering-pattern"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
