import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ allowedRoles, children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState({ auth: null, role: null });

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('http://localhost:8081/auth/verifytoken', {
                    withCredentials: true,
                });
                if (response.status === 200) {
                    setIsAuthenticated({ auth: true, role: response.data.role });
                }else {
                    setIsAuthenticated({ auth: false });
                }
            } catch (error) {
                console.log('Authentication check failed:', error.response?.data || error.message);
                setIsAuthenticated({ auth: false });
            }
        };
        checkAuth();
    }, []);

    // if (isAuthenticated === null) {
    //     return <div>Loading...</div>;
    // }

    // return isAuthenticated ? (children || <Outlet />) : <Navigate to="/employeeLogin" />;

    if (isAuthenticated.auth === null) {
        return <div>Loading...</div>; // Loading state until authentication is checked
    }

    if (!isAuthenticated.auth) {
        return <Navigate to="/employeeLogin" />; // Redirect to login if not authenticated
    }

    if (!allowedRoles.includes(isAuthenticated.role)) {
        // Redirect unauthorized roles
        return isAuthenticated.role === 'Employee'
            ? <Navigate to="/empdashboard/profile" />
            : <Navigate to="/dashboard" />;
    }

    return children || <Outlet />;
};

export default ProtectedRoute;
