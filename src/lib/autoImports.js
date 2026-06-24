const JAVASCRIPT_FILE = /\.(?:js|jsx|mjs|cjs)$/i;
const IDENTIFIER = /^[A-Za-z_$][\w$]*$/;

export function isJavaScriptModule(path) {
  return JAVASCRIPT_FILE.test(String(path || ""));
}

export function discoverNamedExports(files, activePath) {
  const candidates = [];
  for (const [path, file] of Object.entries(files || {})) {
    if (path === activePath || file?.hidden || !isJavaScriptModule(path)) continue;
    for (const exported of extractNamedExports(file?.code ?? "")) {
      candidates.push({ name: exported.name, kind: exported.kind, sourcePath: path, importPath: relativeImportPath(activePath, path) });
    }
  }
  return candidates.sort((a, b) => a.name.localeCompare(b.name) || a.importPath.localeCompare(b.importPath));
}

export function extractNamedExports(code) {
  const found = new Map();
  const source = String(code || "");
  const declaration = /\bexport\s+(const|let|var|function|class)\s+([A-Za-z_$][\w$]*)/g;
  for (const match of source.matchAll(declaration)) {
    found.set(match[2], { name: match[2], kind: match[1] === "function" ? "function" : match[1] === "class" ? "class" : "variable" });
  }
  const exportList = /\bexport\s*{([^}]*)}(?!\s*from\b)/g;
  for (const match of source.matchAll(exportList)) {
    for (const entry of match[1].split(",").map((item) => item.trim())) {
      if (!IDENTIFIER.test(entry)) continue;
      found.set(entry, { name: entry, kind: "variable" });
    }
  }
  return [...found.values()];
}

export function relativeImportPath(fromPath, toPath) {
  const from = String(fromPath || "").split("/").filter(Boolean).slice(0, -1);
  const to = String(toPath || "").split("/").filter(Boolean);
  while (from.length && to.length && from[0] === to[0]) { from.shift(); to.shift(); }
  const relative = `${"../".repeat(from.length)}${to.join("/")}`;
  return relative.startsWith(".") ? relative : `./${relative}`;
}

export function importedNames(code) {
  const names = new Set();
  const source = String(code || "");
  for (const match of source.matchAll(/\bimport\s*{([^}]*)}/g)) {
    for (const entry of match[1].split(",").map((item) => item.trim())) {
      const local = entry.split(/\s+as\s+/i).at(-1)?.trim();
      if (IDENTIFIER.test(local)) names.add(local);
    }
  }
  for (const match of source.matchAll(/\bimport\s+([A-Za-z_$][\w$]*)\s+from\b/g)) names.add(match[1]);
  return names;
}

export function importInsertionOffset(code) {
  const source = String(code || "");
  const imports = /^\s*import(?:[\s\S]*?\s+from\s*)?["'][^"']+["'];?[^\S\r\n]*(?:\r?\n|$)/gm;
  let last = null;
  for (const match of source.matchAll(imports)) last = match;
  return last ? last.index + last[0].length : 0;
}

export function buildAutoImportSuggestions({ files, activePath, code }) {
  const imported = importedNames(code);
  const offset = importInsertionOffset(code);
  const hasImports = offset > 0;
  return discoverNamedExports(files, activePath)
    .filter((candidate) => !imported.has(candidate.name))
    .map((candidate) => ({
      ...candidate,
      detail: `Auto import from ${candidate.importPath}`,
      importText: `import { ${candidate.name} } from "${candidate.importPath}";${hasImports ? "\n" : "\n\n"}`,
      importOffset: offset,
    }));
}
