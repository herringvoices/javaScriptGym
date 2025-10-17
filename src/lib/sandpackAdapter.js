import mockSrc from "../runner/fetchMock.js?raw";

/**
 * Build Sandpack files map for a challenge.
 * Injects optional fetch mock and bridge (runner removed with deprecated test types).
 * @param {import('../types').Challenge} challenge
 * @param {Record<string,{code:string}>} saved previously saved user edits
 * @param {Object} opts
 * @param {string} [opts.challengeId]
 * @param {any} [opts.apiSeed]
 * @param {any} [opts.mockNet]
 */
export function toSandpackFiles(challenge, saved = {}, opts = {}) {
  const files = {};

  // 1) base files from challenge + saved edits
  for (const [path, spec] of Object.entries(challenge.files)) {
    files[path] = {
      code: saved[path]?.code ?? spec.code,
      readOnly: !!spec.readOnly,
      hidden: !!spec.hidden,
      active: !!spec.active,
    };
  }

  // Re-apply saved new files (not in challenge seed)
  for (const [path, spec] of Object.entries(saved)) {
    if (!files[path]) {
      files[path] = { code: spec.code, hidden: true, readOnly: false };
    }
  }

  // 2) inject fetch mock if challenge opts in (tag or flag)
  const needsMock = challenge.tags?.includes("mock-fetch");
  if (needsMock) {
    files["/__mocks__/fetch.js"] = { code: mockSrc, readOnly: true, hidden: true };

    const entry = challenge.entry || "/src/index.js";
    const entryFile = files[entry] || { code: "", active: true };
    // If entry is HTML, inject <script> tags; otherwise prepend import lines.
    if (/\.html?$/.test(entry)) {
      let html = entryFile.code;
      // naive detection: insert right after <head> or at start of body
      const bridgeTag = '<script type="module" src="/__bridge__.js"></script>';
      const mockTag = '<script type="module" src="/__mocks__/fetch.js"></script>';
      if (/<head[^>]*>/i.test(html)) {
        html = html.replace(/<head[^>]*>/i, m => m + bridgeTag + mockTag);
      } else if (/<body[^>]*>/i.test(html)) {
        html = html.replace(/<body[^>]*>/i, m => m + bridgeTag + mockTag);
      } else {
        html = bridgeTag + mockTag + html;
      }
      files[entry] = { ...entryFile, code: html };
    } else {
      const bridgeline = `import "/__bridge__.js";\n`;
      const mockline = `import "/__mocks__/fetch.js";\n`;
      files[entry] = { ...entryFile, code: bridgeline + mockline + entryFile.code };
    }
  }

  // 3) globals bridge (challenge id, seeds, chaos)
  // Prefer explicit opts, fall back to challenge.mock metadata.
  const seed = opts.apiSeed !== undefined ? opts.apiSeed : challenge.mock?.apiSeed;
  const net = opts.mockNet !== undefined ? opts.mockNet : challenge.mock?.mockNet;
  const cid = opts.challengeId || challenge.id;
  if (cid || seed || net) {
    const bridge = `\n      window.__CHALLENGE_ID__=${JSON.stringify(cid || "")};\n      window.__MOCK_SEED__=${JSON.stringify(seed || null)};\n      window.__MOCK_NET__=${JSON.stringify(net || null)};\n    `;
    files["/__bridge__.js"] = { code: bridge, readOnly: true, hidden: true };
  }

  // Determine active file (first non-hidden or explicit active)
  let activeFile = Object.keys(files).find((p) => files[p].active && !files[p].hidden);
  if (!activeFile) {
    activeFile = Object.keys(files).find((p) => !files[p].hidden) || Object.keys(files)[0];
    if (activeFile) files[activeFile].active = true;
  }

  return files;
}
