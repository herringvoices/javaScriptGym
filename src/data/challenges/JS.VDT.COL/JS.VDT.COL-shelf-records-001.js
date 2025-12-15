import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.VDT.COL-shelf-records-001",
  title: "Shelf Records",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.VDT.COL", ],
  primaryStandard: "JS.VDT.COL",
  prerequisiteStandards: ["JS.VDT.PRM"],
  difficulty: 2,
  description: `Represent structured data as an array of book objects.
Access a specific record and update one field through the array.
 `.trim(),
  userStories: [
    "I can store multiple similar records in an array of objects.",
    "I can access a specific record using an array index.",
    "I can update a field on one record using a path like books[1].pages."
  ],
  acceptanceCriteria: [
    "Create an array named books that contains the three provided book objects (in any order).",
    "Log one line that uses a path like books[0].title (or books[1].author, etc.).",
    "Update ONE field on ONE record through the array (ex: books[2].pages = ...), then log that updated record."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// TODO: Put book records on a shelf (array of objects).

const book1 = {
  title: "The Way of Kings",
  author: "Brandon Sanderson",
  pages: 1010,
  isPaperback: false,
  genre: "Fantasy",
};

const book2 = {
  title: "Words of Radiance",
  author: "Brandon Sanderson",
  pages: 1087,
  isPaperback: false,
  genre: "Fantasy",
};

const book3 = {
  title: "Oathbringer",
  author: "Brandon Sanderson",
  pages: 1248,
  isPaperback: false,
  genre: "Fantasy",
};

// 1) Create an array named books that contains book1, book2, and book3.

// 2) Log ONE line that proves you can reach into a specific record.
//    Example shape (yours can differ):
//    "Featured: Words of Radiance by Brandon Sanderson"

// 3) Update ONE field on ONE record THROUGH the array access path.
//    Examples (pick one):
//    - books[0].isPaperback = true
//    - books[1].pages = 999
//    - books[2].genre = "Epic Fantasy"
//    Then log the updated record (the whole object).

`
    }
  },
  entry: "/main.js",
  hints: [
    "An array of objects models structured datasets (like API responses).",
    "Update through a path: books[index].someKey = newValue"
  ],
  tags: ["collections", "array-of-objects", "access-paths", "mutation", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" }
};

export default challenge;
