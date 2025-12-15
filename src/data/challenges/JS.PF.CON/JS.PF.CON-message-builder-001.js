import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.PF.CON-message-builder-001",
  title: "Message Builder",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.PF.CON",],
  primaryStandard: "JS.PF.CON",
  prerequisiteStandards: ["JS.VDT.PRM"],
  difficulty: 1,
  description: `Build a short status message from primitive values.
Use strings, numbers, and a template literal.
 `.trim(),
  userStories: [
    "I can store user info in variables.",
    "I can log one readable message that combines them.",
  ],
  acceptanceCriteria: [
    "Log ONE line that includes a name (string), a count (number), and a boolean.",
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// TODO: Build a single status line using primitives.
// Make variables for:
// - username (string)
// - unreadCount (number)
// - isDoNotDisturb (boolean)
//
// Then log ONE line using a template literal.
// Example shape (yours can differ):
// "Nick has 3 unread messages | DND: false"

`,
    },
  },
  entry: "/main.js",
  hints: [],
  tags: ["primitives", "strings", "numbers", "booleans", "template-literals", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
