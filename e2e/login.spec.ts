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

  test('should display error message with invalid credentials', async ({
    page,
  }) => {
    // Navigate to the login page
    await page.goto('/login')

    // Fill in the login form with invalid credentials
    await page.getByTestId('email-input').fill('wrong@email.com')
    await page.getByTestId('password-input').fill('wrongpassword')

    // Click the login button
    await page.getByTestId('login-button').click()

    // Wait for error message to appear
    await expect(page.getByTestId('error-message')).toBeVisible()
    await expect(page.getByTestId('error-message')).toContainText(
      'Invalid email or password',
    )

    // Verify we're still on the login page
    await expect(page).toHaveURL('/login')
  })
})
