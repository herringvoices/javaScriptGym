import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.VDT.COL-update-book-status-001",
  title: "Update a Book's Status",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.VDT.COL"],
  primaryStandard: "JS.VDT.COL",
  difficulty: 2,
  description: `
Track whether a book is checked out using an object inside an array.
  `.trim(),
  userStories: [
    "I have an array with at least one book object that includes an isCheckedOut property.",
    "I change isCheckedOut for one book.",
    "I log the book before and after the change."
  ],
  acceptanceCriteria: [
    "Use an array of book objects; each book has title and isCheckedOut.",
    "Use const for the array.",
    "Update isCheckedOut on one of the books using dot notation.",
    "Log the chosen book before and after updating its status."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// TODO: Update a book's checkout status.
// 1. Make a const shelf = [ ... ] array with at least one book object.
//    Each book should have title and isCheckedOut (a boolean).
// 2. Log ONE book before changing it.
// 3. Change that book's isCheckedOut value (e.g. from false to true).
// 4. Log the same book again after the change.

`,
    },
  },
  entry: "/main.js",
  hints: [],
  tags: ["arrays", "objects", "booleans", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
