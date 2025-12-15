import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.VDT.COL-library-state-001",
  title: "Choose the Right Shape",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.VDT.COL", "JS.VDT.COL"],
  primaryStandard: "JS.VDT.COL",
  prerequisiteStandards: ["JS.VDT.PRM"],
  difficulty: 3,
  description: `Design a tiny "library state" using the right collection type for each job:
object vs array vs array of objects vs object of arrays of objects.
 `.trim(),
  userStories: [
    "I can choose objects for grouped details about one thing.",
    "I can choose arrays for ordered lists.",
    "I can choose arrays of objects for lists of structured records.",
    "I can use an object whose values are arrays of book objects to group shelves by category."
  ],
  acceptanceCriteria: [
    "Create a top-level object named libraryState.",
    "libraryState.currentUser is an object with at least name and memberSinceYear.",
    "libraryState.books is an array of at least 3 book objects (each with at least title and author).",
    "libraryState.readingQueue is an array that represents an ordered list (titles OR ids—your choice, but be consistent).",
    "libraryState.shelvesByGenre is an object where each key is a genre and each value is an array of book objects.",
    "Log at least THREE access examples that prove your shapes work (ex: currentUser.name, books[0].title, shelvesByGenre.Fantasy[0].author, readingQueue[0])."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// TODO: Build a tiny "library state" with the right collection types.
// No loops needed. This is about SHAPE and ACCESS.

// Requirements:
// - libraryState (object)
//   - currentUser (object)
//   - books (array of objects)
//   - readingQueue (array)  -> ordered list (titles OR ids, your call)
//   - shelvesByGenre (object of arrays of objects)

// 1) Create libraryState with the required keys.

// 2) Fill it with realistic-ish sample data:
//    - currentUser: { name: "...", memberSinceYear: 2020, ... }
//    - books: [ { title: "...", author: "..." }, ... ]
//    - readingQueue: [ ... ] (match your choice: titles OR ids)
//    - shelvesByGenre: {
//        Fantasy: [ {title, author, ...}, ... ],
//        SciFi:   [ {title, author, ...}, ... ],
//      }

// 3) Log at least THREE different access paths that prove it works.
//    Examples (pick your own):
//    - console.log(libraryState.currentUser.name)
//    - console.log(libraryState.books[0].title)
//    - console.log(libraryState.shelvesByGenre.Fantasy[0].author)
//    - console.log(libraryState.readingQueue[0])

`
    }
  },
  entry: "/main.js",
  hints: [
    "Ask: is it ONE thing with named fields (object) or an ordered list (array)?",
    "When you have many similar records, use an array of objects.",
    "When you want categories → lists, use an object whose values are arrays."
  ],
  tags: ["collections", "data-shaping", "objects", "arrays", "array-of-objects"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" }
};

export default challenge;
