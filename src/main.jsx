import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ServicesProvider from './context/ServicesContext.jsx'

createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
    
    <HelmetProvider>
      <ServicesProvider>
      <App />
      </ServicesProvider>
    </HelmetProvider>
    </BrowserRouter>
 
)