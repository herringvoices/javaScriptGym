import { ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.VDT.COL-shelf-count-001",
  title: "Shelf Count Badge",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.VDT.COL"],
  primaryStandard: "JS.VDT.COL",
  difficulty: 1,
  description: `
Show how many books are on a shelf using the array's length.
  `.trim(),
  acceptanceCriteria: [
    "Use books.length to determine the count.",
    "Return a string like '3 books on this shelf'.",
    "Do not mutate the books array."
  ],
  files: {
    "/main.js": {
      code: `const shelf = [
  { title: "The Hobbit", author: "J.R.R. Tolkien" },
  { title: "A Wrinkle in Time", author: "Madeleine L'Engle" },
  { title: "The City of Brass", author: "S.A. Chakraborty" },
];

function getShelfCountLabel(books) {
  return \`\${books.length} books on this shelf\`;
}

// Log the shelf count to the console
console.log(getShelfCountLabel(shelf));`,
    },
  },
  entry: "/main.js",
  hints: [
    "Use the .length property to get the number of items in the array.",
    "Use template literals to format the output string."
  ],
  tags: ["arrays", "length", "console"],
  sandbox: {
    defaultPanel: "console",
    showRightPanel: true,
    showExplorer: false,
  },
};

export default challenge;
