import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.PF.ITR-seat-map-scan-001",
  title: "Seat Map Scan",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.PF.ITR", "JS.PF.CON", "JS.VDT.COL"],
  primaryStandard: "JS.PF.ITR",
  prerequisiteStandards: ["JS.VDT.PRM", "JS.VDT.COL", "JS.PF.CON"],
  difficulty: 5,
  description: `Use nested loops over a grid (array of arrays). Count reserved seats and log row summaries.`.trim(),
  userStories: [
    "I can write a loop inside another loop.",
    "I can track totals while scanning a two-dimensional structure.",
  ],
  acceptanceCriteria: [
    "Use an outer loop to visit each row in seatMap.",
    "Use an inner loop to visit each seat in the row.",
    "Count how many seats are 'X' (reserved) in each row and in total.",
    "Log each row's reserved count, then log totalReserved at the end.",
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// TODO: Scan a seat map using nested loops.
// "X" = reserved, "O" = open

const seatMap = [
  ["O", "X", "O", "O"],
  ["X", "X", "O", "O"],
  ["O", "O", "O", "X"],
];

// Requirements:
// - Outer loop visits each row
// - Inner loop visits each seat
// - Count reserved seats per row AND total
// - Log row summaries like: "Row 1 reserved: 1"
// - After all rows: log "Total reserved: <number>"

`,
    },
  },
  entry: "/main.js",
  hints: ["Reset the row counter inside the outer loop.", "Total counter lives outside both loops."],
  tags: ["iteration", "nested-loops", "arrays", "2d-arrays", "counters"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
