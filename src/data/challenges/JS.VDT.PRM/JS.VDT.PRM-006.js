import { ChallengeTemplates, ChallengeTypes } from "../../../types";

const challenge = {
  id: "JS.VDT.PRM-006",
  title: "DEBUG: Forgot let/const",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.VDT.PRM"],
  primaryStandard: "JS.VDT.PRM",
  difficulty: 1,
  description: `
Code references an identifier before it's declared. Provide a suitable block-scoped declaration.
Do not rename the variable. Keep logs the same.
  `.trim(),
  userStories: [
    "After fix, code runs without ReferenceError (in strict mode).",
    "Variable is declared with let or const appropriately.",
  ],
  acceptanceCriteria: [
    "Add a single declaration statement.",
    "Choose let if the value changes; const if not.",
  ],
  template: ChallengeTemplates.VANILLA,
  files: { "/main.js": { code: `"use strict"; // Strict mode would throw here.
count = 1; // ❌ missing let/const
console.log('count:', count);
count = count + 1;
console.log('count:', count);

// FIX: declare count properly so both logs work.
` } },
  entry: "/main.js",
  hints: ["Declare the variable once before first use.", "Use a block-scoped keyword."],
  tags: ["debugging", "scope", "console"],
  sandbox: { showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
