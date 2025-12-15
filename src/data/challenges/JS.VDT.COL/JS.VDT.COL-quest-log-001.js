import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.VDT.COL-quest-log-001",
  title: "Quest Log Records",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.VDT.COL", ],
  primaryStandard: "JS.VDT.COL",
  prerequisiteStandards: ["JS.VDT.PRM"],
  difficulty: 2,
  description: `Model structured data as an array of objects.
Access and update one record through an access path.
 `.trim(),
  userStories: [
    "I can represent multiple records as an array of objects.",
    "I can access a specific record using an index and dot notation.",
    "I can update one field through an access path and verify it changed.",
  ],
  acceptanceCriteria: [
    "Create an array named quests that contains quest1, quest2, quest3.",
    "Log ONE line that reads a field from a specific quest using a path like quests[1].title.",
    "Update ONE quest's status through the array path (ex: quests[0].status = 'complete'), then log the updated quest object.",
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// TODO: Turn quests into a dataset (array of objects).

const quest1 = { id: 1, title: "Find the lost map", status: "active", rewardGold: 50 };
const quest2 = { id: 2, title: "Deliver the letter", status: "active", rewardGold: 10 };
const quest3 = { id: 3, title: "Defeat the cave rats", status: "locked", rewardGold: 25 };

// 1) Create an array named quests that contains quest1, quest2, and quest3.

// 2) Log ONE readable line using a path like quests[?].title and quests[?].rewardGold.
//    Example shape (yours can differ):
//    "Quest: Deliver the letter | Reward: 10g"

// 3) Update ONE quest's status THROUGH the array access path.
//    Example: quests[2].status = "active"
//    Then log that updated quest object.

`,
    },
  },
  entry: "/main.js",
  hints: [
    "An array of objects is a common shape for API-style data.",
    "Update via a path like: quests[index].status = 'complete'",
  ],
  tags: ["collections", "array-of-objects", "access-paths", "mutation", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
