// Unit B — Bracket Notation & Dynamic Keys
export const bracket = [
  {
    id: "B1",
    title: "Bracket with string literal",
    type: "value",
    topic: "bracket",
    difficulty: "★",
  prompt: "What is logged to the console?",
    snippet: `const dog = {
  breed: "Labradoodle",
  color: "black"
};
console.log(dog["breed"]);`,
    expected: "Labradoodle",
    hints: [
      "Bracket notation uses a string key",
      "The key is \"breed\"",
      "That's the dog's breed string"
    ]
  },
  {
    id: "B2",
    title: "Bracket with variable key",
    type: "value",
    topic: "bracket",
    difficulty: "★★",
  prompt: "What is logged to the console when <code>key</code> is 'lastName'?",
    snippet: `const person = {
  firstName: "Alex",
  lastName: "Rivera"
};
const key = "lastName";
console.log(person[key]);`,
    expected: "Rivera",
    hints: [
      "Use the variable's value as the key",
      "person['lastName']",
      "Return the last name string"
    ]
  },
  {
    id: "B3",
    title: "Key with space (must use bracket)",
    type: "value",
    topic: "bracket",
    difficulty: "★",
  prompt: "What is logged to the console?",
    snippet: `const record = {
  title: "Blue",
  "release year": 1971
};
console.log(record["release year"]);`,
    expected: 1971,
    hints: [
      "Keys with spaces require brackets",
      "The key string is \"release year\"",
      "Read the number assigned"
    ]
  },
  {
    id: "B4",
    title: "Numeric-ish key",
    type: "value",
    topic: "bracket",
    difficulty: "★",
  prompt: "What is logged to the console?",
    snippet: `const obj = {
  "1": "one",
  two: 2
};
console.log(obj["1"]);`,
    expected: "one",
    hints: [
      "Quoted numeric property names are still strings",
      "Use bracket syntax with the quoted key",
      "The value is \"one\""
    ]
  },
  {
    id: "B5",
    title: "Path writing practice (bracket)",
    type: "path",
    topic: "bracket",
    difficulty: "★★",
  prompt: "Type the <strong>path</strong> to read the 'enable-beta' setting (invalid identifier).",
    snippet: `const settings = {
  "enable-beta": false,
  theme: "light"
};
// Type the property path to get the 'enable-beta' value`,
    expected: "settings[\"enable-beta\"]",
    hints: [
      "Hyphenated keys need brackets",
      "Use a string key",
      "settings[\"enable-beta\"]"
    ]
  }
  ,
  {
    id: "B6",
    title: "Bracket with numeric-like key via variable",
    type: "value",
    topic: "bracket",
    difficulty: "★★",
  prompt: "What is logged to the console?",
    snippet: `const codes = {
  "007": "Bond",
  agent: "other"
};
const key = "007";
console.log(codes[key]);`,
    expected: "Bond",
    hints: [
      "Variable holds the string key",
      "Use the variable in brackets",
      "It reads the value 'Bond'"
    ]
  },
  {
    id: "B7",
    title: "Missing key with bracket returns undefined",
    type: "value",
    topic: "bracket",
    difficulty: "★",
  prompt: "What is logged to the console?",
    snippet: `const obj = {
  a: 1
};
const k = "b";
console.log(obj[k]);`,
    expected: undefined,
    hints: [
      "Reading a non-existent key doesn't throw",
      "It returns a special value",
      "That value is undefined"
    ]
  },
  {
    id: "B8",
    title: "Bracket with expression",
    type: "value",
    topic: "bracket",
    difficulty: "★★",
  prompt: "What is logged to the console?",
    snippet: `const bag = {
  color: "blue"
};
console.log(bag["co" + "lor"]);`,
    expected: "blue",
    hints: [
      "The expression builds the string 'color'",
      "Bracket notation accepts any expression",
      "It reads the 'color' value"
    ]
  },
  {
    id: "B9",
    title: "Path writing (bracket + variable)",
    type: "path",
    topic: "bracket",
    difficulty: "★★",
  prompt: "Type the <strong>path</strong> to read the current theme using the variable key.",
    snippet: `const settings = {
  theme: "dark",
  sound: true
};
const key = "theme";
// Type the property path using the variable key`,
    expected: "settings[key]",
    hints: [
      "Use the variable in brackets",
      "Don't quote the variable name",
      "settings[key]"
    ]
  }
  ,
  {
    id: "B10",
    title: "Bracket for key with dash",
    type: "path",
    topic: "bracket",
    difficulty: "★",
  prompt: "Type the <strong>path</strong> to read the value for 'data-id'.",
    snippet: `const el = {
  "data-id": 123,
  role: "button"
};
// Type the property path to get the 'data-id'`,
    expected: "el[\"data-id\"]",
    hints: [
      "Hyphenated keys require bracket",
      "Use a quoted string",
      "el[\"data-id\"]"
    ]
  }
  ,
  {
    id: "B11",
    title: "Bracket numeric index on object-like array keys",
    type: "value",
    topic: "bracket",
    difficulty: "★",
  prompt: "What is logged to the console?",
    snippet: `const stats = {
  0: "zero",
  1: "one"
};
console.log(stats[1]);`,
    expected: "one",
    hints: [
      "Object keys are strings but numeric literal works",
      "stats[1] coerces to '1' key",
      "Returns 'one'"
    ]
  },
  {
    id: "B12",
    title: "Bracket with computed template string",
    type: "value",
    topic: "bracket",
    difficulty: "★★★",
  prompt: "What is logged to the console?",
    snippet: `const cfg = {
  mode_light: true,
  mode_dark: false
};
const theme = "light";
console.log(cfg[` + "`mode_${theme}`" + `]);`,
    expected: true,
    hints: [
      "Template builds 'mode_light'",
      "Bracket accepts any expression",
      "It returns true"
    ]
  },
  {
    id: "B13",
    title: "Path writing: variable key on nested object",
    type: "path",
    topic: "bracket",
    difficulty: "★★",
  prompt: "Type the <strong>path</strong> using <code>k</code> to read account's id.",
    snippet: `const account = {
  id: 77,
  name: "Pat"
};
const k = "id";
// Use the variable key to read the id`,
    expected: "account[k]",
    hints: [
      "Use bracket with variable",
      "Don't quote k",
      "account[k]"
    ]
  }
];
