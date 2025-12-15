import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.PF.ITR-initials-list-001",
  title: "Initials List",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.PF.ITR", "JS.VDT.COL"],
  primaryStandard: "JS.PF.ITR",
  prerequisiteStandards: ["JS.VDT.PRM", "JS.VDT.COL"],
  difficulty: 3,
  description: `Build a new array while iterating. Create initials from an array of person records.`.trim(),
  userStories: [
    "I can iterate an array of objects.",
    "I can push computed values into a new array.",
  ],
  acceptanceCriteria: [
    "Create const initials = [];",
    "Use a loop to visit each person and push their initials into initials.",
    "Initials must be computed from person.firstName[0] + person.lastName[0].",
    "Log initials after the loop.",
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// TODO: Build an initials array from records.

const people = [
  { firstName: "Hannah", lastName: "Homoelle" },
  { firstName: "Nick", lastName: "Homoelle" },
  { firstName: "Dexter", lastName: "Labradoodle" },
];

// Requirements:
// - Create initials = []
// - Loop people
// - Push initials like "HH", "NH", "DL"
// - Log initials at the end

`,
    },
  },
  entry: "/main.js",
  hints: ["You do not need string methods here. String indexing works: firstName[0]."],
  tags: ["iteration", "arrays-of-objects", "for-of", "push", "data-shaping"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
