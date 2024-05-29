import { test, expect } from '@playwright/test';

test.describe("home page", () => {
  test('has title', async ({ page }) => {
    await page.goto('http://localhost:3000/home');
  
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Habit 3/);
  });

  test('role bar present', async ({ page }) => {
    page.goto('http://localhost:3000/home');
    await expect(page.getByTitle("roles sidebar")).toBeVisible();

  });
  
  test.skip('add rock', async ({ page }) => {
    await page.goto('http://localhost:3000/home');
  
    // Click the "Add Rock" button.
    await page.getByRole('button', { name: 'Add Rock' }).click();
  
    // Expects page to have a text input for the new rock's name.
    await expect(page.getByRole('textbox', { name: 'new-rock' })).toBeVisible();
  });
})

