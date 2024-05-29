import { test, expect } from '@playwright/test';

test.describe("home page", () => {
  test('has title', async ({ page }) => {
    await page.goto('http://localhost:3000/home');
  
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Habit 3/);
  });
  
  test('get started link', async ({ page }) => {
    await page.goto('http://localhost:3000/home');
  
    // Click the get started link.
    await page.getByRole('link', { name: 'Get started' }).click();
  
    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  });
})

