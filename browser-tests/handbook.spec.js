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
