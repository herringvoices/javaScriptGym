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
    {
        id: "love-on-the-lawn",
        title: "Love on the Lawn",
        summary: "Build a small storefront that turns two data lists (lawn decorations and romance novels) into HTML and injects them into the page.",
        standards: ["JS.FN.BAS", "JS.VDT.COL", "JS.VDT.PRM"],
        steps: [
            { id: "01-seed-data", title: "Seed the Data (database.js)" },
            { id: "02-generators", title: "HTML Generators (lawnDecorations & romanceNovels)" },
            { id: "03-target-dom", title: "Target the DOM (main.js)" },
            { id: "04-compose-html", title: "Compose the Final HTML String (main.js)" },
            { id: "05-inject", title: "Inject into the Page (main.js)" },
            { id: "06-stretch", title: "Stretch Goals & Extras" },
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
	"love-on-the-lawn": {
		"01-seed-data": () => import("./love-on-the-lawn/steps/01-seed-data.mdx"),
		"02-generators": () => import("./love-on-the-lawn/steps/02-generators.mdx"),
		"03-target-dom": () => import("./love-on-the-lawn/steps/03-target-dom.mdx"),
		"04-compose-html": () => import("./love-on-the-lawn/steps/04-compose-html.mdx"),
		"05-inject": () => import("./love-on-the-lawn/steps/05-inject.mdx"),
		"06-stretch": () => import("./love-on-the-lawn/steps/06-stretch.mdx"),
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
    "love-on-the-lawn": () => import("./entries/love-on-the-lawn.js").then((m) => m.default),
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

