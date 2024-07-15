import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({
  children
}) => {

  const {authData} = useAuth();
  if (!authData?.userId) {
    return <Navigate to='/login' replace />;
  }

  return children;
};

export default ProtectedRoute;
