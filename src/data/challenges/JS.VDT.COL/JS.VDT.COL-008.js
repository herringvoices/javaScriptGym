import { ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.VDT.COL-shelf-ends-001",
  title: "Ends of the Shelf",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.VDT.COL"],
  primaryStandard: "JS.VDT.COL",
  difficulty: 2,
  description: `
Use the first and last items of a books array to describe the shelf.
  `.trim(),
  acceptanceCriteria: [
    "Use books[0] for the first book.",
    "Use books[books.length - 1] for the last book.",
    "Return a string like 'First: X | Last: Y'.",
    "Assume the array has at least two books."
  ],
  files: {
    "/main.js": {
      code: `const shelf = [
  "The Hobbit",
  "A Wrinkle in Time",
  "The City of Brass",
  "Legends & Lattes",
];

function describeShelfEnds(books) {
  const firstBook = books[0];
  const lastBook = books[books.length - 1];
  return \`First: \${firstBook} | Last: \${lastBook}\`;
}

// Log the shelf ends to the console
console.log(describeShelfEnds(shelf));`,
    },
  },
  entry: "/main.js",
  hints: [
    "Use books[0] to access the first item in the array.",
    "Use books[books.length - 1] to access the last item in the array."
  ],
  tags: ["arrays", "indexes", "console"],
  sandbox: {
    defaultPanel: "console",
    showRightPanel: true,
    showExplorer: false,
  },
};

export default challenge;
