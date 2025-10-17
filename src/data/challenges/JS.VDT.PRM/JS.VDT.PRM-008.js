import { ChallengeTemplates, ChallengeTypes } from "../../../types";

const challenge = {
  id: "JS.VDT.PRM-008",
  title: "DEBUG: Not Storing the Sum",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.VDT.PRM"],
  primaryStandard: "JS.VDT.PRM",
  difficulty: 1,
  description: `
  A teammate tried to store a result but the code is broken.
  Fix it so total ends up holding the sum and the console shows the correct value.
  `.trim(),
  userStories: [
    "Console logs the correct numeric total.",
  ],
  acceptanceCriteria: [
      "Make only the minimal fix needed so total becomes 7.",
    "Do not rename variables or add new ones.",
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// Broken starter:
        let a = 3;
        let b = 4;
        // Intention: store the sum of a and b in total
        let total
        a + b; // <- something's off; total never changes
        console.log('total:', total); // should show 7

        // TODO: Fix the code so total is 7 (make only one small change)
`,
    },
  },
  entry: "/main.js",
  hints: ["Store the computed sum in the variable before logging."],
  tags: ["debugging", "syntax", "console"],
  sandbox: { showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
