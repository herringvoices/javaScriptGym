import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.VDT.MTH-clean-author-match-001",
  title: "Clean Author Match",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.VDT.MTH", ],
  primaryStandard: "JS.VDT.MTH",
  prerequisiteStandards: ["JS.VDT.PRM", "JS.VDT.COL", "JS.VDT.MTH"],
  difficulty: 2,
  description: `Clean messy user input and compare it to an author on a book record.
Use .trim(), .toLowerCase(), and an access path into an array of objects.
 `.trim(),
  userStories: [
    "I can normalize user text into a reliable search string.",
    "I can compare normalized input to a record field.",
  ],
  acceptanceCriteria: [
    "Create books as an array of at least 2 book objects (each with author).",
    "Normalize userInput into normalizedInput (trim + lowercase).",
    "Create normalizedAuthor from one book's author (lowercase).",
    "Compute isSameAuthor and log each step.",
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// TODO: Clean user input so comparisons work reliably.

const books = [
  { title: "Neon Rain", author: "Riza", year: 2024 },
  { title: "Salt & Steel", author: "Brandon Sanderson", year: 2010 },
];

const userInput = "  BRandon sanderson   ";

// 1) Create trimmedInput using userInput.trim().
// 2) Create normalizedInput using trimmedInput.toLowerCase().
// 3) Create normalizedAuthor from ONE book's author (lowercased).
// 4) Create isSameAuthor by comparing normalizedInput === normalizedAuthor.
// 5) Log userInput, trimmedInput, normalizedInput, normalizedAuthor, isSameAuthor.

`,
    },
  },
  entry: "/main.js",
  hints: ["Normalize both sides before comparing."],
  tags: ["methods", "strings", "trim", "toLowerCase", "collections", "array-of-objects"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
