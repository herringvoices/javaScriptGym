import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.VDT.COL-grocery-line-001",
  title: "Grocery Line",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.VDT.COL", "JS.VDT.COL"],
  primaryStandard: "JS.VDT.COL",
  prerequisiteStandards: ["JS.VDT.PRM"],
  difficulty: 1,
  description: `Create an ordered list using an array.
Access first/last items and replace one by index.
 `.trim(),
  userStories: [
    "I can store an ordered list of values in an array.",
    "I can access items by index (starting at 0).",
    "I can replace one item and see the updated array.",
  ],
  acceptanceCriteria: [
    "Create an array named groceryLine with at least 5 strings.",
    "Log the first item (index 0) and the last item (using length - 1).",
    "Replace ONE item at a specific index, then log the entire groceryLine array.",
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// TODO: Build a grocery line (array) and practice index access.

// 1) Create an array named groceryLine with at least 5 strings.
//    Example items: "milk", "bread", "eggs", ...

// 2) Log the first item and the last item.
//    Hint: last index is groceryLine.length - 1

// 3) Replace ONE item by index (pick any index that exists),
//    then log the full groceryLine array so the change is visible.

`,
    },
  },
  entry: "/main.js",
  hints: [
    "Arrays are ordered lists. Indexes start at 0.",
    "Last item lives at groceryLine[groceryLine.length - 1].",
  ],
  tags: ["collections", "arrays", "indexing", "length", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
