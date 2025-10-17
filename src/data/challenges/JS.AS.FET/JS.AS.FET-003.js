import { ChallengeTemplates, ChallengeTypes } from "../../../types";

const challenge = {
  id: "JS.AS.FET-003",
  title: "Update Product Price (PUT)",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: [
    "JS.AS.FET",   // Use fetch() with PUT
    "JS.AS.AAW",   // Use async/await
    "JS.DA.UTA",   // Update DOM with new data
    "JS.AR.ACC",   // Update arrays/objects
    "JS.SD.ELM"    // DOM selection & manipulation
  ],
  primaryStandard: "JS.AS.FET",
  difficulty: 2,
  description: "Provide a way to update the price (in cents) of an existing product using PUT /api/products/:id. After updating, reflect the new formatted $ price in the list without reloading the page.",
  mock: {
    apiSeed: {
      products: [
        { id: 1, name: "Colombian Coffee", price: 1299 },
        { id: 2, name: "Ethiopian Yirgacheffe", price: 1499 },
        { id: 3, name: "Kenya AA", price: 1399 }
      ]
    },
    mockNet: { slowMs: 0, failOnFirst: false }
  },
  userStories: [
    "I can choose a product and enter a new price (cents).",
    "After submitting the update, the product's displayed price changes."
  ],
  acceptanceCriteria: [
    // Original implementation notes: initial render <li data-id>; select populated; PUT to /api/products/:id with JSON {price}; update only changed <li>; format cents->dollars
    "On initial load all existing products are displayed as individual list items each identifiable by a data attribute for its id.",
    "A UI control allows choosing one existing product and entering a new numeric price in cents before submitting.",
    "Submitting an update changes only the targeted product's displayed dollar price (two decimals) without re-rendering unaffected items (others retain object identity / order).",
    "The displayed price reflects the new cent value converted to dollars; prior price value is no longer visible.",
    "Multiple successive updates to different products are each reflected accurately in the list."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/index.html": {
      readOnly: true,
      code: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><title>Update Product</title></head><body>\n<h1>Products</h1>\n<ul id="product-list"></ul>\n<h2>Update Price</h2>\n<form id="update-form">\n<select id="product-id" name="id"></select>\n<input id="new-price" name="price" type="number" placeholder="New Price (cents)" required />\n<button>Update</button>\n</form>\n<script type="module" src="/main.js"></script>\n</body></html>`
    },
    "/main.js": {
      code: `// Goal: Update the price of a selected product using PUT.\n// Fill in the missing pieces (fetching, rendering, updating).\n\nconst listEl = document.querySelector('#product-list');\nconst selectEl = document.querySelector('#product-id');\nconst form = document.querySelector('#update-form');\n\nlet products = []; // will hold fetched products\n\n// Helper (optional)\nfunction productLi(p){\n  return '<li data-id="' + p.id + '">' + p.name + ' – $' + (p.price/100).toFixed(2) + '</li>';\n}\n\n// TODO 1: loadProducts()\n//  - fetch /api/products\n//  - store in products\n//  - render list (map + join using productLi)\n//  - build <option> list for the <select>\n// function loadProducts() {}\n\n// TODO 2: updatePrice(id, newPrice)\n//  - PUT /api/products/:id with JSON { price: Number(newPrice) }\n//  - update local products array (map)\n//  - update ONLY the matching <li> textContent (no full re-render required)\n// function updatePrice(id, newPrice) {}\n\n// TODO 3: form submit handler\n//  - prevent default\n//  - read selected id + new price value\n//  - call updatePrice\n//  - reset form\n// form.addEventListener('submit', async (e) => {});\n\n// window.__app = { loadProducts, updatePrice }; // expose after implementing\n// loadProducts(); // call after implementation`
    }
  },
  entry: "/index.html",
  hints: [
    "Write loadProducts first; verify products length in console.",
    "Update only the changed <li> instead of rebuilding all.",
    "Map to create new array when updating one record."
  ],
  tags: ["mock-fetch", "put", "update", "intermediate"],
  sandbox: { defaultPanel: "preview", showRightPanel: true, showExplorer: true }
};

export default challenge;
