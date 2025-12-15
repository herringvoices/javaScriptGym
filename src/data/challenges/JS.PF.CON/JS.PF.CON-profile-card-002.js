import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.PF.CON-profile-card-002",
  title: "Profile Card",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.PF.CON",],
  primaryStandard: "JS.PF.CON",
  prerequisiteStandards: ["JS.VDT.PRM", "JS.VDT.COL"],
  difficulty: 1,
  description: `Bundle user info into one object.
Read fields and update one field with dot notation.
 `.trim(),
  userStories: [
    "I can group related user data in one object.",
    "I can read and update a field through a dot path.",
  ],
  acceptanceCriteria: [
    "Log ONE profile line using at least three fields, then update one field and log the updated value.",
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// TODO: Build a profile object and log one profile line.

const displayName = "River";
const level = 7;
const isOnline = true;

// 1) Create ONE object named profile that bundles these values.
//    Required keys: displayName, level, isOnline
//
// 2) Log ONE line using dot notation.
//    Example shape (yours can differ):
//    "River | Level 7 | Online: true"
//
// 3) Update ONE field using dot notation (pick one),
//    then log the updated value.

`,
    },
  },
  entry: "/main.js",
  hints: [],
  tags: ["collections", "objects", "dot-notation", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
