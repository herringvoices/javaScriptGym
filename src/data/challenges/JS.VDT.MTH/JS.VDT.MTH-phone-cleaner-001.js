import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.VDT.MTH-phone-cleaner-001",
  title: "Phone Cleaner",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.VDT.MTH", ],
  primaryStandard: "JS.VDT.MTH",
  prerequisiteStandards: ["JS.VDT.PRM", "JS.VDT.MTH"],
  difficulty: 2,
  description: `Normalize a phone number for display.
Use .replace(...) a few times and log the results.
 `.trim(),
  userStories: [
    "I can use replace to swap characters in a string.",
    "I can build a cleaned version without changing the original string.",
  ],
  acceptanceCriteria: [
    "Create rawPhone as a string with dashes or parentheses.",
    "Create displayPhone by replacing at least two characters (ex: '-' to ' ').",
    "Log rawPhone and displayPhone.",
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// TODO: Clean up a phone string for nicer display.
// Note: replace(...) returns a NEW string.

const rawPhone = "(615)-555-1212";

// 1) Create displayPhone by replacing characters so it becomes something like:
//    "615 555 1212"  (your exact format can differ)
//
// 2) Log rawPhone and displayPhone.

`,
    },
  },
  entry: "/main.js",
  hints: ["Call replace multiple times and store the result each time."],
  tags: ["methods", "strings", "replace", "normalization", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
