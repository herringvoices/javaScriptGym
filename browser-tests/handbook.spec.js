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
