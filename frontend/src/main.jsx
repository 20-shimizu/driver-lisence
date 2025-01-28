import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginForm from './pages/Login'
import FamilyProfile from './pages/FamilyProfile';
import './index.css'

const queryClient = new QueryClient

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/profile" element={<FamilyProfile />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  </StrictMode>,
)
