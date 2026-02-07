import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.AR.MTH-foreach-build-array-028",
  title: "Build Array with forEach",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.PF.ITR", "JS.AR.ACC"],
  primaryStandard: "JS.PF.ITR",
  difficulty: 2,
  description: `
Manually build a transformed array using forEach.

While map is typically better for transformations, you can achieve the same
result with forEach by pushing to a new array. This helps understand
how these methods relate.
  `.trim(),
  userStories: [
    "I can use forEach to build new arrays.",
    "I understand the relationship between forEach and map.",
    "I see the array of squares logged."
  ],
  acceptanceCriteria: [
    "Use forEach (not map) to create squares.",
    "Push each squared number to a result array.",
    "Result should be [1, 9, 16].",
    "Log the result array."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {"/main.js": {
      active: true,
      code: `// TODO: Build array of squares using forEach

const nums = [1, 3, 4];

// Your code: initialize empty array
// Use forEach to push n*n to the array
// Expected result: [1, 9, 16]


// Log your result array

`
    }
  },
  entry: "/main.js",
  hints: [
    "Start with: const result = [];",
    "Use: nums.forEach(n => { result.push(n * n); });",
    "Then log the result array."
  ],
  tags: ["foreach", "array-methods", "transformation", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" }
};

export default challenge;
