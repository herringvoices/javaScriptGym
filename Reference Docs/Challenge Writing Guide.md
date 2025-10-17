# Challenge Writing Guide

This guide explains how to author new practice challenges for the JavaScript Playground. It covers folder layout, the challenge object schema, writing prompts, seeding starter files, and optional fetch mocking.

Use this when adding new files under `src/data/challenges/**`.

---

## Where challenges live

- One challenge per file under: `src/data/challenges/<PRIMARY_STANDARD>/<ID>.js`
  - Example: `src/data/challenges/JS.PF.CON/JS.PF.CON-001.js`
- Challenges are auto-discovered at build time via `import.meta.glob` and sorted by `id`, so name IDs in a lexicographically sortable way (use 3-digit numbers like `-001`, `-010`, `-101`).
- The `id` string inside the file must match its filename.

Accepted standard IDs come from `src/data/standards.js` (see the file for the full list and order). Some common ones:
- JS.VDT.PRM (Primitives)
- JS.VDT.COL (Collections)
- JS.VDT.MTH (Methods & Properties)
- JS.FN.BAS (Functions – Basics)
- JS.FN.HOF (Higher-Order Functions)
- JS.PF.CON (Program Flow – Conditionals)
- JS.PF.ITR (Program Flow – Iteration)
- JS.AR.ACC (Arrays – Access & Updates)
- JS.AR.MTH (Arrays – Transform Methods)
- JS.SD.ELM / JS.SD.EVH / JS.SD.STA (State & DOM)
- JS.AS.PRO / JS.AS.AAW / JS.AS.FET / JS.AS.ERR (Async)
- JS.DA.* (Data & Applications)
- JS.MO.* (Modules & Organization)

---

## Challenge object schema

Import enums and export a default challenge object. Types are documented in `src/types/index.js`.

Minimal contract:
- Required
  - `id`: string (e.g., "JS.PF.CON-001")
  - `title`: short human title
  - `challengeType`: use `ChallengeTypes.CODE_AND_SEE` (the only supported type)
  - `standards`: array of standard IDs, first should include the primary
  - `primaryStandard`: the one standard used for unlocking/badges
  - `description`: Markdown string describing the prompt
  - `files`: Record<string, FileSpec> — the starter files shown in Sandpack
- Recommended
  - `difficulty`: choose a single value from 1–5 using the difficulty matrix (see “Challenge Difficulties.md”). Set the numeric `difficulty` field directly to that value.
  - `userStories`: bullet-point stories the learner can read
  - `acceptanceCriteria`: concrete rules to guide solutions
  - `hints`: array of strings
  - `tags`: keywords like "DOM", "arrays", "primitives"
  - `sandbox`: UI prefs for the runner
- Optional
  - `template`: "vanilla" | "react" | "static" (default `vanilla`)
  - `entry`: the file the app should load first (default: `/src/index.js`)
  - `mock`: `{ apiSeed?: any, mockNet?: any }` metadata for fetch mock

Notes for authors:
- Do not set `isCompleted` — it’s derived in the UI from local storage.
- Test harnesses are deprecated; we only support “code and see” style challenges.

FileSpec (starter file) fields:
- `code`: string (required)
- `readOnly`: boolean (optional) — lock a file from edits
- `hidden`: boolean (optional) — keep a file present but out of the tree
- `active`: boolean (optional) — which file opens first in the editor

Sandbox prefs (`challenge.sandbox`):
- `defaultPanel`: "preview" | "console" — which right panel to show
- `showRightPanel`: boolean — whether the preview/console panel is visible
- `showExplorer`: boolean — whether file tree starts open

---

## Authoring checklist

Before committing a challenge, verify:
- ID/filename
  - File is placed under the folder named after `primaryStandard`.
  - `challenge.id` matches the filename and uses zero-padded numbering.
- Standards & unlocking
  - `primaryStandard` exists in `src/data/standards.js`.
  - Include that ID in `standards` (first position recommended).
- Prompt quality
  - `title` is concise and specific.
  - `description` is Markdown, action-oriented, and trimmed.
  - Provide `userStories` and `acceptanceCriteria` for clarity whenever useful.
  - Add 1–3 `hints` if the challenge has a common pitfall.
  - Language is beginner‑friendly: avoid unexplained jargon, prefer short sentences, define new terms inline.
  - Frame the task in a familiar web‑dev context (e.g., update a list, filter search results, submit a form, basic CRUD with fetch).
- Starter and entry
  - `files` run in Sandpack; mark non-editable scaffolding as `readOnly`.
  - Set an `active: true` file that learners should start in.
  - If the app boots from HTML, set `entry: "/index.html"`; for JS only, `entry: "/main.js"` (or similar).
- Difficulty & tags
  - Choose a single difficulty from the 1–5 matrix and set that exact value in the `difficulty` field. Do not include ranges in files or tags.
- Fetch mocking (only if needed)
  - If your code calls `fetch` to `/api/...`, add tag "mock-fetch".
  - Optionally set `mock.apiSeed` (initial DB) and `mock.mockNet` (latency/failure).
- UX defaults
  - For DOM/preview work, prefer `sandbox.defaultPanel = "preview"`.
  - For console-only work, prefer `sandbox.defaultPanel = "console"` and `showRightPanel: true`.

---

## Fetch mocking (opt-in)

If a challenge uses `fetch("/api/...")`:
- Add "mock-fetch" to `tags`.
- Optionally include `mock: { apiSeed, mockNet }`.
  - `apiSeed`: object used as the initial in-memory DB (persisted per challenge)
  - `mockNet`: network behavior: `{ slowMs?: number, failOnFirst?: boolean, everyN?: number }`

How it works:
- The runner injects "/__mocks__/fetch.js" automatically when `tags` includes "mock-fetch".
- It intercepts `/api/...` requests and serves from localStorage-backed in-memory DB.
- The “Reset files” button also resets the mock DB for the current challenge.
- For HTML entries, the adapter adds script tags; for JS entries, it prepends imports. You don’t need to wire it manually.

Keep routes simple (e.g., `/api/products`, `/api/products/:id`). See `src/runner/fetchMock.js` for behavior.

---

## Good prompts: guidance

- Make the task observable: the learner should see success in the preview or console with minimal guesswork.
- Use real-world flavor text sparingly, then list concrete tasks.
- Prefer early, small wins (start from a working page with a clear TODO zone).
- Keep starter code minimal. Avoid deep abstractions or heavy CSS unrelated to the learning goal.
- Include exact output strings when verification matters.

Beginner-friendly language:
- Prefer plain language and short sentences. Define any new term where it first appears.
- Avoid unexplained jargon and acronyms (e.g., say “make a copy of the array” instead of “clone immutably”).
- Show the exact string/selector/shape when precision matters.
- Use consistent naming between prompt, starter code, and expected output.

Grounding in real web‑dev contexts:
- Frame tasks around common UI/data flows: rendering lists, filtering items, form inputs and validation, showing/hiding messages, basic CRUD via fetch.
- Use realistic data shapes (arrays of objects with id/name/price, etc.).
- Connect actions to visible outcomes (text updates, list changes, button states) to reinforce learning.

Recommended sections:
- Description (Markdown)
- User Stories (bulleted)
- Acceptance Criteria (bulleted)
- Hints (1–3 items)

Difficulty scale (source of truth):
- 1 = foundational
- 2 = basic application
- 3 = multi‑step use
- 4 = integration/nuance
- 5 = capstone‑level synthesis

Note: The Difficulty Matrix shows where challenges for each standard may land, but each challenge must pick one difficulty.

## Difficulty: how to assign (1–5)

See `Reference Docs/Challenge Difficulties.md` for the standard-by-standard guidance. That document is the source of truth for challenge difficulty. Pick one difficulty value from 1–5 per challenge.

Tip: Keep the `difficulty` number conservative to avoid hiding advanced‑but‑accessible prompts from learners filtering at lower levels.

---

## Templates and entries

- `template: "vanilla"` (default): plain JS, HTML, CSS.
- `template: "react"`: React/JSX supported (only add React if the concept needs it).
- `template: "static"`: static HTML/CSS only (rare; usually still include a `/main.js`).

Entries:
- HTML-driven UI: set `entry` to the HTML file (e.g., `/index.html`).
- Console-only tasks: set `entry` to the JS file (e.g., `/main.js`) and show the console panel.

---

## Example: simple primitives challenge

```js
import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.VDT.PRM-011",
  title: "Four Primitive Declarations",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.VDT.PRM"],
  primaryStandard: "JS.VDT.PRM",
  difficulty: 1,
  description: `
Declare four primitive values (two strings, one number, one boolean) and log them.
Keep it simple—just declarations plus logging.
  `.trim(),
  userStories: [
    "I see variables for firstName, lastName, age, isHungry.",
    "Each variable logs to the console.",
  ],
  acceptanceCriteria: [
    "Use primitive literals (no quotes around numbers/booleans).",
    "Prefer const if you won't reassign.",
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/main.js": { active: true, code: `// TODO: declare and log values\n` },
  },
  entry: "/main.js",
  hints: ["Booleans are lowercase: true or false."],
  tags: ["primitives", "console"],
  sandbox: { showExplorer: false, showRightPanel: true, defaultPanel: "console" },
};

export default challenge;
```

---

## Example: DOM + conditionals (HTML entry)

```js
import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.PF.CON-099",
  title: "Age Gate",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.PF.CON"],
  primaryStandard: "JS.PF.CON",
  difficulty: 2,
  description: `Enter an age and show one of two exact messages based on >= 18.`,
  userStories: ["Entering an age and clicking Check shows exactly one message."],
  acceptanceCriteria: ["Use if/else and numeric comparison.", "Coerce input to a number."],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/index.html": {
      readOnly: true,
      code: `<!doctype html>\n<html><body>\n<label>Age: <input id=age type=number min=0></label>\n<button id=check>Check</button>\n<p id=result></p>\n<script type=module src=/main.js></script>\n</body></html>`
    },
    "/main.js": {
      active: true,
      code: `function ageMessage(age){\n  // TODO: return one of two exact strings\n}\n\ncheck.addEventListener('click', () => {\n  const age = Number(document.querySelector('#age').value);\n  result.textContent = ageMessage(age);\n});\n`
    }
  },
  entry: "/index.html",
  tags: ["DOM", "if-else"],
  sandbox: { defaultPanel: "preview", showExplorer: true, showRightPanel: true },
};

export default challenge;
```

---

## Example: fetch with mock API

```js
import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "JS.AS.FET-050",
  title: "List Products from API",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["JS.AS.FET"],
  primaryStandard: "JS.AS.FET",
  difficulty: 3,
  description: `Fetch and render products. Show a loading message and handle errors.`,
  template: ChallengeTemplates.VANILLA,
  tags: ["mock-fetch", "fetch", "DOM"],
  mock: {
    apiSeed: { products: [ { id: 1, name: "Choco Bar", price: 2.5 } ] },
    mockNet: { slowMs: 300, failOnFirst: false }
  },
  files: {
    "/index.html": { readOnly: true, code: `<!doctype html>\n<html><body>\n<h1>Products</h1>\n<ul id=list></ul>\n<script type=module src=/main.js></script>\n</body></html>` },
    "/main.js": { active: true, code: `const list = document.querySelector('#list');\nlist.textContent = 'Loading…';\nfetch('/api/products')\n  .then(r => r.json())\n  .then(rows => {\n    list.textContent = '';\n    rows.forEach(p => {\n      const li = document.createElement('li');\n      li.textContent = p.name + ' — $' + p.price.toFixed(2);\n      list.appendChild(li);\n    });\n  })\n  .catch(() => { list.textContent = 'Failed to load products.'; });\n` }
  },
  entry: "/index.html",
  sandbox: { defaultPanel: "preview", showRightPanel: true, showExplorer: true },
};

export default challenge;
```

Notes:
- Adding the "mock-fetch" tag injects the mock automatically; do not import it manually.
- Resetting files also clears the per-challenge mock DB.

---

## Tips for great challenges

- Align to one primary standard; avoid mixing multiple top-level goals in a single prompt.
- Use realistic naming and data shapes (arrays of objects, simple services).
- Keep CSS minimal; prefer readability over visual polish.
- Guide with examples, not solutions. Leave obvious TODOs and function stubs.
- Make success visible (text in the page, or clear console output).

---

## Troubleshooting

- Challenge not showing up?
  - Ensure file path is `src/data/challenges/**` and default export exists.
  - Verify `export default challenge;` is present.
  - Check `id` uniqueness and lexicographic sort (zero-pad numbers).
  - Confirm `primaryStandard` exists in `src/data/standards.js`.
- Preview blank or console empty?
  - Verify `entry` points to an existing file.
  - Ensure at least one visible file has valid code and one file is `active`.
- Fetch errors?
  - Use `/api/...` paths. Add "mock-fetch" to `tags` and set `mock.apiSeed`.
  - Open the console to see any thrown errors.

---

## References

- Standards catalog: `src/data/standards.js` (and `Reference Docs/Standards.md`)
- Types: `src/types/index.js`
- Adapter that builds the Sandpack files: `src/lib/sandpackAdapter.js`
- Mock fetch implementation: `src/runner/fetchMock.js`

---

## Template snippet

Use this skeleton when adding a new challenge file:

```js
import { ChallengeTemplates, ChallengeTypes } from "../../../types";

/** @type {import("../../../types").Challenge} */
const challenge = {
  id: "STANDARD.CODE-###",
  title: "Descriptive Title",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: ["STANDARD.CODE"],
  primaryStandard: "STANDARD.CODE",
  difficulty: 1,
  description: `Short markdown description.`,
  userStories: ["Story 1"],
  acceptanceCriteria: ["Rule 1"],
  template: ChallengeTemplates.VANILLA,
  files: { "/main.js": { active: true, code: `// starter` } },
  entry: "/main.js",
  hints: ["Helpful tip"],
  tags: ["keyword"],
  sandbox: { defaultPanel: "console", showRightPanel: true, showExplorer: false },
  // mock: { apiSeed: {...}, mockNet: { slowMs: 0 } }, // only if using /api/ fetch
};

export default challenge;
```

Happy writing!
