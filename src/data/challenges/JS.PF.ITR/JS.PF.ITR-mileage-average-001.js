import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.PF.ITR-mileage-average-001",
  title: "Mileage Average",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.PF.ITR", "JS.VDT.COL"],
  primaryStandard: "JS.PF.ITR",
  prerequisiteStandards: ["JS.VDT.PRM", "JS.VDT.COL"],
  difficulty: 3,
  description: `Use for...of to total numbers in an array, then compute an average.`.trim(),
  userStories: [
    "I can loop through a list of numbers with for...of.",
    "I can keep a running total and compute an average after the loop.",
  ],
  acceptanceCriteria: [
    "Use for...of to sum all values in milesPerDay into totalMiles.",
    "Compute averageMiles = totalMiles / milesPerDay.length.",
    "Log totalMiles and averageMiles.",
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// TODO: Sum miles and compute an average using for...of.

const milesPerDay = [3.2, 4.1, 2.7, 5.0, 3.9];

// Requirements:
// - totalMiles starts at 0
// - for...of loop adds each day's miles to totalMiles
// - compute averageMiles AFTER the loop
// - log totalMiles and averageMiles

`,
    },
  },
  entry: "/main.js",
  hints: ["for...of gives you each value directly: for (const miles of milesPerDay)"],
  tags: ["iteration", "for-of", "arrays", "running-total"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
