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
const App = () => {
  const { user } = useAuthContext();
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
            { /*seller */}
            <Route path="/seller/signup" element={<SellerSignup />} /> 
            <Route path="/seller/login" element={<SellerLogin />} /> 
            <Route path="/seller/dashboard" element={<SellerDashboard />} /> 
            <Route path="/seller/create" element={<Create />} />

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
