import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import EmailSentPage from './pages/EmailSentPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import SuccessPage from './pages/SuccessPage'

function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/email-sent" element={<EmailSentPage />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
