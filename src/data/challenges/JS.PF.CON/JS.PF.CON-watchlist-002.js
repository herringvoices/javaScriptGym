import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.PF.CON-watchlist-002",
  title: "Watchlist",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.PF.CON",],
  primaryStandard: "JS.PF.CON",
  prerequisiteStandards: ["JS.VDT.PRM", "JS.VDT.COL"],
  difficulty: 1,
  description: `Create an array of titles and practice index access.
Then replace one item and prove it changed.
 `.trim(),
  userStories: [
    "I can store an ordered list in an array.",
    "I can access and replace items by index.",
  ],
  acceptanceCriteria: [
    "Log the first and last items, then replace one item by index and log the full array.",
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// TODO: Build a watchlist (array) and practice index access.

// 1) Create an array named watchlist with at least 4 show/movie titles (strings).

// 2) Log the first item and the last item.
//    Hint: last index is watchlist.length - 1

// 3) Replace ONE item in the middle by index,
//    then log the whole watchlist array.

`,
    },
  },
  entry: "/main.js",
  hints: [],
  tags: ["collections", "arrays", "indexing", "length", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
