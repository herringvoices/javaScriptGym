// Handbook entry for JS.SD.EVH (State & DOM · Events & Handlers)

/** @type {import('./overview.js').HandbookEntry} */
const entry = {
  id: "JS.SD.EVH-ps",
  standard: "JS.SD.EVH",
  files: [
    {
      path: "/index.html",
      type: "html",
      readOnly: true,
      content: /*html*/ `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Potion Shelf</title>
    <link rel="stylesheet" href="/styles/styles.css" />
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/scripts/main.js"></script>
  </body>
</html>`,
    },

    {
      path: "/styles/styles.css",
      type: "css",
      readOnly: true,
      content: /*css*/ `:root{
  --bg0: #0b1220;
  --bg1: #0f1a2f;
  --card: rgba(255, 255, 255, 0.06);
  --card2: rgba(255, 255, 255, 0.09);
  --border: rgba(255, 255, 255, 0.10);
  --text: rgba(255, 255, 255, 0.92);
  --muted: rgba(255, 255, 255, 0.70);
  --faint: rgba(255, 255, 255, 0.55);

  --accent: #6ee7ff;
  --accent2: #a78bfa;

  --radius: 16px;
  --shadow: 0 18px 40px rgba(0,0,0,.35);
  --shadow2: 0 10px 22px rgba(0,0,0,.25);
}

* { box-sizing: border-box; }
html, body { height: 100%; }

body{
  margin: 0;
  color: var(--text);
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
  line-height: 1.45;
  background:
    radial-gradient(1100px 700px at 20% -10%, rgba(110,231,255,.18), transparent 60%),
    radial-gradient(900px 600px at 95% 0%, rgba(167,139,250,.16), transparent 55%),
    linear-gradient(180deg, var(--bg0), var(--bg1));
}

#app{
  max-width: 1100px;
  margin: 0 auto;
  padding: 28px 16px 44px;
}

.header{
  padding: 18px 18px 12px;
  border: 1px solid var(--border);
  background: linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.04));
  border-radius: calc(var(--radius) + 6px);
  box-shadow: var(--shadow);
}

.header h1{
  margin: 0;
  font-size: clamp(28px, 4vw, 40px);
  letter-spacing: -0.02em;
}

.subtitle{
  margin: 6px 0 0;
  color: var(--muted);
  max-width: 70ch;
}

.layout{
  margin-top: 18px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
}

.panel{
  border: 1px solid var(--border);
  background: linear-gradient(180deg, var(--card2), var(--card));
  border-radius: var(--radius);
  box-shadow: var(--shadow2);
  padding: 16px;
}

.panel h2{
  margin: 0 0 10px;
  font-size: 18px;
  letter-spacing: -0.01em;
}

.placeholder{
  margin: 0;
  color: var(--faint);
}

.field{
  display: grid;
  gap: 6px;
  margin: 12px 0;
}

.field__label{
  font-size: 13px;
  color: var(--muted);
}

select{
  width: 100%;
  color: var(--text);
  background: rgba(0,0,0,.22);
  border: 1px solid rgba(255,255,255,.14);
  border-radius: 12px;
  padding: 10px 12px;
  outline: none;
}

select:focus{
  border-color: rgba(110,231,255,.55);
  box-shadow: 0 0 0 4px rgba(110,231,255,.10);
}

.potionList{
  list-style: none;
  padding: 0;
  margin: 12px 0 0;
  display: grid;
  gap: 10px;
}

.potion{
  border: 1px solid var(--border);
  background: rgba(0,0,0,.18);
  border-radius: 14px;
  padding: 12px 12px 10px;
}

.potion__name{
  margin: 0;
  font-size: 18px;
}

.potion__meta{
  margin: 6px 0 0;
  color: var(--muted);
  font-size: 14px;
}

.details{
  border: 1px dashed rgba(255,255,255,.18);
  background: rgba(0,0,0,.16);
  border-radius: 14px;
  padding: 12px;
}

.details__line{
  margin: 6px 0;
  color: rgba(255,255,255,.86);
}

.details__line strong{
  color: rgba(255,255,255,.92);
}

@media (min-width: 880px){
  .layout{
    grid-template-columns: 1.2fr 1fr;
    align-items: start;
  }

  #potionDetails{
    grid-column: 1 / -1;
  }
}
`,
    },

    // -----------------------------
    // Data (RO)
    // -----------------------------
    {
      path: "/scripts/database.js",
      type: "javascript",
      readOnly: true,
      content: /*js*/ `const database = {
  schools: [
    { id: 1, name: "Healing" },
    { id: 2, name: "Fire" },
    { id: 3, name: "Frost" },
    { id: 4, name: "Shadow" },
    { id: 5, name: "Nature" }
  ],

  effects: [
    {
      id: 1,
      description: "Knits minor cuts and bruises closed in under a minute.",
      warning: "May cause sudden optimism and unsolicited compliments."
    },
    {
      id: 2,
      description: "Warms your core like a campfire, even in a blizzard.",
      warning: "Do not sip while already angry. Results get… dramatic."
    },
    {
      id: 3,
      description: "Chills the air around you and dulls pain for a short time.",
      warning: "Side effect: speaking in slow, ominous sentences."
    },
    {
      id: 4,
      description: "Muffles your footsteps and dims your presence in a crowd.",
      warning: "Do not use near cats. They will still find you."
    },
    {
      id: 5,
      description: "Encourages rapid plant growth and strengthens leafy allies.",
      warning: "Not responsible for vines where vines should not be."
    },
    {
      id: 6,
      description: "Clears your head and sharpens focus for difficult tasks.",
      warning: "May lead to reorganizing your entire life at 2am."
    },
    {
      id: 7,
      description: "Creates a brief protective shimmer that turns aside small impacts.",
      warning: "The shimmer is not stealthy. You will look magical on purpose."
    },
    {
      id: 8,
      description: "Gives a burst of speed for one heroic sprint.",
      warning: "Momentum is a real thing. Plan your stopping strategy."
    }
  ],

  potions: [
    { id: 1, name: "Mender's Sip", schoolId: 1, effectId: 1 },
    { id: 2, name: "Ember Tonic", schoolId: 2, effectId: 2 },
    { id: 3, name: "Glacier Draught", schoolId: 3, effectId: 3 },
    { id: 4, name: "Quiet-Step Elixir", schoolId: 4, effectId: 4 },
    { id: 5, name: "Verdant Bloombrew", schoolId: 5, effectId: 5 },
    { id: 6, name: "Clarity Phial", schoolId: 1, effectId: 6 },
    { id: 7, name: "Wardglass Vial", schoolId: 4, effectId: 7 },
    { id: 8, name: "Hareheart Serum", schoolId: 2, effectId: 8 }
  ]
};

export const getSchools = () => structuredClone(database.schools);
export const getEffects = () => structuredClone(database.effects);
export const getPotions = () => structuredClone(database.potions);
`,
    },

    // -----------------------------
    // Student workspace (editable)
    // -----------------------------
    {
      path: "/scripts/render.js",
      type: "javascript",
      content: /*js*/ `export const render = () => {
  const app = document.querySelector("#app");

  app.innerHTML = \`
    <header class="header">
      <h1>Potion Shelf</h1>
      <p class="subtitle">A tiny catalog for a magical shop. Filter potions by school, then click one to reveal its effect.</p>
    </header>

    <main class="layout">
      <section class="panel" id="potionShelf">
        <h2>Shelf</h2>
        <div id="controls">
          <p class="placeholder">A school filter will appear here.</p>
        </div>
        <div id="shelfStatus">
          <p class="placeholder">A “Showing: …” label will appear here.</p>
        </div>
        <div id="potionList">
          <p class="placeholder">Potions will appear here.</p>
        </div>
      </section>

      <section class="panel" id="potionDetails">
        <h2>Effect</h2>
        <div id="details">
          <p class="placeholder">Click a potion to see its effect.</p>
        </div>
      </section>
    </main>
  \`;
};
`,
    },
    {
      path: "/scripts/handlers.js",
      type: "javascript",
      content: /*js*/ `export const bindEvents = () => {
};
`,
    },
    {
      path: "/scripts/main.js",
      type: "javascript",
      active: true,
      content: /*js*/ `import { render } from "./render.js";
import { bindEvents } from "./handlers.js";

render();
bindEvents();
`,
    },
  ],
  entry: "/index.html",
  sandbox: { runtime: "dom", defaultPanel: "preview" },
  mock: undefined,
  handbookMarkdown: "",
  tags: [],
};

export default entry;
