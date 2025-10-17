// Dynamic challenge aggregator.
// Each challenge now lives in its own file under subfolders by primaryStandard, e.g.:
// src/data/challenges/JS.PF.CON/JS.PF.CON-001.js
// This file discovers them at build time via Vite's import.meta.glob.

/** @type {Record<string, { default: import('../types').Challenge }>} */
// Using eager glob so modules are imported synchronously at build time.
const modules = import.meta.glob('./challenges/**/*.js', { eager: true });

/** @type {import('../types').Challenge[]} */
const challenges = [];
for (const path in modules) {
  const mod = modules[path];
  if (mod && mod.default) challenges.push(mod.default);
}

challenges.sort((a, b) => a.id.localeCompare(b.id));

export default challenges;
