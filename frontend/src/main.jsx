import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App'
import LoginForm from './pages/Login'
import UserProfile from './pages/UserProfile';
import EmailSendForm from './pages/FamilyProfile'
import './index.css'

const queryClient = new QueryClient

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<EmailSendForm>}>
        </Routes>
      </Router>
    </QueryClientProvider>
  </StrictMode>,
)
