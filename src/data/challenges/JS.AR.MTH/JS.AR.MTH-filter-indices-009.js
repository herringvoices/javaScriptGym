import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.AR.MTH-filter-indices-009",
  title: "Find Indices of Even Numbers",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.AR.MTH", "JS.PF.ITR"],
  primaryStandard: "JS.AR.MTH",
  difficulty: 2,
  description: `
Find the indices where even numbers appear in an array.

Instead of returning the even numbers themselves, return their positions.
You can use various approaches - filter, map, forEach, or a loop.
  `.trim(),
  userStories: [
    "I can find the positions of items matching a condition.",
    "I see the array of indices logged."
  ],
  acceptanceCriteria: [
    "Find indices where numbers are even.",
    "Result should be [1, 3] (positions of 4 and 8).",
    "Log the array of indices."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {"/main.js": {
      active: true,
      code: `// TODO: Find indices of even numbers

const nums = [3, 4, 5, 8];

// Your code: find positions where numbers are even
// At index 1: 4 is even
// At index 3: 8 is even
// Expected result: [1, 3]


// Log your result

`
    }
  },
  entry: "/main.js",
  hints: [
    "You could use map with index, then filter.",
    "Or use forEach to build the array manually.",
    "Or a traditional for loop pushing indices."
  ],
  tags: ["filter", "map", "array-methods", "indices", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" }
};

export default challenge;
