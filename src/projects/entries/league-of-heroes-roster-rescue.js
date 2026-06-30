// Project entry for League of Heroes: Roster Rescue
// A console-first synthesis project for primitives, objects, arrays, updates, and common methods.

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
// Dr. Breach wrecked the League's roster data. Repair it one chapter at a time.

// CHAPTER 1: Open the Case File
// Create separate variables for Scuba Driver's profile:
// name, isActive, powerLevel, age, power, secretIdentity, city



// CHAPTER 2: Create the First Hero Record
// Create a scubaDriver object using these property names:
// heroName, isActive, powerLevel, age, power, secretIdentity, city



// CHAPTER 3: Update Stale Data
// Update Scuba Driver's existing object with the League's corrections.
// Do not recreate the whole object.



// CHAPTER 4: Assemble the League Roster
// Add id: 1 to scubaDriver.
// Create a roster containing Scuba Driver, Solar Flare, and Echo Fang.



// CHAPTER 5: Process Roster Changes
// Create neonVolt and process the League's change requests with
// .push(), .pop(), .unshift(), and .shift().



// CHAPTER 6: Inspect the League's Data
// Create a League Data Check section using .length, Object.keys(),
// Object.values(), Object.entries(), direct access, string cleanup,
// number parsing, and comparisons.

const importedCodename = "  neon-volt  ";
const importedPowerLevel = "21 points";
const importedBadgeScore = "91.5";



// CHAPTER 7: Final Roster Audit
// Use the roster you built to calculate and log the final audit.
// The report should derive its values from roster data.



// CHAPTER 8: Respond to a New Breach
// Create a separate emergencyRoster using hero objects from roster.
// Do not change the original roster.

const importedMuseumMessage = "  breach detected: gallery-7  ";
const importedThreatLevel = "73%";
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