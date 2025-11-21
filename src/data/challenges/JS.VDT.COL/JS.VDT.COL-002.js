import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.VDT.COL-book-card-001",
  title: "Book Card",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.VDT.COL"],
  primaryStandard: "JS.VDT.COL",
  difficulty: 1,
  description: `
Use an object to represent one book and log a short summary.
  `.trim(),
  userStories: [
    "I have an object that represents a single book.",
    "I log a short summary using that object's properties."
  ],
  acceptanceCriteria: [
    "Use an object literal with at least title, author, and pages.",
    "Use const for the book object.",
    "Access properties with dot notation (book.title, etc.).",
    "Log one summary line that includes all three properties."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// TODO: Represent one book with an object.
// 1. Make a const book = { ... } with title, author, and pages.
// 2. Log ONE summary line using those properties, like:
//    "The Hobbit by J.R.R. Tolkien (310 pages)"

`,
    },
  },
  entry: "/main.js",
  hints: [],
  tags: ["objects", "properties", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
