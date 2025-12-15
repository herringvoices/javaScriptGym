import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.VDT.COL-queue-controls-001",
  title: "Queue Controls",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.VDT.COL", ],
  primaryStandard: "JS.VDT.COL",
  prerequisiteStandards: ["JS.VDT.PRM"],
  difficulty: 2,
  description: `Practice adding/removing at the ends of an array.
Use push/pop/unshift/shift and track what changed.
 `.trim(),
  userStories: [
    "I can add to the end of an array and see length change.",
    "I can remove from the end and store what was removed.",
    "I can add/remove at the front and confirm the new first item.",
  ],
  acceptanceCriteria: [
    "Start with the provided queue array.",
    "Use push to add ONE new item to the end, and log queue.length before and after.",
    "Use pop to remove the last item and store it in removedFromEnd, then log removedFromEnd.",
    "Use shift to remove the first item and store it in removedFromFront, then log removedFromFront.",
    "Use unshift to add ONE item back to the front, then log queue[0].",
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": {
      code: `// TODO: Use end-controls to manage a queue.
// No loops. Just a few moves and a few logs.

const queue = ["ticket-101", "ticket-102", "ticket-103"];

// 1) Log queue.length
// 2) push ONE new ticket to the end, then log queue.length again

// 3) pop the last ticket into removedFromEnd, then log removedFromEnd

// 4) shift the first ticket into removedFromFront, then log removedFromFront

// 5) unshift ONE ticket to the front (it can be a new string or one you removed)
//    then log queue[0] to confirm what is at the front now

`,
    },
  },
  entry: "/main.js",
  hints: [
    "push adds to the end; pop removes from the end (and returns it).",
    "unshift adds to the front; shift removes from the front (and returns it).",
  ],
  tags: ["collections", "arrays", "push", "pop", "shift", "unshift", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
