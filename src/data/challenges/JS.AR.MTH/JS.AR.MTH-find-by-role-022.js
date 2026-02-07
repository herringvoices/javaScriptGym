import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.AR.MTH-find-by-role-022",
  title: "Find User by Role",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.AR.MTH"],
  primaryStandard: "JS.AR.MTH",
  difficulty: 2,
  description: `
Find a user by matching a specific role string.

Search for the first user whose role property equals 'mod'.
Extract their name from the found object.
  `.trim(),
  userStories: [
    "I can find objects by string property values.",
    "I can extract properties from search results.",
    "I see the moderator's name logged."
  ],
  acceptanceCriteria: [
    "Use find to locate the first user with role === 'mod'.",
    "Extract the name property.",
    "Log the name (should be 'B')."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {"/main.js": {
      active: true,
      code: `// TODO: Find the first moderator's name

const users = [
  { name: 'A', role: 'user' },
  { name: 'B', role: 'mod' },
  { name: 'C', role: 'mod' }
];

// Your code: find first user with role 'mod'
// Get their name
// Expected: 'B'


// Log the name

`
    }
  },
  entry: "/main.js",
  hints: [
    "Use users.find(u => u.role === 'mod').",
    "Find stops at the first match.",
    "Access .name on the result."
  ],
  tags: ["find", "array-methods", "objects", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" }
};

export default challenge;
