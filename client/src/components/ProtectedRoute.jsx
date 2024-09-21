// import React from 'react';
import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types, no-unused-vars
const ProtectedRoute = ({ element: Component, ...rest }) => {
    const isAuthenticated = !!localStorage.getItem('token'); // Check if token exists

    // If authenticated, return the component; otherwise, redirect to login
    return isAuthenticated ? Component : <Navigate to="/login" />;
};

export default ProtectedRoute;
