import type { LoginCredentials, SignUpData, User } from '../types/user'

// In-memory user storage
const users: Map<string, User> = new Map()

// Predefined mock user
const mockUser: User = {
  id: '1',
  email: 'admin@bloomfilter.ai',
  password: 'Bloomfilter2026!',
  firstName: 'Admin',
  lastName: 'User',
}

// Initialize with mock user
users.set(mockUser.email, mockUser)

export const authService = {
  /**
   * Validates password according to the rules:
   * - Minimum 8 characters
   * - At least 1 uppercase letter
   * - At least 1 number
   * - At least 1 special character/symbol
   */
  validatePassword: (
    password: string,
  ): { valid: boolean; errors: string[] } => {
    const errors: string[] = []

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long')
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter')
    }

    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain at least one number')
    }

    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
      errors.push('Password must contain at least one special character')
    }

    return {
      valid: errors.length === 0,
      errors,
    }
  },

  /**
   * Attempts to login with provided credentials
   */
  login: async (
    credentials: LoginCredentials,
  ): Promise<{ success: boolean; user?: User; error?: string }> => {
    const user = users.get(credentials.email)

    if (!user) {
      return { success: false, error: 'Invalid email or password' }
    }

    if (user.password !== credentials.password) {
      return { success: false, error: 'Invalid email or password' }
    }

    return { success: true, user: { ...user, password: '' } } // Don't return password
  },

  /**
   * Signs up a new user
   */
  signUp: async (
    data: SignUpData,
  ): Promise<{ success: boolean; error?: string }> => {
    // Check if user already exists
    if (users.has(data.email)) {
      return {
        success: false,
        error: 'An account with this email already exists',
      }
    }

    // Validate password
    const passwordValidation = authService.validatePassword(data.password)
    if (!passwordValidation.valid) {
      return { success: false, error: passwordValidation.errors.join(', ') }
    }

    // Check if passwords match
    if (data.password !== data.confirmPassword) {
      return { success: false, error: 'Passwords do not match' }
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
    }

    users.set(data.email, newUser)

    return { success: true }
  },

  /**
   * Checks if an email exists in the system
   */
  emailExists: async (email: string): Promise<boolean> => {
    return users.has(email)
  },

  /**
   * Forgot password - just validates email exists
   */
  forgotPassword: async (
    email: string,
  ): Promise<{ success: boolean; error?: string }> => {
    const exists = await authService.emailExists(email)

    if (!exists) {
      return {
        success: false,
        error: 'No account found with this email address',
      }
    }

    return { success: true }
  },

  /**
   * Get all users (for testing purposes)
   */
  getAllUsers: (): User[] => {
    return Array.from(users.values())
  },

  /**
   * Clear all users except the mock user (for testing purposes)
   */
  resetUsers: (): void => {
    users.clear()
    users.set(mockUser.email, mockUser)
  },
}
