import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.AR.MTH-filter-primes-inline-006",
  title: "Filter Primes (Inline Logic)",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.AR.MTH", "JS.PF.ITR"],
  primaryStandard: "JS.AR.MTH",
  difficulty: 3,
  description: `
Write an inline prime check inside the filter callback.

Instead of using a helper function, write the prime-checking logic
directly in the filter predicate.
  `.trim(),
  userStories: [
    "I can write complex logic inside a filter callback.",
    "I understand how to check if a number is prime.",
    "I see the prime numbers logged."
  ],
  acceptanceCriteria: [
    "Use filter with an inline callback (no helper function).",
    "The callback should check if a number is prime.",
    "Result should be [2, 3, 5].",
    "Log the result."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {"/main.js": {
      active: true,
      code: `// TODO: Filter for primes without a helper function

const nums = [2, 3, 4, 5, 6];

// Your code: inline prime check in the filter callback
// A prime has no divisors between 2 and sqrt(n)
// Expected result: [2, 3, 5]


// Log your result

`
    }
  },
  entry: "/main.js",
  hints: [
    "A number n is prime if no integer from 2 to √n divides it evenly.",
    "You'll need a loop inside the filter callback.",
    "Return false if you find a divisor, true otherwise."
  ],
  tags: ["filter", "array-methods", "loops", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" }
};

export default challenge;
