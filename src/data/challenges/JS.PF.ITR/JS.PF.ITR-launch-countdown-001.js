import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.PF.ITR-launch-countdown-001",
  title: "Launch Countdown",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.PF.ITR", "JS.VDT.PRM"],
  primaryStandard: "JS.PF.ITR",
  prerequisiteStandards: ["JS.VDT.PRM"],
  difficulty: 1,
  description: `Use a for loop like a machine with three settings: start, stop, step. Count down, then announce liftoff.`.trim(),
  userStories: [
    "I can write a for loop with start/stop/step settings.",
    "I can log a sequence and a final message after the loop.",
  ],
  acceptanceCriteria: [
    "Write a for loop that counts down from 10 to 0.",
    "Log each number during the loop.",
    "After the loop, log one final line: 'LIFTOFF!'.",
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// TODO: Countdown using a for loop.

// Requirements:
// - Count down from 10 to 0
// - Log each number
// - After the loop: log "LIFTOFF!"

`,
    },
  },
  entry: "/main.js",
  hints: ["Counting down usually means i-- and a stop condition like i >= 0."],
  tags: ["iteration", "for-loop", "start-stop-step", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
