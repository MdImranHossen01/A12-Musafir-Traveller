import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../providers/AuthProvider';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    // 1. If the auth state is still loading, show a spinner
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    // 2. If a user is logged in, allow them to see the page
    if (user) {
        return children;
    }

    // 3. If no user is logged in, redirect them to the login page
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

// This is the line that was likely missing or incorrect
export default PrivateRoute;