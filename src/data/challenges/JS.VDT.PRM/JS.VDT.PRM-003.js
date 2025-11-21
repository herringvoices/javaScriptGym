import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.VDT.PRM-ticket-counter-001",
  title: "Ticket Counter",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.VDT.PRM"],
  primaryStandard: "JS.VDT.PRM",
  difficulty: 1,
  description: `
Track a "now serving" ticket number and update it.
  `.trim(),
  userStories: [
    "I have a variable that holds the current ticket number.",
    "I log the ticket, update it, and log the new value."
  ],
  acceptanceCriteria: [
    "Use let for the ticket number so it can change.",
    "Start the ticket as a number (no quotes).",
    "Log before and after updating the ticket."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// TODO: Track a changing ticket number.
// 1. Make a let variable for the current ticket number.
// 2. Log the starting ticket.
// 3. Change it (for the next person in line) and log again.

`,
    },
  },
  entry: "/main.js",
  hints: [],
  tags: ["primitives", "let", "reassignment", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
