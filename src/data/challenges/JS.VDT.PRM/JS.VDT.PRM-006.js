import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.VDT.PRM-pick-types-001",
  title: "Pick the Right Types",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.VDT.PRM"],
  primaryStandard: "JS.VDT.PRM",
  difficulty: 2,
  description: `
Choose primitive types that match how a cinema app stores its data.
  `.trim(),
  userStories: [
    "I fill in variables based on comments that describe the data.",
    "Each variable uses a primitive type that makes sense."
  ],
  acceptanceCriteria: [
    "Use a string for movieTitle.",
    "Use a number for ticketsSold.",
    "Use a boolean for isMatinee.",
    "Use null for specialRequest when there is no note yet."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// TODO: Pick primitive types that fit each description.
// Fill in values for each variable so the type matches the comment.

let movieTitle;     // text for the movie's name
let ticketsSold;    // how many tickets have been sold (a number)
let isMatinee;      // true if it's a matinee showing, false otherwise
let specialRequest; // no special request yet, on purpose

// After assigning values, log them once to check.

`,
    },
  },
  entry: "/main.js",
  hints: [],
  tags: ["primitives", "types", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
