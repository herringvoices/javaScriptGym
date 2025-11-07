import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackConsole,
} from "@codesandbox/sandpack-react";
import { dracula } from "@codesandbox/sandpack-themes";
import { getBundlerURL } from "../lib/getBundlerURL";

/**
 * MySandpack - generic wrapper that injects bundlerURL toggle.
 * Use this wrapper for new playgrounds or migrate old ones gradually.
 */
export default function MySandpack({ files, template = "vanilla", entry = "/index.html", showConsole = false }) {
  const bundlerURL = getBundlerURL();
  const visibleFiles = Object.keys(files || {});
  const activeFile = visibleFiles[0];
  return (
    <SandpackProvider
      template={template}
      files={files}
      customSetup={{ entry }}
      theme={dracula}
      bundlerURL={bundlerURL}
      options={{
        visibleFiles,
        activeFile,
        showLineNumbers: true,
        wrapContent: true,
        recompileMode: "delayed",
        recompileDelay: 600,
      }}
    >
      <SandpackLayout>
        <SandpackCodeEditor showTabs showLineNumbers />
        <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
          <SandpackPreview style={{ flex: 1 }} />
          {showConsole && <SandpackConsole style={{ height: 180 }} />}.
        </div>
      </SandpackLayout>
    </SandpackProvider>
  );
}
