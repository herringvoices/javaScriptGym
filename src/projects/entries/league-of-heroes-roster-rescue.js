// Project entry for League of Heroes: Roster Rescue
// Provides a console-first sandbox for practicing primitives, objects, arrays, direct updates, and basic methods.

const INDEX_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>League of Heroes: Roster Rescue</title>
</head>
<body>
    <script type="module" src="/main.js"></script>
</body>
</html>`;

const MAIN_JS = `// League of Heroes: Roster Rescue
// The villain The CSV damaged the League roster. Repair it one chapter at a time.

console.log("League of Heroes: Roster Rescue");
console.log("--------------------------------");

// CHAPTER 1: Open the Case File
// Create starter variables for the League's current situation.
// Suggested names:
// leagueName, activeHeroCount, emergencyRosterEnabled, missingCoordinator, meetingLocation



// CHAPTER 2: Create the First Hero Record
// Create one complete hero object for Crimson Phoenix.
// Use these property names:
// heroName, civilianName, powerLevel, isActive, primaryAbility, homeCity, team



// CHAPTER 3: Repair a Damaged Hero Record
// The import below has several data problems. Repair it in place as the chapter asks.

const damagedHero = {
    heroName: "Neon Volt",
    civilianName: "Maya Chen",
    powerlevel: "87",
    isActive: "yes",
    primaryAbility: "Electro-kinesis",
    homeCity: "Metroburg",
    team: "North Squad",
    secretBase: ""
};

console.log("Damaged hero import:", damagedHero);

// CHAPTER 4: Assemble the League Roster
// Create leagueRoster as an array of hero objects.
// Include your first hero, the repaired damagedHero, and at least two more heroes.



// CHAPTER 5: Process the Roster Change Requests
// Use push, unshift, pop or shift, splice, and direct object updates.
// Change requests will be listed in the instructions.



// CHAPTER 6: Inspect the League's Data
// Create a League Data Check section with console.log evidence.
// Use .length, Object.keys(), string cleanup, number conversion, and direct access.

const importedCodename = "  star sentinel  ";
const importedPowerLevel = "94";



// CHAPTER 7: Final Roster Audit
// The final audit starts with a few planted issues. Repair them before the press event.

const auditRoster = [
    {
        heroName: "Crimson Phoenix",
        civilianName: "Avery Stone",
        powerLevel: 91,
        isActive: true,
        primaryAbility: "Plasma flight",
        homeCity: "Sunspire",
        team: "Vanguard"
    },
    {
        heroName: "echo eclipse",
        civilianName: "Jordan Vale",
        powerlevel: 82,
        isActive: true,
        primaryAbility: "Sound bending",
        homeCity: "Harbor City",
        team: "Vanguard"
    },
    {
        heroName: "Neon Volt",
        civilianName: "Maya Chen",
        powerLevel: "87",
        isActive: true,
        primaryAbility: "Electro-kinesis",
        homeCity: "Metroburg",
        team: "North Squad"
    }
];

console.log("Audit roster before repairs:", auditRoster);

// Final goal:
// console.log("Roster Ready: The League can proceed with the press event.");
`;

export default {
    id: "league-of-heroes-roster-rescue",
    title: "League of Heroes: Roster Rescue",
    files: [
        { path: "/index.html", content: INDEX_HTML, active: false },
        { path: "/main.js", content: MAIN_JS, active: true },
    ],
    entry: "/index.html",
};
