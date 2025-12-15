import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.VDT.MTH-parseint-parsefloat-001",
  title: "parseInt vs parseFloat",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.VDT.MTH", ],
  primaryStandard: "JS.VDT.MTH",
  prerequisiteStandards: ["JS.VDT.PRM", "JS.VDT.MTH"],
  difficulty: 2,
  description: `Extract numbers from strings that have extra characters.
Use parseInt(...) and parseFloat(...).
 `.trim(),
  userStories: [
    "I can choose parseInt for whole numbers and parseFloat for decimals.",
    "I can see how extra trailing characters affect parsing.",
  ],
  acceptanceCriteria: [
    "Use parseInt on a string with trailing text and log the result.",
    "Use parseFloat on a string with a decimal and trailing text and log the result.",
    "Log typeof for both parsed results.",
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// TODO: Practice parseInt and parseFloat.

const seatsText = "12 seats";
const weightText = "18.75kg";

// 1) Create seatCount using parseInt(seatsText).
// 2) Create weightKg using parseFloat(weightText).
// 3) Log seatCount, typeof seatCount, weightKg, typeof weightKg.

`,
    },
  },
  entry: "/main.js",
  hints: ["parseInt/parseFloat read from the START of the string."],
  tags: ["methods", "numbers", "parseInt", "parseFloat", "typeof"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
