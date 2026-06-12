# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: basic-example.spec.cjs >> homepage loads
- Location: basic-example.spec.cjs:3:1

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
Call log:
  - navigating to "/", waiting until "load"

```

# Test source

```ts
  1 | const { test, expect } = require('@playwright/test');
  2 | 
  3 | test('homepage loads', async ({ page }) => {
> 4 |   await page.goto('/');
    |              ^ Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
  5 |   await expect(page.locator('body')).toContainText('Bakehouse');
  6 | });
  7 | 
```