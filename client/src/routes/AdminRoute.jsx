import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import useRole from '../hooks/useRole';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [role, isRoleLoading] = useRole();

    if (loading || isRoleLoading) {
        return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
    }

    if (user && role === 'admin') {
        return children;
    }

    // Redirect to home if they are not an admin
    return <Navigate to="/" replace />;
};

export default AdminRoute;