import { ChallengeTemplates, ChallengeTypes } from "../../../types";

const challenge = {
  id: "JS.AS.FET-001",
  title: "Fetch & Render (GET)",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: [
    "JS.AS.FET",   // Use fetch() to perform GET
    "JS.AS.AAW",   // Use async/await for the fetch
    "JS.DA.UTA",   // Render fetched data into the DOM
    "JS.AR.MTH",   // Transform arrays using map (instead of for...of iteration)
    "JS.SD.ELM",   // Select DOM elements     Update DOM to display the <li> elements
  ],
  primaryStandard: "JS.AS.FET",
  difficulty: 1,
  description: "Marketing wants to display a list of products. Fetch the list from /api/products and render each product as a list item showing Name – $Price (price in dollars). Use async/await and Array.map to build the list items.",
  // Author-only mock metadata for offline fetch seeding
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
    "I can see all products displayed as <li> items once the page loads.",
    "Each list item shows product name and its price with a $ sign."
  ],
  acceptanceCriteria: [
    // Original (author) implementation notes (moved out of learner view):
    // fetch('/api/products') + async/await + res.json(); build li via map; format price (cents->dollars); append to #product-list
    // Revised learner-facing acceptance criteria (outcome focused):
    "On initial page load the app requests product data from the /api/products endpoint (a single network call observed).",
    "After data loads, every product returned is displayed as an <li> inside #product-list (counts match).",
    "Each list item shows the product name, an en dash (–), and a dollar price with exactly two decimals (e.g. 1299 -> $12.99).",
    "Prices are derived from the provided cent values (no hard‑coded dollar amounts).",
    "The list appears automatically without the user clicking a button or manually refreshing."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/index.html": {
      readOnly: true,
      code: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><title>Products</title></head><body>\n<h1>Product List</h1>\n<ul id="product-list"></ul>\n<script type="module" src="/main.js"></script>\n</body></html>`
    },
    "/main.js": {
      code: `// TODO: fetch products from /api/products using async/await\n// Then use Array.map to build <li> strings in the form: Name – $Price\n// Finally insert them into the #product-list element.\n// HINT: Convert cents to dollars with (price/100).toFixed(2)\n\nasync function loadProducts(){\n  // Your code here\n}\n\nloadProducts();\nwindow.__app = { loadProducts }; // manual verification hook`
    }
  },
  entry: "/index.html",
  hints: [
    "Select the list with document.querySelector('#product-list')",
    "Remember: const res = await fetch('/api/products'); const data = await res.json();",
    "Use data.map(p => `<li>${p.name} – $${(p.price/100).toFixed(2)}</li>`).join('')"
  ],
  tags: ["mock-fetch", "get", "beginner", "render"],
  sandbox: { defaultPanel: "preview", showRightPanel: true, showExplorer: true }
};

export default challenge;
