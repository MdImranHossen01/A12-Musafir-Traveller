import React, { useContext } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '../providers/AuthProvider';

const PublicRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    // Show a loading spinner while checking auth status
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    // If a user is logged in, redirect them away from the login/register page
    if (user) {
        return <Navigate to="/" />;
    }

    // If no user is logged in, show the login/register page
    return children;
};

export default PublicRoute;