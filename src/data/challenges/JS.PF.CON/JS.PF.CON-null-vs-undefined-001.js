import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.PF.CON-null-vs-undefined-001",
  title: "Null vs Undefined",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.PF.CON",],
  primaryStandard: "JS.PF.CON",
  prerequisiteStandards: ["JS.VDT.PRM"],
  difficulty: 2,
  description: `Practice choosing null vs undefined on purpose.
Then prove what each variable currently holds.
 `.trim(),
  userStories: [
    "I can intentionally set a value to null when it is 'known empty'.",
    "I can leave a variable undefined when it has not been assigned yet.",
  ],
  acceptanceCriteria: [
    "Log ONE line that prints both variables and clearly shows one is null and one is undefined.",
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// TODO: Use null vs undefined intentionally.
//
// Create TWO variables:
// - middleName: set this to null (known empty on purpose)
// - nickname: declare it with let but do NOT assign a value yet (undefined)
//
// Then log ONE line that shows both.
// Example shape (yours can differ):
// "middleName: null | nickname: undefined"

`,
    },
  },
  entry: "/main.js",
  hints: [],
  tags: ["primitives", "null", "undefined", "variables", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
