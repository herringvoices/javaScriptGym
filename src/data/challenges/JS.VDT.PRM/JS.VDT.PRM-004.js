import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.VDT.PRM-book-progress-001",
  title: "Book Progress",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.VDT.PRM"],
  primaryStandard: "JS.VDT.PRM",
  difficulty: 2,
  description: `
Describe reading progress for a book using numbers and a template literal.
  `.trim(),
  userStories: [
    "I have variables for a book title and page counts.",
    "I compute pages left and log one progress message."
  ],
  acceptanceCriteria: [
    "Use a string for the book title and numbers for page counts.",
    "Compute pages left with subtraction (total minus read).",
    "Use a template literal (backticks with ${...}) for the message.",
    "Log the message once."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// TODO: Show reading progress for a book.
// 1. Make variables for a book title, total pages, and pages read so far.
// 2. Compute how many pages are left.
// 3. Use a template literal to log ONE line like:
//    "You have 120 pages left in The Hobbit."

`,
    },
  },
  entry: "/main.js",
  hints: [],
  tags: ["primitives", "numbers", "template-literals", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
