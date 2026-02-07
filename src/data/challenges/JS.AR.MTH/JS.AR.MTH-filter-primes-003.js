import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.AR.MTH-filter-primes-003",
  title: "Filter Prime Numbers",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.AR.MTH", "JS.FN.BAS"],
  primaryStandard: "JS.AR.MTH",
  difficulty: 2,
  description: `
Use filter with a helper function to find prime numbers.

A prime number is only divisible by 1 and itself. Use the provided isPrime
helper function as the predicate for filter.
  `.trim(),
  userStories: [
    "I can use filter with a named function as the predicate.",
    "I can identify prime numbers from an array.",
    "I see the filtered prime numbers logged."
  ],
  acceptanceCriteria: [
    "Use nums.filter() with isPrime as the predicate.",
    "The result should be [2, 3, 5, 7].",
    "Log the result to verify."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {"/main.js": {
      active: true,
      code: `// TODO: Filter to get only prime numbers

const nums = [2, 3, 4, 5, 6, 7];

// Helper function provided
function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

// Your code: use nums.filter with isPrime
// Expected result: [2, 3, 5, 7]


// Log your result

`
    }
  },
  entry: "/main.js",
  hints: [
    "Pass the function name (not called) to filter: nums.filter(isPrime).",
    "Filter will call isPrime for each number.",
    "Only numbers where isPrime returns true are kept."
  ],
  tags: ["filter", "array-methods", "functions", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" }
};

export default challenge;
