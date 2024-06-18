import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Create from './pages/Create';
import Category from './Components/Category';
import Login from './pages/Login';
import Signup from './pages/Singup';
import Cart from './pages/Cart';
import SellerSignup from "./pages/SellerSignup"
import SellerLogin from "./pages/SellerLogin"
import { useAuthContext } from './hooks/useAuthContext';
import SellerDashboard from "./pages/SellerDashboard"
import CustomersPage from './pages/CustomerPage';
import SuccessPage from './pages/SuccessPage';
import { useSellerAuthContext } from './hooks/useSellerAuthContext';
const App = () => {
  const { user } = useAuthContext();
const {seller}=useSellerAuthContext();
  return (
    <div className='App'>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />

            {!user && <Route path="/login" element={<Login />} />}
            {!user && <Route path="/signup" element={<Signup />} />}
            <Route path="/category/:categoryName" element={<Category />} />
            <Route path="/cart" element={<Cart />} />
            {/* Seller Routes */}
            {!seller && <Route path="/seller/signup" element={<SellerSignup />} />}
            {!seller && <Route path="/seller/login" element={<SellerLogin />} />}

            {seller && <Route path="/seller/dashboard" element={<SellerDashboard />} />}
            {seller && <Route path="/seller/create" element={<Create />} />}
            {seller && <Route path="/seller/product/:productId/customers" element={<CustomersPage />} />}
            {seller && <Route path="/success" element={<SuccessPage />} />}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
