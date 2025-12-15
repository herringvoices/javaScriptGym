<details>
<summary><strong>Table of contents</strong></summary>

- [Overview](#overview)
- [Key features](#key-features)
- [Prerequisites](#prerequisites)
- [Quick start](#quick-start)
- [Available scripts](#available-scripts)
- [Project tour](#project-tour)
- [Authoring challenges](#authoring-challenges)
- [Authoring handbook chapters](#authoring-handbook-chapters)
- [Mastery, persistence, and state](#mastery-persistence-and-state)
- [Mocked APIs](#mocked-apis)
- [Reference docs](#reference-docs)
- [Troubleshooting](#troubleshooting)

</details>

# javaScriptGym

## Overview

JavaScript Gym is a front-end practice environment that pairs a searchable challenge catalog with an MDX-powered handbook and a Monaco-based playground. It is designed so instructors can author new material quickly while learners experiment in a full-featured browser sandbox.

## Key features

- Challenge library sorted and filtered by JavaScript standards with optional mastery gating.
- Monaco workspace with live preview, console capture, and per-challenge file persistence.
- MDX handbook that mixes Markdown, React components, and syntax-highlighted code examples.
- Offline-capable mock API layer for project-style challenges that need a backend surface.
- Content-first authoring workflow with reference guides and reusable UI primitives.

## Prerequisites

- Node.js 18+ (includes npm 9+). Using the active LTS release is recommended.

## Quick start

```bash
npm install
npm run dev
```

- The dev server runs over HTTP. Configure Vite's `server.https` if you need HTTPS locally.
- Vite will print the local URL (default `http://localhost:5173`) after compiling.

## Available scripts

- `npm run dev` — start the Vite development server.
- `npm run build` — build the production bundle.
- `npm run preview` — preview the production build locally.
- `npm run lint` — run ESLint across the project.

## Project tour

- `src/routes/router.jsx` — central route definitions for challenges, handbook, and projects.
- `src/pages/` — top-level screens for challenge lists, challenge detail, handbook, and projects.
- `src/components/` — reusable UI (Monaco workspace, console panel, filters, modals, etc.).
- `src/data/` — standards metadata, challenge manifests, and per-challenge configuration files.
- `src/handbook/` — MDX chapters, manifest, provider, and per-standard metadata stubs.
- `src/lib/` — supporting utilities (sandbox builder, mastery helpers, storage adapters, etc.).
- `Reference Docs/` — authoring guides, standards, and difficulty reference material.

## Authoring challenges

Challenges are auto-discovered from `src/data/challenges/<PRIMARY_STANDARD>/<ID>.js`.

1. Create a zero-padded filename (`JS.PF.CON-001.js`) so lexical sort stays chronological.
2. Export a default `challenge` object. Required fields: `id`, `title`, `description`, `standards`, `primaryStandard`, `difficulty`, and `files`.
3. Match `challenge.id` to the filename and include the primary standard as the first entry in `standards`.
4. Use the difficulty matrix in `Reference Docs/Challenge Difficulties.md` for the `difficulty` value (`1`–`5`).
5. (Optional) Add metadata: `template`, `entry`, `tags`, `hints`, `mock`, `sandbox`, or `related`.
6. Visit `/challenge/<id>` to review the new challenge in the playground.

Example skeleton:

```js
const challenge = {
  id: 'JS.PF.CON-001',
  title: 'Branching Basics',
  description: 'Practice if/else conditionals with multi-branch logic.',
  difficulty: 1,
  standards: ['JS.PF.CON', 'JS.VDT.PRM'],
  primaryStandard: 'JS.PF.CON',
  files: [/* ... */],
  sandbox: {
    defaultPanel: 'console',
    showRightPanel: true,
    showExplorer: true,
  },
};

export default challenge;
```

See `Reference Docs/Challenge Writing Guide.md` for naming conventions, recommended prompts, and detailed file examples.

## Authoring handbook chapters

Handbook chapters live in MDX so you can mix Markdown with React components.

1. Add a file such as `src/handbook/JS.PF.CON.mdx` with frontmatter:

   ```mdx
   ---
   id: JS.PF.CON
   title: Program Flow · Conditionals
   short: Branch logic with if/else and switch statements.
   ---

   ### Why it matters
   Content...
   ```

2. Register the chapter in `src/handbook/manifest.js`:

   ```js
   export const handbookChapters = {
     overview: () => import('./overview.mdx'),
     'JS.PF.CON': () => import('./JS.PF.CON.mdx'),
   };
   ```

3. (Optional) Append the id to `handbookOrder` to customize navigation ordering.
4. Ensure the standard metadata exists in `src/data/standards.js` so the navigation can preload titles and summaries.

Shared shortcodes are defined in `src/handbook/MDXProvider.jsx` (`<Note>`, `<Tip>`, etc.). Extend that provider to add new reusable components.

## Mastery, persistence, and state

- Mastery order is defined in `src/data/standards.js` under `standardOrder`. Respecting the order hides locked challenges until prerequisites are marked complete.
- The “Standards I Know” modal updates mastery progress stored in `localStorage` under `practiceTool.masteredStandards` (see `src/lib/mastery.js`).
- Challenge progress and file edits persist per id in `localStorage` (`playground:<challengeId>:files`, `completedChallenges`).
- Resetting files from the UI clears local edits and mock data for the active challenge.

## Mocked APIs

Challenges tagged with `mock-fetch` receive a mocked `fetch` implementation defined in `src/runner/fetchMock.js`.

- Default endpoints cover `/api/products` with GET/POST/PUT/PATCH/DELETE handlers and fuzzy query support.
- Seed data, latency, and chaos toggles are wired through `src/lib/sandpackAdapter.js` when a challenge loads.
- Extend `fetchMock.js` to add new resources or behavior. Persisted mock state is keyed by challenge id.

## Reference docs

- `Reference Docs/Standards.md` — canonical standard codes and descriptions.
- `Reference Docs/Challenge Difficulties.md` — difficulty matrix and learner guidance.
- `Reference Docs/Challenge Writing Guide.md` — end-to-end instructions for scenario design and fetch mocking.
- `Reference Docs/landers-zoo/` — sample project walkthrough with step-by-step authoring notes.

## Troubleshooting

- Challenge missing from the catalog? Ensure the file lives under `src/data/challenges/**`, exports `export default challenge`, and the `id` matches the filename.
- Challenge shows but the workspace is blank? Confirm the `entry` file exists, at least one file is marked `active`, and `primaryStandard` is present in `standards`.
- Fetch mocks not responding? Verify the `mock-fetch` tag is present and the requested path matches a handler in `src/runner/fetchMock.js`.

With this foundation you can focus on writing great exercises and reference material while learners build muscle memory inside the sandbox.
