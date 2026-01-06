# Interview Test Application

A sample authentication web application built with React, TypeScript, and Vite for vetting SDET job candidates.

## Overview

This application demonstrates a complete authentication flow including:
- Login with email and password
- Sign up with password validation
- Forgot password flow
- Success and confirmation screens

## Technology Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router
- **UI Components**: Mantine
- **Styling**: Linaria (CSS-in-JS)
- **API Mocking**: Mock Service Worker (MSW)
- **Linting/Formatting**: Biome
- **Unit Testing**: Vitest with React Testing Library
- **E2E Testing**: Playwright and Cypress

## Prerequisites

- Node.js 22.17.0 (managed via asdf)
- pnpm package manager

## Getting Started

### Installation

```bash
# Install dependencies
pnpm install
```

### Development

```bash
# Start the development server
pnpm dev
```

The application will be available at `http://localhost:5173`

### Building

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Testing

### Unit Tests (Vitest)

```bash
# Run unit tests
pnpm test

# Run tests in watch mode
pnpm test -- --watch

# Run tests with UI
pnpm test:ui
```

### E2E Tests (Playwright)

```bash
# Run Playwright tests
pnpm test:e2e:playwright

# Run Playwright tests in UI mode
pnpm exec playwright test --ui
```

### E2E Tests (Cypress)

```bash
# Open Cypress interactive test runner
pnpm test:e2e:cypress

# Run Cypress tests headlessly
pnpm exec cypress run
```

Note: Make sure the development server is running (`pnpm dev`) before running Cypress tests manually. Playwright will start the server automatically.

## Code Quality

```bash
# Run linting
pnpm lint

# Fix linting issues
pnpm lint:fix

# Format code
pnpm format
```

## Application Features

### 1. Login Flow
- Navigate to `/login`
- Enter email and password
- Upon success, redirects to `/success`
- Shows error message for invalid credentials

**Test Credentials:**
- Email: `admin@bloomfilter.ai`
- Password: `Bloomfilter2026!`

### 2. Sign Up Flow
- Navigate to `/signup` or click "Sign up" link from login page
- Enter first name, last name, email, password, and password confirmation
- Password must meet requirements:
  - At least 8 characters
  - At least 1 uppercase letter
  - At least 1 number
  - At least 1 special character
- Upon success, redirects back to `/login`
- New users are stored in memory for the session

### 3. Forgot Password Flow
- Navigate to `/forgot-password` or click "Forgot your password?" link from login page
- Enter email address
- System validates that email exists
- Upon success, redirects to `/email-sent` confirmation page

### 4. Success Pages
- `/success` - Shown after successful login
- `/email-sent` - Shown after password reset email is sent

## Project Structure

```
├── src/
│   ├── pages/           # Page components
│   │   ├── LoginPage.tsx
│   │   ├── SignUpPage.tsx
│   │   ├── ForgotPasswordPage.tsx
│   │   ├── SuccessPage.tsx
│   │   └── EmailSentPage.tsx
│   ├── services/        # Business logic
│   │   └── authService.ts
│   ├── types/           # TypeScript types
│   │   └── user.ts
│   ├── mocks/           # MSW handlers
│   │   ├── handlers.ts
│   │   └── browser.ts
│   ├── test/            # Test setup
│   │   └── setup.ts
│   ├── App.tsx          # Main app component
│   └── main.tsx         # Entry point
├── e2e/                 # Playwright tests
│   └── login.spec.ts
├── cypress/             # Cypress tests
│   └── e2e/
│       └── login.cy.ts
└── public/              # Static assets

```

## API Endpoints (Mocked via MSW)

All API calls are intercepted by Mock Service Worker and handled in-memory:

- `POST /api/auth/login` - Login with credentials
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/forgot-password` - Request password reset

## Authentication Service

The authentication service (`src/services/authService.ts`) provides:
- In-memory user storage
- Password validation
- User login/signup functionality
- Email existence checking
- Utility functions for testing (`resetUsers()`, `getAllUsers()`)

## Writing Tests

### Unit Test Example

See `src/pages/LoginPage.test.tsx` for an example of testing a React component with Vitest and React Testing Library.

### Playwright E2E Test Example

See `e2e/login.spec.ts` for an example of end-to-end testing with Playwright.

### Cypress E2E Test Example

See `cypress/e2e/login.cy.ts` for an example of end-to-end testing with Cypress.

## Notes for Candidates

This application is designed to help you demonstrate your testing skills. You may:
- Write additional unit tests for components and services
- Write additional E2E tests for different user flows
- Test edge cases and error handling
- Test form validation
- Use either Playwright or Cypress (or both) based on your preference

The application intentionally has no real backend - all API calls are mocked using MSW, making it easy to test different scenarios without external dependencies.
