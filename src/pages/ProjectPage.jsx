import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HandbookMDXProvider from "../handbook/MDXProvider";
import { getProject, getProjectSteps, getStepLoader, loadProjectEntry } from "../projects/manifest";
import ProjectSidebar from "../components/ProjectSidebar";
import HandbookWorkbench from "../components/HandbookWorkbench";
import StickyToggleBar from "../components/StickyToggleBar";
import DesktopPanel from "../components/DesktopPanel";
import DesktopRestorePreview from "../components/DesktopRestorePreview";
import MobileAccordion from "../components/MobileAccordion";
import useMediaQuery from "../hooks/useMediaQuery";
import useDesktopRestorePreview from "../hooks/useDesktopRestorePreview";

export default function ProjectPage() {
  const { projectId, stepId } = useParams();
  const navigate = useNavigate();

  const meta = getProject(projectId);
  const steps = getProjectSteps(projectId);
  const currentStepId = stepId || steps[0]?.id || null;

  const [entry, setEntry] = useState(null);
  const [entryError, setEntryError] = useState(null);
  const [loadingEntry, setLoadingEntry] = useState(false);
  const [stepModule, setStepModule] = useState(null);
  const [stepError, setStepError] = useState(null);
  const [loadingStep, setLoadingStep] = useState(false);
  const [showTOC, setShowTOC] = useState(true);
  const [showHandbook, setShowHandbook] = useState(true);
  const [showEditor, setShowEditor] = useState(true);
  const [showConsole, setShowConsole] = useState(true);
  const tocRef = useRef(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const restorePreviewKey = useDesktopRestorePreview();

  useEffect(() => {
    let cancelled = false;
    setLoadingEntry(true);
    setEntry(null);
    setEntryError(null);
    loadProjectEntry(projectId)
      .then((loadedEntry) => {
        if (!cancelled) setEntry(loadedEntry);
      })
      .catch((error) => {
        if (!cancelled) setEntryError(error);
      })
      .finally(() => {
        if (!cancelled) setLoadingEntry(false);
      });
    return () => {
      cancelled = true;
    };
  }, [projectId]);

  useEffect(() => {
    let cancelled = false;
    setLoadingStep(true);
    setStepModule(null);
    setStepError(null);
    const loader = getStepLoader(projectId, currentStepId);
    if (!loader) {
      setLoadingStep(false);
      return undefined;
    }
    loader()
      .then((module) => {
        if (!cancelled) setStepModule(module);
      })
      .catch((error) => {
        if (!cancelled) setStepError(error);
      })
      .finally(() => {
        if (!cancelled) setLoadingStep(false);
      });
    return () => {
      cancelled = true;
    };
  }, [projectId, currentStepId]);

  useEffect(() => {
    if (!stepId && steps[0]) {
      navigate(`/project/${projectId}/${steps[0].id}`, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  useEffect(() => {
    if (!showTOC || typeof document === "undefined") return undefined;

    const handlePointerDown = (event) => {
      if (tocRef.current?.contains(event.target)) return;
      if (event.target.closest("[data-toc-toggle]")) return;
      setShowTOC(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [showTOC]);

  const entryForStep = useMemo(() => {
    if (!entry) return null;
    const isCleanup = /cleanup/i.test(String(currentStepId || ""));
    const files = (entry.files || []).map((file) => {
      if (file.path === "/data.js" || file.path === "/functions.js") {
        return { ...file, hidden: !isCleanup };
      }
      if (file.path === "/main.js") {
        return { ...file, hidden: false };
      }
      return file;
    });
    return { ...entry, files };
  }, [entry, currentStepId]);

  const gridTemplate = useMemo(() => {
    const columns = [];
    if (showTOC) columns.push("minmax(220px,0.75fr)");
    else if (restorePreviewKey === "toc") columns.push("10px");
    if (showHandbook) columns.push("minmax(280px,1fr)");
    else if (restorePreviewKey === "handbook") columns.push("10px");
    if (showEditor) columns.push("minmax(0,2fr)");
    else if (restorePreviewKey === "editor") columns.push("10px");
    if (showConsole) columns.push("minmax(320px,1.2fr)");
    else if (restorePreviewKey === "console") columns.push("10px");
    return columns.length ? columns.join(" ") : "minmax(0,1fr)";
  }, [restorePreviewKey, showTOC, showHandbook, showEditor, showConsole]);

  const hideWithTOC = (hidePanel) => {
    setShowTOC(false);
    hidePanel(false);
  };

  return (
    <div className="w-screen ml-[calc(50%-50vw)] mr-[calc(50%-50vw)]">
      <div className="space-y-4 px-4 sm:px-6 lg:px-8">
        <div className="rounded-md border border-brand-500/40 bg-brand-500/10 p-4 text-sm text-slate-200">
          <p className="text-sm uppercase tracking-widest text-brand-300">Project</p>
          <h1 className="mt-0 text-2xl font-semibold">{meta ? meta.title : "Not found"}</h1>
        </div>

        <StickyToggleBar
          showTOC={showTOC}
          showHandbook={showHandbook}
          showEditor={showEditor}
          showConsole={showConsole}
          onToggleTOC={() => setShowTOC((value) => !value)}
          onToggleHandbook={() => setShowHandbook((value) => !value)}
          onToggleEditor={() => setShowEditor((value) => !value)}
          onToggleConsole={() => setShowConsole((value) => !value)}
          tocOffLabel="Show Steps"
          handbookOffLabel="Show instructions"
          editorOffLabel="Show editor"
          consoleOffLabel="Show console"
        />

        {meta ? (
          isDesktop ? (
          <div
            className="grid grid-cols-1 gap-6 lg:[grid-template-columns:var(--project-grid-template)]"
            style={{ "--project-grid-template": gridTemplate }}
          >
            {showTOC ? (
              <DesktopPanel
                ref={tocRef}
                as="aside"
                panelKey="toc"
                eyebrow="Project"
                title="Steps"
                onHide={() => setShowTOC(false)}
                bodyClassName="overflow-auto"
              >
                <ProjectSidebar project={meta} currentStepId={currentStepId} />
              </DesktopPanel>
            ) : restorePreviewKey === "toc" ? (
              <DesktopRestorePreview panelKey="toc" />
            ) : null}

            {showHandbook ? (
              <DesktopPanel
                as="article"
                panelKey="handbook"
                eyebrow="Step"
                title="Instructions"
                onHide={() => hideWithTOC(setShowHandbook)}
                variant="plain"
                className="prose prose-invert max-w-none"
                bodyClassName="pt-4"
              >
                {loadingStep && <p className="text-sm text-slate-400">Loading step...</p>}
                {stepError && <p className="text-sm text-red-400">Failed to load step: {stepError.message}</p>}
                {stepModule ? (
                  <HandbookMDXProvider>
                    <stepModule.default />
                  </HandbookMDXProvider>
                ) : (
                  <p className="text-sm text-slate-400">Step content coming soon...</p>
                )}
              </DesktopPanel>
            ) : restorePreviewKey === "handbook" ? (
              <DesktopRestorePreview panelKey="handbook" />
            ) : null}

            {showEditor ? null : restorePreviewKey === "editor" ? (
              <DesktopRestorePreview panelKey="editor" />
            ) : null}

            {showEditor || showConsole ? (
            <div className="contents">
              {entryError ? (
                <div className={showEditor ? "rounded border border-red-800 bg-red-950 p-3 text-sm text-red-300" : "hidden"}>
                  Failed to load files: {entryError.message}
                </div>
              ) : loadingEntry && !entryForStep ? (
                <div className={showEditor ? "rounded border border-slate-800 p-3 text-sm text-slate-300" : "hidden"}>
                  Loading editor...
                </div>
              ) : (
                <HandbookWorkbench
                  entry={entryForStep}
                  showEditor={showEditor}
                  showRunner={showConsole}
                  onShowRunnerChange={setShowConsole}
                  onHideEditor={() => hideWithTOC(setShowEditor)}
                  onHideRunner={() => hideWithTOC(setShowConsole)}
                />
              )}
            </div>
            ) : null}

            {showConsole ? null : restorePreviewKey === "console" ? (
              <DesktopRestorePreview panelKey="console" />
            ) : null}
          </div>
          ) : (
            <div className="space-y-3">
              <MobileAccordion title="Steps" eyebrow="Project" defaultOpen stickyHeader>
                <ProjectSidebar project={meta} currentStepId={currentStepId} />
              </MobileAccordion>

              <MobileAccordion title="Instructions" eyebrow="Step" defaultOpen stickyHeader contentClassName="prose prose-invert max-w-none">
                {loadingStep && <p className="text-sm text-slate-400">Loading step...</p>}
                {stepError && <p className="text-sm text-red-400">Failed to load step: {stepError.message}</p>}
                {stepModule ? (
                  <HandbookMDXProvider>
                    <stepModule.default />
                  </HandbookMDXProvider>
                ) : (
                  <p className="text-sm text-slate-400">Step content coming soon...</p>
                )}
              </MobileAccordion>

              <MobileAccordion title="Workspace" eyebrow="Code" defaultOpen stickyHeader>
                {entryError ? (
                  <div className="rounded border border-red-800 bg-red-950 p-3 text-sm text-red-300">
                    Failed to load files: {entryError.message}
                  </div>
                ) : loadingEntry && !entryForStep ? (
                  <div className="rounded border border-slate-800 p-3 text-sm text-slate-300">
                    Loading editor...
                  </div>
                ) : (
                  <HandbookWorkbench
                    entry={entryForStep}
                    showEditor
                    showRunner={showConsole}
                    onShowRunnerChange={setShowConsole}
                  />
                )}
              </MobileAccordion>
            </div>
          )
        ) : (
          <section className="space-y-6">
            <header className="space-y-3">
              <h1 className="text-3xl font-semibold text-white">Project not found</h1>
              <p className="text-slate-300">Pick a project from the list.</p>
            </header>
            <button
              type="button"
              onClick={() => navigate("/projects")}
              className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-400"
            >
              Back to projects
            </button>
          </section>
        )}
      </div>
    </div>
  );
}
