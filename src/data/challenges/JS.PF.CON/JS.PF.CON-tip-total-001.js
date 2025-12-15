import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.PF.CON-tip-total-001",
  title: "Tip Total",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.PF.CON",],
  primaryStandard: "JS.PF.CON",
  prerequisiteStandards: ["JS.VDT.PRM"],
  difficulty: 1,
  description: `Calculate a receipt total using primitives.
Use numbers, operators, and one template literal.
 `.trim(),
  userStories: [
    "I have variables for subtotal, tax rate, and tip rate.",
    "I see one console.log that reports the final total.",
  ],
  acceptanceCriteria: [
    "Log ONE line that includes subtotal, tax amount, tip amount, and total.",
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// TODO: Compute a receipt total using primitives.
// Make variables for:
// - subtotal (number)
// - taxRate (number like 0.0925)
// - tipRate (number like 0.20)
//
// Compute:
// - taxAmount
// - tipAmount
// - total
//
// Then log ONE line that includes all four values.
// Example shape (yours can differ):
// "Subtotal: 20 | Tax: 1.85 | Tip: 4 | Total: 25.85"

`,
    },
  },
  entry: "/main.js",
  hints: [],
  tags: ["primitives", "numbers", "operators", "template-literals", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
