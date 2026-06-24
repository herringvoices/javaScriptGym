import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export function normalizeWorkspacePath(value) {
  const parts = String(value || "").replace(/\\/g, "/").split("/");
  const resolved = [];
  for (const part of parts) {
    if (!part || part === ".") continue;
    if (part === "..") {
      resolved.pop();
      continue;
    }
    resolved.push(part);
  }
  return `/${resolved.join("/")}`;
}

export function parentPath(path) {
  const normalized = normalizeWorkspacePath(path);
  const index = normalized.lastIndexOf("/");
  return index <= 0 ? "/" : normalized.slice(0, index);
}

export function isReservedWorkspacePath(path) {
  const normalized = normalizeWorkspacePath(path);
  return normalized === "/package.json" || normalized.startsWith("/__");
}

function normalizeSeedFiles(seedFiles = {}) {
  const result = {};
  for (const [rawPath, spec] of Object.entries(seedFiles)) {
    const path = normalizeWorkspacePath(rawPath);
    result[path] = {
      ...spec,
      path,
      code: String(spec?.code ?? spec?.content ?? ""),
      origin: "seed",
      protected: true,
    };
  }
  return result;
}

function legacySnapshot(snapshot, seeds) {
  const overrides = {};
  const userFiles = {};
  for (const [rawPath, rawValue] of Object.entries(snapshot || {})) {
    const path = normalizeWorkspacePath(rawPath);
    const code = String(rawValue && typeof rawValue === "object" ? rawValue.code ?? "" : rawValue ?? "");
    if (seeds[path]) overrides[path] = { code };
    else if (!isReservedWorkspacePath(path)) userFiles[path] = { code };
  }
  return { version: 1, overrides, userFiles, folders: [] };
}

export function parseWorkspaceSnapshot(raw, seedFiles = {}) {
  const seeds = normalizeSeedFiles(seedFiles);
  let snapshot = raw;
  if (typeof raw === "string") {
    try { snapshot = JSON.parse(raw); } catch { snapshot = {}; }
  }
  if (!snapshot || typeof snapshot !== "object") return { version: 1, overrides: {}, userFiles: {}, folders: [] };
  if (snapshot.version !== 1 || !snapshot.userFiles || !snapshot.overrides) return legacySnapshot(snapshot, seeds);
  return {
    version: 1,
    overrides: snapshot.overrides || {},
    userFiles: snapshot.userFiles || {},
    folders: Array.isArray(snapshot.folders) ? snapshot.folders : [],
  };
}

export function createVirtualWorkspace(seedFiles = {}, saved) {
  const seeds = normalizeSeedFiles(seedFiles);
  const snapshot = parseWorkspaceSnapshot(saved, seeds);
  const files = { ...seeds };
  for (const [rawPath, change] of Object.entries(snapshot.overrides)) {
    const path = normalizeWorkspacePath(rawPath);
    if (!files[path] || files[path].readOnly) continue;
    files[path] = { ...files[path], code: String(change?.code ?? "") };
  }
  for (const [rawPath, value] of Object.entries(snapshot.userFiles)) {
    const path = normalizeWorkspacePath(rawPath);
    if (files[path] || isReservedWorkspacePath(path)) continue;
    files[path] = { path, code: String(value?.code ?? ""), origin: "user", protected: false, readOnly: false, hidden: false };
  }
  const folders = [...new Set(snapshot.folders.map(normalizeWorkspacePath).filter((path) => path !== "/" && !isReservedWorkspacePath(path)))];
  return { files, folders, seedFiles: seeds };
}

export function serializeVirtualWorkspace(workspace) {
  const overrides = {};
  const userFiles = {};
  for (const [path, file] of Object.entries(workspace.files)) {
    if (file.origin === "user") userFiles[path] = { code: file.code };
    else if (!file.readOnly && workspace.seedFiles[path] && file.code !== workspace.seedFiles[path].code) overrides[path] = { code: file.code };
  }
  return { version: 1, overrides, userFiles, folders: workspace.folders };
}

function withWorkspace(workspace, changes) {
  return { ...workspace, ...changes, files: changes.files || workspace.files, folders: changes.folders || workspace.folders };
}

function assertNewPath(workspace, path) {
  if (path === "/" || isReservedWorkspacePath(path)) throw new Error("That path is reserved.");
  if (workspace.files[path] || workspace.folders.includes(path)) throw new Error("A file or folder already exists at that path.");
  for (const filePath of Object.keys(workspace.files)) {
    if (path.startsWith(`${filePath}/`)) throw new Error("A file already occupies a parent path.");
  }
}

export function updateWorkspaceFile(workspace, rawPath, code) {
  const path = normalizeWorkspacePath(rawPath);
  const file = workspace.files[path];
  if (!file || file.readOnly) return workspace;
  return withWorkspace(workspace, { files: { ...workspace.files, [path]: { ...file, code: String(code) } } });
}

export function createWorkspaceFile(workspace, rawPath) {
  const path = normalizeWorkspacePath(rawPath);
  assertNewPath(workspace, path);
  const folders = [...workspace.folders];
  for (const folder of parentFolders(path)) {
    const seedOwnsFolder = Object.values(workspace.seedFiles).some((file) => file.path.startsWith(`${folder}/`));
    if (folder !== "/" && !seedOwnsFolder && !folders.includes(folder)) folders.push(folder);
  }
  return withWorkspace(workspace, { files: { ...workspace.files, [path]: { path, code: "", origin: "user", protected: false, readOnly: false, hidden: false } }, folders });
}

export function createWorkspaceFolder(workspace, rawPath) {
  const path = normalizeWorkspacePath(rawPath);
  assertNewPath(workspace, path);
  return withWorkspace(workspace, { folders: [...workspace.folders, path] });
}

export function renameWorkspaceNode(workspace, rawPath, rawTarget) {
  const path = normalizeWorkspacePath(rawPath);
  const target = normalizeWorkspacePath(rawTarget);
  if (path === target) return workspace;
  if (parentPath(path) !== parentPath(target)) throw new Error("Moving files and folders is not available yet.");
  if (workspace.files[path]?.origin === "seed" || isReservedWorkspacePath(target)) throw new Error("Starter files cannot be renamed.");
  const isFolder = workspace.folders.includes(path);
  if (!workspace.files[path] && !isFolder) throw new Error("That workspace item no longer exists.");
  const affectedFiles = Object.keys(workspace.files).filter((filePath) => filePath === path || (isFolder && filePath.startsWith(`${path}/`)));
  if (affectedFiles.some((filePath) => workspace.files[filePath].origin === "seed")) throw new Error("Folders containing starter files cannot be renamed.");
  const affectedFolders = workspace.folders.filter((folder) => folder === path || (isFolder && folder.startsWith(`${path}/`)));
  for (const oldPath of [...affectedFiles, ...affectedFolders]) {
    const nextPath = oldPath === path ? target : `${target}${oldPath.slice(path.length)}`;
    if ((workspace.files[nextPath] && !affectedFiles.includes(nextPath)) || (workspace.folders.includes(nextPath) && !affectedFolders.includes(nextPath))) throw new Error("The new path conflicts with an existing item.");
  }
  const files = { ...workspace.files };
  for (const oldPath of affectedFiles) {
    const nextPath = oldPath === path ? target : `${target}${oldPath.slice(path.length)}`;
    const file = files[oldPath]; delete files[oldPath]; files[nextPath] = { ...file, path: nextPath };
  }
  const folders = workspace.folders.map((folder) => folder === path ? target : folder.startsWith(`${path}/`) ? `${target}${folder.slice(path.length)}` : folder);
  return withWorkspace(workspace, { files, folders });
}

function parentFolders(path) {
  const parts = normalizeWorkspacePath(path).split("/").filter(Boolean);
  return parts.slice(0, -1).map((_, index) => `/${parts.slice(0, index + 1).join("/")}`);
}

export function deleteWorkspaceNode(workspace, rawPath) {
  const path = normalizeWorkspacePath(rawPath);
  const file = workspace.files[path];
  if (file) {
    if (file.origin !== "user") throw new Error("Starter files cannot be deleted.");
    const files = { ...workspace.files }; delete files[path];
    return withWorkspace(workspace, { files });
  }
  if (!workspace.folders.includes(path)) throw new Error("That folder no longer exists.");
  const seedDescendant = Object.entries(workspace.files).some(([filePath, item]) => item.origin === "seed" && filePath.startsWith(`${path}/`));
  if (seedDescendant) throw new Error("Folders containing starter files cannot be deleted.");
  const files = Object.fromEntries(Object.entries(workspace.files).filter(([filePath]) => !filePath.startsWith(`${path}/`)));
  const folders = workspace.folders.filter((folder) => folder !== path && !folder.startsWith(`${path}/`));
  return withWorkspace(workspace, { files, folders });
}

export function useVirtualWorkspace(seedFiles, storageKey) {
  const [workspace, setWorkspace] = useState(() => createVirtualWorkspace(seedFiles));
  const [revision, setRevision] = useState(0);
  const workspaceRef = useRef(workspace);
  useEffect(() => {
    let saved = null;
    try { saved = storageKey ? window.localStorage.getItem(storageKey) : null; } catch { /* ignore */ }
    const next = createVirtualWorkspace(seedFiles, saved);
    workspaceRef.current = next;
    setWorkspace(next);
    setRevision((value) => value + 1);
  }, [seedFiles, storageKey]);
  const commit = useCallback((operation) => {
    const next = operation(workspaceRef.current);
    workspaceRef.current = next;
    try { if (storageKey) window.localStorage.setItem(storageKey, JSON.stringify(serializeVirtualWorkspace(next))); } catch { /* retain session state */ }
    setWorkspace(next);
    return next;
  }, [storageKey]);
  const reset = useCallback(() => {
    const next = createVirtualWorkspace(seedFiles);
    try { if (storageKey) window.localStorage.removeItem(storageKey); } catch { /* ignore */ }
    workspaceRef.current = next;
    setWorkspace(next);
    setRevision((value) => value + 1);
  }, [seedFiles, storageKey]);
  return useMemo(() => ({ workspace, revision, setFileCode: (path, code) => commit((current) => updateWorkspaceFile(current, path, code)), createFile: (path) => commit((current) => createWorkspaceFile(current, path)), createFolder: (path) => commit((current) => createWorkspaceFolder(current, path)), rename: (path, target) => commit((current) => renameWorkspaceNode(current, path, target)), remove: (path) => commit((current) => deleteWorkspaceNode(current, path)), reset }), [workspace, revision, commit, reset]);
}
