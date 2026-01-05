export interface User {
  id: string
  email: string
  password: string
  firstName: string
  lastName: string
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
