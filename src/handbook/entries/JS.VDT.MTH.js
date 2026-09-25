// Handbook entry for JS.VDT.MTH (Variables & Data Types · Methods & Properties)

/** @type {import('./overview.js').HandbookEntry} */
const entry = {
  id: "JS.VDT.MTH-wb",
  standard: "JS.VDT.MTH",
  files: [
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
  entry: "/main.js",
  sandbox: { runtime: "dom", defaultPanel: "console" },
  mock: undefined,
  handbookMarkdown: "",
  tags: [],
};

export default entry;
