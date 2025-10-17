import { ChallengeTemplates, ChallengeTypes } from "../../../types";

const challenge = {
  id: "JS.AS.FET-002",
  title: "Add a Product (POST)",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: [
    "JS.AS.FET",   // Use fetch() with POST
    "JS.AS.AAW",   // Use async/await
    "JS.DA.UTA",   // Update DOM based on API result
    "JS.AR.ACC",   // Update arrays/objects after POST
    "JS.SD.ELM"    // Select & update DOM elements
  ],
  primaryStandard: "JS.AS.FET",
  difficulty: 1,
  description: "Allow marketing to add a new product. Provide a small form that POSTs to /api/products with name and priceInCents, then render the updated list including the new product.",
  mock: {
    apiSeed: {
      products: [
        { id: 1, name: "Colombian Coffee", price: 1299 },
        { id: 2, name: "Ethiopian Yirgacheffe", price: 1499 }
      ]
    },
    mockNet: { slowMs: 0, failOnFirst: false }
  },
  userStories: [
    "I can fill out a form with name and price (in cents) and submit it.",
    "After submitting, the new product appears in the product list without a page reload."
  ],
  acceptanceCriteria: [
    // Original (author) implementation notes: form submit -> preventDefault -> POST JSON -> await created product -> append new li (cents->dollars)
    "A product entry form is visible with two fields (text for name, numeric for price in cents) and a submit control.",
    "Submitting the form adds exactly one new item to the existing rendered list without a full page reload.",
    "The newly added list item displays the entered name and a correctly formatted dollar price with two decimals derived from the submitted cent value.",
    "Previously listed products remain visible and unchanged after adding a new one.",
    "If multiple submissions are made, each distinct product appears once (no duplicates of the same id)."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/index.html": {
      readOnly: true,
      code: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><title>Add Product</title></head><body>\n<h1>Products</h1>\n<ul id="product-list"></ul>\n<h2>Add Product</h2>\n<form id="product-form">\n<input name="name" placeholder="Name" required />\n<input name="price" type="number" placeholder="Price (cents)" required />\n<button>Add</button>\n</form>\n<script type="module" src="/main.js"></script>\n</body></html>`
    },
    "/main.js": {
      code: `// Goal: Fetch initial products and allow adding a new product via POST.\n// NOTE: Implementation intentionally incomplete — fill in the TODOs.\n\nconst listEl = document.querySelector('#product-list');\nconst form = document.querySelector('#product-form');\n\n// TODO 1: Write an async function loadProducts()\n//  - fetch /api/products\n//  - await res.json()\n//  - render <li> items into listEl (use map + join) in the format Name – $Price\n//  - Price: (price/100).toFixed(2)\n\n// function loadProducts() { /* your code */ }\n\n// Helper (optional): returns an <li> string for a product object\nfunction productLi(p){\n  return '<li data-id="' + p.id + '">' + p.name + ' – $' + (p.price/100).toFixed(2) + '</li>';\n}\n\n// TODO 2: Attach a submit listener to the form\n//  - prevent default\n//  - read form values (FormData or direct)\n//  - POST to /api/products with JSON body { name, price: Number(price) }\n//  - await created product JSON\n//  - append a single new <li> to the list without reloading all\n\n// form.addEventListener('submit', async (e) => { /* your code */ });\n\n// OPTIONAL: expose for manual testing in console once written\nwindow.__app = { /* loadProducts, addProduct */ };\n\n// Finally: call loadProducts() once you implement it.`
    }
  },
  entry: "/index.html",
  hints: [
    "Start by selecting #product-list and #product-form.",
    "Remember: async function + await fetch + await res.json().",
    "String building: array.map(productLi).join('')."
  ],
  tags: ["mock-fetch", "post", "beginner", "form"],
  sandbox: { defaultPanel: "preview", showRightPanel: true, showExplorer: true }
};

export default challenge;
