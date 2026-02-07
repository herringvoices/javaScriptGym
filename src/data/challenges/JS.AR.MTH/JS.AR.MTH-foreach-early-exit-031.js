import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.AR.MTH-foreach-early-exit-031",
  title: "Emulate Find with forEach",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.PF.ITR", "JS.PF.CON"],
  primaryStandard: "JS.PF.ITR",
  difficulty: 3,
  description: `
Find the first match using forEach.

forEach doesn't have a built-in way to stop early, but you can use a flag
variable to prevent further updates once you've found what you need.
  `.trim(),
  userStories: [
    "I can emulate early exit behavior with forEach.",
    "I can use guard conditions to prevent unnecessary work.",
    "I see the first even number logged."
  ],
  acceptanceCriteria: [
    "Use forEach (not find) to locate the first even number.",
    "Use a variable to track whether you've found it.",
    "Only capture the first match.",
    "Result should be 6.",
    "Log the result."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {"/main.js": {
      active: true,
      code: `// TODO: Find first even number using forEach

const nums = [3, 5, 6, 8];

// Your code: use forEach with a guard
// Track whether you've found the value
// Only set it once (for the first even)
// Expected: 6


// Log your result

`
    }
  },
  entry: "/main.js",
  hints: [
    "let first = null;",
    "forEach: if (first === null && n % 2 === 0) first = n;",
    "The guard prevents overwriting with later matches."
  ],
  tags: ["foreach", "array-methods", "early-exit", "guard", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" }
};

export default challenge;
