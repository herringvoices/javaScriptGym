// Executes in the preview iframe. Listens for RUN_TESTS / CHECK_COMPLETE.
(() => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const ctx = {
    $: (sel, root = document) => root.querySelector(sel),
    text: (sel) => document.querySelector(sel)?.textContent ?? "",
    waitFor: async (sel, t = 1500) => {
      const end = performance.now() + t;
      while (performance.now() < end) {
        if (document.querySelector(sel)) return true;
        await sleep(30);
      }
      return false;
    },
  };

  window.addEventListener("message", async (e) => {
    const msg = e.data || {};
    try {
      if (msg.cmd === "RUN_TESTS") {
        const out = [];
        for (const t of msg.tests || []) {
          try {
            const fn = new Function("ctx", `"use strict"; ${t.code}`);
            const v = fn(ctx);
            const ok = v instanceof Promise ? await v : v;
            out.push({ id: t.id, ok: !!ok, error: null, description: t.description });
          } catch (err) {
            out.push({ id: t.id, ok: false, error: String(err), description: t.description });
          }
        }
        parent.postMessage({ cmd: "TEST_RESULTS", results: out }, "*");
      }

      if (msg.cmd === "CHECK_COMPLETE") {
        const r = msg.rule || {};
        let ok = false;
        if (r.kind === "dom") {
          const el = document.querySelector(r.selector);
            ok = !!el && (!r.textIncludes || (el.textContent || "").includes(r.textIncludes));
        } else if (r.kind === "predicate") {
          const fn = new Function(`"use strict"; ${r.code}`);
          ok = !!fn();
        }
        parent.postMessage({ cmd: "COMPLETE_RESULT", ok }, "*");
      }
    } catch (err) {
      parent.postMessage({ cmd: "RUNNER_ERROR", error: String(err) }, "*");
    }
  });
})();
