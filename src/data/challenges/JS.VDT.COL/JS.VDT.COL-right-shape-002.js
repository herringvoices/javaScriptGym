import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.VDT.COL-right-shape-002",
  title: "Pick the Right Shape",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.VDT.COL", "JS.VDT.COL"],
  primaryStandard: "JS.VDT.COL",
  prerequisiteStandards: ["JS.VDT.PRM"],
  difficulty: 3,
  description: `Build a small app-state object with multiple collection types:
object vs array vs array of objects vs object of arrays of objects.
 `.trim(),
  userStories: [
    "I can choose objects for grouped details about one thing.",
    "I can choose arrays for ordered lists.",
    "I can choose arrays of objects for record datasets.",
    "I can group records by category using an object of arrays.",
  ],
  acceptanceCriteria: [
    "Create a top-level object named appState.",
    "appState.profile is an object with at least: username (string), isPro (boolean).",
    "appState.notifications is an array of strings (ordered; at least 3).",
    "appState.orders is an array of objects (at least 2 orders with id + totalDollars).",
    "appState.ordersByStatus is an object whose keys are statuses (ex: 'pending', 'shipped') and values are arrays of order objects.",
    "Log THREE different access examples that prove your shapes work (ex: profile.username, notifications[0], orders[1].totalDollars, ordersByStatus.pending[0].id).",
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// TODO: Choose the right collection type for each job.
// No loops. This is about SHAPE and ACCESS.

// Build a top-level object: appState
// Required keys and shapes:
// - profile: object (username, isPro, ...)
// - notifications: array of strings (ordered list)
// - orders: array of objects (structured records)
// - ordersByStatus: object of arrays of order objects (grouped lists)

// 1) Create appState with the required keys and sample data.

// 2) Log THREE different access paths that prove it works.
//    Examples (pick your own):
//    - console.log(appState.profile.username)
//    - console.log(appState.notifications[0])
//    - console.log(appState.orders[1].totalDollars)
//    - console.log(appState.ordersByStatus.pending[0].id)

`,
    },
  },
  entry: "/main.js",
  hints: [
    "ONE thing with named fields -> object.",
    "Ordered list -> array.",
    "Many similar records -> array of objects.",
    "Categories -> lists -> object of arrays.",
  ],
  tags: ["collections", "data-shaping", "objects", "arrays", "array-of-objects"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
