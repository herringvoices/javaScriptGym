import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.AR.MTH-find-nested-property-026",
  title: "Find by Nested Property",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.AR.MTH", "JS.VDT.COL"],
  primaryStandard: "JS.AR.MTH",
  difficulty: 2,
  description: `
Find an object by checking a nested property value.

Objects can have nested properties. Use find to search for an item
where a nested property exceeds a threshold.
  `.trim(),
  userStories: [
    "I can access nested properties in find predicates.",
    "I can search objects with complex structures.",
    "I see the nested ID value logged."
  ],
  acceptanceCriteria: [
    "Use find to locate the first item where meta.id > 10.",
    "Extract the meta.id value from the found object.",
    "Log the ID (should be 12)."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {"/main.js": {
      active: true,
      code: `// TODO: Find first item with meta.id > 10

const arr = [
  { meta: { id: 5 } },
  { meta: { id: 12 } },
  { meta: { id: 3 } }
];

// Your code: use find with nested property check
// Check: meta.id > 10
// Get the meta.id value
// Expected: 12


// Log the ID

`
    }
  },
  entry: "/main.js",
  hints: [
    "Use arr.find(i => i.meta.id > 10).",
    "Access nested properties with chained dots.",
    "Then get .meta.id from the result."
  ],
  tags: ["find", "array-methods", "nested-objects", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" }
};

export default challenge;
