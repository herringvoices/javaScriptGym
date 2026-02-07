import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.AR.MTH-find-with-fallback-021",
  title: "Find with Fallback Value",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.AR.MTH", "JS.PF.CON"],
  primaryStandard: "JS.AR.MTH",
  difficulty: 3,
  description: `
Handle cases where find returns undefined.

When find doesn't locate a match, it returns undefined. Use a conditional
or the OR operator to provide a fallback value.
  `.trim(),
  userStories: [
    "I can handle undefined results from find.",
    "I can provide default values when no match is found.",
    "I see the price or fallback value logged."
  ],
  acceptanceCriteria: [
    "Use find to search for an item with price > 50.",
    "If found, use that price; if not found (undefined), use -1.",
    "Log the result (should be 55)."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {"/main.js": {
      active: true,
      code: `// TODO: Find price > 50 or return -1 if not found

const items = [
  { price: 10 },
  { price: 55 },
  { price: 30 }
];

// Your code: find item with price > 50
// If found, get its price
// If not found (undefined), use -1 as fallback
// Expected: 55


// Log the price or -1

`
    }
  },
  entry: "/main.js",
  hints: [
    "const found = items.find(i => i.price > 50);",
    "Use conditional: found ? found.price : -1.",
    "Or optional chaining with nullish coalescing: found?.price ?? -1."
  ],
  tags: ["find", "array-methods", "conditionals", "fallback", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" }
};

export default challenge;
