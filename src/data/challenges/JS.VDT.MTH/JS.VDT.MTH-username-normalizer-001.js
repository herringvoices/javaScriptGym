import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.VDT.MTH-username-normalizer-001",
  title: "Username Normalizer",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.VDT.MTH", ],
  primaryStandard: "JS.VDT.MTH",
  prerequisiteStandards: ["JS.VDT.PRM", "JS.VDT.MTH"],
  difficulty: 1,
  description: `Clean up a messy username.
Use .trim(), .toLowerCase(), and .length.
 `.trim(),
  userStories: [
    "I can store a messy input string and clean it step by step.",
    "I can log the original and cleaned versions so I can compare them.",
  ],
  acceptanceCriteria: [
    "Create userInput as a messy string with extra spaces and mixed case.",
    "Create trimmed and normalized variables (trim then lowercase).",
    "Log the original, trimmed, normalized, and the normalized length.",
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// TODO: Normalize a username so it's consistent for storage/search.

const userInput = "   NiCk_HoMoElLe   ";

// 1) Create trimmed by removing spaces at the edges.
// 2) Create normalized by lowercasing trimmed.
// 3) Create nameLength using the .length property on normalized.
// 4) Log all four values (userInput, trimmed, normalized, nameLength).

`,
    },
  },
  entry: "/main.js",
  hints: ["Remember: string methods return new strings, so store the result."],
  tags: ["methods", "strings", "trim", "toLowerCase", "length", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
