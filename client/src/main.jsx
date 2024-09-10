import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { Auth0Provider } from '@auth0/auth0-react';
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Auth0Provider
    domain="dev-m5zoyyqwu0xn7orc.us.auth0.com"
    clientId="UBEGDXIMYhd0igXfWcRfwe7du9K7V9eH"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <Toaster />
    <App />
  </Auth0Provider >,
  // </React.StrictMode >,
)
