// Unit D — Arrays (Indexes & Basics)
export const arrays = [
  {
    id: "D1",
    title: "Read array item",
    type: "value",
    topic: "array",
    difficulty: "★",
  prompt: "What is logged to the console?",
    snippet: `const colors = [
  "red",
  "green",
  "blue"
];
console.log(colors[1]);`,
    expected: "green",
    hints: [
      "Arrays are 0-indexed",
      "Index 1 is the second item",
      "It's the string 'green'"
    ]
  },
  {
    id: "D2",
    title: "Read last item using length",
    type: "value",
    topic: "array",
    difficulty: "★★",
  prompt: "What is logged to the console?",
    snippet: `const nums = [
  4,
  8,
  15,
  16,
  23,
  42
];
console.log(nums[nums.length - 1]);`,
    expected: 42,
    hints: [
      "length is the count of items",
      "Last index is length - 1",
      "Return the last number"
    ]
  },
  {
    id: "D3",
    title: "Out-of-range read",
    type: "value",
    topic: "array",
    difficulty: "★",
  prompt: "What is logged to the console?",
    snippet: `const letters = [
  "a",
  "b"
];
console.log(letters[99]);`,
    expected: undefined,
    hints: [
      "Reading outside the array doesn't throw",
      "Index 99 doesn't exist",
      "So it's undefined"
    ]
  },
  {
    id: "D4",
    title: "Update array index",
    type: "value",
    topic: "array-edit",
    difficulty: "★★",
  prompt: "Set index 2 to 'blue'. After the update, what is logged to the console?",
    snippet: `const palette = [
  "red",
  "green",
  "?",
  "purple"
];
palette[2] = "blue";
console.log(palette[2]);`,
    expected: "blue",
    hints: [
      "Assign to an index to update",
      "Index 2 is the third item",
      "Read palette[2] after the assignment"
    ]
  },
  {
    id: "D5",
    title: "Push then read last",
    type: "value",
    topic: "array-edit",
    difficulty: "★★",
  prompt: "After pushing a new animal, what is logged to the console at the last index?",
    snippet: `const animals = [
  "cat",
  "dog"
];
animals.push("hamster");
console.log(animals[animals.length - 1]);`,
    expected: "hamster",
    hints: [
      "push adds to the end",
      "Last index is length - 1",
      "The new item is 'hamster'"
    ]
  }
  ,
  {
    id: "D6",
    title: "Log before update",
    type: "value",
    topic: "array-edit",
    difficulty: "★★★",
    prompt: "What is logged to the console before and after the assignment?",
    snippet: `const items = [
  "x",
  "y",
  "z"
];
console.log(items[1]);
items[1] = "Y";
console.log(items[1]);`,
    expected: ["y", "Y"],
    hints: [
      "First log reads the original value",
      "Then we assign a new string",
      "Second log shows the updated value"
    ]
  },
  {
    id: "D7",
    title: "Multiple logs with push",
    type: "value",
    topic: "array-edit",
    difficulty: "★★★",
    prompt: "What two values are logged (first, then second)?",
    snippet: `const queue = [
  "a",
  "b"
];
console.log(queue.length);
queue.push("c");
console.log(queue[queue.length - 1]);`,
    expected: [2, "c"],
    hints: [
      "Length before push is the initial count",
      "After push, the last item is the one we added",
      "Return the two values in order"
    ]
  }
  ,
  {
    id: "D8",
    title: "Index via variable",
    type: "value",
    topic: "array",
    difficulty: "★",
  prompt: "What is logged to the console?",
    snippet: `const letters = [
  "a",
  "b",
  "c"
];
const i = 2;
console.log(letters[i]);`,
    expected: "c",
    hints: [
      "Use the variable index",
      "Arrays are 0-indexed",
      "Index 2 is 'c'"
    ]
  },
  {
    id: "D9",
    title: "Compute last index",
    type: "value",
    topic: "array",
    difficulty: "★★",
  prompt: "What is logged to the console?",
    snippet: `const items = [
  10,
  20,
  30
];
const last = items.length - 1;
console.log(items[last]);`,
    expected: 30,
    hints: [
      "length is count of elements",
      "Last index is length - 1",
      "Return the last number"
    ]
  },
  {
    id: "D10",
    title: "Index out of range via variable",
    type: "value",
    topic: "array",
    difficulty: "★",
  prompt: "What is logged to the console?",
    snippet: `const a = [
  "x",
  "y"
];
const idx = 5;
console.log(a[idx]);`,
    expected: undefined,
    hints: [
      "Reading outside the array returns undefined",
      "No error is thrown",
      "Index 5 doesn't exist"
    ]
  },
  {
    id: "D11",
    title: "Path writing for array index",
    type: "path",
    topic: "array",
    difficulty: "★",
  prompt: "Type the <strong>path</strong> to read the third number.",
    snippet: `const numbers = [
  2,
  4,
  6
];
// Type the property path to read the third number`,
    expected: "numbers[2]",
    hints: [
      "Third item is index 2",
      "Use bracket notation with 2",
      "numbers[2]"
    ]
  }
  ,
  {
    id: "D12",
    title: "Path writing: first letter",
    type: "path",
    topic: "array",
    difficulty: "★",
  prompt: "Type the <strong>path</strong> to read the first letter.",
    snippet: `const letters = [
  "q",
  "w",
  "e"
];
// Type the property path to read the first letter`,
    expected: "letters[0]",
    hints: [
      "First item is index 0",
      "Use bracket with 0",
      "letters[0]"
    ]
  }
  ,
  {
    id: "D13",
    title: "Index from expression",
    type: "value",
    topic: "array",
    difficulty: "★★",
  prompt: "What is logged to the console?",
    snippet: `const nums = [
  3,
  6,
  9,
  12
];
console.log(nums[1 + 2]);`,
    expected: 12,
    hints: [
      "Compute index first (1+2 = 3)",
      "Index 3 is the fourth item",
      "Returns 12"
    ]
  },
  {
    id: "D14",
    title: "Variable last index read",
    type: "value",
    topic: "array",
    difficulty: "★★",
  prompt: "What is logged to the console?",
    snippet: `const fruits = [
  "kiwi",
  "mango",
  "peach"
];
const last = fruits.length - 1;
console.log(fruits[last]);`,
    expected: "peach",
    hints: [
      "length - 1 gives last index",
      "Use the variable index",
      "Returns 'peach'"
    ]
  },
  {
    id: "D15",
    title: "Path writing: second element",
    type: "path",
    topic: "array",
    difficulty: "★",
  prompt: "Type the <strong>path</strong> to read the second element.",
    snippet: `const arr = [
  "north",
  "south",
  "east"
];
// Type the property path for the second element`,
    expected: "arr[1]",
    hints: [
      "Second is index 1",
      "Use bracket notation",
      "arr[1]"
    ]
  }
];
