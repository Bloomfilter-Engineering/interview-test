import { Anchor, Box, Button, Paper, Stack, Text, TextInput, Title } from '@mantine/core'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { ForgotPasswordData } from '../types/user'

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
  maxWidth: 400,
}

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
    <Box style={containerStyle}>
      <Paper shadow="md" radius="md" style={paperStyle}>
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
        <Stack gap={8} mt={16}>
          <Anchor component={Link} to="/login" size="sm" underline="hover">
            Back to login
          </Anchor>
        </Stack>
      </Paper>
    </Box>
  )
}

export default ForgotPasswordPage
