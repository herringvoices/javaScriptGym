// Unit F — Add / Update / Delete
export const updateDelete = [
  {
    id: "F1",
    title: "Update existing property (dot)",
    type: "value",
    topic: "update",
    difficulty: "★",
  prompt: "After the update, what is logged to the console?",
    snippet: `const student = {
  name: "Ana",
  grade: "B"
};
student.grade = "A";
console.log(student.grade);`,
    expected: "A",
    hints: [
      "Assignment with dot changes the value",
      "We set it to 'A'",
      "Read student.grade after"
    ]
  },
  {
    id: "F2",
    title: "Add new property (dot)",
    type: "value",
    topic: "update",
    difficulty: "★",
  prompt: "After adding, what is logged to the console?",
    snippet: `const bird = {
  type: "parrot"
};
bird.color = "green";
console.log(bird.color);`,
    expected: "green",
    hints: [
      "Assigning a new key creates it",
      "We store 'green' at color",
      "Read bird.color"
    ]
  },
  {
    id: "F3",
    title: "Update via bracket + variable",
    type: "value",
    topic: "update",
    difficulty: "★★",
  prompt: "After the update, what is logged to the console?",
    snippet: `const robot = {
  model: "XJ-9",
  status: "idle"
};
const key = "status";
robot[key] = "active";
console.log(robot.status);`,
    expected: "active",
    hints: [
      "Use the variable as key",
      "It replaces the old value",
      "Return 'active'"
    ]
  },
  {
    id: "F4",
    title: "Delete property (object)",
    type: "value",
    topic: "delete",
    difficulty: "★★",
  prompt: "After delete, what is logged to the console?",
    snippet: `const fruit = {
  name: "apple",
  color: "red"
};
delete fruit.color;
console.log(fruit.color);`,
    expected: undefined,
    hints: [
      "delete removes a property",
      "Reading a missing property returns undefined",
      "So the value is undefined"
    ]
  },
  {
    id: "F5",
    title: "Remove from array with splice",
    type: "value",
    topic: "array-edit",
    difficulty: "★★",
  prompt: "After the removal, what is logged to the console at index 1?",
    snippet: `const todos = [
  "eat",
  "code",
  "sleep"
];
// remove one item at index 1
todos.splice(1, 1);
console.log(todos[1]);`,
    expected: "sleep",
    hints: [
      "splice(index, count) removes items",
      "Index 1 (\"code\") is removed",
      "New item at index 1 is 'sleep'"
    ]
  },
  {
    id: "F6",
    title: "Add to AoO then read last",
    type: "value",
    topic: "array-edit",
    difficulty: "★★",
  prompt: "After pushing a new pet, what is logged to the console for the last pet's name?",
    snippet: `const pets = [
  { type: "dog", name: "Dexter" }
];
pets.push({ type: "cat", name: "Miso" });
console.log(pets[pets.length - 1].name);`,
    expected: "Miso",
    hints: [
      "push adds to the end",
      "Read the last element",
      "Then read its name"
    ]
  }
  ,
  {
    id: "F7",
    title: "Log then assign then log",
    type: "value",
    topic: "update",
    difficulty: "★★★",
    prompt: "What two values are logged (first, then second)?",
    snippet: `const profile = {
  name: "Kai",
  city: "NYC"
};
console.log(profile.city);
profile.city = "LA";
console.log(profile.city);`,
    expected: ["NYC", "LA"],
    hints: [
      "The first log occurs before the assignment",
      "Then we update the property",
      "The second log shows the new value"
    ]
  },
  {
    id: "F8",
    title: "Splice then read",
    type: "value",
    topic: "array-edit",
    difficulty: "★★★",
    prompt: "After removing an item, what two values are logged?",
    snippet: `const list = [
  "alpha",
  "beta",
  "gamma"
];
list.splice(1, 1);
console.log(list.length);
console.log(list[1]);`,
    expected: [2, "gamma"],
    hints: [
      "Splice removes 'beta' at index 1",
      "Length becomes 2",
      "The new item at index 1 is 'gamma'"
    ]
  }
  ,
  {
    id: "F9",
    title: "Read before delete",
    type: "value",
    topic: "delete",
    difficulty: "★★★",
  prompt: "What two values are logged (first, then second)?",
    snippet: `const config = {
  debug: true,
  level: "info"
};
console.log(config.level);
delete config.level;
console.log(config.level);`,
    expected: ["info", undefined],
    hints: [
      "First log shows existing value",
      "delete removes the key",
      "Second read returns undefined"
    ]
  },
  {
    id: "F10",
    title: "Path writing: array item after update",
    type: "path",
    topic: "array-edit",
    difficulty: "★★",
  prompt: "Type the <strong>path</strong> to read the updated second score.",
    snippet: `const scores = [
  5,
  7,
  9
];
scores[1] = 10;
// Type the property path to read the second score`,
    expected: "scores[1]",
    hints: [
      "Second item is index 1",
      "We updated it",
      "scores[1]"
    ]
  },
  {
    id: "F11",
    title: "Update via bracket then read",
    type: "value",
    topic: "update",
    difficulty: "★★",
  prompt: "What is logged to the console?",
    snippet: `const user = {
  name: "Ari"
};
const key = "name";
user[key] = "Aria";
console.log(user.name);`,
    expected: "Aria",
    hints: [
      "Use bracket with variable to update",
      "Then read with dot",
      "It returns the new string"
    ]
  },
  {
    id: "F12",
    title: "Delete missing property",
    type: "value",
    topic: "delete",
    difficulty: "★",
  prompt: "What is logged to the console?",
    snippet: `const obj = {
  a: 1
};
delete obj.b;
console.log(obj.b);`,
    expected: undefined,
    hints: [
      "Deleting a missing key is a no-op",
      "Reading the missing key returns undefined",
      "So it's undefined"
    ]
  }
  ,
  {
    id: "F13",
    title: "Read then add then read",
    type: "value",
    topic: "update",
    difficulty: "★★★",
  prompt: "What two values are logged (first, then second)?",
    snippet: `const obj = {};
console.log(obj.color);
obj.color = "blue";
console.log(obj.color);`,
    expected: [undefined, "blue"],
    hints: [
      "Missing property reads as undefined",
      "Assignment creates the property",
      "Second log shows new value"
    ]
  },
  {
    id: "F14",
    title: "Path writing after update",
    type: "path",
    topic: "update",
    difficulty: "★★",
  prompt: "Type the <strong>path</strong> to read the updated title.",
    snippet: `const post = {
  title: "Old"
};
post.title = "New";
// Type the property path to read the title`,
    expected: "post.title",
    hints: [
      "Dot notation",
      "We updated it above",
      "post.title"
    ]
  },
  {
    id: "F15",
    title: "Update via variable key then read",
    type: "value",
    topic: "update",
    difficulty: "★★",
  prompt: "What is logged to the console?",
    snippet: `const settings = {
  theme: "light"
};
const k = "theme";
settings[k] = "dark";
console.log(settings.theme);`,
    expected: "dark",
    hints: [
      "Use variable key to assign",
      "Read back with dot",
      "Returns 'dark'"
    ]
  }
];
