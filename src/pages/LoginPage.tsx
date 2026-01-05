import { styled } from '@linaria/react'
import {
  Button,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { LoginCredentials } from '../types/user'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
`

const StyledPaper = styled(Paper)`
  padding: 32px;
  width: 100%;
  max-width: 400px;
`

const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
`

const StyledLink = styled(Link)`
  color: #228be6;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`

function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const credentials: LoginCredentials = { email, password }
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Login failed')
        setLoading(false)
        return
      }

      navigate('/success')
    } catch (_err) {
      setError('An unexpected error occurred')
      setLoading(false)
    }
  }

  return (
    <Container>
      <StyledPaper shadow="md" radius="md">
        <Title order={2} mb="lg">
          Login
        </Title>
        <form onSubmit={handleSubmit}>
          <Stack gap="md">
            <TextInput
              label="Email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              data-testid="email-input"
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              data-testid="password-input"
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
              data-testid="login-button"
            >
              Log In
            </Button>
          </Stack>
        </form>
        <LinksContainer>
          <StyledLink to="/forgot-password">Forgot your password?</StyledLink>
          <StyledLink to="/signup">Don't have an account? Sign up</StyledLink>
        </LinksContainer>
      </StyledPaper>
    </Container>
  )
}

export default LoginPage
