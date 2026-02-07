export const updateChallenges = [
  {
    id: "U1",
    title: "Update property",
    prompt: "After running the code, what is the value of `user.age`?",
    snippet: `const user = { age: 20 };\nuser.age = 21;\nuser.age // ?`,
    expected: 21,
    topic: "update",
    hints: [
      "Assignment with = updates the value",
      "We set age to 21",
      "Read the final line"
    ]
  },
  {
    id: "U2",
    title: "Delete property",
    prompt: "After running the code, what is the value of `settings.darkMode`?",
    snippet: `const settings = { darkMode: true };\ndelete settings.darkMode;\nsettings.darkMode // ?`,
    expected: undefined,
    topic: "delete",
    hints: [
      "The delete operator removes a property",
      "Accessing a missing property returns undefined",
      "So the value is undefined"
    ]
  }
];
