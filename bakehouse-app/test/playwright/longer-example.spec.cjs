const { test, expect } = require('@playwright/test');

test.describe('Bakehouse website tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://tanyel-kemal-bakehouse.cta-training.academy/');
    });

    test('homepage loads and key content is visible', async ({ page }) => {
        await expect(page).toHaveTitle('client');

        const heading = page.locator('h2').first();
        await expect(heading).toBeVisible();

        const headingText = await heading.textContent();
        expect(headingText).toMatch('Welcome to the Bakehouse');
    });

    test('can check links on the homepage', async ({ page }) => {
        const links = page.locator('a');

        await expect(links.first()).toBeVisible();

        const linkCount = await links.count();
        expect(linkCount).toBe(9);

        console.log(`Found ${linkCount} links on the page`);
    });

    test('can navigate to products', async ({ page }) => {
        const firstLink = page.getByText('Products');

        await firstLink.click();

        await expect(page.locator('h2')).toHaveText('Products');

    });

    test('can add new product', async ({ page }) => {
        const newProd = page.getByText('New Product');

        await newProd.click();

        let randomNum = Math.floor(Math.random() * 1000);

        await page.getByLabel('Product Name').fill(`Test Product ${randomNum}`);
        await page.getByLabel('Category').fill('Category');
        await page.getByLabel('Price').fill('10.99');
        await page.locator('button[type="submit"]').click();

        await expect(page.locator('css=form p')).toHaveText('Product created ✔️');

    });

    test('can add new customer', async ({ page }) => {
        const newCus = page.getByText('New Customer')

        await newCus.click()

        await page.getByLabel('Full Name').fill('Reese Piece')
        await page.getByLabel('email').fill('pbutter@example.com')
        await page.locator('button[type="submit"]').click()

        await expect(page.locator('css=form p')).toHaveText('Customer created ✔️')
    })

    test('add new order with existing customer', async ({ page }) => {
        const newOrder = page.getByText('New Order')

        await newOrder.click()

        await page.getByLabel('Select Customer').selectOption('Reese Piece')
        await page.getByRole('select',{ name: 'Product' }).selectOption({label:'Vegan Banana Bread'})
        await page.getByLabel('number').fill('3')

        await page.locator('button[type="add"]').click()
        await page.getByLabel('Product').selectOption('Cinnamon Bun')

        await page.locator('button[type="submit"]').click()
    })
});
