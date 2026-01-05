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

const SuccessIcon = styled.div`
  width: 64px;
  height: 64px;
  margin: 0 auto 24px;
  background-color: #51cf66;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  color: white;
`

function SuccessPage() {
  return (
    <Container>
      <StyledPaper shadow="md" radius="md" data-testid="success-page">
        <SuccessIcon>✓</SuccessIcon>
        <Title order={2} mb="md">
          Success!
        </Title>
        <Text c="dimmed" mb="xl">
          You have successfully logged in.
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

export default SuccessPage
