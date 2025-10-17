// Intercepts fetch('/api/...') calls and serves from an in-memory DB (persisted per challenge).
(() => {
  const DB_KEY = "__mockdb__" + (window.__CHALLENGE_ID__ || "default");
  // Avoid optional chaining / nullish coalescing for older parsers
  var _mockNet = (typeof window !== 'undefined' && window.__MOCK_NET__) || null;
  const LATENCY_MS = (_mockNet && typeof _mockNet.slowMs === 'number') ? _mockNet.slowMs : 300;

  const load = () => JSON.parse(localStorage.getItem(DB_KEY) || "null");
  const save = (db) => localStorage.setItem(DB_KEY, JSON.stringify(db));
  let db = load() || { products: [] };

  const delay = (ms) => new Promise((r) => setTimeout(r, ms));
  const json = (obj, init = {}) =>
    new Response(JSON.stringify(obj), {
      status: 200,
      headers: { "Content-Type": "application/json" },
      ...init,
    });
  const notFound = (m = "Not Found") => json({ error: m }, { status: 404 });
  const badReq = (m = "Bad Request") => json({ error: m }, { status: 400 });
  const serverErr = (m = "Server Error") => json({ error: m }, { status: 500 });

  const chaos = _mockNet || { failOnFirst: false, everyN: null, n: 0 };
  let first = chaos.failOnFirst;

  function handle(url, init = {}) {
    const u = new URL(url, location.origin);
    const path = u.pathname;
    const q = u.searchParams;
    const { method = "GET", body } = init;

    // /api/products
    if (path === "/api/products") {
      if (method === "GET") {
  var _qVal = q.get("q");
  const term = _qVal ? _qVal.toLowerCase() : undefined;
        let rows = db.products.slice();
        if (term) rows = rows.filter((p) => p.name.toLowerCase().includes(term));
        return json(rows);
      }
      if (method === "POST") {
        try {
          const data = JSON.parse(body || "{}");
          if (!data.name || typeof data.price !== "number") return badReq("name and price required");
          const id = Math.max(0, ...db.products.map((p) => p.id)) + 1;
          const rec = { id, ...data };
            db.products.push(rec);
            save(db);
          return json(rec, { status: 201 });
        } catch (e) { /* swallow parse error */
          void e; // explicit reference to satisfy no-unused-vars
          return badReq("Invalid JSON");
        }
      }
    }

    // /api/products/:id
    const m = path.match(/^\/api\/products\/(\d+)$/);
    if (m) {
      const id = Number(m[1]);
      const item = db.products.find((p) => p.id === id);
      if (!item) return notFound("Product not found");

      if (method === "GET") return json(item);
      if (method === "PUT" || method === "PATCH") {
        const data = JSON.parse(body || "{}");
        Object.assign(item, data);
        save(db);
        return json(item);
      }
      if (method === "DELETE") {
        db.products = db.products.filter((p) => p.id !== id);
        save(db);
        return new Response(null, { status: 204 });
      }
    }

    return notFound();
  }

  const realFetch = window.fetch.bind(window);
  window.fetch = async (input, init) => {
    const url = typeof input === "string" ? input : input.url;
    if (!url.startsWith("/api/")) return realFetch(input, init);

    await delay(LATENCY_MS);
    if (first) {
      first = false;
      return serverErr("Injected failure");
    }
    if (chaos.everyN) {
      chaos.n = (chaos.n || 0) + 1;
      if (chaos.n % chaos.everyN === 0) return serverErr("Periodic failure");
    }

    // Allow host to seed DB
    if (window.__MOCK_SEED__ && !load()) {
      db = window.__MOCK_SEED__;
      save(db);
    }
    return handle(url, init);
  };

  // Expose a small control surface for host app to reset the mock DB
  window.__MOCK_DB__ = {
    key: DB_KEY,
    reset() {
      try {
        localStorage.removeItem(DB_KEY);
      } catch (e) {
        // ignore quota or access errors in test env
        void e;
      }
      db = { products: [] };
      // Reset failure counters/config-derived flags
      first = chaos.failOnFirst;
      chaos.n = 0;
    },
  };
})();
