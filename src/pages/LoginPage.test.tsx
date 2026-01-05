import { MantineProvider } from '@mantine/core'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import { authService } from '../services/authService'
import LoginPage from './LoginPage'

describe('LoginPage', () => {
  beforeEach(() => {
    // Reset users before each test
    authService.resetUsers()
  })

  it('should successfully login with valid credentials', async () => {
    const user = userEvent.setup()

    render(
      <MantineProvider>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/success"
              element={<div data-testid="success-page">Success!</div>}
            />
          </Routes>
        </MemoryRouter>
      </MantineProvider>,
    )

    // Find and fill in the form fields
    const emailInput = screen.getByTestId('email-input')
    const passwordInput = screen.getByTestId('password-input')
    const loginButton = screen.getByTestId('login-button')

    // Enter valid credentials (using the predefined mock user)
    await user.type(emailInput, 'admin@bloomfilter.ai')
    await user.type(passwordInput, 'Bloomfilter2026!')

    // Submit the form
    await user.click(loginButton)

    // Wait for navigation to success page
    await waitFor(() => {
      expect(screen.getByTestId('success-page')).toBeInTheDocument()
    })
  })

  it('should display error message with invalid credentials', async () => {
    const user = userEvent.setup()

    render(
      <MantineProvider>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </MemoryRouter>
      </MantineProvider>,
    )

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
