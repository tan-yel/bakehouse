# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: longer-example.spec.cjs >> Bakehouse website tests >> can check links on the homepage
- Location: longer-example.spec.cjs:19:5

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
Call log:
  - navigating to "/", waiting until "load"

```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | 
  3  | test.describe('Bakehouse website tests', () => {
  4  | 
  5  |     test.beforeEach(async ({ page }) => {
> 6  |         await page.goto('/');
     |                    ^ Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
  7  |     });
  8  | 
  9  |     test('homepage loads and key content is visible', async ({ page }) => {
  10 |         await expect(page).toHaveTitle('client');
  11 | 
  12 |         const heading = page.locator('h2').first();
  13 |         await expect(heading).toBeVisible();
  14 | 
  15 |         const headingText = await heading.textContent();
  16 |         expect(headingText).toMatch('Welcome to the Bakehouse');
  17 |     });
  18 | 
  19 |     test('can check links on the homepage', async ({ page }) => {
  20 |         const links = page.locator('a');
  21 | 
  22 |         await expect(links.first()).toBeVisible();
  23 | 
  24 |         const linkCount = await links.count();
  25 |         expect(linkCount).toBe(9);
  26 | 
  27 |         console.log(`Found ${linkCount} links on the page`);
  28 |     });
  29 | 
  30 |     test('can navigate to products', async ({ page }) => {
  31 |         const firstLink = page.getByText('Products');
  32 | 
  33 |         await firstLink.click();
  34 | 
  35 |         await expect(page.locator('h2')).toHaveText('Products');
  36 | 
  37 |     });
  38 | 
  39 |     test('can add new product', async ({ page }) => {
  40 |         const newProd = page.getByText('New Product');
  41 | 
  42 |         await newProd.click();
  43 | 
  44 |         let randomNum = Math.floor(Math.random() * 1000);
  45 | 
  46 |         await page.getByLabel('Product Name').fill(`Test Product ${randomNum}`);
  47 |         await page.getByLabel('Category').fill('Category');
  48 |         await page.getByLabel('Price').fill('10.99');
  49 |         await page.locator('button[type="submit"]').click();
  50 | 
  51 |         await expect(page.locator('css=form p')).toHaveText('Product created ✔️');
  52 | 
  53 |     });
  54 | 
  55 |     test('can add new customer', async ({ page }) => {
  56 |         const newCus = page.getByText('New Customer')
  57 | 
  58 |         await newCus.click()
  59 | 
  60 |         await page.getByLabel('Full Name').fill('Reese Piece')
  61 |         await page.getByLabel('email').fill('pbutter@example.com')
  62 |         await page.locator('button[type="submit"]').click()
  63 | 
  64 |         await expect(page.locator('css=form p')).toHaveText('Customer created ✔️')
  65 |     })
  66 | 
  67 |     test('add new order with existing customer', async ({ page }) => {
  68 |         const newOrder = page.getByText('New Order')
  69 | 
  70 |         await newOrder.click()
  71 | 
  72 |         await page.getByLabel('Select Customer').selectOption('Reese Piece')
  73 |         await page.getByRole('select',{ name: 'Product' }).selectOption({label:'Vegan Banana Bread'})
  74 |         await page.getByLabel('number').fill('3')
  75 | 
  76 |         await page.locator('button[type="add"]').click()
  77 |         await page.getByLabel('Product').selectOption('Cinnamon Bun')
  78 | 
  79 |         await page.locator('button[type="submit"]').click()
  80 |     })
  81 | });
  82 | 
```