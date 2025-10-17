import React from "react";
import MiniSandpack from "./MiniSandpack";

/**
 * Playground - ergonomic wrapper for MiniSandpack in MDX.
 * Props:
 *  - code: string (quick single-file snippet)
 *  - file: path for the single file (default: /main.js)
 *  - files: object mapping paths -> code (alternative to `code`)
 *  - entry: explicit entry path (defaults to file)
 *  - template: sandpack template (default: vanilla)
 *  - children: if provided, ignored by MiniSandpack (can be future extension)
 */
export default function Playground({ code, file = "/main.js", files, entry, template = "vanilla", console: showConsole = false, showPreview = true }) {
  const finalFiles = files || (code ? { [file]: code } : {});
  const finalEntry = entry || file;
  return (
    <MiniSandpack
      files={finalFiles}
      entry={finalEntry}
      template={template}
      showConsole={showConsole}
      showPreview={showPreview}
    />
  );
}
