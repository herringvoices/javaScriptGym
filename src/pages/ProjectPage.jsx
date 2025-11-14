import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HandbookMDXProvider from "../handbook/MDXProvider";
import { getProject, getProjectSteps, getStepLoader, loadProjectEntry } from "../projects/manifest";
import ProjectSidebar from "../components/ProjectSidebar";
import HandbookWorkbench from "../components/HandbookWorkbench";
import StickyToggleBar from "../components/StickyToggleBar";

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

		// Page-level visibility toggles (match Handbook)
		const [showTOC, setShowTOC] = useState(true);
		const [showHandbook, setShowHandbook] = useState(true);
			const [showEditor, setShowEditor] = useState(true);
			const [showConsole, setShowConsole] = useState(true);

	useEffect(() => {
		let cancelled = false;
		setLoadingEntry(true);
		setEntry(null);
		setEntryError(null);
		loadProjectEntry(projectId)
			.then((e) => { if (!cancelled) setEntry(e); })
			.catch((err) => { if (!cancelled) setEntryError(err); })
			.finally(() => { if (!cancelled) setLoadingEntry(false); });
		return () => { cancelled = true; };
	}, [projectId]);

	useEffect(() => {
		let cancelled = false;
		setLoadingStep(true);
		setStepModule(null);
		setStepError(null);
		const loader = getStepLoader(projectId, currentStepId);
		if (!loader) {
			setLoadingStep(false);
			return;
		}
		loader()
			.then((mod) => { if (!cancelled) setStepModule(mod); })
			.catch((err) => { if (!cancelled) setStepError(err); })
			.finally(() => { if (!cancelled) setLoadingStep(false); });
		return () => { cancelled = true; };
	}, [projectId, currentStepId]);

	useEffect(() => {
		if (!stepId && steps[0]) {
			navigate(`/project/${projectId}/${steps[0].id}`, { replace: true });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [projectId]);

		// Note: do not early-return here to keep hooks order stable

		// Derive entry for this step: hide data/functions until cleanup; keep main visible.
		const entryForStep = useMemo(() => {
			if (!entry) return null;
			const isCleanup = /cleanup/i.test(String(currentStepId || ""));
			const files = (entry.files || []).map((f) => {
				if (f.path === "/data.js" || f.path === "/functions.js") {
					return { ...f, hidden: !isCleanup };
				}
				if (f.path === "/main.js") {
					return { ...f, hidden: false };
				}
				return f;
			});
			return { ...entry, files };
		}, [entry, currentStepId]);

        // Button class logic moved into StickyToggleBar for reuse

		// Layout mirrors Handbook: top toggles, 3 columns with dynamic visibility
			return (
			<div className="w-screen ml-[calc(50%-50vw)] mr-[calc(50%-50vw)]">
				<div className="space-y-4 px-6 lg:px-8">
						{meta ? (
							<div className="rounded-md border border-brand-500/40 bg-brand-500/10 p-4 text-sm text-slate-200">
								<p className="text-sm uppercase tracking-widest text-brand-300">Project</p>
								<h1 className="mt-0 text-2xl font-semibold">{meta.title}</h1>
							</div>
						) : (
							<div className="rounded-md border border-brand-500/40 bg-brand-500/10 p-4 text-sm text-slate-200">
								<p className="text-sm uppercase tracking-widest text-brand-300">Project</p>
								<h1 className="mt-0 text-2xl font-semibold">Not found</h1>
							</div>
						)}

					<StickyToggleBar
            showTOC={showTOC}
            showHandbook={showHandbook}
            showEditor={showEditor}
            showConsole={showConsole}
            onToggleTOC={() => setShowTOC((v) => !v)}
            onToggleHandbook={() => setShowHandbook((v) => !v)}
            onToggleEditor={() => setShowEditor((v) => !v)}
            onToggleConsole={() => setShowConsole((v) => !v)}
            tocOnLabel="Hide Steps"
            tocOffLabel="Show Steps"
            handbookOnLabel="Hide instructions"
            handbookOffLabel="Show instructions"
            editorOnLabel="Hide editor"
            editorOffLabel="Show editor"
            consoleOnLabel="Hide console"
            consoleOffLabel="Show console"
          />

							{meta ? (() => {
						const visibleCount = [showTOC, showHandbook, showEditor].filter(Boolean).length;
						const gridColsLg = visibleCount >= 3 ? "lg:grid-cols-[1fr_2fr_2fr]" : visibleCount === 2 ? "lg:grid-cols-2" : "lg:grid-cols-1";
						return (
										<div className={`grid gap-8 ${gridColsLg}`}>
												<aside className={showTOC ? "space-y-6 sticky top-[4rem] self-start max-h-[calc(100vh-8rem)] overflow-auto animate-fade-in" : "hidden"}>
									<ProjectSidebar project={meta} currentStepId={currentStepId} />
								</aside>

											<article className={`prose prose-invert max-w-none ${showHandbook ? "block animate-fade-in" : "hidden"}`}>
									{loadingStep && <p className="text-sm text-slate-400">Loading step…</p>}
									{stepError && <p className="text-sm text-red-400">Failed to load step: {stepError.message}</p>}
									{stepModule ? (
										<HandbookMDXProvider>
											<stepModule.default />
										</HandbookMDXProvider>
									) : (
										<p className="text-sm text-slate-400">Step content coming soon…</p>
									)}
								</article>

											<section className={showEditor ? "sticky top-[4rem] self-start max-h-[calc(100vh-8rem)] overflow-auto animate-fade-in" : "hidden"}>
									{entryError ? (
										<div className="rounded border border-red-800 bg-red-950 p-3 text-sm text-red-300">Failed to load files: {entryError.message}</div>
									) : loadingEntry && !entryForStep ? (
										<div className="rounded border border-slate-800 p-3 text-sm text-slate-300">Loading editor…</div>
									) : (
															<HandbookWorkbench entry={entryForStep} showConsole={showConsole} />
									)}
								</section>
							</div>
										);
									})() : (
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
												← Back to projects
											</button>
										</section>
									)}
				</div>
			</div>
		);
}

