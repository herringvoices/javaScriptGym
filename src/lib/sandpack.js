const DEFAULT_ENTRY = {
  react: "/App.jsx",
  vanilla: "/main.js",
  static: "/index.html",
};

export function createSandpackSetup(challenge, savedFiles = {}) {
  const template = challenge.template ?? "vanilla";
  const files = {};
  const challengePaths = new Set(Object.keys(challenge.files ?? {}));

  Object.entries(challenge.files ?? {}).forEach(([path, spec]) => {
    files[path] = {
      code: savedFiles[path]?.code ?? spec.code ?? "",
      hidden: spec.hidden ?? false,
      readOnly: spec.readOnly ?? false,
      active: spec.active ?? false,
    };
  });

  Object.entries(savedFiles).forEach(([path, spec]) => {
    if (!files[path]) {
      files[path] = {
        code: spec.code ?? "",
        active: false,
        hidden: true,
        readOnly: spec.readOnly ?? false,
      };
    } else {
      files[path].code = spec.code;
    }
  });

  const entry = challenge.entry ?? DEFAULT_ENTRY[template] ?? DEFAULT_ENTRY.vanilla;
  if (files[entry]) {
    files[entry].active = true;
  } else if (Object.keys(files).length > 0) {
    const firstKey = Object.keys(files)[0];
    files[firstKey].active = true;
  }

  const filesWith = files;

  Object.entries(filesWith).forEach(([path, spec]) => {
    if (challengePaths.has(path)) return;
    if (spec.hidden) return;
    filesWith[path] = { ...spec, hidden: true };
  });

  const orderedChallengeFiles = Array.from(challengePaths).filter((p) => filesWith[p]);
  const visibleFiles = orderedChallengeFiles.filter((p) => !filesWith[p].hidden);
  const activeFile = visibleFiles.includes(entry) ? entry : visibleFiles[0] ?? entry;

  Object.entries(filesWith).forEach(([path, spec]) => {
    filesWith[path] = { ...spec, active: path === activeFile };
  });

  return {
    template,
    files: filesWith,
    options: { visibleFiles, activeFile },
    customSetup: { entry },
  };
}

export function normalizeSandpackFiles(files) {
  const result = {};
  Object.entries(files).forEach(([path, spec]) => {
    result[path] = { code: spec.code, readOnly: spec.readOnly, hidden: spec.hidden };
  });
  return result;
}
