import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.PF.ITR-bug-hunt-infinite-001",
  title: "Bug Hunt: Infinite Loop",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.PF.ITR", "JS.VDT.PRM"],
  primaryStandard: "JS.PF.ITR",
  prerequisiteStandards: ["JS.VDT.PRM"],
  difficulty: 4,
  description: `Fix a loop that never ends (or would, if the runtime did not stop it).`.trim(),
  userStories: [
    "I can identify why a loop does not progress toward its stop condition.",
    "I can fix the step or the condition so it terminates correctly.",
  ],
  acceptanceCriteria: [
    "Fix the loop so it logs exactly: 0, 1, 2, 3, 4.",
    "The loop must stop after 4 (no extra numbers).",
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// TODO: Fix the infinite loop bug.
// Goal output:
// 0
// 1
// 2
// 3
// 4

for (let i = 0; i < 5; i--) {
  console.log(i);
}

`,
    },
  },
  entry: "/main.js",
  hints: ["If i starts at 0 and the stop condition is i < 5, the step must move i upward."],
  tags: ["iteration", "debugging", "infinite-loop", "for-loop", "step"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
