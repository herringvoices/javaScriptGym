import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.PF.CON-cart-snapshot-001",
  title: "Cart Snapshot",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.PF.CON",],
  primaryStandard: "JS.PF.CON",
  prerequisiteStandards: ["JS.VDT.PRM", "JS.VDT.COL"],
  difficulty: 2,
  description: `Represent a cart as an array of item objects.
Access fields by path and compute a total (no loops).
 `.trim(),
  userStories: [
    "I can model structured records as an array of objects.",
    "I can read values using paths like cart[0].price and compute a total.",
  ],
  acceptanceCriteria: [
    "Log ONE line that includes an item name from the array and a computed cartTotal.",
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// TODO: Model a cart as an array of objects and compute a total.
// No loops. Just access by index + dot notation.

const item1 = { name: "Sticker Pack", price: 4, quantity: 2 };
const item2 = { name: "Notebook", price: 8, quantity: 1 };
const item3 = { name: "Pen", price: 2, quantity: 3 };

// 1) Create an array named cart that contains item1, item2, item3.
//
// 2) Compute cartTotal using access paths (ex: cart[0].price * cart[0].quantity).
//
// 3) Log ONE line that includes:
//    - the name of one item (from the array)
//    - the computed cartTotal
// Example shape (yours can differ):
// "Cart includes Notebook | Total: 22"

`,
    },
  },
  entry: "/main.js",
  hints: [],
  tags: ["collections", "array-of-objects", "access-paths", "operators", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
