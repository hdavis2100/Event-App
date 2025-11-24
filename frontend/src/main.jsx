import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/eventApp/creative-project-module7-512518/frontend/dist/">
      <App />
    </BrowserRouter>
  </StrictMode>
)
