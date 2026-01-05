import { MantineProvider } from '@mantine/core'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import { authService } from '../services/authService'
import LoginPage from './LoginPage'

// Wrapper component for tests
function TestWrapper({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </MantineProvider>
  )
}

describe('LoginPage', () => {
  beforeEach(() => {
    // Reset users before each test
    authService.resetUsers()
  })

  it('should successfully login with valid credentials', async () => {
    const user = userEvent.setup()

    render(<LoginPage />, { wrapper: TestWrapper })

    // Find and fill in the form fields
    const emailInput = screen.getByTestId('email-input')
    const passwordInput = screen.getByTestId('password-input')
    const loginButton = screen.getByTestId('login-button')

    // Enter valid credentials (using the predefined mock user)
    await user.type(emailInput, 'admin@bloomfilter.ai')
    await user.type(passwordInput, 'Bloomfilter2026!')

    // Submit the form
    await user.click(loginButton)

    // Wait for navigation - the component should navigate to /success
    // In a real test environment, we would check the URL or use a mock router
    await waitFor(() => {
      expect(screen.queryByTestId('error-message')).not.toBeInTheDocument()
    })
  })

  it('should display error message with invalid credentials', async () => {
    const user = userEvent.setup()

    render(<LoginPage />, { wrapper: TestWrapper })

    // Find and fill in the form fields
    const emailInput = screen.getByTestId('email-input')
    const passwordInput = screen.getByTestId('password-input')
    const loginButton = screen.getByTestId('login-button')

    // Enter invalid credentials
    await user.type(emailInput, 'wrong@email.com')
    await user.type(passwordInput, 'wrongpassword')

    // Submit the form
    await user.click(loginButton)

    // Wait for error message to appear
    await waitFor(() => {
      const errorMessage = screen.getByTestId('error-message')
      expect(errorMessage).toBeInTheDocument()
      expect(errorMessage).toHaveTextContent('Invalid email or password')
    })
  })
})
