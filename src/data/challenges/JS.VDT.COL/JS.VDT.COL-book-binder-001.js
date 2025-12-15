import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.VDT.COL-book-binder-001",
  title: "Book Binder",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.VDT.COL", "JS.VDT.COL"],
  primaryStandard: "JS.VDT.COL",
  prerequisiteStandards: ["JS.VDT.PRM"],
  difficulty: 1,
  description: `Bundle scattered book info into ONE object.
Then read + update a field using dot paths.
 `.trim(),
  userStories: [
    "I can store related book details together in a single object.",
    "I can read object fields to build a readable console message.",
    "I can update one field safely and prove it changed."
  ],
  acceptanceCriteria: [
    "Create ONE object named book with at least: title, author, pages, isPaperback.",
    "Log one line that uses book.title and book.author (and at least one more field).",
    "Update ONE field (like pages or isPaperback) using dot notation, then log the updated value."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// TODO: Turn scattered book fields into ONE binder (object).

// You start with separate variables (scattered boxes):
const title = "The Way of Kings";
const author = "Brandon Sanderson";
const pages = 1007;
const isPaperback = false;

// 1) Create ONE object named book that bundles these values.
//    Required keys: title, author, pages, isPaperback

// 2) Log ONE readable line using dot access.
//    Example shape (yours can differ):
//    "The Way of Kings by Brandon Sanderson (1007 pages) | Paperback: false"

// 3) Update ONE field using dot notation (ex: pages or isPaperback),
//    then log something that proves it changed.

`
    }
  },
  entry: "/main.js",
  hints: [
    "Objects bundle related key–value pairs for ONE thing.",
    "Dot notation looks like: book.title"
  ],
  tags: ["collections", "objects", "dot-notation", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" }
};

export default challenge;
