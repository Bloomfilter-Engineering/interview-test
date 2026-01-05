import { styled } from '@linaria/react'
import { Button, Paper, Stack, Text, Title } from '@mantine/core'
import { Link } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
`

const StyledPaper = styled(Paper)`
  padding: 48px 32px;
  width: 100%;
  max-width: 400px;
  text-align: center;
`

const EmailIcon = styled.div`
  width: 64px;
  height: 64px;
  margin: 0 auto 24px;
  background-color: #228be6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  color: white;
`

function EmailSentPage() {
  return (
    <Container>
      <StyledPaper shadow="md" radius="md" data-testid="email-sent-page">
        <EmailIcon>✉</EmailIcon>
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
      </StyledPaper>
    </Container>
  )
}

export default EmailSentPage
