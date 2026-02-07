// Unit A — Accessing (Dot first)
export const access = [
  {
    id: "A1",
    title: "Dot Notation: top-level property",
    type: "value",
    topic: "dot",
  prompt: "What is logged to the console?",
    snippet: `const cat = {
  name: "Flimpleo",
  age: 2,
  emotion: "angry"
};
console.log(cat.name);`,
    expected: "Flimpleo",
    hints: [
      "Use dot notation: object.property",
      "The property to read is 'name'",
      "cat.name is the string stored under name"
    ]
  },
  {
    id: "A2",
    title: "Top-level property (another)",
    type: "value",
    topic: "dot",
  prompt: "What is logged to the console?",
    snippet: `const game = {
  title: "Pixel Quest",
  players: 1,
  released: true
};
console.log(game.title);`,
    expected: "Pixel Quest",
    hints: [
      "Identify the property on the object",
      "Read 'title' on game",
      "It's the game's title string"
    ]
  },
  {
    id: "A3",
    title: "Missing property returns…",
    type: "value",
    topic: "dot",
  prompt: "What is logged to the console when reading a missing property?",
    snippet: `const user = {
  id: 101,
  name: "River"
};
console.log(user.nickname);`,
    expected: undefined,
    hints: [
      "Reading a property that doesn't exist does not throw",
      "It returns a special value",
      "That value is undefined"
    ]
  },
  {
    id: "A4",
    title: "Boolean property",
    type: "value",
    topic: "dot",
  prompt: "What is logged to the console?",
    snippet: `const featureFlags = {
  darkMode: true,
  beta: false
};
console.log(featureFlags.darkMode);`,
    expected: true,
    hints: [
      "Just read the property with dot notation",
      "Look at the assigned boolean",
      "It's true"
    ]
  },
  {
    id: "A5",
    title: "Path writing practice (dot)",
    type: "path",
    topic: "dot",
  prompt: "Type the <strong>path</strong> to read the book's author name.",
    snippet: `const book = {
  author: "Le Guin",
  title: "Earthsea"
};
// Type the property path to get the author's name`,
    expected: "book.author",
    hints: [
      "You're reading from 'book'",
      "The property is 'author'",
      "Use book.author"
    ]
  },
  {
    id: "A6",
    title: "Update then read (dot)",
    type: "value",
    topic: "update",
  prompt: "After the update, what is logged to the console?",
    snippet: `const player = {
  name: "Mina",
  level: 1
};
player.level = 2;
console.log(player.level);`,
    expected: 2,
    hints: [
      "Assignment changes the value",
      "It sets the level to a new number",
      "Read player.level after the assignment"
    ]
  }
];
