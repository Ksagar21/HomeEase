import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useLocation } from "react-router-dom";

import LoginPage from "./Pages/LoginPage/LoginPage";
import Homepage from './Pages/HomePage/Homepage';
import Shops from './Pages/ShopsPage/Shops';
import SingleServices from './Pages/SingleService/SingleService';
import Services from './Pages/Services/Services';
import Cart from "./Pages/CartPage/Cart";
import Navbar from './Pages/navbar/Navbar';
import SignUp from './Pages/SignUp/SignUp';
import PrivateRoute from './Pages/PrivateRoutes';
import CheckOut from './Pages/Checkout/CheckOut';
import Admin from './Pages/Admin/Admin';
import Bookings from './Pages/Bookings/Bookings';
import ContactUs from './Pages/ContactUs/Contact';

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/signup"];

  return (
    <>
      {/* {!hideNavbarRoutes.includes(location.pathname) && <Navbar />} */}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Homepage />} /> 
        <Route path="/singleServices/:_id" element={<SingleServices />} />
          <Route path="services" element={<Services />} />
        <Route element={<PrivateRoute />}>
        <Route path ="/admin" element={<Admin />} />
          <Route path="/shops" element={<Shops />} />
          
          {/* <Route path="/services/:shopName" element={<Services />} /> */}
          <Route path="cart" element={<Cart />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path ="/checkout" element={<CheckOut />} />
          <Route path ="/contact" element={<ContactUs />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
