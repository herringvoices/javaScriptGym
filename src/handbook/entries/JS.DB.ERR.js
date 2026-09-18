// Handbook entry for Debugging · Error Messages & Stack Traces

/** @type {import('./overview.js').HandbookEntry} */
const entry = {
  id: "JS.DB.ERR",
  standard: "JS.DB.ERR",
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
        "    <title>Debugging Workbench</title>\n" +
        "  </head>\n" +
        "  <body>\n" +
        "    <script type=\"module\" src=\"/main.js\"></script>\n" +
        "  </body>\n" +
        "</html>",
    },
    {
      path: "/main.js",
      active: true,
      content: `const firstName = "Mina";
const lastName = "Lopez";

console.log(\`First name: \${lastName}\`);
console.log(\`Last name: \${firstName}\`);
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
