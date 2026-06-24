import test from "node:test";
import assert from "node:assert/strict";
import {
  createVirtualWorkspace,
  createWorkspaceFile,
  createWorkspaceFolder,
  deleteWorkspaceNode,
  parseWorkspaceSnapshot,
  renameWorkspaceNode,
  serializeVirtualWorkspace,
  updateWorkspaceFile,
} from "../src/lib/virtualWorkspace.js";

const seed = {
  "/index.html": { code: "<main />", readOnly: true },
  "/src/main.js": { code: "export const value = 1;" },
  "/__bridge__.js": { code: "bridge", hidden: true, readOnly: true },
};

test("legacy code snapshots migrate into seed overrides and visible user files", () => {
  const workspace = createVirtualWorkspace(seed, { "/src/main.js": { code: "changed" }, "/scratch.js": { code: "hello" } });
  assert.equal(workspace.files["/src/main.js"].code, "changed");
  assert.equal(workspace.files["/scratch.js"].origin, "user");
  assert.equal(workspace.files["/scratch.js"].hidden, false);
});

test("seed files remain structurally protected but editable seed files can be overridden", () => {
  let workspace = createVirtualWorkspace(seed);
  workspace = updateWorkspaceFile(workspace, "/src/main.js", "changed");
  assert.equal(workspace.files["/src/main.js"].code, "changed");
  assert.throws(() => deleteWorkspaceNode(workspace, "/src/main.js"));
  assert.throws(() => renameWorkspaceNode(workspace, "/src/main.js", "/renamed.js"));
  assert.equal(updateWorkspaceFile(workspace, "/index.html", "nope").files["/index.html"].code, "<main />");
});

test("user files and explicit empty folders persist and can be removed", () => {
  let workspace = createVirtualWorkspace(seed);
  workspace = createWorkspaceFolder(workspace, "/notes");
  workspace = createWorkspaceFile(workspace, "/notes/todo.js");
  workspace = updateWorkspaceFile(workspace, "/notes/todo.js", "export default [];");
  const saved = serializeVirtualWorkspace(workspace);
  assert.deepEqual(saved.folders, ["/notes"]);
  assert.equal(saved.userFiles["/notes/todo.js"].code, "export default [];");
  workspace = deleteWorkspaceNode(workspace, "/notes");
  assert.equal(workspace.files["/notes/todo.js"], undefined);
  assert.equal(workspace.folders.includes("/notes"), false);
});

test("user nodes can be renamed in place but cannot be moved", () => {
  let workspace = createVirtualWorkspace(seed);
  workspace = createWorkspaceFolder(workspace, "/notes");
  workspace = createWorkspaceFile(workspace, "/notes/todo.js");
  workspace = renameWorkspaceNode(workspace, "/notes/todo.js", "/notes/done.js");
  assert.ok(workspace.files["/notes/done.js"]);
  assert.throws(() => renameWorkspaceNode(workspace, "/notes/done.js", "/done.js"));
});

test("reserved and seed-containing paths cannot be structurally altered", () => {
  const workspace = createVirtualWorkspace(seed, { version: 1, overrides: {}, userFiles: {}, folders: ["/src"] });
  assert.throws(() => createWorkspaceFile(workspace, "/__mocks__/bad.js"));
  assert.throws(() => deleteWorkspaceNode(workspace, "/src"));
  assert.deepEqual(parseWorkspaceSnapshot({ version: 1, overrides: {}, userFiles: {}, folders: ["/empty"] }, seed).folders, ["/empty"]);
});
