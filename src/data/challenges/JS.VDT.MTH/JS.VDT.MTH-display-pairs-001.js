import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.VDT.MTH-display-pairs-001",
  title: "Build Display Pairs",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.VDT.MTH", ],
  primaryStandard: "JS.VDT.MTH",
  prerequisiteStandards: ["JS.VDT.PRM", "JS.VDT.COL", "JS.VDT.MTH"],
  difficulty: 3,
  description: `Turn keys and values into a tiny display list.
Use Object.keys/Object.values and build an array of {label, value}.
 `.trim(),
  userStories: [
    "I can turn an object into parallel arrays of labels and values.",
    "I can reshape those arrays into an array of display objects.",
  ],
  acceptanceCriteria: [
    "Create labels using Object.keys(...) and info using Object.values(...).",
    "Create display as an array with at least two objects shaped like { label, value }.",
    "Log display and ensure label/value are pulled from labels/info by index.",
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// TODO: Reshape object data for a tiny display list.

const player = {
  name: "Alice",
  score: 12,
  online: true,
  rank: "Bronze",
};

// 1) Create labels using Object.keys(player).
// 2) Create info using Object.values(player).
//
// 3) Create display as an array with TWO objects, like:
//    { label: labels[0], value: info[0] }
//    { label: labels[1], value: info[1] }
//
// 4) Log display.

`,
    },
  },
  entry: "/main.js",
  hints: ["You are reshaping: object -> arrays -> array of objects."],
  tags: ["methods", "Object.keys", "Object.values", "collections", "data-shaping"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
