import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import ContextShare from './contextShareAPI/ContextShare.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <GoogleOAuthProvider clientId="155214066698-4g2uf9p2tgvh2iebtih1eat1bklv1d9r.apps.googleusercontent.com">
        <ContextShare>
          <App />
        </ContextShare>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>
)
