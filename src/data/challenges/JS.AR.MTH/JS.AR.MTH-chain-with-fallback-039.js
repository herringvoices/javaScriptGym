import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.AR.MTH-chain-with-fallback-039",
  title: "Chain with Fallback Logic",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.AR.MTH", "JS.PF.CON"],
  primaryStandard: "JS.AR.MTH",
  difficulty: 3,
  description: `
Handle undefined results from chained find operations.

Chain methods to search for a specific value. When find returns undefined,
provide a fallback value.
  `.trim(),
  userStories: [
    "I can handle undefined from chained operations.",
    "I can provide fallback values in complex chains.",
    "I see the fallback value logged when no match is found."
  ],
  acceptanceCriteria: [
    "Filter evens from [3, 4, 5, 6].",
    "Map to squares.",
    "Find first square > 100 (none exist).",
    "Use -1 as fallback when undefined.",
    "Log the result (should be -1)."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {"/main.js": {
      active: true,
      code: `// TODO: Chain with fallback when no match found

const nums = [3, 4, 5, 6];

// Your code: chain filter → map → find, then handle undefined
// Filter evens → [4, 6]
// Map squares → [16, 36]
// Find > 100 → undefined (none match)
// Fallback: -1
// Expected: -1


// Log your result

`
    }
  },
  entry: "/main.js",
  hints: [
    "const found = nums.filter(...).map(...).find(...);",
    "Then: const result = found !== undefined ? found : -1;",
    "Or use nullish coalescing: found ?? -1;"
  ],
  tags: ["filter", "map", "find", "array-methods", "chaining", "fallback", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" }
};

export default challenge;
