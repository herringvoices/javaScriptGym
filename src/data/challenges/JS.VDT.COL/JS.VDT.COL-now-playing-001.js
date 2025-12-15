import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.VDT.COL-now-playing-001",
  title: "Now Playing Card",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.VDT.COL", "JS.VDT.COL"],
  primaryStandard: "JS.VDT.COL",
  prerequisiteStandards: ["JS.VDT.PRM"],
  difficulty: 1,
  description: `Bundle track details into ONE object.
Read fields with dot notation and update one value.
 `.trim(),
  userStories: [
    "I can bundle related values into one object.",
    "I can read object fields to build a console message.",
    "I can update one field and prove it changed.",
  ],
  acceptanceCriteria: [
    "Create ONE object named nowPlaying with at least: title, artist, durationSeconds, isExplicit.",
    "Log ONE status line that uses at least three nowPlaying fields.",
    "Update ONE field (like durationSeconds or isExplicit) using dot notation, then log the updated value.",
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// TODO: Make a "Now Playing" object and print a status line.

// You start with scattered fields:
const title = "Midnight City";
const artist = "M83";
const durationSeconds = 244;
const isExplicit = false;

// 1) Create ONE object named nowPlaying that bundles these values.
//    Required keys: title, artist, durationSeconds, isExplicit

// 2) Log ONE status line using dot notation.
//    Example shape (yours can differ):
//    "Now Playing: Midnight City - M83 (244s) | Explicit: false"

// 3) Update ONE field with dot notation (pick one),
//    then log something that proves it changed.

`,
    },
  },
  entry: "/main.js",
  hints: [
    "Objects bundle related key-value pairs for ONE thing.",
    "Dot notation looks like: nowPlaying.title",
  ],
  tags: ["collections", "objects", "dot-notation", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
