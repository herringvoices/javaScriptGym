import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.PF.ITR-wire-tabs-001",
  title: "Wire Up Tabs",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.PF.ITR", "JS.SD.ELM", "JS.SD.EVH"],
  primaryStandard: "JS.PF.ITR",
  prerequisiteStandards: ["JS.VDT.PRM", "JS.SD.ELM", "JS.SD.EVH"],
  difficulty: 5,
  description: `Iterate a DOM collection (NodeList) and attach the same click handler to each tab.`.trim(),
  userStories: [
    "I can select multiple DOM elements with querySelectorAll.",
    "I can loop through them and attach event listeners.",
  ],
  acceptanceCriteria: [
    "Select all elements with the class .tab using querySelectorAll.",
    "Use a loop (for...of recommended) to attach a click listener to each tab.",
    "On click, log the clicked tab's dataset.view value.",
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/index.html": {
      code: `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Wire Up Tabs</title>
  </head>
  <body>
    <h1>Dashboard</h1>
    <button class="tab" data-view="overview">Overview</button>
    <button class="tab" data-view="reports">Reports</button>
    <button class="tab" data-view="settings">Settings</button>

    <p>Open the console, then click the tabs.</p>

    <script type="module" src="/main.js"></script>
  </body>
</html>
`,
    },
    "/main.js": {
      code: `// TODO: Attach a click listener to each tab using iteration.
//
// Requirements:
// - select all .tab buttons
// - loop them
// - addEventListener("click", ...)
// - on click: console.log(tab.dataset.view)

const tabs = document.querySelectorAll(".tab");

// Write your loop here.

`,
    },
  },
  entry: "/main.js",
  hints: ["dataset.view reads data-view.", "for...of works great with NodeLists."],
  tags: ["iteration", "dom", "querySelectorAll", "event-listeners", "for-of"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "preview" },
};

export default challenge;
