// Unit E — Arrays of Objects (AoO)
export const arraysOfObjects = [
  {
    id: "E1",
    title: "Read property from object in array",
    type: "value",
    topic: "array",
    difficulty: "★",
  prompt: "What is logged to the console?",
    snippet: `const users = [
  { name: "Sam" },
  { name: "Lee" }
];
console.log(users[1].name);`,
    expected: "Lee",
    hints: [
      "Pick the second object with index 1",
      "Then read its 'name'",
      "Return the string"
    ]
  },
  {
    id: "E2",
    title: "Bracket path inside AoO",
    type: "value",
    topic: "array",
    difficulty: "★",
  prompt: "What is logged to the console?",
    snippet: `const inventory = [
  { item: "sword" },
  { item: "shield" }
];
console.log(inventory[0]["item"]);`,
    expected: "sword",
    hints: [
      "Index 0 is the first object",
      "Read its 'item' via bracket",
      "Return the string"
    ]
  },
  {
    id: "E3",
    title: "Nested array inside AoO",
    type: "value",
    topic: "array",
    difficulty: "★★",
  prompt: "What is logged to the console?",
    snippet: `const courses = [
  {
    title: "JS 101",
    tags: [
      "beginner",
      "objects"
    ]
  }
];
console.log(courses[0].tags[1]);`,
    expected: "objects",
    hints: [
      "First course, then its tags array",
      "Index 1 is the second tag",
      "Return the string"
    ]
  },
  {
    id: "E4",
    title: "Path writing for AoO",
    type: "path",
    topic: "array",
    difficulty: "★★",
  prompt: "Type the <strong>path</strong> to read the second product's price.",
    snippet: `const products = [
  { price: 10 },
  { price: 25 }
];
// Type the property path to get the second price`,
    expected: "products[1].price",
    hints: [
      "Second item is index 1",
      "Then read price",
      "products[1].price"
    ]
  },
  {
    id: "E5",
    title: "Index via variable then dot",
    type: "value",
    topic: "array",
    difficulty: "★★",
  prompt: "What is logged to the console?",
    snippet: `const books = [
  { title: "A" },
  { title: "B" },
  { title: "C" }
];
const i = 0;
console.log(books[i].title);`,
    expected: "A",
    hints: [
      "Use variable index",
      "Then read the title",
      "Return the string"
    ]
  },
  {
    id: "E6",
    title: "Bracket key inside object in array",
    type: "value",
    topic: "array",
    difficulty: "★★",
  prompt: "What is logged to the console?",
    snippet: `const records = [
  { "release year": 1999 }
];
console.log(records[0]["release year"]);`,
    expected: 1999,
    hints: [
      "Index first object",
      "Then bracket key with space",
      "Return the year"
    ]
  },
  {
    id: "E7",
    title: "Missing property inside array of objects",
    type: "value",
    topic: "array",
    difficulty: "★",
  prompt: "What is logged to the console?",
    snippet: `const users = [
  { name: "Ada" }
];
console.log(users[0].email);`,
    expected: undefined,
    hints: [
      "email is not present",
      "Reading missing property returns undefined",
      "So the value is undefined"
    ]
  },
  {
    id: "E8",
    title: "Path writing: second object's nested key",
    type: "path",
    topic: "array",
    difficulty: "★★",
  prompt: "Type the <strong>path</strong> to read the tag 'advanced'.",
    snippet: `const courses = [
  { tags: ["intro", "basic"] },
  { tags: ["intermediate", "advanced"] }
];
// Type the property path to get the string 'advanced'`,
    expected: "courses[1].tags[1]",
    hints: [
      "Second object index is 1",
      "Then tags index 1",
      "courses[1].tags[1]"
    ]
  },
  {
    id: "E9",
    title: "Variable index and variable key",
    type: "value",
    topic: "array",
    difficulty: "★★★",
  prompt: "What is logged to the console when <code>i</code> is 1 and <code>key</code> is 'name'?",
    snippet: `const pets = [
  { name: "Milo" },
  { name: "Otis" }
];
const i = 1;
const key = "name";
console.log(pets[i][key]);`,
    expected: "Otis",
    hints: [
      "Use the variable index",
      "Then the variable key",
      "Return the string"
    ]
  },
  {
    id: "E10",
    title: "Read nested property after index",
    type: "value",
    topic: "array",
    difficulty: "★★",
  prompt: "What is logged to the console?",
    snippet: `const people = [
  { profile: { handle: "@a" } },
  { profile: { handle: "@b" } }
];
console.log(people[0].profile.handle);`,
    expected: "@a",
    hints: [
      "Index first element",
      "Then read nested object",
      "Return the handle string"
    ]
  },
  {
    id: "E11",
    title: "Variable index with bracket key inside",
    type: "value",
    topic: "array",
    difficulty: "★★★",
  prompt: "What is logged to the console when <code>i</code> is 1?",
    snippet: `const rows = [
  { "col-a": 1 },
  { "col-a": 2 }
];
const i = 1;
console.log(rows[i]["col-a"]);`,
    expected: 2,
    hints: [
      "Use variable index",
      "Bracket for dash key",
      "Return the number"
    ]
  },
  {
    id: "E12",
    title: "Path writing: third object's property",
    type: "path",
    topic: "array",
    difficulty: "★★",
  prompt: "Type the <strong>path</strong> to read the third book's title.",
    snippet: `const books = [
  { title: "One" },
  { title: "Two" },
  { title: "Three" }
];
// Type the property path to get the title of the third object`,
    expected: "books[2].title",
    hints: [
      "Third object index is 2",
      "Then read title",
      "books[2].title"
    ]
  }
];
