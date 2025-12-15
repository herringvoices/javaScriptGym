// Project entry for Nathan Claus' Toy Drive (No Relation)
// Provides the sandbox files for Operation: Nice List. Students flesh out helper functions and flow control in main.js.

const INDEX_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nathan Claus' Toy Drive</title>
</head>
<body>
    <script type="module" src="/main.js"></script>
</body>
</html>`;

const MAIN_JS = `// Operation: Nice List starter sandbox
// Follow the project steps to transform these data sets into a cheerful console log.

const people = [
    { id: 1, name: "Avery Kim", age: 7, isNice: true, requestedGiftId: 3 },
    { id: 2, name: "Devon Ortiz", age: 15, isNice: true, requestedGiftId: null },
    { id: 3, name: "Mina Solis", age: 11, isNice: false, requestedGiftId: 5 },
    { id: 4, name: "Jamal Brooks", age: 19, isNice: true, requestedGiftId: 1 },
    { id: 5, name: "Suzy Harper", age: 9, isNice: true, requestedGiftId: 1 },
    { id: 6, name: "Theo Choi", age: 6, isNice: true, requestedGiftId: 7 },
    { id: 7, name: "Amelia Grant", age: 13, isNice: true },
    { id: 8, name: "Priya Patel", age: 17, isNice: false },
    { id: 9, name: "Miles Bennett", age: 5, isNice: true, requestedGiftId: 10 },
];

const toys = [
    { id: 1, name: "Starlight Drone" },
    { id: 2, name: "Puzzle Cube" },
    { id: 3, name: "Glow Paint Set" },
    { id: 4, name: "Storytime Projector" },
    { id: 5, name: "Retro Board Game" },
    { id: 6, name: "Pocket Synth" },
    { id: 7, name: "Build-a-Bot Kit" },
    { id: 8, name: "Galaxy Slime Lab" },
    { id: 9, name: "Mini Skateboard" },
    { id: 10, name: "Origami Adventure Book" },
];

const kidToys = [];

const isEligibleForGift = (person) => {
    // Step 1: return true only if the person is younger than 18 and nice.
    return null
};

const createAssignmentRecord = (kidId, toyId) => {
    // Step 2: return a new object that captures which kid received which toy.
    return null
};

//This function is pre-built to give you the id of a random toy in the toys array
const chooseRandomToyId = (availableToys) => {
    if (!availableToys.length) return null;
    const randomIndex = Math.floor(Math.random() * availableToys.length);
    return availableToys[randomIndex].id;
};


const assignGift = (kid) => {
    // Step 3: honor requestedGiftId when possible, otherwise fall back to a random toy.
    // 1. Decide which toy id to use.
    // 2. Create an assignment record and push it into kidToys.
};

const runToyDrive = () => {
    // Step 4: loop through people, qualify them, and assign gifts when they pass.
};

const printAssignments = () => {
    // Step 5: nested loops that translate kidToys ids back into readable sentences.
};

console.log("Operation: Nice List is warming up...");
console.log("Total people in database:", people.length);
console.log("Types of toys in inventory:", toys.length);

// Uncomment as you progress through the steps.
// console.log(isEligibleForGift(people[0]));
// runToyDrive();
// printAssignments();
`;

export default {
    id: "nathan-claus-toy-drive",
    title: "Nathan Claus' Toy Drive (No Relation)",
    files: [
        { path: "/index.html", content: INDEX_HTML, active: false },
        { path: "/main.js", content: MAIN_JS, active: true },
    ],
    entry: "/index.html",
};
