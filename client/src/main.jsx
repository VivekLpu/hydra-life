import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'aos/dist/aos.css'
import AOS from 'aos'
import 'bootstrap-icons/font/bootstrap-icons.css';

import './index.css'

import CartProvider from './context/CartContext'


AOS.init()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <CartProvider>
        <App />
      </CartProvider>
  </React.StrictMode>
)
