// Handbook entry for Debugging · Common Bugs & Fixes

/** @type {import('./overview.js').HandbookEntry} */
const entry = {
  id: "JS.DB.BUG",
  standard: "JS.DB.BUG",
  files: [
    {
      path: "/main.js",
      type: "javascript",
      active: true,
      content: /*js*/ `// Lil' Florian's Video Rental — JS.DB.BUG

const movies = [
  {
    title: "The Moon Owes Me Five Dollars",
    copiesAvailable: 2,
  },
  {
    title: "Attack of the Sentient Cardigan",
    copiesAvailable: 5,
  },
  {
    title: "Tuesday Is Cancelled",
    copiesAvailable: 0,
  },
  {
    title: "My Uncle Is a Time Machine",
    copiesAvailable: 3,
  },
];

function getCopyStatus(copiesAvailable) {
  if (copiesAvailable <= 2) {
    return "ORDER MORE";
  }

  return "READY TO RENT";
}

function printCopyInventory(movies) {
  let orderMoreCount = 0;

  console.log("======LIL' FLORIAN'S COPY INVENTORY======");

  for (let i = 0; i < movies.length - 1; i++) {
    const movie = movies[i];
    const status = getCopyStatus(movie.copies);

    if (status === "ORDER MORE") {
      orderMoreCount++;
    }

    console.log(
      \`\${movie.title}: \${movie.copiesAvailable} copies — \${status}\`
    );
  }

  console.log(\`Movies checked: \${movies.length}\`);
  console.log(\`Movies needing copies: \${orderMoreCount}\`);
}

printCopyInventory(videoInventory);
`,
    },
  ],
  entry: "/main.js",
  sandbox: {
    runtime: "dom",
    defaultPanel: "console",
    showRightPanel: true,
    showExplorer: true,
  },
  mock: undefined,
  handbookMarkdown: "",
  tags: [],
};

export default entry;
