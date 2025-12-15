import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.VDT.COL-title-list-001",
  title: "Title List",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.VDT.COL", ],
  primaryStandard: "JS.VDT.COL",
  prerequisiteStandards: ["JS.VDT.PRM"],
  difficulty: 1,
  description: `Make an ordered list of book titles in an array.
Read and update a specific position by index.
 `.trim(),
  userStories: [
    "I can create an array to store an ordered list of values.",
    "I can read a value at a specific index (positions start at 0).",
    "I can replace one position in the list and see the change."
  ],
  acceptanceCriteria: [
    "Create an array named titles with at least 3 strings.",
    "Log the first title (index 0) and the last title (using titles.length - 1).",
    "Replace ONE title by index (ex: titles[1] = ...), then log the full titles array."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// TODO: Build a list of titles (array) and practice index access.

// Two books already exist as objects:
const book1 = {
  title: "The Way of Kings",
  author: "Brandon Sanderson",
  pages: 1010,
  isPaperback: false,
  genre: "Fantasy",
};

const book2 = {
  title: "Words of Radiance",
  author: "Brandon Sanderson",
  pages: 1087,
  isPaperback: false,
};

// 1) Create an array named titles with at least 3 strings.
//    At least two of them should come from book1.title and book2.title.

// 2) Log the first title and the last title.
//    (Hint: last index is titles.length - 1)

// 3) Replace ONE title by index (ex: update the second slot),
//    then log the whole titles array so the change is visible.

`
    }
  },
  entry: "/main.js",
  hints: [
    "Arrays are ordered lists. Indexes start at 0.",
    "Last item lives at titles[titles.length - 1]."
  ],
  tags: ["collections", "arrays", "indexing", "length", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" }
};

export default challenge;
