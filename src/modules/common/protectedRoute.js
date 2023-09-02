import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, Route } from 'react-router-dom';


const ProtectedRoute = ({ component: component, ...rest }) => {
    const login = localStorage.getItem("userid");

    return login ? (
        <Outlet />
    ) : (
        <Navigate to="/" replace />
    );
};

export default ProtectedRoute;
