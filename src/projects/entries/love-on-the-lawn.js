// Project entry for Love on the Lawn
// Starter files: index.html, main.js (active), database.js, lawnDecorations.js, romanceNovels.js, styles.css

const INDEX_HTML = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Love on the Lawn</title>
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body>
    <main id="store-container"></main>
    <script type="module" src="/main.js"></script>
  </body>
</html>`;

const DATABASE_JS = `// database.js

const database = {
  lawnDecorations: [
    { id: 1, name: "Solar-Powered Flamingo", vibe: "Cheerfully chaotic", priceInCents: 2499 },
    { id: 2, name: "Stoic Stone Gnome", vibe: "Judges your life choices", priceInCents: 1899 },
    { id: 3, name: "Whimsical Windmill", vibe: "Spins with quiet dignity", priceInCents: 1599 },
    { id: 4, name: "Classy Stone Frog", vibe: "Thinks deeply about ponds", priceInCents: 1299 },
  ],
  romanceNovels: [
    { id: 1, title: "Love in the Lawn & Garden Aisle", trope: "Workplace romance", priceInCents: 999 },
    { id: 2, title: "Kiss Me Under the Windmill", trope: "Second chance", priceInCents: 1299 },
    { id: 3, title: "The Inflatable and the Introvert", trope: "Opposites attract", priceInCents: 899 },
    { id: 4, title: "A Flamingo for Two", trope: "Enemies to lovers", priceInCents: 1499 },
  ],
};

export const getLawnDecorations = () => {
  return database.lawnDecorations.map((item) => ({ ...item }));
};

export const getRomanceNovels = () => {
  return database.romanceNovels.map((item) => ({ ...item }));
};
`;

const LAWN_JS = `// lawnDecorations.js
import { getLawnDecorations } from './database.js';

export const LawnDecorationsList = () => {
  const decorations = getLawnDecorations();

  let html = '\n    <section class="inventory-section lawn-decorations">\n      <h2>Lawn Decorations</h2>\n      <ul>\n  ';

  for (const decor of decorations) {
    html += '\n      <li>\n        <strong>' + decor.name + '</strong>\n        <span>— ' + decor.vibe + '</span>\n        <span> ($' + (decor.priceInCents / 100).toFixed(2) + ')</span>\n      </li>\n    ';
  }

  html += '\n      </ul>\n    </section>\n  ';

  return html;
};
`;

const ROMANCE_JS = `// romanceNovels.js
import { getRomanceNovels } from './database.js';

export const RomanceNovelsList = () => {
  const novels = getRomanceNovels();

  let html = '\n    <section class="inventory-section romance-novels">\n      <h2>Romance Novels</h2>\n      <ul>\n  ';

  for (const book of novels) {
    html += '\n      <li>\n        <strong>' + book.title + '</strong>\n        <span>— ' + book.trope + '</span>\n        <span> ($' + (book.priceInCents / 100).toFixed(2) + ')</span>\n      </li>\n    ';
  }

  html += '\n      </ul>\n    </section>\n  ';

  return html;
};
`;

const MAIN_JS = `// main.js
import { LawnDecorationsList } from './lawnDecorations.js';
import { RomanceNovelsList } from './romanceNovels.js';

// Chapter 3: Target the DOM
const storeContainer = document.querySelector('#store-container');
console.log('Store container found:', storeContainer);

// Chapter 4: Compose the final HTML string (we build it but do not inject yet)
const lawnHTML = LawnDecorationsList();
const romanceHTML = RomanceNovelsList();

export const storeHTML = '\n  <h1>Love on the Lawn</h1>\n  <p class="tagline">Your one-stop shop for bold decor and even bolder plot twists.</p>\n' + lawnHTML + romanceHTML;

// Chapter 5 (students will set storeContainer.innerHTML = storeHTML to inject)
console.log('Prepared storeHTML length:', storeHTML.length);
`;

const STYLES_CSS = `body { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; background: #0f172a; color: #e6eef8; padding: 2rem; }
.tagline { color: #ffd6e0; margin-bottom: 1rem; }
.inventory-section { background: rgba(255,255,255,0.03); padding: 0.75rem 1rem; border-radius: 6px; margin-bottom: 1rem; }
.lawn-decorations { border-left: 4px solid #f472b6; }
.romance-novels { border-left: 4px solid #60a5fa; }
ul { margin: 0.5rem 0 0 1rem; }
li { margin-bottom: 0.5rem; }
`;

export default {
  id: 'love-on-the-lawn',
  title: 'Love on the Lawn',
  files: [
    { path: '/index.html', content: INDEX_HTML, active: false },
    { path: '/main.js', content: MAIN_JS, active: true },
    { path: '/database.js', content: DATABASE_JS, readOnly: false },
    { path: '/lawnDecorations.js', content: LAWN_JS, readOnly: false },
    { path: '/romanceNovels.js', content: ROMANCE_JS, readOnly: false },
    { path: '/styles.css', content: STYLES_CSS, readOnly: false },
  ],
  entry: '/index.html',
};
