import { ChallengeTemplates, ChallengeTypes } from "../../../types";

const challenge = {
  id: "JS.VDT.PRM-003",
  title: "Quick Math Practice",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.VDT.PRM"],
  primaryStandard: "JS.VDT.PRM",
  difficulty: 1,
  description: `
Declare two numbers a and b. Compute and log their sum, difference, product, and quotient.
Use new variables (sum, diff, product, quotient). Keep it simple; console only.
  `.trim(),
  userStories: [
    "Stores two number primitives.",
    "Logs results for + - * /.",
  ],
  acceptanceCriteria: [
    "Use distinct variables for each result (not inline in log).",
    "Division result can be a float.",
  ],
  template: ChallengeTemplates.VANILLA,
  files: { "/main.js": { code: `// TODO:
// Pick two number primitives.
// Create four new variables for the results of + - * /.
// Log each (any order).
` } },
  entry: "/main.js",
  hints: ["Set a and b to small integers first.", "You can log all in one line."],
  tags: ["numbers", "operators", "console"],
  sandbox: { showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
