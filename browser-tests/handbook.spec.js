import { test, expect } from '@playwright/test';

test('handbook overview renders challenge paragraphs without invalid nesting', async ({ page }) => {
  const warnings = [];
  page.on('console', message => {
    if (/cannot (?:be a descendant|contain a nested)|validateDOMNesting|hydration error/i.test(message.text())) warnings.push(message.text());
  });
  await page.goto('/handbook/overview');
  const challenge = page.getByRole('region', { name: 'Try a handbook challenge' });
  await expect(challenge).toBeVisible();
  await expect(challenge.locator('p.m-0').filter({ hasText: 'This is the shape' })).toBeVisible();
  expect(await page.locator('p p').count()).toBe(0);
  expect(warnings).toEqual([]);
});

test('chapter navigation never displays the standard intro while the chapter loads', async ({ page }) => {
  await page.goto('/handbook/JS.VDT.PRM');
  await expect(page.getByRole('heading', { name: 'Variables: boxes that hold information' })).toBeVisible();

  let releaseChapter;
  const chapterGate = new Promise(resolve => { releaseChapter = resolve; });
  await page.route('**/standards/JS.VDT.PRM/numbers-introduction.mdx*', async route => {
    await chapterGate;
    await route.continue();
  });

  try {
    await page.getByRole('link', { name: 'Number Values' }).first().click();
    await expect(page).toHaveURL(/\/handbook\/JS\.VDT\.PRM\/numbers-introduction$/);
    await expect(page.getByText('Loading chapter...')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Variables: boxes that hold information' })).toHaveCount(0);
  } finally {
    releaseChapter();
  }

  await expect(page.getByRole('heading', { name: 'Data Types → Numbers' })).toBeVisible();
});

test('dragging desktop panels fully closed hides them', async ({ page }) => {
  await page.goto('/handbook/JS.DB.ERR/reproducing-errors');

  const editorSlot = page.locator('[data-resizable-panel-key="editor"]');
  const resizeHandle = page.getByRole('separator', { name: 'Resize handbook and editor panels' });
  await expect(editorSlot).toBeVisible();
  await expect(resizeHandle).toBeVisible();
  const defaultEditorWidth = await editorSlot.evaluate((element) => element.getBoundingClientRect().width);

  const handleBox = await resizeHandle.boundingBox();
  expect(handleBox).not.toBeNull();
  await page.mouse.move(handleBox.x + handleBox.width / 2, handleBox.y + 100);
  await page.mouse.down();
  await page.mouse.move(handleBox.x + 1200, handleBox.y + 100, { steps: 10 });
  await page.mouse.up();

  await expect(editorSlot).toHaveCount(0);
  const showEditor = page.locator('button[aria-label="Show Editor"]').first();
  await expect(showEditor).toBeAttached();
  await showEditor.evaluate((button) => button.click());
  await expect(editorSlot).toBeVisible();
  await expect.poll(async () => Math.abs(
    await editorSlot.evaluate((element) => element.getBoundingClientRect().width) - defaultEditorWidth
  )).toBeLessThan(4);

  await page.reload();
  const contentsSlot = page.locator('[data-resizable-panel-key="toc"]');
  const contentsHandle = page.getByRole('separator', { name: 'Resize toc and handbook panels' });
  await expect(contentsSlot).toBeVisible();
  const defaultContentsWidth = await contentsSlot.evaluate((element) => element.getBoundingClientRect().width);

  const contentsHandleBox = await contentsHandle.boundingBox();
  expect(contentsHandleBox).not.toBeNull();
  await page.mouse.move(contentsHandleBox.x + contentsHandleBox.width / 2, contentsHandleBox.y + 100);
  await page.mouse.down();
  await page.mouse.move(contentsHandleBox.x - 1200, contentsHandleBox.y + 100, { steps: 10 });
  await page.mouse.up();

  await expect(contentsSlot).toHaveCount(0);
  const showContents = page.locator('button[aria-label="Show Contents"]').first();
  await expect(showContents).toBeAttached();
  await showContents.evaluate((button) => button.click());
  await expect(contentsSlot).toBeVisible();
  await expect.poll(async () => Math.abs(
    await contentsSlot.evaluate((element) => element.getBoundingClientRect().width) - defaultContentsWidth
  )).toBeLessThan(4);
});

test('the file tree resizes, drags closed, and reopens at its default width', async ({ page }) => {
  await page.goto('/handbook/JS.DB.ERR/reproducing-errors');

  const fileTree = page.locator('[data-file-tree="open"]');
  const resizeHandle = page.getByRole('separator', { name: 'Resize file tree' });
  await expect(fileTree).toBeVisible();
  await expect(page.getByRole('button', { name: 'Collapse file tree' })).toBeVisible();
  const defaultWidth = await fileTree.evaluate((element) => element.getBoundingClientRect().width);

  const handleBox = await resizeHandle.boundingBox();
  expect(handleBox).not.toBeNull();
  await page.mouse.move(handleBox.x + handleBox.width / 2, handleBox.y + 100);
  await page.mouse.down();
  await page.mouse.move(handleBox.x + 80, handleBox.y + 100, { steps: 5 });
  await page.mouse.up();
  await expect.poll(async () => fileTree.evaluate((element) => element.getBoundingClientRect().width)).toBeGreaterThan(defaultWidth + 60);

  const resizedHandleBox = await resizeHandle.boundingBox();
  expect(resizedHandleBox).not.toBeNull();
  await page.mouse.move(resizedHandleBox.x + resizedHandleBox.width / 2, resizedHandleBox.y + 100);
  await page.mouse.down();
  await page.mouse.move(resizedHandleBox.x - 1200, resizedHandleBox.y + 100, { steps: 10 });
  await expect(fileTree).toHaveCount(0);
  const rail = page.locator('[data-file-tree="collapsed"]');
  await expect(rail).toBeVisible();

  await page.mouse.move(resizedHandleBox.x - 180, resizedHandleBox.y + 100, { steps: 10 });
  await expect(fileTree).toBeVisible();
  await expect.poll(async () => fileTree.evaluate((element) => element.getBoundingClientRect().width)).toBeGreaterThan(100);

  await page.mouse.move(resizedHandleBox.x - 1200, resizedHandleBox.y + 100, { steps: 10 });
  await expect(rail).toBeVisible();
  await page.mouse.up();

  const railResizeHandle = rail.getByRole('separator', { name: 'Resize file tree' });
  const railHandleBox = await railResizeHandle.boundingBox();
  expect(railHandleBox).not.toBeNull();
  await page.mouse.move(railHandleBox.x + railHandleBox.width / 2, railHandleBox.y + 100);
  await page.mouse.down();
  await page.mouse.move(railHandleBox.x + 120, railHandleBox.y + 100, { steps: 5 });
  await page.mouse.up();
  await expect(fileTree).toBeVisible();

  await page.getByRole('button', { name: 'Collapse file tree' }).click();
  await expect(rail).toBeVisible();
  await page.getByRole('button', { name: 'Open file tree' }).click();
  await expect(fileTree).toBeVisible();
  await expect.poll(async () => Math.abs(
    await fileTree.evaluate((element) => element.getBoundingClientRect().width) - defaultWidth
  )).toBeLessThan(2);
});
