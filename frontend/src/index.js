import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SellerProductContextProvider } from './context/SellerProductContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SellerProductContextProvider>
    <App />
    </SellerProductContextProvider>
  </React.StrictMode>
);
