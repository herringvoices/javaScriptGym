import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.VDT.PRM-welcome-banner-001",
  title: "Welcome Banner",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.VDT.PRM"],
  primaryStandard: "JS.VDT.PRM",
  difficulty: 1,
  description: `
Use primitives to build a short welcome banner and log it once.
  `.trim(),
  userStories: [
    "I have variables for a site name, a user name, and an unread count.",
    "I see one console.log with a short welcome message."
  ],
  acceptanceCriteria: [
    "Use strings for the site and user names, and a number for unread count.",
    "Use const for values that do not change in this snippet (like the site name).",
    "Log a single message that includes all three values."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// TODO: Model a simple welcome banner with primitives.
// 1. Make variables for a site name, user name, and unread count.
// 2. Use const for values that won't change in this snippet.
// 3. Log ONE welcome line that includes all three values.
//    Example shape (yours can differ):
//    "Welcome back, Riley! You have 3 unread messages on JS Handbook."

`,
    },
  },
  entry: "/main.js",
  hints: [],
  tags: ["primitives", "variables", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
