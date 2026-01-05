import { styled } from '@linaria/react'
import { Button, Paper, Stack, Text, TextInput, Title } from '@mantine/core'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { ForgotPasswordData } from '../types/user'

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

function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const data: ForgotPasswordData = { email }
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        setError(result.error || 'Failed to send reset email')
        setLoading(false)
        return
      }

      navigate('/email-sent')
    } catch (_err) {
      setError('An unexpected error occurred')
      setLoading(false)
    }
  }

  return (
    <Container>
      <StyledPaper shadow="md" radius="md">
        <Title order={2} mb="lg">
          Forgot Password
        </Title>
        <Text size="sm" c="dimmed" mb="lg">
          Enter your email address and we'll send you instructions to reset your
          password.
        </Text>
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
            {error && (
              <Text c="red" size="sm" data-testid="error-message">
                {error}
              </Text>
            )}
            <Button
              type="submit"
              fullWidth
              loading={loading}
              data-testid="submit-button"
            >
              Send Reset Email
            </Button>
          </Stack>
        </form>
        <LinksContainer>
          <StyledLink to="/login">Back to login</StyledLink>
        </LinksContainer>
      </StyledPaper>
    </Container>
  )
}

export default ForgotPasswordPage
