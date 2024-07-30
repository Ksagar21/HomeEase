import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

const PrivateRoute = () => {
  const isAuthenticated = !!sessionStorage.getItem('email');

  if (!isAuthenticated) {
    toast.error("Please log in to continue.");
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
