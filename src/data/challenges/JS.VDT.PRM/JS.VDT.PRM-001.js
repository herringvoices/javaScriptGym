import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.VDT.PRM-player-status-001",
  title: "Player Status Line",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.VDT.PRM", "JS.VDT.PRM"],
  primaryStandard: "JS.VDT.PRM",
  difficulty: 1,
  description: `
Make a tiny "player status" in code.
Use primitives to describe a player and log one status line.
  `.trim(),
  userStories: [
    "I have variables for a player's name, score, and online state.",
    "I see one console.log with a short status message."
  ],
  acceptanceCriteria: [
    "Use primitives: string for the name, number for the score, boolean for online state.",
    "Use const for values that do not change in this snippet (like the name).",
    "Log a single status message that includes all three values."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// TODO: Model a tiny player status with primitives.
// 1. Make variables for a player's name, score, and online state.
// 2. Use const for values that won't change in this snippet.
// 3. Log ONE status line that includes all three values.
//    Example shape (yours can differ):
//    "Player: Alice | Score: 10 | Online: true"

`,
    },
  },
  entry: "/main.js",
  hints: [],
  tags: ["primitives", "variables", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
