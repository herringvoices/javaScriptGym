import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.AR.MTH-find-compound-condition-019",
  title: "Find with Compound Condition",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.AR.MTH", "JS.PF.CON"],
  primaryStandard: "JS.AR.MTH",
  difficulty: 2,
  description: `
Use find with multiple conditions in the predicate.

Find returns the first element that matches all conditions. Combine
conditions using logical AND (&&) to check multiple properties.
  `.trim(),
  userStories: [
    "I can use compound conditions in find predicates.",
    "I can find objects matching multiple criteria.",
    "I see the matching product name logged."
  ],
  acceptanceCriteria: [
    "Use find with a predicate checking price > 5 AND price < 20.",
    "Extract the name property from the found product.",
    "Log the name (should be 'book')."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {"/main.js": {
      active: true,
      code: `// TODO: Find first product with price between 5 and 20

const products = [
  { name: 'pen', price: 2 },
  { name: 'book', price: 12 },
  { name: 'bag', price: 30 }
];

// Your code: use find with compound condition
// Check: price > 5 && price < 20
// Get the name of the found product
// Expected: 'book'


// Log the name

`
    }
  },
  entry: "/main.js",
  hints: [
    "Use products.find(p => p.price > 5 && p.price < 20).",
    "This returns the first matching object.",
    "Then access .name on the result."
  ],
  tags: ["find", "array-methods", "conditionals", "objects", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" }
};

export default challenge;
