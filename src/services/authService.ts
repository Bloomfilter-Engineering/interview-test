import type {
  LoginCredentials,
  SignUpData,
  User,
  UserRecord,
} from '../types/user'

// In-memory user storage (stores UserRecord with password)
const users: Map<string, UserRecord> = new Map()

// Predefined mock user
const mockUser: UserRecord = {
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
    const userRecord = users.get(credentials.email)

    if (!userRecord) {
      return { success: false, error: 'Invalid email or password' }
    }

    if (userRecord.password !== credentials.password) {
      return { success: false, error: 'Invalid email or password' }
    }

    // Omit password from returned user
    const { password: _, ...user } = userRecord
    return { success: true, user }
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

    // Create new user record with password
    const newUser: UserRecord = {
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
   * Get all users (for testing purposes) - passwords omitted
   */
  getAllUsers: (): User[] => {
    return Array.from(users.values()).map(({ password: _, ...user }) => user)
  },

  /**
   * Clear all users except the mock user (for testing purposes)
   */
  resetUsers: (): void => {
    users.clear()
    users.set(mockUser.email, mockUser)
  },
}
