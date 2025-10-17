import { ChallengeTemplates, ChallengeTypes } from "../../../types";

const challenge = {
  id: "JS.VDT.PRM-103",
  title: "Intentional Empty: null vs undefined",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.VDT.PRM"],
  primaryStandard: "JS.VDT.PRM",
  difficulty: 1,
  description: `
Demonstrate an intentional empty state: start a variable at a deliberate empty value, log it, then assign a meaningful non-empty value and log again to compare.
  `.trim(),
  userStories: [
    "Logs null first, then the final string value.",
    "Demonstrates 'empty on purpose' vs 'not assigned yet'.",
  ],
  acceptanceCriteria: [
    "Use null explicitly; avoid leaving it undefined.",
    "Reassign later to a real value and log both states.",
  ],
  template: ChallengeTemplates.VANILLA,
  files: { "/main.js": { code: `// TODO\n` } },
  entry: "/main.js",
  hints: ["null is a deliberate empty state."],
  tags: ["null", "undefined", "state-initialization", "console"],
  sandbox: { showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
