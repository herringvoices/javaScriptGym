import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.AR.MTH-find-admin-user-020",
  title: "Find First Admin User",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.AR.MTH", "JS.VDT.COL"],
  primaryStandard: "JS.AR.MTH",
  difficulty: 2,
  description: `
Find the first user with admin privileges.

Use find to search through an array of user objects. Return the name
of the first user where the admin property is true.
  `.trim(),
  userStories: [
    "I can find objects based on boolean properties.",
    "I can extract specific properties from found objects.",
    "I see the first admin name logged."
  ],
  acceptanceCriteria: [
    "Use find to locate the first user where admin is true.",
    "Extract the name property from the result.",
    "Log the name (should be 'Lin')."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {"/main.js": {
      active: true,
      code: `// TODO: Find the first admin user's name

const users = [
  { name: 'Ada', admin: false },
  { name: 'Lin', admin: true },
  { name: 'Edsger', admin: true }
];

// Your code: use find to get first admin
// Check the admin property
// Get their name
// Expected: 'Lin'


// Log the admin name

`
    }
  },
  entry: "/main.js",
  hints: [
    "Use users.find(u => u.admin).",
    "Truthy properties can be checked directly.",
    "Access .name on the found object."
  ],
  tags: ["find", "array-methods", "objects", "boolean", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" }
};

export default challenge;
