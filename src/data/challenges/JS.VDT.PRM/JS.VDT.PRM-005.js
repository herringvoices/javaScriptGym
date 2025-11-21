import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.VDT.PRM-signup-choices-001",
  title: "Signup Choices",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.VDT.PRM"],
  primaryStandard: "JS.VDT.PRM",
  difficulty: 1,
  description: `
Use booleans to represent a user's signup choices and log them.
  `.trim(),
  userStories: [
    "I have variables for three yes/no choices on a signup form.",
    "I log a short summary of those choices."
  ],
  acceptanceCriteria: [
    "Use booleans (true/false, no quotes) for each choice.",
    "Choose clear names like wantsEmailUpdates or acceptedTerms.",
    "Log one message that includes all the choices."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// TODO: Capture signup choices with booleans.
// 1. Make three boolean variables for things like email updates,
//    SMS alerts, and accepting terms.
// 2. Log ONE summary line that mentions each choice.

`,
    },
  },
  entry: "/main.js",
  hints: [],
  tags: ["primitives", "booleans", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
