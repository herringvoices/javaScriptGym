import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.AR.MTH-chain-comparison-037",
  title: "Chained vs Separate Variables",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.AR.MTH"],
  primaryStandard: "JS.AR.MTH",
  difficulty: 3,
  description: `
Compare chained methods vs separate variables.

Solve the same problem two ways: once with method chaining, once with
intermediate variables. Both produce the same result.
  `.trim(),
  userStories: [
    "I can solve problems with or without chaining.",
    "I understand that chaining is syntactic convenience.",
    "I see both approaches produce the same result."
  ],
  acceptanceCriteria: [
    "Create resultA using chained methods.",
    "Create resultB using separate variables for each step.",
    "Both should equal 36 (first even square > 30).",
    "Log both to verify they match."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {"/main.js": {
      active: true,
      code: `// TODO: Solve the same problem two ways

const nums = [3, 4, 5, 6];

// Approach A: chained
// Filter evens → map squares → find > 30


// Approach B: separate variables
// const evens = nums.filter(...);
// const squares = evens.map(...);
// const resultB = squares.find(...);


// Log both resultA and resultB (should both be 36)

`
    }
  },
  entry: "/main.js",
  hints: [
    "Chained: nums.filter(...).map(...).find(...);",
    "Separate: break each step into its own variable.",
    "Both approaches produce 36."
  ],
  tags: ["filter", "map", "find", "array-methods", "chaining", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" }
};

export default challenge;
