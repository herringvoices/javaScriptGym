import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.VDT.MTH-cart-budget-check-001",
  title: "Cart Budget Check",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.VDT.MTH", ],
  primaryStandard: "JS.VDT.MTH",
  prerequisiteStandards: ["JS.VDT.PRM", "JS.VDT.COL", "JS.VDT.MTH"],
  difficulty: 3,
  description: `Parse a budget string into a number and compare it to a cart total.
No loops - just index + dot access.
 `.trim(),
  userStories: [
    "I can parse a numeric string with Number(...).",
    "I can compute a total from an array of objects using access paths.",
    "I can compare totals with >= and log the decision.",
  ],
  acceptanceCriteria: [
    "Convert budgetInput into a number named budget.",
    "Compute cartTotal using cart[0].price * cart[0].quantity + ...",
    "Compute canCheckout as a boolean and log budget, cartTotal, canCheckout.",
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// TODO: Budget check (like real apps do with form input).

const cart = [
  { name: "Notebook", price: 8, quantity: 1 },
  { name: "Sticker Pack", price: 4, quantity: 2 },
  { name: "Pen", price: 2, quantity: 3 },
];

const budgetInput = "20.00";

// 1) Convert budgetInput into a number named budget using Number(...).
// 2) Compute cartTotal using access paths (no loops).
// 3) Create canCheckout using budget >= cartTotal.
// 4) Log budget, cartTotal, canCheckout.

`,
    },
  },
  entry: "/main.js",
  hints: ["Budget from inputs starts as a string. Parse it first."],
  tags: ["methods", "numbers", "Number", "collections", "array-of-objects", "comparisons"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
