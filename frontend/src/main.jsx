import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import EmailSendForm from './pages/FamilyProfile'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EmailSendForm />
  </StrictMode>,
)
