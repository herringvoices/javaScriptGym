import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.AR.MTH-find-manual-024",
  title: "Emulate Find Without Using Find",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.PF.ITR"],
  primaryStandard: "JS.PF.ITR",
  difficulty: 3,
  description: `
Build your own find logic using a loop.

Recreate the behavior of find without using the built-in method.
Loop until you find the first even number, then stop.
  `.trim(),
  userStories: [
    "I understand how find works under the hood.",
    "I can use loops with early exit (break).",
    "I see the first even number logged."
  ],
  acceptanceCriteria: [
    "Do NOT use the .find() method.",
    "Use a for loop or for...of loop.",
    "Find the first even number and stop searching.",
    "Result should be 6.",
    "Log the result."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {"/main.js": {
      active: true,
      code: `// TODO: Find first even number without using .find()

const nums = [3, 5, 6, 8];

// Your code: use a loop to find first even
// Initialize a variable to store the result
// Loop and break when you find it
// Expected: 6


// Log your result

`
    }
  },
  entry: "/main.js",
  hints: [
    "let result; then loop: for (const n of nums) { ... }",
    "Inside: if (n % 2 === 0) { result = n; break; }",
    "Break stops the loop immediately."
  ],
  tags: ["loops", "array-methods", "iteration", "break", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" }
};

export default challenge;
