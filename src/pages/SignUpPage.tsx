import {
  Anchor,
  Box,
  Button,
  List,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import type { SignUpData } from '../types/user'

const containerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: '#f5f5f5',
  padding: 20,
}

const paperStyle: React.CSSProperties = {
  padding: 32,
  width: '100%',
  maxWidth: 450,
}

const passwordRequirementsStyle: React.CSSProperties = {
  marginTop: 8,
  padding: 12,
  backgroundColor: '#f8f9fa',
  borderRadius: 4,
}

interface PasswordValidation {
  minLength: boolean
  hasUppercase: boolean
  hasNumber: boolean
  hasSymbol: boolean
}

function SignUpPage() {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showRequirements, setShowRequirements] = useState(false)

  const validatePasswordRealtime = (pwd: string): PasswordValidation => {
    return {
      minLength: pwd.length >= 8,
      hasUppercase: /[A-Z]/.test(pwd),
      hasNumber: /[0-9]/.test(pwd),
      hasSymbol: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pwd),
    }
  }

  const validation = validatePasswordRealtime(password)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const signUpData: SignUpData = {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      }

      const result = await authService.signUp(signUpData)

      if (!result.success) {
        setError(result.error || 'Sign up failed')
        setLoading(false)
        return
      }

      navigate('/login')
    } catch (_err) {
      setError('An unexpected error occurred')
      setLoading(false)
    }
  }

  return (
    <Box style={containerStyle}>
      <Paper shadow="md" radius="md" style={paperStyle}>
        <Title order={2} mb="lg">
          Sign Up
        </Title>
        <form onSubmit={handleSubmit}>
          <Stack gap="md">
            <TextInput
              label="First Name"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              data-testid="first-name-input"
            />
            <TextInput
              label="Last Name"
              placeholder="Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              data-testid="last-name-input"
            />
            <TextInput
              label="Email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              data-testid="email-input"
            />
            <div>
              <PasswordInput
                label="Password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setShowRequirements(true)}
                required
                data-testid="password-input"
              />
              {showRequirements && (
                <Box style={passwordRequirementsStyle}>
                  <Text size="sm" fw={500} mb={8}>
                    Password must contain:
                  </Text>
                  <List size="sm" spacing={4}>
                    <List.Item
                      style={{
                        color: validation.minLength ? 'green' : 'inherit',
                      }}
                    >
                      At least 8 characters
                    </List.Item>
                    <List.Item
                      style={{
                        color: validation.hasUppercase ? 'green' : 'inherit',
                      }}
                    >
                      At least 1 uppercase letter
                    </List.Item>
                    <List.Item
                      style={{
                        color: validation.hasNumber ? 'green' : 'inherit',
                      }}
                    >
                      At least 1 number
                    </List.Item>
                    <List.Item
                      style={{
                        color: validation.hasSymbol ? 'green' : 'inherit',
                      }}
                    >
                      At least 1 special character
                    </List.Item>
                  </List>
                </Box>
              )}
            </div>
            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              data-testid="confirm-password-input"
            />
            {error && (
              <Text c="red" size="sm" data-testid="error-message">
                {error}
              </Text>
            )}
            <Button
              type="submit"
              fullWidth
              loading={loading}
              data-testid="signup-button"
            >
              Sign Up
            </Button>
          </Stack>
        </form>
        <Stack gap={8} mt={16}>
          <Anchor component={Link} to="/login" size="sm" underline="hover">
            Already have an account? Log in
          </Anchor>
        </Stack>
      </Paper>
    </Box>
  )
}

export default SignUpPage
