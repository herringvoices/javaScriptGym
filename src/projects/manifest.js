// Projects manifest and loaders
// Each project mirrors the handbook approach: one JS entry in entries/ and MDX files per step.

export const projects = [
	{
		id: "landers-zoo",
		title: "Lander's Zoo",
		summary: "Build a simple data dashboard for a growing zoo: compute stats, compose formatted summaries, filter groups, and then refactor into modules.",
		// Standards addressed (ids from data/standards)
		standards: ["JS.VDT.PRM", "JS.VDT.COL", "JS.FN.BAS", "JS.VDT.MTH"],
		steps: [
			{ id: "01-intro", title: "Intro & Habitat Stats" },
			{ id: "02-animals", title: "Animal Stats" },
			{ id: "03-age-ranges", title: "Age Ranges" },
			{ id: "04-habitat-sizes", title: "Habitat Size Ranges" },
			{ id: "05-details", title: "Details & Formatting" },
			{ id: "06-cleanup", title: "Cleanup & Modularization" },
			// Note: 07 (Sequence Diagram) intentionally omitted
		],
	},
];

export function getProject(projectId) {
	return projects.find((p) => p.id === projectId) || null;
}

export function getProjectSteps(projectId) {
	const meta = getProject(projectId);
	return meta?.steps || [];
}

export const projectStepLoaders = {
	"landers-zoo": {
		"01-intro": () => import("./landers-zoo/steps/01-intro.mdx"),
		"02-animals": () => import("./landers-zoo/steps/02-animals.mdx"),
		"03-age-ranges": () => import("./landers-zoo/steps/03-age-ranges.mdx"),
		"04-habitat-sizes": () => import("./landers-zoo/steps/04-habitat-sizes.mdx"),
		"05-details": () => import("./landers-zoo/steps/05-details.mdx"),
		"06-cleanup": () => import("./landers-zoo/steps/06-cleanup.mdx"),
	},
};

export function getStepLoader(projectId, stepId) {
	const map = projectStepLoaders[projectId];
	if (!map) return null;
	const fn = map[stepId];
	return fn || null;
}

export const projectEntries = {
	"landers-zoo": () => import("./entries/landers-zoo.js").then((m) => m.default),
};

export async function loadProjectEntry(projectId) {
	const loader = projectEntries[projectId];
	if (!loader) return null;
	try {
		const entry = await loader();
		return entry || null;
	} catch (e) {
		void e;
		return null;
	}
}

