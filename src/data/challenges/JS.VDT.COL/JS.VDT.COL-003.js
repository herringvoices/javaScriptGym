import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.VDT.COL-shelf-of-books-001",
  title: "Shelf of Books",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.VDT.COL"],
  primaryStandard: "JS.VDT.COL",
  difficulty: 2,
  description: `
Make a small shelf: an array of book objects, then inspect one.
  `.trim(),
  userStories: [
    "I have an array with at least three book objects.",
    "Each book has at least a title and author.",
    "I log the number of books and one book's title."
  ],
  acceptanceCriteria: [
    "Use an array literal where each element is a book object.",
    "Each book object has at least title and author properties.",
    "Use const for the shelf array.",
    "Log the length of the shelf and the title of one book using index + dot notation."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// TODO: Build a tiny "shelf" of books.
// 1. Make a const shelf = [ ... ] array of book objects.
//    Each book should have at least title and author.
// 2. Log how many books are on the shelf (shelf.length).
// 3. Log the title of ONE book using shelf[?].title.

`,
    },
  },
  entry: "/main.js",
  hints: [],
  tags: ["arrays", "objects", "arrays-of-objects", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
