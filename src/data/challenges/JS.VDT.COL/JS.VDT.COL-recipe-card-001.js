import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.VDT.COL-recipe-card-001",
  title: "Recipe Card",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.VDT.COL", "JS.VDT.COL"],
  primaryStandard: "JS.VDT.COL",
  prerequisiteStandards: ["JS.VDT.PRM"],
  difficulty: 2,
  description: `Use an object + an array together.
One recipe object holds a list of ingredients.
 `.trim(),
  userStories: [
    "I can use an object to group recipe details.",
    "I can use an array to store an ordered list of ingredients.",
    "I can access and update nested data (recipe.ingredients[0]).",
  ],
  acceptanceCriteria: [
    "Create ONE object named recipe with keys: name (string), servings (number), ingredients (array of strings).",
    "Log ONE line that includes recipe.name and the number of ingredients (ingredients.length).",
    "Update ONE ingredient by index and log the updated ingredients array.",
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// TODO: Make a recipe card using an object + array.

// 1) Create ONE object named recipe with:
//    - name (string)
//    - servings (number)
//    - ingredients (array of strings; at least 4 items)

// 2) Log ONE readable line that includes:
//    - recipe.name
//    - recipe.ingredients.length
//    Example shape (yours can differ):
//    "Tacos (serves 3) | Ingredients: 6"

// 3) Update ONE ingredient by index (ex: recipe.ingredients[1] = "..."),
//    then log recipe.ingredients to prove it changed.

`,
    },
  },
  entry: "/main.js",
  hints: [
    "Objects group details; arrays store lists (like ingredients).",
    "Nested access looks like: recipe.ingredients[0]",
  ],
  tags: ["collections", "objects", "arrays", "nested-access", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
