import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.VDT.MTH-budget-parser-001",
  title: "Budget Parser",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.VDT.MTH", ],
  primaryStandard: "JS.VDT.MTH",
  prerequisiteStandards: ["JS.VDT.PRM", "JS.VDT.MTH"],
  difficulty: 1,
  description: `Turn a numeric-looking string into a real number.
Use Number(...) and compare it to a price.
 `.trim(),
  userStories: [
    "I can convert a string into a number for math and comparisons.",
    "I can prove the type changed using typeof.",
  ],
  acceptanceCriteria: [
    "Convert userBudgetInput with Number(...) into userBudget.",
    "Log userBudget and typeof userBudget.",
    "Compute and log a boolean like canAfford using >=.",
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// TODO: Parse a budget and compare it to a price.

const userBudgetInput = "20.00";
const price = 14.5;

// 1) Convert userBudgetInput into a number named userBudget using Number(...).
// 2) Create canAfford (boolean) using userBudget >= price.
// 3) Log:
//    - userBudget
//    - typeof userBudget
//    - canAfford

`,
    },
  },
  entry: "/main.js",
  hints: ["Number(...) is your default when the whole string is numeric."],
  tags: ["methods", "numbers", "Number", "typeof", "comparisons"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
