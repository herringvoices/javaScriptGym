// Project entry for Lander's Zoo
// Defines starter files and sandbox entry. Functions now start in a working state; the first step focuses on composing a summary string.

const INDEX_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lander's Zoo</title>
</head>
<body>
    <script type="module" src="/main.js"></script>
</body>
</html>`;

const MAIN_JS = `const habitats = [
    {
        id: 1,
        name: "Savanna Exhibit",
        climate: "Hot & Dry",
        size: 4000,
        highlightAnimalId: 2
    },
    {
        id: 2,
        name: "Rainforest Dome",
        climate: "Humid & Warm",
        size: 2500,
        highlightAnimalId: 5
    },
    {
        id: 3,
        name: "Penguin Cove",
        climate: "Cold & Wet",
        size: 1200,
        highlightAnimalId: 8
    },
    {
        id: 4,
        name: "Reptile House",
        climate: "Hot & Humid",
        size: 800,
        highlightAnimalId: 12
    },
    {
        id: 5,
        name: "Mountain Highlands",
        climate: "Cool & Dry",
        size: 2000,
        highlightAnimalId: 14
    }
]

const animals = [
    {
        id: 1,
        name: "Leo",
        species: "African Lion",
        age: 8,
        diet: "Carnivore",
        notableTrait: "Roars loudest at noon.",
        habitatId: 1
    },
    {
        id: 2,
        name: "Tina",
        species: "Reticulated Giraffe",
        age: 12,
        diet: "Herbivore",
        notableTrait: "Tallest animal in the zoo.",
        habitatId: 1
    },
    {
        id: 3,
        name: "Shira",
        species: "Plains Zebra",
        age: 5,
        diet: "Herbivore",
        notableTrait: "Loves to race visitors along the fence.",
        habitatId: 1
    },
    {
        id: 4,
        name: "Olly",
        species: "Orangutan",
        age: 14,
        diet: "Omnivore",
        notableTrait: "Master escape artist.",
        habitatId: 2
    },
    {
        id: 5,
        name: "Manny",
        species: "Manatee",
        age: 7,
        diet: "Herbivore",
        notableTrait: "Eats 50kg of lettuce a day.",
        habitatId: 2
    },
    {
        id: 6,
        name: "Bella",
        species: "Bengal Tiger",
        age: 9,
        diet: "Carnivore",
        notableTrait: "Has a unique striped heart shape.",
        habitatId: 2
    },
    {
        id: 7,
        name: "Hopper",
        species: "Red-eyed Tree Frog",
        age: 2,
        diet: "Insectivore",
        notableTrait: "Can leap 20 times its body length.",
        habitatId: 2
    },
    {
        id: 8,
        name: "Pingu",
        species: "Emperor Penguin",
        age: 3,
        diet: "Carnivore",
        notableTrait: "Loves to slide on his belly.",
        habitatId: 3
    },
    {
        id: 9,
        name: "Sammy",
        species: "King Penguin",
        age: 4,
        diet: "Carnivore",
        notableTrait: "Fastest swimmer in the cove.",
        habitatId: 3
    },
    {
        id: 10,
        name: "Waddles",
        species: "Gentoo Penguin",
        age: 2,
        diet: "Carnivore",
        notableTrait: "Most playful with the zookeepers.",
        habitatId: 3
    },
    {
        id: 11,
        name: "Tito",
        species: "Galápagos Tortoise",
        age: 99,
        diet: "Herbivore",
        notableTrait: "Oldest resident in the zoo.",
        habitatId: 4
    },
    {
        id: 12,
        name: "Basil",
        species: "Green Anaconda",
        age: 6,
        diet: "Carnivore",
        notableTrait: "Excellent swimmer—loves to hide underwater.",
        habitatId: 4
    },
    {
        id: 13,
        name: "Lacey",
        species: "Leopard Gecko",
        age: 4,
        diet: "Insectivore",
        notableTrait: "Can detach her tail and regrow it.",
        habitatId: 4
    },
    {
        id: 14,
        name: "Yeti",
        species: "Snow Leopard",
        age: 11,
        diet: "Carnivore",
        notableTrait: "Sneakiest paws in the park.",
        habitatId: 5
    },
    {
        id: 15,
        name: "Lila",
        species: "Red Panda",
        age: 5,
        diet: "Omnivore",
        notableTrait: "Can nap for 18 hours straight.",
        habitatId: 5
    }
]

// Compute total habitat area
const totalHabitatArea = (habitats) => {
    let total = 0;
    for (const habitat of habitats) {
        total += habitat.size;
    }
    return total;
};

// Get the smallest habitat size
const getSmallestHabitatSize = (habitats) => {
    if (!habitats.length) return 0;
    let smallest = habitats[0].size;
    for (const habitat of habitats) {
        if (habitat.size < smallest) smallest = habitat.size;
    }
    return smallest;
};

// Get the largest habitat size
const getLargestHabitatSize = (habitats) => {
    if (!habitats.length) return 0;
    let largest = habitats[0].size;
    for (const habitat of habitats) {
        if (habitat.size > largest) largest = habitat.size;
    }
    return largest;
};

// Header
console.log("\n\t\tL A N D E R ' S   Z O O\n\t\t***********************************************************\n");

// Values you will use to build a single multi-line summary string.
const totalArea = totalHabitatArea(habitats);      // expected: 11500
const smallest = getSmallestHabitatSize(habitats); // expected: 800
const largest = getLargestHabitatSize(habitats);   // expected: 4000

// TODO: Create a multi-line summary string using the values above.
// Suggested format (you can adjust wording):
// We maintain 11500 square meters of animal habitats across the zoo.
// Smallest habitat size: 800 sq meters.
// Largest habitat size: 4000 sq meters.
// 1) Use either string concatenation or template literals.
// 2) Store it in a variable named habitatSummary.
// 3) Log it once: console.log(habitatSummary)

// console.log(habitatSummary) // <- implement this
`;

// Empty on purpose for students to practice modularization later
const DATA_JS = ``;

// Empty on purpose for students to practice modularization later
const FUNCTIONS_JS = ``;

export default {
    id: "landers-zoo",
    title: "Lander's Zoo",
  files: [
    { path: "/index.html", content: INDEX_HTML, active: false },
        { path: "/main.js", content: MAIN_JS, active: true },
    { path: "/data.js", content: DATA_JS, readOnly: false, hidden: true },
    { path: "/functions.js", content: FUNCTIONS_JS, readOnly: false, hidden: true },
  ],
  entry: "/index.html",
};
