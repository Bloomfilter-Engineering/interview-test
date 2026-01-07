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
})
