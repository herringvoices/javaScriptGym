import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.AR.MTH-map-uppercase-trim-016",
  title: "Map: Trim and Uppercase Names",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.AR.MTH", "JS.VDT.MTH"],
  primaryStandard: "JS.AR.MTH",
  difficulty: 2,
  description: `
Clean and normalize user names using string methods.

Extract names from user objects, trim whitespace, and convert to uppercase.
Chain string methods inside the map callback.
  `.trim(),
  userStories: [
    "I can combine map with string methods.",
    "I can clean and normalize text data.",
    "I see the uppercase, trimmed names logged."
  ],
  acceptanceCriteria: [
    "Map users to their names.",
    "Trim whitespace from each name.",
    "Convert to uppercase.",
    "Result should be ['ADA', 'LIN'].",
    "Log the array of names."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {"/main.js": {
      active: true,
      code: `// TODO: Extract, trim, and uppercase names

const users = [
  { name: ' Ada ' },
  { name: ' Lin ' }
];

// Your code: map to cleaned uppercase names
// Chain .trim() and .toUpperCase()
// Expected: ['ADA', 'LIN']


// Log your result

`
    }
  },
  entry: "/main.js",
  hints: [
    "Start by mapping to names: users.map(u => u.name).",
    "Chain string methods: u.name.trim().toUpperCase().",
    "You can call multiple methods in sequence."
  ],
  tags: ["map", "array-methods", "string-methods", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" }
};

export default challenge;
