describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should successfully login with valid credentials', () => {
    // Verify we're on the login page
    cy.get('h2').should('contain', 'Login')

    // Fill in the login form with valid credentials
    cy.get('[data-testid="email-input"]').type('admin@bloomfilter.ai')
    cy.get('[data-testid="password-input"]').type('Bloomfilter2026!')

    // Click the login button
    cy.get('[data-testid="login-button"]').click()

    // Verify we're redirected to the success page
    cy.url().should('include', '/success')
    cy.get('[data-testid="success-page"]').should('be.visible')
    cy.get('h2').should('contain', 'Success!')
  })

  it('should display error message with invalid credentials', () => {
    // Fill in the login form with invalid credentials
    cy.get('[data-testid="email-input"]').type('wrong@email.com')
    cy.get('[data-testid="password-input"]').type('wrongpassword')

    // Click the login button
    cy.get('[data-testid="login-button"]').click()

    // Verify error message appears
    cy.get('[data-testid="error-message"]').should('be.visible')
    cy.get('[data-testid="error-message"]').should(
      'contain',
      'Invalid email or password',
    )

    // Verify we're still on the login page
    cy.url().should('include', '/login')
  })

  it('should navigate to sign up page', () => {
    // Click on the sign up link
    cy.contains("Don't have an account? Sign up").click()

    // Verify we're on the sign up page
    cy.url().should('include', '/signup')
    cy.get('h2').should('contain', 'Sign Up')
  })

  it('should navigate to forgot password page', () => {
    // Click on the forgot password link
    cy.contains('Forgot your password?').click()

    // Verify we're on the forgot password page
    cy.url().should('include', '/forgot-password')
    cy.get('h2').should('contain', 'Forgot Password')
  })
})
