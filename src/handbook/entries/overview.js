// New-style HandbookEntry for the "overview" standard with a comments section added.
// Demonstrates the editor+preview/console workbench alongside the handbook markdown.

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
        "// Try editing and watch Console & Preview update\n" +
        "console.log(\"Hello, handbook!\");\n\n" +
        "// Tip: Ctrl+/ (Cmd+/ on Mac) toggles comments on the selected line(s).\n" +
        "// console.log(\"This line is commented out and won't run.\");\n\n" +
        "// End-of-line comment example: the code still runs, the comment is ignored.\n" +
        "console.log(\"Right here\"); // This note is for humans only\n",
    },
  ],
  entry: "/index.html",
  sandbox: {
    runtime: "dom",
    html: "<div id='app'></div>",
  },
  mock: undefined,
  handbookMarkdown: `# Welcome to your JavaScript Handbook!!

As you read, you’ll see **challenges** that ask you to try ideas in the editor on the right. Do them as you go along, and feel free to take chances and play around beyond what the challenges ask you to do.
No one learns by just reading a book or listening to a lecture. We learn by turning our brains on and applying new ideas as we encounter them.

**Editor basics (quick):**

* If you’re just writing JavaScript, open the **Console**.
* If you’re also working with HTML or CSS, look at the **Preview**.
* Code runs automatically. If it gets finicky, nudge it—make a tiny change and change it back.

## What JavaScript is (and isn’t)

JavaScript isn’t magic. It can feel that way at first, but it’s really a **toolbox for manipulating data**.

* Posting on Instagram → **Create** data
* Scrolling your feed → **Read** data
* Changing your username → **Update** data
* Deleting a post → **Delete** data

That’s **CRUD**, and it’s most of what we do.

Our goal here isn’t to teach you *every* tool in the JavaScript toolbox. It’s to teach you the **basic tools you’ll actually use** in web development—and **when** to use them.

## Your first tool: \`console.log\`

Think of \`console.log\` as your **stethoscope**—it lets you *hear* what your code is doing.

\`\`\`js
console.log("Hello, handbook!");
\`\`\`

You’ll use it constantly to check values, confirm what ran, and debug surprises.

---

### Challenge: Console warm-up

1) Log three words on three lines: \`"first"\`, \`"second"\`, \`"third"\`.
2) Run and check the Console.
3) Reorder the lines and run again. What changed?
4) Remove the quotes from one line (e.g., \`console.log(first)\`). What error do you see, and why?

**Expected console output (step 1):**

\`\`\`
first
second
third
\`\`\`

_Hint:_ Quotes mark **text** so JavaScript doesn’t think it’s a variable name.

---

## How JavaScript runs (top to bottom)

JavaScript reads your file **top to bottom, one line at a time**. It isn’t psychic—it doesn’t read ahead or guess your plan. If line 3 uses something that isn’t defined until line 20, you’ll get an error.

\`\`\`js
console.log(greeting); // ❌ ReferenceError: Cannot access 'greeting' before initialization
const greeting = "hi";
\`\`\`

We’ll learn patterns that run code later (events, functions), but for now think of your file like a book: **top → bottom**.

### Challenge: Order matters

1) Copy this code into the editor and run it.

\`\`\`js
console.log(greeting);
const greeting = "hi";
\`\`\`

2) Now **move** the second line above the first so the value is defined before it’s used.
3) Run again.

**Expected console output (after step 2):**

\`\`\`
hi
\`\`\`

---

## Comments: notes for humans (and how to toggle them)

Programs are for computers *and* for people. **Comments** are short notes the computer ignores but teammates (and future-you) will appreciate.

* **Line comment**: anything after \`//\` on a line is ignored
* **Toggle quickly**: press **Ctrl+/** (Windows/Linux) or **Cmd+/** (Mac) to comment/uncomment selected lines

\`\`\`js
console.log("Visible");
// console.log("Hidden for now"); // toggled off with Ctrl+/ (Cmd+/ on Mac)
console.log("Still visible"); // end-of-line comment is fine, too
\`\`\`

**Why it matters:** comments help you explain intent, leave TODOs, or temporarily silence a line while you test something. They do **not** change how the program runs—JavaScript ignores them completely.

### Challenge: Comment it out

1) Reproduce the error from earlier by removing quotes: \`console.log(first)\`.
2) Use **Ctrl+/** (or **Cmd+/**) to comment out that broken line.
3) Run again—you should only see the lines that are still active.
4) Toggle the comment shortcut again to bring the line back.

**Expected console output (after step 2):**

\`\`\`
first
third
\`\`\`
`,
  tags: ["intro"],
};

export default entry;
