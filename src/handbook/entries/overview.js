// New-style HandbookEntry for the "overview" standard.
// This demonstrates the editor+preview/console workbench alongside the handbook markdown.

/**
 * @typedef {Object} HandbookFile
 * @property {string} path
 * @property {string} content
 * @property {boolean=} active
 * @property {boolean=} hidden
 * @property {boolean=} readOnly
 * @property {"code"|"asset"|"html"=} type
 *
 * @typedef {Object} HandbookSandbox
 * @property {"browser"|"dom"|"node"=} runtime
 * @property {string=} html
 *
 * @typedef {Object} HandbookMock
 * @property {Record<string, any>=} apiSeed
 * @property {{ slowMs?: number, failOnFirst?: boolean }=} mockNet
 *
 * @typedef {Object} HandbookEntry
 * @property {string} id
 * @property {string} standard
 * @property {HandbookFile[]} files
 * @property {string} entry
 * @property {HandbookSandbox} sandbox
 * @property {HandbookMock=} mock
 * @property {string} handbookMarkdown
 * @property {string[]=} tags
 */

/** @type {HandbookEntry} */
const entry = {
  id: "overview-editor-intro",
  standard: "overview",
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
        "    <title>Handbook Workbench</title>\n" +
        "  </head>\n" +
        "  <body>\n" +
        "    <main>\n" +
        "      <h1 id=\"title\">Handbook Workbench</h1>\n" +
        "      <p id=\"message\">Open the Console, then edit /main.js and watch it re-run.</p>\n" +
        "      <ul id=\"list\"></ul>\n" +
        "    </main>\n" +
        "    <script type=\"module\" src=\"/main.js\"></script>\n" +
        "  </body>\n" +
        "</html>",
    },
    {
      path: "/main.js",
      active: true,
      content:
        "// Try editing and watch Console & Preview update\n" 
    },
  ],
  entry: "/index.html",
  sandbox: {
    runtime: "dom",
    html: "<div id='app'></div>",
  },
  mock: undefined,
  handbookMarkdown: `# Welcome to your JavaScript Handbook!!

As you read, you’ll see **challenges** that ask you to try ideas in the editor on the right. Do them as you go—no one learns just by reading or listening. Everyone and their mom learns by **doing**.

**Editor basics (quick):**

* If you’re just writing JS, open the **Console**.
* If you’re also working with HTML or CSS, look at the **Preview**.
* Code runs automatically. If it gets finicky, nudge it—make a tiny change and change it back.

## What JavaScript is (and isn’t)

JavaScript isn’t magic. It can feel that way at first, but it’s really a **toolbox for manipulating data**.

* Posting on Instagram → **Create** data
* Scrolling your feed → **Read** data
* Changing your username → **Update** data
* Deleting a post → **Delete** data

That’s **CRUD**, and it’s most of what we do.

Our goal here isn’t to teach you *every* tool in the JS toolbox. It’s to teach you the **basic tools you’ll actually use** in web development—and **when** to use them.

## Your first tool: \`console.log\`

Think of \`console.log\` as your **stethoscope**—it lets you *hear* what your code is doing.

\`\`\`js
console.log("Hello, handbook!");
\`\`\`

You’ll use it constantly to check values, confirm what ran, and debug surprises.

---

### Challenge: Strings in the console

Try this quick exercise in the editor. In three separate lines, log three strings: \`"first"\`, \`"second"\`, and \`"third"\`.

1) Write three lines:

\`\`\`js
console.log("first");
console.log("second");
console.log("third");
\`\`\`

2) Run the code and notice the order of messages in the console.

3) Now change the order of the three lines and run again. What changed?

4) Finally, remove the quotes from one of the words (e.g., \`console.log(first)\`). What error do you see, and why?

Hint: Quotes make a *string* value. Without quotes, JavaScript thinks \`first\` is a variable name—and if there’s no such box, you’ll get a \`ReferenceError\`.
`,
  tags: ["intro"],
};

export default entry;
