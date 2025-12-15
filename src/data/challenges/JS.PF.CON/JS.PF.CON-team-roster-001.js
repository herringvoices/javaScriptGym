import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.PF.CON-team-roster-001",
  title: "Team Roster",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.PF.CON",],
  primaryStandard: "JS.PF.CON",
  prerequisiteStandards: ["JS.VDT.PRM", "JS.VDT.COL"],
  difficulty: 2,
  description: `Use an object to hold a roster (array of player objects).
Practice nested access like team.players[1].name.
 `.trim(),
  userStories: [
    "I can nest an array inside an object to represent grouped data.",
    "I can access nested values with a multi-step path.",
  ],
  acceptanceCriteria: [
    "Log ONE line that uses a nested access path and then update one nested value and log it.",
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// TODO: Build a team object with a roster (nested collections).

const playerA = { name: "Ari", role: "Support", rating: 8 };
const playerB = { name: "Nick", role: "Captain", rating: 9 };
const playerC = { name: "Dexter", role: "Mascot", rating: 11 };

// 1) Create ONE object named team with:
//    - teamName (string)
//    - players (array of objects)
//
// 2) Put playerA, playerB, playerC into team.players.
//
// 3) Log ONE line using a nested path.
//    Example shape (yours can differ):
//    "Captain: Nick (rating 9)"
//
// 4) Update ONE nested value through a path (ex: team.players[0].rating = 10),
//    then log the updated value.

`,
    },
  },
  entry: "/main.js",
  hints: [],
  tags: ["collections", "objects", "arrays", "nested-access", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
