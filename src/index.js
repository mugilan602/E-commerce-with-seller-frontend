import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ProductContextProvider } from './context/ProductContext';
import { AuthContextProvider } from './context/AuthContext';
import { SellerAuthContextProvider } from './context/SellerAuthContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <SellerAuthContextProvider>
        <AuthContextProvider>
            <ProductContextProvider>
                <App />
            </ProductContextProvider>
        </AuthContextProvider>
    </SellerAuthContextProvider>
);

