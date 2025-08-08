import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { Link } from 'react-router-dom';
import EditProfileModal from '../../../components/dashboard/EditProfileModal';

const ManageProfile = () => {
    const { user } = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Function to capitalize the first letter of role
    const formatRole = (role) => {
        if (!role) return '';
        return role.charAt(0).toUpperCase() + role.slice(1).replace('-', ' ');
    };

    return (
        <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-center text-gray-800">Welcome, {user?.displayName}!</h2>
            <div className="flex flex-col items-center space-y-4">
                <div className="avatar">
                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img 
                            src={user?.photoURL || 'https://placehold.co/100x100/CCCCCC/FFFFFF?text=U'} 
                            alt={user?.displayName} 
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://placehold.co/100x100/CCCCCC/FFFFFF?text=U';
                            }}
                        />
                    </div>
                </div>
                <div className="text-center">
                    <h3 className="text-2xl font-semibold">{user?.displayName || 'User'}</h3>
                    <p className="text-gray-600">{user?.email}</p>
                    {user?.role && (
                        <p className="badge badge-primary badge-outline mt-2">
                            Role: {formatRole(user.role)}
                        </p>
                    )}
                </div>
            </div>
            <div className="divider"></div>
            <div className="flex justify-center gap-4">
                <button 
                    onClick={() => setIsModalOpen(true)} 
                    className="btn btn-primary"
                >
                    Edit Profile
                </button>
                
                {/* Only show "Apply For Tour Guide" button if user is a tourist */}
                {user?.role === 'tourist' && (
                    <Link to="/dashboard/join-as-guide" className="btn btn-secondary">
                        Apply For Tour Guide
                    </Link>
                )}
            </div>

            {isModalOpen && (
                <EditProfileModal 
                    user={user} 
                    closeModal={() => setIsModalOpen(false)} 
                />
            )}
        </div>
    );
};

export default ManageProfile;