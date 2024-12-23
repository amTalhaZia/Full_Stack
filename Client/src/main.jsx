import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from "./store/AuthStore.jsx";
import { BrowserRouter } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ProductProvider } from './store/Product.Auth.jsx.jsx';
import { AdminProvider } from './store/AdminRoute.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ProductProvider>
        <AuthProvider>
          <AdminProvider>
            <App />
          </AdminProvider>
        </AuthProvider>
      </ProductProvider>
    </BrowserRouter>
  </StrictMode>,
);
