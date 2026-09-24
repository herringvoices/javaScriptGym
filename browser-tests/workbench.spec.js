import { test, expect } from '@playwright/test';

async function editorPosition(page) {
  return page.evaluate(() => {
    const editor = window.monaco?.editor.getEditors().find(editor => editor.hasTextFocus());
    return editor && { file: editor.getModel().uri.path, ...editor.getPosition() };
  });
}

test('console locations navigate Monaco, stacks open callers, edits invalidate links, Run really reruns', async ({ page }) => {
  await page.goto('/tools/runtime-harness.html');
  await expect(page.locator('.monaco-editor')).toBeVisible({ timeout: 30000 });
  await page.getByRole('button', { name: 'Run', exact: true }).click();
  await page.getByRole('button', { name: '/helpers.js:3:9', exact: true }).click();
  await expect.poll(() => editorPosition(page)).toEqual({ file: '/helpers.js', lineNumber: 3, column: 9 });
  await expect(page.locator('.runtime-error-line')).toBeVisible();
  await page.getByText('Stack trace', { exact: true }).click();
  await page.getByRole('button', { name: '/main.js:3:15', exact: true }).click();
  await expect.poll(() => editorPosition(page)).toEqual({ file: '/main.js', lineNumber: 3, column: 15 });
  await page.keyboard.press('Control+End');
  await page.keyboard.type('\n// edited since run');
  await expect(page.getByRole('status')).toContainText('Code changed since this run');
  await expect(page.getByRole('button', { name: '/helpers.js:3:9', exact: true }).first()).toBeDisabled();
  await page.getByRole('button', { name: 'Run', exact: true }).click();
  await expect(page.getByRole('status')).toHaveCount(0);
  await expect(page.getByRole('button', { name: '/helpers.js:3:9', exact: true })).toBeEnabled();
  await page.getByRole('button', { name: 'Run', exact: true }).click();
  await expect(page.getByRole('button', { name: '/helpers.js:3:9', exact: true })).toHaveCount(1);
  await expect(page.getByText('TypeError: Try clicking this location', { exact: true })).toBeVisible();
});

test('foreign frame and previous-run messages are ignored', async ({ page }) => {
  await page.goto('/tools/runtime-harness.html');
  await page.getByRole('button', { name: 'Run', exact: true }).click();
  await expect(page.getByRole('button', { name: '/helpers.js:3:9', exact: true })).toBeVisible();
  await page.evaluate(() => {
    const fake = { source: 'sandbox-console', version: 1, runId: 'old', type: 'log', args: ['SHOULD NOT APPEAR'] };
    window.postMessage(fake, '*');
    window.dispatchEvent(new MessageEvent('message', { source: document.querySelector('iframe').contentWindow, data: fake }));
  });
  await page.getByText('Stack trace', { exact: true }).click();
  await expect(page.getByText('SHOULD NOT APPEAR')).toHaveCount(0);
});

test('mobile Run opens preview and error links reopen the editor', async ({ page }) => {
  await page.setViewportSize({ width: 800, height: 900 });
  await page.goto('/tools/runtime-harness.html');
  await expect(page.locator('.monaco-editor')).toBeVisible({ timeout: 30000 });
  await page.getByRole('button', { name: 'Run', exact: true }).click();
  await expect(page.getByRole('button', { name: '/helpers.js:3:9', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Workspace Editor' }).click();
  await page.getByRole('button', { name: '/helpers.js:3:9', exact: true }).click();
  await expect(page.locator('.monaco-editor')).toBeVisible();
  await expect.poll(() => editorPosition(page)).toEqual({ file: '/helpers.js', lineNumber: 3, column: 9 });
});

test('challenge page opens an error in a created file, including when its editor is hidden', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('playground:JS.VDT.PRM-player-status-001:files', JSON.stringify({ version: 1,
      overrides: { '/main.js': { code: 'import { fail } from "./helpers.js";\nfail();' } },
      userFiles: { '/helpers.js': { code: 'export function fail() {\n  throw new Error("challenge fixture");\n}' } }, folders: [] }));
  });
  await page.goto('/challenge/JS.VDT.PRM-player-status-001');
  await expect(page.locator('.monaco-editor')).toBeVisible({ timeout: 30000 });
  await page.getByRole('button', { name: 'Run preview', exact: true }).click();
  await expect(page.getByRole('button', { name: '/helpers.js:2:9', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Hide Editor', exact: true }).click();
  await page.getByRole('button', { name: '/helpers.js:2:9', exact: true }).click();
  await expect.poll(() => editorPosition(page)).toEqual({ file: '/helpers.js', lineNumber: 2, column: 9 });
  await page.getByRole('button', { name: 'Run preview', exact: true }).click();
  await expect(page.getByRole('button', { name: '/helpers.js:2:9', exact: true })).toHaveCount(1);
});

test('existing HTML fetch challenge retains mock data and original source', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('playground:JS.AS.FET-004:files', JSON.stringify({ version: 1,
      overrides: { '/main.js': { code: 'const data = await (await fetch("/api/products")).json();\ndocument.querySelector("#product-list").textContent = data[0].name;\nconsole.log("loaded", data.length);' } },
      userFiles: {}, folders: [] }));
  });
  await page.goto('/challenge/JS.AS.FET-004');
  await page.getByRole('button', { name: 'Run preview', exact: true }).click();
  await expect(page.frameLocator('iframe[title="preview"]').locator('#product-list')).toHaveText('Colombian Coffee');
  await page.getByRole('button', { name: 'Console', exact: true }).click();
  await expect(page.getByText('loaded 3', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: '/main.js:3:9', exact: true })).toHaveCount(0);
});
