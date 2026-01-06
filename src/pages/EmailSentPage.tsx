import { Box, Button, Paper, Stack, Text, Title } from '@mantine/core'
import { Link } from 'react-router-dom'

const containerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: '#f5f5f5',
  padding: 20,
}

const paperStyle: React.CSSProperties = {
  padding: '48px 32px',
  width: '100%',
  maxWidth: 400,
  textAlign: 'center',
}

const iconStyle: React.CSSProperties = {
  width: 64,
  height: 64,
  margin: '0 auto 24px',
  backgroundColor: '#228be6',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 36,
  color: 'white',
}

function EmailSentPage() {
  return (
    <Box style={containerStyle}>
      <Paper
        shadow="md"
        radius="md"
        data-testid="email-sent-page"
        style={paperStyle}
      >
        <Box style={iconStyle}>✉</Box>
        <Title order={2} mb="md">
          Email Sent!
        </Title>
        <Text c="dimmed" mb="xl">
          We've sent you an email with instructions to reset your password.
          Please check your inbox.
        </Text>
        <Stack gap="sm">
          <Button component={Link} to="/login" fullWidth>
            Back to Login
          </Button>
        </Stack>
      </Paper>
    </Box>
  )
}

export default EmailSentPage
