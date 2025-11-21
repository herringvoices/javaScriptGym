import { ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.VDT.COL-daily-pages-001",
  title: "Daily Pages Summary",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.VDT.COL"],
  primaryStandard: "JS.VDT.COL",
  difficulty: 2,
  description: `
Use an array of daily page counts to build a simple summary line.
  `.trim(),
  acceptanceCriteria: [
    "Use an array of exactly three numbers for pages read.",
    "Use the array values (not hard-coded numbers) to compute the total.",
    "Return a string like 'Total pages in 3 days: 60'.",
    "You may use indexes (pages[0] + pages[1] + pages[2]); a loop is optional but not required."
  ],
  files: {
    "/main.js": {
      code: `const pagesRead = [20, 15, 25]; // 3 days of reading

function getPagesSummary(pages) {
  const total = pages[0] + pages[1] + pages[2];
  return \`Total pages in 3 days: \${total}\`;
}

// Log the daily pages summary to the console
console.log(getPagesSummary(pagesRead));`,
    },
  },
  entry: "/main.js",
  hints: [
    "Use array indexes to access the three numbers.",
    "Add the numbers together to compute the total."
  ],
  tags: ["arrays", "numbers", "console"],
  sandbox: {
    defaultPanel: "console",
    showRightPanel: true,
    showExplorer: false,
  },
};

export default challenge;
