import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.VDT.MTH-name-badge-001",
  title: "Name Badge Parts",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.VDT.MTH", ],
  primaryStandard: "JS.VDT.MTH",
  prerequisiteStandards: ["JS.VDT.PRM", "JS.VDT.MTH"],
  difficulty: 2,
  description: `Split a full name into parts.
Use .trim(), .toLowerCase(), and .split(" ").
 `.trim(),
  userStories: [
    "I can normalize a full name so spacing and case are consistent.",
    "I can split a string into an array of name parts.",
  ],
  acceptanceCriteria: [
    "Create fullNameInput as a messy string with extra spaces.",
    "Create normalizedName by trimming and lowercasing.",
    "Create nameParts using split, then log the first and last parts by index.",
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// TODO: Turn a messy full name into usable parts.

const fullNameInput = "   HaNnAh    HoMoElLe  ";

// 1) Trim the edges and lowercase it into normalizedName.
// 2) Split normalizedName into nameParts using a space as the delimiter.
// 3) Log:
//    - normalizedName
//    - nameParts
//    - the first part (index 0)
//    - the last part (nameParts.length - 1)

`,
    },
  },
  entry: "/main.js",
  hints: ["If your split result has empty strings, check your spacing before split."],
  tags: ["methods", "strings", "trim", "toLowerCase", "split", "indexing"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
