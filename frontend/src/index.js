import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SellerProductContextProvider } from './context/SellerProductContext';
import { SellerProfileContextProvider } from './context/SellerProfileContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <SellerProfileContextProvider>
    <SellerProductContextProvider>
    <App />
    </SellerProductContextProvider>
    </SellerProfileContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
