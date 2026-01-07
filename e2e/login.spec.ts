import { expect, test } from '@playwright/test'

test.describe('Login Flow', () => {
  test('should successfully login with valid credentials', async ({ page }) => {
    // Navigate to the login page
    await page.goto('/')

    // Wait for the page to load
    await expect(page.locator('h2')).toContainText('Login')

    // Fill in the login form with valid credentials
    await page.getByTestId('email-input').fill('admin@bloomfilter.ai')
    await page.getByTestId('password-input').fill('Bloomfilter2026!')

    // Click the login button
    await page.getByTestId('login-button').click()

    // Wait for navigation to success page
    await expect(page).toHaveURL('/success')

    // Verify success page content
    await expect(page.getByTestId('success-page')).toBeVisible()
    await expect(page.locator('h2')).toContainText('Success!')
  })
})
