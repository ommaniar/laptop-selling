import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useLogin } from '../required_context/LoginContext';
const PrivateRoutes = () => {
    const { isLoggedIn } = useLogin();

    return (
        isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />
    );
};

export default PrivateRoutes;
