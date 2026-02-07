import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.AR.MTH-map-non-mutating-014",
  title: "Map Doesn't Mutate Original",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.AR.MTH", "JS.AR.ACC"],
  primaryStandard: "JS.AR.MTH",
  difficulty: 2,
  description: `
Verify that map creates a new array without changing the original.

Map is a non-mutating method. The original array remains unchanged while
a new transformed array is returned.
  `.trim(),
  userStories: [
    "I understand that map doesn't modify the original array.",
    "I can verify that both arrays exist independently.",
    "I see both arrays logged."
  ],
  acceptanceCriteria: [
    "Use map to double the numbers.",
    "Store the original array in one variable.",
    "Store the doubled array in another variable.",
    "Log both to verify: original is [2, 4], doubled is [4, 8]."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {"/main.js": {
      active: true,
      code: `// TODO: Demonstrate that map doesn't mutate the original

const nums = [2, 4];

// Your code:
// Create a doubled array using map
// Log both the original and the doubled array
// Original should still be [2, 4]
// Doubled should be [4, 8]


`
    }
  },
  entry: "/main.js",
  hints: [
    "const doubled = nums.map(n => n * 2);",
    "Then log: console.log('Original:', nums);",
    "And: console.log('Doubled:', doubled);"
  ],
  tags: ["map", "array-methods", "immutability", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" }
};

export default challenge;
