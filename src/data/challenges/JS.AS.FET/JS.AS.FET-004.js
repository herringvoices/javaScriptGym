import { ChallengeTemplates, ChallengeTypes } from "../../../types";

const challenge = {
  id: "JS.AS.FET-004",
  title: "Delete a Product (DELETE)",
  challengeType: ChallengeTypes.CODE_AND_SEE,
  standards: [
    "JS.AS.FET",   // Use fetch() with DELETE
    "JS.AS.AAW",   // Use async/await
    "JS.DA.UTA",   // Update DOM to remove item
    "JS.AR.ACC",   // Update array after deletion
    "JS.SD.ELM"    // DOM selection
  ],
  primaryStandard: "JS.AS.FET",
  difficulty: 2,
  description: "Enable deletion of a product via DELETE /api/products/:id. Render a list with a delete button for each product. When clicked, send DELETE and remove that item from the DOM (and local state) without a full reload.",
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
    "I can see a Delete button next to each product.",
    "When I click Delete the product disappears from the list."
  ],
  acceptanceCriteria: [
    // Original implementation notes: render li+button; DELETE /api/products/:id; remove li; filter local array
    "Each product is initially rendered with an adjacent control for removal (one control per product).",
    "Activating a product's removal control eliminates only that product from the DOM list promptly (others remain).",
    "After a removal, subsequent removals still function on remaining products (state stays consistent).",
    "Removed products do not reappear on further interactions without a full reload.",
    "No orphaned delete controls remain for products that are gone."
  ],
  template: ChallengeTemplates.VANILLA,
  files: {
    "/index.html": {
      readOnly: true,
      code: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><title>Delete Product</title></head><body>\n<h1>Products</h1>\n<ul id="product-list"></ul>\n<script type="module" src="/main.js"></script>\n</body></html>`
    },
    "/main.js": {
      code: `// Goal: Delete a product via DELETE and remove it from the DOM.\n// Implementation intentionally incomplete — fill in each TODO.\n\nconst listEl = document.querySelector('#product-list');\nlet products = []; // fetched products\n\nfunction productLi(p){\n  return '<li data-id="' + p.id + '">' + p.name + ' – $' + (p.price/100).toFixed(2) + ' <button class="delete-btn" data-id="' + p.id + '">Delete</button></li>';\n}\n\n// TODO 1: loadProducts()\n//  - fetch /api/products\n//  - store in products\n//  - listEl.innerHTML = products.map(productLi).join('')\n// function loadProducts() {}\n\n// TODO 2: deleteProduct(id)\n//  - DELETE /api/products/:id\n//  - update products (filter out id)\n//  - remove the matching <li> (query [data-id])\n// function deleteProduct(id) {}\n\n// TODO 3: Event delegation\n//  - click handler on listEl\n//  - if target.matches('.delete-btn') get data-id and call deleteProduct\n// listEl.addEventListener('click', async (e) => {});\n\n// window.__app = { loadProducts, deleteProduct }; // expose after implementing\n// loadProducts(); // call after implementing`
    }
  },
  entry: "/index.html",
  hints: [
    "Focus: fetch -> render -> delegate clicks.",
    "Filter returns new array; no splice.",
    "[data-id] lets you target one element to remove."
  ],
  tags: ["mock-fetch", "delete", "remove", "intermediate"],
  sandbox: { defaultPanel: "preview", showRightPanel: true, showExplorer: true }
};

export default challenge;
