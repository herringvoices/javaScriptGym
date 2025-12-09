// Handbook entry for JS.VDT.MTH (Variables & Data Types · Methods & Properties)

/** @type {import('./overview.js').HandbookEntry} */
const entry = {
  id: "JS.VDT.MTH-wb",
  standard: "JS.VDT.MTH",
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
        "    <title>Methods & Properties Workbench</title>\n" +
        "  </head>\n" +
        "  <body>\n" +
        "    <main>\n" +
        "      <h1>Methods & Properties</h1>\n" +
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
      const book1 = {
  title: "The Way of Kings",
  author: "Brandon Sanderson",
  pages: 1010,
  isPaperback: false,
  genre: "Fantasy",
};

const book2 = {
  title: "Words of Radiance",
  author: "Brandon Sanderson",
  pages: 1100,
  isPaperback: false,
};

const book3 = {
  title: "Oathbringer",
  author: "Brandon Sanderson",
  pages: 1248,
  isPaperback: false,
};

const books = [book1, book2, book3];

console.log(books.length);
console.log(books[0].title);
console.log(books[2].author);
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
