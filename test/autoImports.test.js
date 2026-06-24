import test from "node:test";
import assert from "node:assert/strict";
import { buildAutoImportSuggestions, extractNamedExports, relativeImportPath } from "../src/lib/autoImports.js";

test("discovers supported named export forms", () => {
  assert.deepEqual(extractNamedExports("export const name = 'gym'; export function run() {} export class User {} export { helper }; export default nope; export { remote } from './remote.js';").map((item) => item.name), ["name", "run", "User", "helper"]);
});

test("builds visible cross-file suggestions with relative import edits", () => {
  const suggestions = buildAutoImportSuggestions({
    activePath: "/src/main.js",
    code: "import { existing } from './existing.js';\n\nrun",
    files: {
      "/src/main.js": { code: "run" },
      "/src/helpers.js": { code: "export function run() {}\nexport const count = 1;" },
      "/hidden.js": { code: "export const hidden = true;", hidden: true },
      "/styles.css": { code: "export const nope = true;" },
    },
  });
  assert.deepEqual(suggestions.map((item) => item.name), ["count", "run"]);
  assert.equal(suggestions[1].importText, 'import { run } from "./helpers.js";\n');
  assert.equal(suggestions[1].importOffset, 42);
});

test("does not offer names already imported and handles parent relative paths", () => {
  const suggestions = buildAutoImportSuggestions({
    activePath: "/src/pages/main.js",
    code: "import { helper } from '../helper.js';\nhelper",
    files: { "/src/helper.js": { code: "export const helper = 1; export const other = 2;" } },
  });
  assert.deepEqual(suggestions.map((item) => item.name), ["other"]);
  assert.equal(relativeImportPath("/src/pages/main.js", "/src/helper.js"), "../helper.js");
});
