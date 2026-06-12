const { test, expect } = require('@playwright/test');

test('homepage loads', async ({ page }) => {
  await page.goto('https://tanyel-kemal-bakehouse.cta-training.academy/');
  await expect(page.locator('body')).toContainText('Bakehouse');
});
