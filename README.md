# Front-End Practice Playground

This project scaffolds a front-end practice environment with routing, an MDX-powered handbook, and Sandpack playgrounds ready for future challenges.

## Getting started

Prereqs:
- Node.js 18+ and npm 9+ recommended
- The dev server runs over HTTPS using a local certificate (via `vite-plugin-mkcert`). On first run you may be prompted to trust a local CA.

```bash
npm install
npm run dev
```

Notes on HTTPS in dev:
- If your browser shows a certificate warning, complete the trust flow for the local CA and reload.
- If mkcert cannot install certificates automatically, install mkcert for your OS and re-run the dev server.
 - mkcert is used only in development; production deployments rely on your host/CDN's TLS (e.g., Vercel/Netlify/Cloudflare) or real CA certificates.

## Adding a challenge

Challenges are auto‑discovered from files under `src/data/challenges/**`.

1. Create a file at `src/data/challenges/<PRIMARY_STANDARD>/<ID>.js` (e.g., `src/data/challenges/JS.PF.CON/JS.PF.CON-001.js`). Name with zero‑padded numbers so sorting is stable (`-001`, `-010`, `-101`).
2. Export a default `challenge` object with `id`, `title`, `description`, `standards`, `primaryStandard`, and Sandpack `files`. Ensure `challenge.id` matches the filename.
3. Set `difficulty` to a single integer `1`–`5` (see the Difficulty Matrix in `Reference Docs/Challenge Difficulties.md`).
4. Include valid standard codes from `src/data/standards.js` (see also `Reference Docs/Standards.md`). Put the primary first in the `standards` array.
5. (Optional) Add Sandpack metadata such as `template`, `entry`, `tags`, `hints`, and `mock`.
6. (Optional) Provide a `sandbox` config to influence initial UI layout:
	 ```js
	 sandbox: {
		 defaultPanel: 'console',      // 'preview' | 'console'
		 showRightPanel: false,        // hide preview/console panel initially
		 showExplorer: true            // show file tree initially (default true)
	 }
	 ```
7. Visit `/challenge/<id>` to load the challenge with the Sandpack workspace.

For full authoring guidance (IDs, folder layout, beginner‑friendly prompt tips, and fetch mocking), see `Reference Docs/Challenge Writing Guide.md`.

## Adding a handbook chapter (MDX)

Handbook content now lives in MDX so you can mix Markdown and React components.

1. Create a new file at `src/handbook/<STANDARD_ID>.mdx` with frontmatter:
	```mdx
	---
	id: JS.PF.CON
	title: Program Flow · Conditionals
	short: Branch logic with if/else and switch statements.
	---

	### Why it matters
	Content...
	```
2. Add an entry to the manifest in `src/handbook/manifest.js`:
	```js
	export const handbookChapters = {
	  overview: () => import('./overview.mdx'),
	  'JS.PF.CON': () => import('./JS.PF.CON.mdx'),
	};
	```
3. (Optional) Append the id to `handbookOrder` if you want to control order separately from `standardOrder`.
4. Ensure a metadata stub (id, title, short) exists in `src/data/standards.js` so navigation can show it while the MDX lazy‑loads.

You can use the shared shortcodes/components provided by the MDX provider (see `src/handbook/MDXProvider.jsx`). Current examples: `<Note>` and `<Tip>`. Add more by editing that provider.

## Project structure highlights

- `src/routes/router.jsx` wires up the main routes.
- `src/pages` contains the list and detail views for challenges and the handbook page.
- `src/handbook` handles MDX rendering and standard metadata.
- `src/components` provides reusable UI primitives, including Sandpack wrappers.
- `src/lib` contains adapters/utilities (Sandpack adapter, storage, mastery, etc.).
- `src/data` contains standards metadata and per‑challenge files under `src/data/challenges/**`.

## Mastery & unlocking

Challenges can be filtered and optionally gated by a linear mastery order defined in `src/data/standards.js` (see `standardOrder`).

- “Standards I Know” opens a modal to mark standards as mastered.
- “Respect mastery order” filters the list to show only challenges whose primary standard is unlocked (completed challenges are always shown).
- “Show locked” reveals gated items when the order is respected.

Mastery state persists in `localStorage` under `practiceTool.masteredStandards` (see `src/lib/mastery.js`).

## Local persistence

- User file edits persist per‑challenge: `localStorage` key `playground:<challengeId>:files`.
- Completed challenge ids persist under `completedChallenges`.
- Mock API DB state (when using `mock-fetch`) persists per challenge id and resets when you click “Reset files”.

## Scripts

- `npm run dev` — Start the Vite dev server (HTTPS, trusted locally via mkcert).
- `npm run build` — Build the production bundle.
- `npm run preview` — Preview the production build locally.
- `npm run lint` — Run ESLint on the project.

## Troubleshooting

- Challenge not showing?
	- File path must be under `src/data/challenges/**` and export `export default challenge`.
	- `challenge.id` must match the filename and be unique.
	- `primaryStandard` must exist in `src/data/standards.js` and appear in `standards`.
- Blank preview or console output?
	- Check `entry` in the challenge points to an existing file and at least one file is `active` and visible.
- HTTPS warnings in dev?
	- Trust the local CA installed by mkcert, or install mkcert manually and restart the dev server.

With this skeleton in place, you can focus on authoring challenges and handbook chapters without additional setup.

## Offline Sandpack bundler (local vs remote)

We vendor a built copy of Sandpack's bundler under `public/sandpack/` (it must contain `frame.html`, worker chunks, and related assets). A small runtime settings file toggles whether the app uses those local assets or Sandpack's default remote bundler.

### Runtime settings

`public/settings.js` (loaded before the app) defines:

```js
window.APP_SETTINGS = {
  useLocalBundler: false, // hosted/prod default: rely on Sandpack's remote bundler
  bundlerURL: "/sandpack/" // absolute path to vendored bundler when enabled
};
```

Flip to offline mode (e.g. classroom machines without internet) by overwriting the file:

```bash
cat > public/settings.js <<'EOF'
window.APP_SETTINGS = { useLocalBundler: true, bundlerURL: "/sandpack/" };
EOF
```

Because `public/sandpack/` is committed, students only need `npm install && npm run dev`.

### Refreshing vendored assets

1. Clone and build the bundler:
	```bash
	git clone https://github.com/codesandbox/sandpack-bundler.git tools/sandpack-bundler
	cd tools/sandpack-bundler
	yarn && yarn build
	```
2. Copy the build output (adjust if build folder differs):
	```bash
	rsync -a --delete dist/ ../../public/sandpack/
	```
3. Commit updated `public/sandpack/` contents.

### Verification

Run `npm run dev` and open a sandbox page. In DevTools → Network you should see requests to `/sandpack/frame.html` when `useLocalBundler: true`. Hosted builds (with `useLocalBundler: false`) will omit those and talk to the remote bundler.

### Notes

* Keep `bundlerURL` absolute (`/sandpack/`) so route changes don't break asset paths.
* If repository size becomes large, consider Git LFS or a separate package for the bundler assets; the runtime toggle still works.
* In development (`vite`), if `settings.js` is missing we default to using the local bundler for convenience.

## Automated completion tests (removed)

Earlier iterations supported an optional `completion` block on each challenge that executed predicate code inside the sandbox to auto‑grade a solution. This repository has been simplified: those blocks were removed and the runner now returns a neutral result when no completion rule is present. Practical implications:

- Challenge objects no longer include a `completion` property.
- The iframe runner responds with `{ passed: null, message: null }` for completion checks; UI should treat this as “no automated check”.
- Authoring a challenge now only requires: metadata, `files`, and (optionally) user stories / acceptance criteria / hints.

If you ever want to restore lightweight checks, you can reintroduce a `completion` object with `{ kind: 'predicate', code: '...' }` and the existing runner logic will execute it.

For purely exploratory practice, this keeps the experience focused on manual testing in the preview and console.

## Sandbox UI preferences

Challenges can optionally define a `sandbox` property to tailor the initial playground experience:

```js
/** @type {Challenge} */
const challenge = {
	// ...other fields...
	sandbox: {
		defaultPanel: 'preview',   // Which right panel tab is initially active.
		showRightPanel: true,      // If false, the preview/console column starts hidden and editor expands.
		showExplorer: true,        // If false, file tree starts collapsed for more editor space.
	}
};
```

All fields are optional; defaults are: `defaultPanel: 'preview'`, `showRightPanel: true`, `showExplorer: true`.

Author intent vs user toggles: once the page loads, the user can still toggle panels; the config only sets the starting state and resets when switching to a different challenge.

## Offline Fetch Mock

Add the `mock-fetch` tag to a challenge to inject a mocked `fetch` implementation (`/__mocks__/fetch.js`) that intercepts `fetch('/api/...')` calls and serves data from an in-memory DB persisted to `localStorage` per challenge id.

### Mocked endpoints

The default mock implements `/api/products` with:

* `GET /api/products` — list all products (supports `?q=` fuzzy name filter)
* `POST /api/products` — create `{ name, price }` (returns 201)
* `GET /api/products/:id`
* `PUT|PATCH /api/products/:id`
* `DELETE /api/products/:id`

Seed data and network behavior (latency, chaos) are injected via a bridge script when challenges are rendered (see `src/lib/sandpackAdapter.js`). Extend `src/runner/fetchMock.js` to add new resource collections.

### Persistence

User edits persist per challenge in `localStorage` under `playground:<challengeId>:files`. The mocked DB also persists (keyed by `__CHALLENGE_ID__`). Use the Reset button to restore starter files; clearing browser storage resets mocks.

### Extending

* Add new endpoints: expand `src/runner/fetchMock.js`.
* Add global seeds/chaos options when calling the adapter (`toSandpackFiles`).
# Editor upgrades (Sandpack)

We’ve upgraded Sandpack’s editor to feel closer to VS Code while keeping things light:

- VS Code-like theme via `@uiw/codemirror-theme-vscode`
- Smart editing: auto-close brackets and HTML tags, bracket matching, active-line highlight
- Basic autocomplete plus optional custom completions for common snippets

Where it’s wired:

- `src/lib/editorExtensions.js` exports `getDefaultEditorExtensions()` which bundles theme + extensions
- Used in both `ChallengePage.jsx` and `MiniSandpack.jsx` via the `extensions` prop on `SandpackCodeEditor`

Notes:

- This is still CodeMirror in Sandpack, not Monaco, so language-server IntelliSense is out of scope. If you need full VS Code features, consider replacing the editor with Monaco and bridging Sandpack files/state.
# javaScriptGym
