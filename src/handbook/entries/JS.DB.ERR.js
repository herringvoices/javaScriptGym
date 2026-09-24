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
      content: `const inventory = [
  {
    id: 1,
    name: "Holy Umbrella",
    description: "An umbrella with holes in it.",
    clearance: true
    priceInPennies: 2223,
  },
  {
    id: 2,
    name: "Definitely Normal Mirror",
    description: "Your reflection blinks slightly late.",
    clearance: false,
    priceInPennies: 4899,
  },
  {
    id: 3,
    name: "Possibly Haunted Toaster",
    description: "Burns an image of someone you miss into every slice.",
    clearance: true,
    priceInPennies: 1599,
  },
  {
    id: 4,
    name: "Magic 8 Ball",
    description: "A Magic 8 Ball with suspiciously specific answers.",
    clearance: false,
    priceInPennies: 1199,
  },
];

const shopManager = "Mike";

function formatItemName(item) {
  return item.name.toUpperCase();
}

function formatPrice(item) {
  return \`$\${(item.priceInPennies / 100).toFixed(2)}\`;
}

function printItem(item) {
  console.log(\`\${formatItemName(item)} - \${formatPrice(item)}\`);
}

console.log("======WEIRD MIKE'S PAWN SHOP======");
console.log(\`Manager: \${managerName}\`);
console.log(\`Number of Items: \${inventory.length()}\`);

console.log("======INVENTORY======");
for (const item of inventory) {
  printItem(inventory);
}

const requestedItemId = 1;
const requestedItem = inventory.find((item) => item.id === requestedItemId);
console.log("======REQUESTED ITEM======");
printItem(requestedItem);
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
