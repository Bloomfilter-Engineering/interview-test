import { HttpResponse, http } from 'msw'
import { authService } from '../services/authService'
import type {
  ForgotPasswordData,
  LoginCredentials,
  SignUpData,
} from '../types/user'

export const handlers = [
  // Login endpoint
  http.post('/api/auth/login', async ({ request }) => {
    const credentials = (await request.json()) as LoginCredentials
    const result = await authService.login(credentials)

    if (!result.success) {
      return HttpResponse.json({ error: result.error }, { status: 401 })
    }

    return HttpResponse.json({ user: result.user })
  }),

  // Sign up endpoint
  http.post('/api/auth/signup', async ({ request }) => {
    const data = (await request.json()) as SignUpData
    const result = await authService.signUp(data)

    if (!result.success) {
      return HttpResponse.json({ error: result.error }, { status: 400 })
    }

    return HttpResponse.json({ message: 'Account created successfully' })
  }),

  // Forgot password endpoint
  http.post('/api/auth/forgot-password', async ({ request }) => {
    const data = (await request.json()) as ForgotPasswordData
    const result = await authService.forgotPassword(data.email)

    if (!result.success) {
      return HttpResponse.json({ error: result.error }, { status: 404 })
    }

    return HttpResponse.json({ message: 'Password reset email sent' })
  }),
]
