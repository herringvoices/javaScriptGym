import { ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.VDT.COL-book-console-001",
  title: "Featured Book Console Line",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.VDT.COL"],
  primaryStandard: "JS.VDT.COL",
  difficulty: 1,
  description: `
Use an array of book objects to log one featured-book line to the console.
  `.trim(),
  acceptanceCriteria: [
    "Use the first book in the array (index 0).",
    "Log the title and author in the format: 'Title by Author'.",
  ],
  files: {
    "/main.js": {
      code: `// Example array of books
const books = [
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { title: "1984", author: "George Orwell" },
  { title: "To Kill a Mockingbird", author: "Harper Lee" }
];

// Log the featured book line to the console
const featuredBook = books[0];
console.log(\`\${featuredBook.title} by \${featuredBook.author}\`);`,
    },
  },
  entry: "/main.js",
  hints: [
    "Access the first element of the array using index 0.",
    "Use template literals to format the output string.",
  ],
  tags: ["arrays", "objects", "arrays-of-objects", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
