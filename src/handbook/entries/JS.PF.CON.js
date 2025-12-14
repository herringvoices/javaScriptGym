// Handbook entry for JS.PF.CON (Conditionals)

/** @type {import('./overview.js').HandbookEntry} */
const entry = {
	id: "JS.PF.CON-wb",
	standard: "JS.PF.CON",
	files: [
		{
			path: "/index.html",
			type: "html",
			readOnly: true,
			content:
				"<!doctype html>\n" +
				"<html>\n" +
				"  <head>\n" +
				"    <meta charset=\"utf-8\" />\n" +
				"    <title>Conditionals Workbench</title>\n" +
				"  </head>\n" +
				"  <body>\n" +
				"    <main>\n" +
				"      <h1>Conditionals</h1>\n" +
				"      <div id=\"app\"></div>\n" +
				"    </main>\n" +
				"    <script type=\"module\" src=\"/main.js\"></script>\n" +
				"  </body>\n" +
				"</html>",
		},
		{
			path: "/main.js",
			active: true,
			content: `
const pumpkinSeed = {
	type: 'pumpkin',
	size: 8,
	isClean: true,
	moisture: 0,
	condition: null,
};

const watermelonSeed = {
	type: 'watermelon',
	size: 8,
	isClean: true,
	moisture: 0.7,
	condition: null,
};

const sunflowerSeed = {
	type: 'sunflower',
	size: 6,
	isClean: false,
	moisture: 0.1,
	condition: null,
};

const sesameSeed = {
	type: 'sesame',
	size: 4,
	isClean: true,
	moisture: 0.2,
	condition: null,
};

const barrel = []
			`,
		},
	],
	entry: "/index.html",
	sandbox: { runtime: "dom" },
	mock: undefined,
	handbookMarkdown: "",
	tags: [],
};

export default entry;
