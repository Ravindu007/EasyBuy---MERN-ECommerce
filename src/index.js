import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SellerProductContextProvider } from './context/SellerProductContext';
import { SellerProfileContextProvider } from './context/SellerProfileContext';
import { AuthContextProvider } from './context/AuthContext';
import { AuthenticProductContextProvider } from './context/AuthenticProductContext';
import { ReportContextProvider } from './context/ReportContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <ReportContextProvider>
    <AuthenticProductContextProvider>
    <SellerProfileContextProvider>
    <SellerProductContextProvider>
    <App />
    </SellerProductContextProvider>
    </SellerProfileContextProvider>
    </AuthenticProductContextProvider>
    </ReportContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
