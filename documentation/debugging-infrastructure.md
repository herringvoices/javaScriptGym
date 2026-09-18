# Debugging infrastructure v1

The preview keeps stable JavaScript source identities for each workspace, reports structured errors, and links their locations back to Monaco. No debugging handbook chapters are included in this change.

## Try the branch

Run `npm ci`, `npx playwright install chromium`, and `npm run dev`. Open `/tools/runtime-harness.html` on the dev server for a small acceptance workspace built with the real `HandbookWorkbench` component. This developer fixture is not included in the production build. Normal handbook, project, and challenge routes also use the new runner.

1. Click **Run**. Expect `TypeError: Try clicking this location` and `/helpers.js:3:9`.
2. Click the location. Expect helpers.js to open at line 3, column 9 with a temporary line highlight.
3. Expand **Stack trace**, then click the main.js caller. Expect line 3, column 15.
4. Edit a file. Expect a “Code changed since this run” notice and disabled old location links. Run again to refresh them.
5. Click Run again without editing. Expect the program to execute again and a fresh console.
6. In desktop Chrome, open DevTools → Sources. Enable JavaScript source maps (the default), use Ctrl+P to find helpers.js, and select the authored source under `student`. The readable folders below it identify the handbook/project/challenge. Ignore `generated`, which contains rewritten execution sources, and `jsgym-internal`, which contains runner helpers.
7. Place a breakpoint on helpers.js line 2, then Run again. Inspect `value`, step over, inspect `doubled`, and resume. A second unchanged Run should hit the same breakpoint. Remove the throw to let the program finish.
8. Repeat a location click with the editor hidden or with the mobile Editor section collapsed. It should reopen. Check `/challenge/JS.AS.FET-004` with a completed fetch implementation to confirm mock data and preview behavior.

Chrome's [source-map documentation](https://developer.chrome.com/docs/devtools/javascript/source-maps) describes the authored/generated source distinction. The browser suite uses the [Debugger protocol](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/) to verify breakpoint pause, local inspection, step into/over/out, resume, and breakpoint reuse across reruns.

## Execution and source mapping

`buildSrcDoc` still builds a sandboxed iframe document. Student scripts load as external data URL resources, with stable workspace-specific `sourceURL` names and inline source maps containing the original student text. DevTools groups authored files below `student/<kind>/<standard>/<workspace>` and rewritten execution files below `generated/<kind>/<standard>/<workspace>`. The same loader handles JS entry files, HTML script references, and dependencies. Untyped HTML scripts now follow normal browser classic-script semantics; use `type="module"` for imports and exports.

Acorn identifies static imports, re-exports, and dynamic import expressions. Relative and root virtual paths resolve through one import map; extensionless `.js` references are supported. Filename-only aliases across unrelated folders are not created. Computed imports resolve relative to their containing virtual file. MagicString maps rewritten import columns back to the original text. Parse5 provides exact HTML script ranges; extracted inline scripts map back to their original HTML lines and columns.

The globals bridge and fetch mock execute once, before student scripts. The adapter no longer prepends helper imports or script tags to starter code. Legacy saved workspaces containing those injected references still load without executing the helpers twice.

`createRuntimeProtocol` is shared with the iframe. It maps only registered source identities and parses V8 and Firefox/WebKit stack shapes. Error payloads contain `name`, `message`, raw `stack`, parsed `frames`, and a mapped `loc` with one-based `file`, `line`, and optional `column`. Unknown locations remain null. Browser syntax errors without stacks can use the native ErrorEvent filename/line/column.

Each Run creates a fresh ID, source snapshot, and iframe document. Console messages carry `source: 'sandbox-console'`, `version: 1`, `runId`, `type`, `args`, `error`, and `loc`. The parent accepts messages only from its current iframe and run. Console state lives outside the visible panel so panel mounting cannot lose early messages. At most 1,000 rows are retained. Source edits, additions, deletions, and renames invalidate navigation until code matches the run snapshot or the user runs again.

## Validation

- `npm test`: Node tests, including stack parsing and current-frame/current-run filtering.
- `npm run test:browser`: Chromium runtime fixtures and real workbench/challenge interactions.
- `npm run lint` and `npm run build`: repository checks.
- `npm run test:production` after building: actual challenge routes against the minified production app, including mock fetch. This guards serialization of the embedded bridge functions.

CI runs all of these checks. Playwright traces are retained for failed browser tests.

## Boundaries

Chromium is the tested debugger target. Other browser stack formats are unit-tested, but Firefox and Safari breakpoint behavior is not verified. Raw browser stacks remain available for diagnosis; unregistered external scripts and HTML event-handler attributes can have unknown locations. Rejections of primitive values have no stack to map. Syntax errors may have a location without a full stack.

Data URLs remain the execution transport. This does not create a general preview web server or implement arbitrary assets, package resolution, `new URL(..., import.meta.url)` asset loading, or a debugger inside Monaco. Inline HTML scripts are extracted into script resources; the original DOM script text and `document.currentScript.src` therefore differ from standalone HTML. Their authored source maps and Monaco locations use the original HTML.
