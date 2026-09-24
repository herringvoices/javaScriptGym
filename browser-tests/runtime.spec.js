import { test, expect } from '@playwright/test';
import { buildSrcDoc } from '../src/lib/buildSrcDoc.js';
import { readFileSync } from 'node:fs';

const fileMap = files => Object.fromEntries(Object.entries(files).map(([path, code]) => [path, { code }]));
async function setup(page) {
  await page.goto('/tools/runtime-harness.html?runnerOnly');
  await page.evaluate(() => {
    document.body.innerHTML = '<iframe sandbox="allow-scripts allow-same-origin"></iframe>';
    window.messages = [];
    window.addEventListener('message', e => { if (e.data?.source === 'sandbox-console') window.messages.push(e.data); });
  });
}
async function run(page, files, entry = '/main.js', runId = 'fixture', workspaceId = 'fixture') {
  const doc = buildSrcDoc({ files: fileMap(files), entry, workspaceId, runId });
  await page.evaluate(doc => { window.messages = []; document.querySelector('iframe').srcdoc = doc; }, doc);
}
async function error(page) {
  await expect.poll(() => page.evaluate(() => window.messages.find(row => row.error))).toBeTruthy();
  return page.evaluate(() => window.messages.find(row => row.error).error);
}
async function logs(page, count = 1) {
  await expect.poll(() => page.evaluate(() => window.messages.filter(row => !row.error).length)).toBeGreaterThanOrEqual(count);
  return page.evaluate(() => window.messages.filter(row => !row.error));
}

test.beforeEach(async ({ page }) => setup(page));

test('JS entry error has exact file, line, column, type and stack', async ({ page }) => {
  await run(page, { '/main.js': 'const count = 1;\n\nmissingName();' });
  expect(await error(page)).toMatchObject({ name: 'ReferenceError', message: 'missingName is not defined', loc: { file: '/main.js', line: 3, column: 1 }, frames: [{ loc: { file: '/main.js', line: 3 } }] });
});

test('nested imports, re-exports and same-name modules resolve consistently', async ({ page }) => {
  await run(page, {
    '/main.js': 'import { fail } from "./a/barrel.js";\nimport { value } from "./b/helper.js";\nconsole.log(value);\nfail();',
    '/a/barrel.js': 'export { fail } from "./helper";',
    '/a/helper.js': 'export function fail() {\n  const x = 1;\n  throw new TypeError("broken");\n}',
    '/b/helper.js': 'export const value = "correct folder";',
  });
  expect((await logs(page))[0].args).toEqual(['correct folder']);
  const result = await error(page);
  expect(result.loc).toEqual({ file: '/a/helper.js', line: 3, column: 9 });
  expect(result.frames.filter(frame => frame.loc).map(frame => [frame.loc.file, frame.loc.line])).toEqual([['/a/helper.js', 3], ['/main.js', 4]]);
});

test('columns after rewritten imports map back to original source', async ({ page }) => {
  const code = 'import "./helper.js"; missingName();';
  await run(page, { '/main.js': code, '/helper.js': 'export {};' });
  expect((await error(page)).loc).toEqual({ file: '/main.js', line: 1, column: code.indexOf('missingName') + 1 });
});

test('dynamic imports, comments, strings, cycles and unicode remain intact', async ({ page }) => {
  await run(page, {
    '/main.js': 'const text = `import "./fake.js"`;\n// import "./another-fake.js"\nconst path = "./nested/value.js";\nconst { value } = await import(path);\nconst { other } = await import("./other.js");\nconsole.log(text, value, other, "☃ café");',
    '/nested/value.js': 'import { label } from "../cycle.js"; export const value = label();',
    '/cycle.js': 'import { value } from "./nested/value.js"; export function label() { return "cycle"; }',
    '/other.js': 'export const other = 7;',
  });
  expect((await logs(page))[0].args).toEqual(['import "./fake.js"', 'cycle', 7, '☃ café']);
});

for (const type of ['', ' type="module"']) {
  test(`HTML external ${type ? 'module' : 'classic'} errors have exact locations`, async ({ page }) => {
    await run(page, { '/pages/index.html': `<!doctype html>\n<html><head></head><body>\n<script${type} src="../scripts/main.js"></script>\n</body></html>`, '/scripts/main.js': '\n\nthrow new RangeError("bad range");' }, '/pages/index.html');
    expect(await error(page)).toMatchObject({ name: 'RangeError', loc: { file: '/scripts/main.js', line: 3, column: 7 } });
  });
  test(`HTML inline ${type ? 'module' : 'classic'} maps to HTML line and column`, async ({ page }) => {
    await run(page, { '/index.html': `<html><head></head><body>\n<div>before</div>\n<script${type}>\n  missingName();\n</script></body></html>` }, '/index.html');
    expect((await error(page)).loc).toEqual({ file: '/index.html', line: 4, column: 3 });
  });
  test(`${type ? 'module' : 'classic'} syntax errors are located`, async ({ page }) => {
    await run(page, { '/index.html': `<script${type} src="/main.js"></script>`, '/main.js': 'const ok = 1;\nconst broken = ;' }, '/index.html');
    expect(await error(page)).toMatchObject({ name: 'SyntaxError', loc: { file: '/main.js', line: 2 } });
  });
}

test('classic scripts keep global scope and parser order', async ({ page }) => {
  await run(page, { '/index.html': '<script src="/one.js"></script><script src="/two.js"></script>', '/one.js': 'var shared = 42;', '/two.js': 'console.log(shared, document.currentScript !== null);' }, '/index.html');
  const output = (await logs(page))[0];
  expect(output.args).toEqual([42, true]);
  expect(output.loc).toBeNull();
});

test('event errors and unhandled promise rejections preserve locations', async ({ page }) => {
  await run(page, { '/main.js': 'document.body.addEventListener("click", () => {\n  throw new Error("event failed");\n});\nconsole.log("ready");' });
  await logs(page);
  await page.frameLocator('iframe').locator('body').dispatchEvent('click');
  expect((await error(page)).loc).toEqual({ file: '/main.js', line: 2, column: 9 });
  await run(page, { '/main.js': '\nPromise.reject(new Error("rejected"));' }, '/main.js', 'promise');
  expect(await error(page)).toMatchObject({ message: 'rejected', unhandledRejection: true, loc: { file: '/main.js', line: 2, column: 16 } });
});

test('primitive rejections have no invented source location', async ({ page }) => {
  await run(page, { '/main.js': 'Promise.reject(null);' });
  expect(await error(page)).toMatchObject({ message: 'null', loc: null });
});

test('actual fetch mock works, including legacy injected helper imports', async ({ page }) => {
  await run(page, {
    '/__bridge__.js': 'window.__CHALLENGE_ID__ = "mock-fixture"; window.__MOCK_SEED__ = { products: [{ id: 1, name: "Coffee" }] }; window.__MOCK_NET__ = { slowMs: 0 };',
    '/__mocks__/fetch.js': readFileSync(new URL('../src/runner/fetchMock.js', import.meta.url), 'utf8'),
    '/main.js': 'import "/__bridge__.js";\nimport "/__mocks__/fetch.js";\nconst response = await fetch("/api/products");\nconsole.log(await response.json());',
  });
  expect((await logs(page))[0].args).toEqual([[{ id: 1, name: 'Coffee' }]]);
});

test('computed imports preserve comma-expression semantics', async ({ page }) => {
  await run(page, { '/main.js': 'const path = "./helper.js";\nconst mod = await import((0, path));\nconsole.log(mod.value);', '/helper.js': 'export const value = 42;' });
  expect((await logs(page))[0].args).toEqual([42]);
});

test('syntax errors inside imported modules point to the dependency', async ({ page }) => {
  await run(page, { '/main.js': 'import "./bad.js";', '/bad.js': 'const good = 1;\nconst bad = ;' });
  expect(await error(page)).toMatchObject({ name: 'SyntaxError', loc: { file: '/bad.js', line: 2 } });
});

test('serialization, helper order and unchanged reruns keep working', async ({ page }) => {
  const files = {
    '/__bridge__.js': 'window.bridgeReady = true;',
    '/__mocks__/fetch.js': 'window.fetch = async () => ({ json: async () => ({ ready: window.bridgeReady }) });',
    '/main.js': 'const data = await (await fetch("/example")).json();\nconst circular = {}; circular.self = circular;\nconsole.log(data, circular, undefined, null);',
  };
  for (const runId of ['first', 'second']) {
    await run(page, files, '/main.js', runId);
    const output = (await logs(page))[0];
    expect(output.runId).toBe(runId);
    expect(output.args).toEqual([{ ready: true }, { self: { __type: 'circular' } }, { __type: 'undefined' }, { __type: 'null' }]);
  }
});

test('Chrome breakpoints survive rerun, inspect locals, step into/over/out and resume', async ({ page }) => {
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Debugger.enable');
  const parsed = [];
  cdp.on('Debugger.scriptParsed', event => { if (event.url.startsWith('jsgym-runtime:')) parsed.push(event); });
  const nextPause = () => new Promise(resolve => cdp.once('Debugger.paused', resolve));
  const code = 'function double(value) {\n  const result = value * 2;\n  return result;\n}\nconst start = 21;\nconst answer = double(start);\nconsole.log(answer);';
  const workspaceId = 'handbook:developer:debugging-acceptance';
  await cdp.send('Debugger.setBreakpointByUrl', { url: 'jsgym-runtime://generated/handbook/developer/debugging-acceptance/main.js', lineNumber: 5 });
  for (const runId of ['first', 'second']) {
    const pause = nextPause();
    await run(page, { '/main.js': code }, '/main.js', runId, workspaceId);
    const paused = await pause;
    expect(paused.callFrames[0].location.lineNumber).toBe(5);
    expect((await cdp.send('Debugger.evaluateOnCallFrame', { callFrameId: paused.callFrames[0].callFrameId, expression: 'start' })).result.value).toBe(21);
    let step = nextPause();
    await cdp.send('Debugger.stepInto');
    const inside = await step;
    expect(inside.callFrames[0].functionName).toBe('double');
    expect((await cdp.send('Debugger.evaluateOnCallFrame', { callFrameId: inside.callFrames[0].callFrameId, expression: 'value' })).result.value).toBe(21);
    step = nextPause();
    await cdp.send('Debugger.stepOver');
    expect((await step).callFrames[0].location.lineNumber).toBe(2);
    step = nextPause();
    await cdp.send('Debugger.stepOut');
    await step;
    await cdp.send('Debugger.resume');
    expect((await logs(page))[0].args).toEqual([42]);
  }
  expect(parsed).toHaveLength(2);
  const map = JSON.parse(Buffer.from(parsed[0].sourceMapURL.split(',')[1], 'base64').toString());
  expect(map.sources).toEqual(['jsgym://student/handbook/developer/debugging-acceptance/main.js']);
  expect(map.sourcesContent).toEqual([code]);
});
