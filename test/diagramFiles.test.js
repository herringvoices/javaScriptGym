import test from "node:test";
import assert from "node:assert/strict";
import {
  DIAGRAM_PANEL,
  getDiagramFiles,
  isValidPanelForFiles,
} from "../src/lib/diagramFiles.js";

test("recognizes dependency graph Mermaid files", () => {
  const files = {
    "/dependencyGraph.mmd": {
      code: "graph TD\n  Main[main.js] --> Data[data.js]",
    },
  };

  const diagrams = getDiagramFiles(files);

  assert.equal(diagrams.hasDependency, true);
  assert.equal(diagrams.dependency.path, "/dependencyGraph.mmd");
  assert.match(diagrams.dependency.code, /Main\[main\.js\]/);
  assert.equal(isValidPanelForFiles(DIAGRAM_PANEL.DEPENDENCY, files), true);
});

test("does not enable dependency panel without a dependency graph file", () => {
  const files = {
    "/sequenceDiagram.mmd": {
      code: "sequenceDiagram",
    },
  };

  const diagrams = getDiagramFiles(files);

  assert.equal(diagrams.hasDependency, false);
  assert.equal(isValidPanelForFiles(DIAGRAM_PANEL.DEPENDENCY, files), false);
});
