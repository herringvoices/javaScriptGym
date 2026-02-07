import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.AR.MTH-map-user-tags-012",
  title: "Map Objects to Custom Strings",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.AR.MTH", "JS.VDT.PRM"],
  primaryStandard: "JS.AR.MTH",
  difficulty: 3,
  description: `
Map user objects to formatted strings.

Combine multiple properties from each object to create a tag string.
Use template literals to format the output.
  `.trim(),
  userStories: [
    "I can map objects to strings using their properties.",
    "I can use template literals inside map callbacks.",
    "I see the formatted tags logged."
  ],
  acceptanceCriteria: [
    "Map each user to a string in the format 'name:repos'.",
    "Result should be ['Ada:3', 'Lin:5'].",
    "Log the array of tags."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {"/main.js": {
      active: true,
      code: `// TODO: Map users to 'name:repos' tags

const users = [
  { name: 'Ada', repos: 3 },
  { name: 'Lin', repos: 5 }
];

// Your code: use map with template literals
// Format each as "name:repos"
// Expected: ['Ada:3', 'Lin:5']


// Log your result

`
    }
  },
  entry: "/main.js",
  hints: [
    "Use template literals: `${u.name}:${u.repos}`.",
    "Or concatenation: u.name + ':' + u.repos.",
    "Map returns an array of the transformed values."
  ],
  tags: ["map", "array-methods", "objects", "template-literals", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" }
};

export default challenge;
