export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
}

// Internal type for storing user data with password (should not be exposed to clients)
export interface UserRecord extends User {
  password: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignUpData {
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
}

export interface ForgotPasswordData {
  email: string
}
