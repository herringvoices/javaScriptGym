import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import HandbookMDXProvider from "../handbook/MDXProvider";
import { getProject, getProjectSteps, getStepLoader, loadProjectEntry } from "../projects/manifest";
import ProjectSidebar from "../components/ProjectSidebar";
import HandbookWorkbench from "../components/HandbookWorkbench";
import DesktopPanel from "../components/DesktopPanel";
import DesktopResizeHandle from "../components/DesktopResizeHandle";
import DesktopRestorePreview from "../components/DesktopRestorePreview";
import MobileAccordion from "../components/MobileAccordion";
import useMediaQuery from "../hooks/useMediaQuery";
import useResizableDesktopPanels from "../hooks/useResizableDesktopPanels";

const DESKTOP_PANEL_SIZES = [
  { key: "toc", min: 220, defaultWeight: 0.75, defaultColumn: "minmax(220px,0.75fr)" },
  { key: "handbook", min: 280, defaultWeight: 1, defaultColumn: "minmax(280px,1fr)" },
  { key: "editor", min: 360, defaultWeight: 2, defaultColumn: "minmax(0,2fr)" },
  { key: "console", min: 320, defaultWeight: 1.2, defaultColumn: "minmax(320px,1.2fr)" },
];

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
  const [showConsole, setShowConsole] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

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
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, [projectId, currentStepId]);

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

  const desktopPanelSlots = useMemo(
    () => [
      { key: "toc", visible: showTOC, preview: !showTOC },
      { key: "handbook", visible: showHandbook, preview: !showHandbook },
      { key: "editor", visible: showEditor, preview: !showEditor },
      { key: "console", visible: showConsole, preview: !showConsole },
    ],
    [showTOC, showHandbook, showEditor, showConsole]
  );
  const desktopResize = useResizableDesktopPanels({
    panels: DESKTOP_PANEL_SIZES,
    slots: desktopPanelSlots,
  });
  const renderResizeHandleAfter = (key) => {
    const rightKey = desktopResize.nextVisibleKeyAfter(key);
    return desktopResize.shouldRenderHandleAfter(key) && rightKey ? (
      <DesktopResizeHandle
        key={`${key}-${rightKey}`}
        {...desktopResize.getHandleProps(key, rightKey)}
      />
    ) : null;
  };
  const desktopRestoreItemsByKey = {
    toc: { key: "toc", panelKey: "toc", label: "Show Steps", onRestore: () => setShowTOC(true) },
    handbook: { key: "handbook", panelKey: "handbook", label: "Show Instructions", onRestore: () => setShowHandbook(true) },
    editor: { key: "editor", panelKey: "editor", label: "Show Editor", onRestore: () => setShowEditor(true) },
    console: { key: "console", panelKey: "console", label: "Show Console", onRestore: () => setShowConsole(true) },
  };
  const getDesktopRestoreItems = (key) =>
    desktopResize.getPreviewGroupKeys(key).map((groupKey) => desktopRestoreItemsByKey[groupKey]).filter(Boolean);

  return (
    <div className="-mx-4 overflow-x-clip sm:-mx-6">
      <div className="space-y-4 px-4 sm:px-6 lg:px-8">
        <div className="rounded-md border border-brand-500/40 bg-brand-500/10 p-4 text-sm text-slate-200">
          <p className="text-sm uppercase tracking-widest text-brand-300">Project</p>
          <h1 className="mt-0 text-2xl font-semibold">{meta ? meta.title : "Not found"}</h1>
        </div>

        {meta ? (
          isDesktop ? (
          <div
            ref={desktopResize.containerRef}
            className="resizable-desktop-grid grid grid-cols-1 gap-0 -mx-3 lg:[grid-template-columns:var(--project-grid-template)]"
            data-resizing={desktopResize.isResizing ? "true" : "false"}
            style={{ "--project-grid-template": desktopResize.gridTemplate }}
          >
            {showTOC ? (
              <div {...desktopResize.panelSlotProps("toc")}>
                <DesktopPanel
                  as="aside"
                  panelKey="toc"
                  eyebrow="Project"
                  title="Steps"
                  onHide={() => setShowTOC(false)}
                  bodyClassName="overflow-auto"
                >
                  <ProjectSidebar project={meta} currentStepId={currentStepId} />
                </DesktopPanel>
              </div>
            ) : (
              <div {...desktopResize.previewSlotProps("toc")}>
                <DesktopRestorePreview
                  panelKey="toc"
                  label="Show Steps"
                  onRestore={() => setShowTOC(true)}
                  expandDirection={desktopResize.getPreviewExpandDirection("toc")}
                  items={getDesktopRestoreItems("toc")}
                />
              </div>
            )}
            {renderResizeHandleAfter("toc")}

            {showHandbook ? (
              <div {...desktopResize.panelSlotProps("handbook")}>
                <DesktopPanel
                  as="article"
                  panelKey="handbook"
                  eyebrow="Step"
                  title="Instructions"
                  onHide={() => setShowHandbook(false)}
                  variant="plain"
                  className="prose prose-invert max-w-none"
                  bodyClassName="pt-4"
                >
                  <ProjectStepContent
                    loadingStep={loadingStep}
                    stepError={stepError}
                    stepModule={stepModule}
                    projectId={projectId}
                    steps={steps}
                    currentStepId={currentStepId}
                  />
                </DesktopPanel>
              </div>
            ) : (
              <div {...desktopResize.previewSlotProps("handbook")}>
                <DesktopRestorePreview
                  panelKey="handbook"
                  label="Show Instructions"
                  onRestore={() => setShowHandbook(true)}
                  expandDirection={desktopResize.getPreviewExpandDirection("handbook")}
                  items={getDesktopRestoreItems("handbook")}
                />
              </div>
            )}
            {renderResizeHandleAfter("handbook")}

            {showEditor ? null : (
              <div {...desktopResize.previewSlotProps("editor")}>
                <DesktopRestorePreview
                  panelKey="editor"
                  label="Show Editor"
                  onRestore={() => setShowEditor(true)}
                  expandDirection={desktopResize.getPreviewExpandDirection("editor")}
                  items={getDesktopRestoreItems("editor")}
                />
              </div>
            )}

            {showEditor || showConsole ? (
            <div className="contents">
              {entryError ? (
                <div {...desktopResize.panelSlotProps("editor")} className={showEditor ? "min-w-0 px-3 rounded border border-red-800 bg-red-950 p-3 text-sm text-red-300" : "hidden"}>
                  Failed to load files: {entryError.message}
                </div>
              ) : loadingEntry && !entryForStep ? (
                <div {...desktopResize.panelSlotProps("editor")} className={showEditor ? "min-w-0 px-3 rounded border border-slate-800 p-3 text-sm text-slate-300" : "hidden"}>
                  Loading editor...
                </div>
              ) : (
                <HandbookWorkbench
                  entry={entryForStep}
                  showEditor={showEditor}
                  showRunner={showConsole}
                  resizeSignal={desktopResize.resizeSignal}
                  getDesktopPanelSlotProps={desktopResize.panelSlotProps}
                  renderDesktopResizeHandleAfter={renderResizeHandleAfter}
                  onShowRunnerChange={setShowConsole}
                  onHideEditor={() => setShowEditor(false)}
                  onHideRunner={() => setShowConsole(false)}
                />
              )}
            </div>
            ) : null}

            {showConsole ? null : (
              <div {...desktopResize.previewSlotProps("console")}>
                <DesktopRestorePreview
                  panelKey="console"
                  label="Show Console"
                  onRestore={() => setShowConsole(true)}
                  expandDirection={desktopResize.getPreviewExpandDirection("console")}
                  items={getDesktopRestoreItems("console")}
                />
              </div>
            )}
          </div>
          ) : (
            <div className="space-y-3">
              <MobileAccordion title="Steps" eyebrow="Project" defaultOpen stickyHeader>
                <ProjectSidebar project={meta} currentStepId={currentStepId} />
              </MobileAccordion>

              <MobileAccordion title="Instructions" eyebrow="Step" defaultOpen stickyHeader contentClassName="prose prose-invert max-w-none">
                <ProjectStepContent
                  loadingStep={loadingStep}
                  stepError={stepError}
                  stepModule={stepModule}
                  projectId={projectId}
                  steps={steps}
                  currentStepId={currentStepId}
                />
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

function ProjectStepContent({ loadingStep, stepError, stepModule, projectId, steps, currentStepId }) {
  const Step = stepModule?.default;

  return (
    <>
      {loadingStep && <p className="text-sm text-slate-400">Loading step...</p>}
      {stepError && <p className="text-sm text-red-400">Failed to load step: {stepError.message}</p>}
      {Step ? (
        <HandbookMDXProvider>
          <Step />
        </HandbookMDXProvider>
      ) : (
        <p className="text-sm text-slate-400">Step content coming soon...</p>
      )}
      <ProjectStepNavigation projectId={projectId} steps={steps} currentStepId={currentStepId} />
    </>
  );
}

function ProjectStepNavigation({ projectId, steps, currentStepId }) {
  const currentIndex = steps.findIndex((step) => step.id === currentStepId);
  if (currentIndex === -1) return null;

  const prev = currentIndex > 0 ? steps[currentIndex - 1] : null;
  const next = currentIndex < steps.length - 1 ? steps[currentIndex + 1] : null;
  const makeHref = (step) => `/project/${projectId}/${step.id}`;
  const btnClass =
    "inline-flex min-w-0 items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium no-underline transition-colors hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/70";
  const inactiveClass = "opacity-40 cursor-not-allowed";
  const prevClass = "bg-slate-900/60 text-slate-200 border-slate-700 hover:bg-slate-800";
  const nextClass = "bg-brand-600 text-white border-brand-600 hover:bg-brand-500";

  return (
    <nav aria-label="Project step navigation" className="not-prose mt-10 border-t border-slate-700 pt-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        {prev ? (
          <Link to={makeHref(prev)} className={`${btnClass} ${prevClass} sm:max-w-[48%]`}>
            <span className="text-lg" aria-hidden="true">←</span>
            <span className="flex min-w-0 flex-col text-left">
              <span className="text-xs uppercase tracking-wide text-brand-300">Previous</span>
              <span className="truncate">{prev.title}</span>
            </span>
          </Link>
        ) : (
          <span className={`${btnClass} ${inactiveClass}`} aria-disabled>
            <span className="text-lg" aria-hidden="true">←</span>
            <span className="flex flex-col text-left">
              <span className="text-xs uppercase tracking-wide">Previous</span>
              -
            </span>
          </span>
        )}

        {next ? (
          <Link to={makeHref(next)} className={`${btnClass} ${nextClass} justify-end sm:max-w-[48%] sm:ml-auto`}>
            <span className="flex min-w-0 flex-col text-right">
              <span className="text-xs uppercase tracking-wide text-brand-200">Next</span>
              <span className="truncate">{next.title}</span>
            </span>
            <span className="text-lg" aria-hidden="true">→</span>
          </Link>
        ) : (
          <span className={`${btnClass} ${inactiveClass} justify-end sm:ml-auto`} aria-disabled>
            <span className="flex flex-col text-right">
              <span className="text-xs uppercase tracking-wide">Next</span>
              -
            </span>
            <span className="text-lg" aria-hidden="true">→</span>
          </span>
        )}
      </div>
    </nav>
  );
}
