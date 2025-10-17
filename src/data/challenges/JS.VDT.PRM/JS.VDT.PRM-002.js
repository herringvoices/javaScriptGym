import { ChallengeTemplates, ChallengeTypes } from "../../../types";

const challenge = {
  id: "JS.VDT.PRM-002",
  title: "Update & Combine: fullName + age + toggle",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.VDT.PRM"],
  primaryStandard: "JS.VDT.PRM",
  difficulty: 1,
  description: `
Recreate four basic profile primitives here (two strings, a number, a boolean).
Derive three new values: a combined name string, a number that is one greater than the original number, and the inverted boolean.
Log only those derived values.
  `.trim(),
  userStories: [
    "Creates fullName via concatenation or template literal.",
    "Computes nextAge = age + 1 (does not overwrite age).",
    "Toggles isHungry using ! once.",
  ],
  acceptanceCriteria: [
    "Do not mutate age; introduce nextAge (or similar).",
    "Use !isHungry to invert the boolean.",
    "Log the three derived results (fullName, nextAge, flipped hunger).",
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
  code: `// TODO:
// 1. Declare four primitives.
// 2. Build combinedName.
// 3. Create incrementedNumber from the original number (do not overwrite original).
// 4. Flip the boolean into a new variable.
// 5. Log the three derived values.
`,
    },
  },
  entry: "/main.js",
  hints: ["Don't overwrite age unless you really need to—show both states.", "Boolean flip: const flipped = !isHungry;"],
  tags: ["primitives", "booleans", "operators", "strings"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
