import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.VDT.MTH-peek-shape-001",
  title: "Peek the Shape",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.VDT.MTH", ],
  primaryStandard: "JS.VDT.MTH",
  prerequisiteStandards: ["JS.VDT.PRM", "JS.VDT.COL", "JS.VDT.MTH"],
  difficulty: 2,
  description: `Use Object.keys, Object.values, and Object.entries to inspect an object.
Then access a few items by index.
 `.trim(),
  userStories: [
    "I can generate a list of an object's keys, values, and entries.",
    "I can access specific keys or values by index and log them.",
  ],
  acceptanceCriteria: [
    "Create a book object with at least 4 keys of mixed types.",
    "Create keys, values, and entries using Object.keys/values/entries.",
    "Log the arrays and log at least one indexed value from each.",
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// TODO: Use Object utilities to peek at an object's shape.

const book = {
  title: "Neon Rain",
  author: "Riza",
  year: 2024,
  isPaperback: true,
};

// 1) Create keys using Object.keys(book).
// 2) Create values using Object.values(book).
// 3) Create entries using Object.entries(book).
//
// 4) Log keys, values, entries.
// 5) Also log:
//    - keys[0]
//    - values[values.length - 1]
//    - entries[0]  (a [key, value] pair)

`,
    },
  },
  entry: "/main.js",
  hints: ["Ask: what does it need? what does it return?"],
  tags: ["methods", "Object.keys", "Object.values", "Object.entries", "collections", "indexing"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
