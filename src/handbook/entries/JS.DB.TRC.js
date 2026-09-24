// Handbook entry for Debugging · Tracing & Inspection

/** @type {import('./overview.js').HandbookEntry} */
const entry = {
  id: "JS.DB.TRC",
  standard: "JS.DB.TRC",
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
    <title>National Cryptid Census</title>
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body>
    <main class="census">
      <header class="masthead">
        <p class="eyebrow">Department of Unverified Wildlife</p>
        <h1>National Cryptid Census</h1>
        <p class="subtitle">Official-ish records for creatures the government would prefer you stop emailing about.</p>
      </header>

      <section class="panel controls" aria-label="Census filters">
        <label>
          <span>Region</span>
          <select id="region-filter">
            <option value="all">All regions</option>
            <option value="Appalachia">Appalachia</option>
            <option value="Midwest">Midwest</option>
            <option value="Northeast">Northeast</option>
            <option value="Pacific Northwest">Pacific Northwest</option>
            <option value="Southeast">Southeast</option>
            <option value="West">West</option>
          </select>
        </label>

        <label class="checkbox-label">
          <input id="confirmed-only" type="checkbox" />
          <span>Confirmed only</span>
        </label>
      </section>

      <section class="panel">
        <h2>Census Summary</h2>
        <p id="summary" class="summary"></p>
      </section>

      <section class="grid">
        <div class="panel">
          <h2>Records</h2>
          <div id="cryptid-list" class="cryptid-list"></div>
        </div>

        <div class="panel">
          <h2>Details</h2>
          <div id="cryptid-details" class="details"></div>
        </div>
      </section>
    </main>

    <script src="/main.js"></script>
  </body>
</html>`,
    },
    {
      path: "/styles.css",
      type: "css",
      readOnly: true,
      content: /*css*/ `:root {
  color-scheme: dark;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  background: #08110d;
  color: #eef8f1;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(56, 133, 91, 0.2), transparent 35rem),
    linear-gradient(180deg, #07100c 0%, #0b1711 100%);
}

button,
select,
input {
  font: inherit;
}

.census {
  width: min(1050px, calc(100% - 2rem));
  margin: 0 auto;
  padding: 2rem 0 4rem;
}

.masthead {
  margin-bottom: 1rem;
}

.eyebrow {
  margin: 0 0 0.35rem;
  color: #9dc8aa;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

h1 {
  margin-bottom: 0.4rem;
  font-size: clamp(2rem, 5vw, 3.4rem);
}

h2 {
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.subtitle {
  max-width: 62ch;
  color: #b9cabe;
}

.panel {
  border: 1px solid rgba(184, 221, 196, 0.14);
  border-radius: 14px;
  background: rgba(15, 31, 22, 0.88);
  padding: 1rem;
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.22);
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 1.5rem;
  align-items: end;
  margin-bottom: 1rem;
}

.controls label {
  display: grid;
  gap: 0.35rem;
  color: #cfe2d5;
  font-size: 0.9rem;
}

.controls select {
  min-width: 14rem;
  border: 1px solid rgba(184, 221, 196, 0.18);
  border-radius: 9px;
  background: #0a1510;
  color: #eef8f1;
  padding: 0.6rem 0.75rem;
}

.controls .checkbox-label {
  grid-template-columns: auto 1fr;
  align-items: center;
  padding-bottom: 0.55rem;
}

.summary {
  margin-bottom: 0;
  color: #d9eee0;
  font-weight: 650;
}

.grid {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(16rem, 0.9fr);
  gap: 1rem;
  margin-top: 1rem;
}

.cryptid-list {
  display: grid;
  gap: 0.7rem;
}

.cryptid-card {
  width: 100%;
  display: grid;
  grid-template-columns: 1.4fr 1fr auto;
  gap: 0.7rem;
  align-items: center;
  border: 1px solid rgba(184, 221, 196, 0.13);
  border-radius: 10px;
  background: #0a1510;
  color: inherit;
  padding: 0.8rem 0.9rem;
  text-align: left;
  cursor: pointer;
}

.cryptid-card:hover {
  border-color: rgba(164, 224, 184, 0.42);
  background: #102319;
}

.cryptid-card span {
  color: #a8bdaf;
  font-size: 0.82rem;
}

.cryptid-card span:last-child {
  justify-self: end;
  color: #cfe8d7;
  font-weight: 700;
}

.details {
  color: #c9dccf;
}

.details h3 {
  color: #ffffff;
  margin-bottom: 0.8rem;
}

.details p:last-child {
  margin-bottom: 0;
}

@media (max-width: 760px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .cryptid-card {
    grid-template-columns: 1fr;
  }

  .cryptid-card span:last-child {
    justify-self: start;
  }
}`,
    },
    {
      path: "/main.js",
      type: "javascript",
      active: true,
      content: /*js*/ `const cryptids = [
  {
    id: 1,
    name: "Bigfoot",
    region: "Pacific Northwest",
    confirmed: true,
    sightings: 42,
    lastSeen: "2026-09-12",
  },
  {
    id: 2,
    name: "Mothman",
    region: "Appalachia",
    confirmed: true,
    sightings: 19,
    lastSeen: "2026-08-03",
  },
  {
    id: 3,
    name: "Jersey Devil",
    region: "Northeast",
    confirmed: true,
    sightings: 14,
    lastSeen: "2026-07-21",
  },
  {
    id: 4,
    name: "Fresno Nightcrawler",
    region: "West",
    confirmed: true,
    sightings: 11,
    lastSeen: "2026-09-01",
  },
  {
    id: 5,
    name: "Loveland Frog",
    region: "Midwest",
    confirmed: false,
    sightings: 7,
    lastSeen: "2026-06-14",
  },
  {
    id: 6,
    name: "Skunk Ape",
    region: "Southeast",
    confirmed: true,
    sightings: 16,
    lastSeen: "2026-08-28",
  },
  {
    id: 7,
    name: "Dover Demon",
    region: "Northeast",
    confirmed: false,
    sightings: 3,
    lastSeen: null,
  },
  {
    id: 8,
    name: "Flatwoods Monster",
    region: "Appalachia",
    confirmed: true,
    sightings: 9,
    lastSeen: "2026-05-19",
  },
];

const state = {
  region: "all",
  confirmedOnly: false,
  selectedId: null,
};

const summary = document.querySelector("#summary");
const regionFilter = document.querySelector("#region-filter");
const confirmedOnly = document.querySelector("#confirmed-only");
const cryptidList = document.querySelector("#cryptid-list");
const cryptidDetails = document.querySelector("#cryptid-details");

function countConfirmed(records) {
  let count = 0;

  for (let i = 0; i < records.length - 1; i++) {
    if (records[i].confirmed) {
      count++;
    }
  }

  return count;
}

function matchesFilters(cryptid) {
  const matchesRegion =
    state.region === "all" || cryptid.location === state.region;

  const matchesConfirmed =
    !state.confirmedOnly || cryptid.confirmed;

  return matchesRegion && matchesConfirmed;
}

function getVisibleCryptids() {
  return cryptids.filter(matchesFilters);
}

function formatStatus(cryptid) {
  if (cryptid.confirmed) {
    return "CONFIRMED";
  }

  return "UNCONFIRMED";
}

function formatLastSeen(cryptid) {
  return cryptid.lastSeen.trim();
}

function findCryptidCard(element) {
  return element.closest(".cryptid-card");
}

function renderSummary(visibleCryptids) {
  summary.textContent =
    `${cryptids.length} records • ` +
    `${countConfirmed(cryptids)} confirmed • ` +
    `${visibleCryptids.length} shown`;
}

function renderCryptids(visibleCryptids) {
  cryptidList.innerHTML = "";

  for (const cryptid of visibleCryptids) {
    cryptidList.innerHTML += `
      <button class="cryptid-card" data-id="${cryptid.id}">
        <strong>${cryptid.name}</strong>
        <span>${cryptid.region}</span>
        <span>${formatStatus(cryptid)}</span>
      </button>
    `;
  }
}

function renderDetails() {
  if (state.selectedId === null) {
    cryptidDetails.innerHTML = "<p>Select a cryptid to view details.</p>";
    return;
  }

  const cryptid = cryptids.find(
    (cryptid) => cryptid.id === state.selectedId
  );

  cryptidDetails.innerHTML = `
    <h3>${cryptid.name}</h3>
    <p>Region: ${cryptid.region}</p>
    <p>Status: ${formatStatus(cryptid)}</p>
    <p>Reported sightings: ${cryptid.sightings}</p>
    <p>Last seen: ${formatLastSeen(cryptid)}</p>
  `;
}

function render() {
  const visibleCryptids = getVisibleCryptids();

  renderSummary(visibleCryptids);
  renderCryptids(visibleCryptids);
  renderDetails();
}

regionFilter.addEventListener("change", (event) => {
  state.region = event.target.value;
  render();
});

confirmedOnly.addEventListener("change", (event) => {
  state.confirmedOnly = event.target.checked;
});

cryptidList.addEventListener("click", (event) => {
  const id = Number(event.target.dataset.id);

  state.selectedId = id;
  renderDetails();
});

render();
`,
    },
  ],
  entry: "/index.html",
  sandbox: { runtime: "dom", defaultPanel: "preview", showRightPanel: true, showExplorer: true },
  mock: undefined,
  handbookMarkdown: "",
  tags: [],
};

export default entry;
