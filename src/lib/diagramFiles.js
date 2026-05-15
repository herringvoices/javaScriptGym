export const DIAGRAM_PANEL = {
  PREVIEW: "preview",
  CONSOLE: "console",
  SEQUENCE: "sequence",
  ERD: "erd",
};

export const SEQUENCE_DIAGRAM_PATHS = [
  "/sequenceDiagram.mmd",
  "/sequenceDiagram.mermaid",
];

export const ERD_PATHS = ["/erd.dbml"];

export function getFileCode(file) {
  if (!file) return "";
  return String(file.code ?? file.content ?? "");
}

export function getFirstExistingFile(files, paths) {
  if (!files) return null;

  for (const path of paths) {
    if (files[path]) {
      return {
        path,
        file: files[path],
        code: getFileCode(files[path]),
      };
    }
  }

  return null;
}

export function getDiagramFiles(files) {
  const sequence = getFirstExistingFile(files, SEQUENCE_DIAGRAM_PATHS);
  const erd = getFirstExistingFile(files, ERD_PATHS);

  return {
    sequence,
    erd,
    hasSequence: Boolean(sequence),
    hasErd: Boolean(erd),
  };
}

export function isValidPanelForFiles(panel, files) {
  const diagrams = getDiagramFiles(files);

  if (panel === DIAGRAM_PANEL.SEQUENCE) return diagrams.hasSequence;
  if (panel === DIAGRAM_PANEL.ERD) return diagrams.hasErd;

  return true;
}
