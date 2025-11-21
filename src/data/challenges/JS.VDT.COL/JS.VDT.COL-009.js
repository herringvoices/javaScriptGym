import { ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.VDT.COL-reading-queue-001",
  title: "Reading Queue Peek",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.VDT.COL"],
  primaryStandard: "JS.VDT.COL",
  difficulty: 2,
  description: `
Use a reading queue array to show what’s coming up next.
  `.trim(),
  acceptanceCriteria: [
    "Use the readingQueue array passed into the helper.",
    "If there is at least one book, include the first title.",
    "If there is a second book, include that title too.",
    "Return a string like 'Next: X' or 'Next: X, then Y'.",
  ],
  files: {
    "/main.js": {
      code: `const readingQueue = [
  "The Hobbit",
  "A Wrinkle in Time",
  "The City of Brass",
];

function getQueuePreview(books) {
  if (books.length === 0) return "No books in the queue.";
  const firstBook = books[0];
  const secondBook = books[1];
  return secondBook ? \`Next: \${firstBook}, then \${secondBook}\` : \`Next: \${firstBook}\`;
}

// Log the reading queue preview to the console
console.log(getQueuePreview(readingQueue));`,
    },
  },
  entry: "/main.js",
  hints: [
    "Check if the array has at least one item before accessing it.",
    "Use a conditional to decide whether to include the second book.",
  ],
  tags: ["arrays", "indexes", "console"],
  sandbox: {
    defaultPanel: "console",
    showRightPanel: true,
    showExplorer: false,
  },
};

export default challenge;
