import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
    FaUserEdit, FaListAlt, FaPlusSquare, FaBookOpen, FaHandshake,
    FaTasks, FaUserShield, FaPlus, FaUsers, FaAddressCard, FaBullhorn
} from 'react-icons/fa';
import { AuthContext } from '../providers/AuthProvider';
import useRole from '../hooks/useRole';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [role, isRoleLoading] = useRole();

    const touristLinks = (
        <>
            <li><NavLink to="/dashboard/my-bookings" className="flex items-center gap-3"><FaListAlt /> My Bookings</NavLink></li>
            <li><NavLink to="/dashboard/join-as-guide" className="flex items-center gap-3"><FaHandshake /> Join as a Guide</NavLink></li>
        </>
    );

    const tourGuideLinks = (
        <>
            <li><NavLink to="/dashboard/my-assigned-tours" className="flex items-center gap-3"><FaTasks /> My Assigned Tours</NavLink></li>
        </>
    );

    const adminLinks = (
        <>
            <li><NavLink to="/dashboard/admin-profile" className="flex items-center gap-3"><FaUserShield /> Admin Profile</NavLink></li>
            <li><NavLink to="/dashboard/add-package" className="flex items-center gap-3"><FaPlus /> Add Package</NavLink></li>
            <li><NavLink to="/dashboard/manage-users" className="flex items-center gap-3"><FaUsers /> Manage Users</NavLink></li>
            <li><NavLink to="/dashboard/manage-candidates" className="flex items-center gap-3"><FaAddressCard /> Manage Candidates</NavLink></li>
            <li><NavLink to="/dashboard/create-announcement" className="flex items-center gap-3"><FaBullhorn /> Create Announcement</NavLink></li>
        </>
    );

    const commonLinks = (
        <>
            <li><NavLink to="/dashboard/manage-profile" className="flex items-center gap-3"><FaUserEdit /> My Profile</NavLink></li>
            <li><NavLink to="/dashboard/add-story" className="flex items-center gap-3"><FaPlusSquare /> Add Story</NavLink></li>
            <li><NavLink to="/dashboard/manage-stories" className="flex items-center gap-3"><FaBookOpen /> Manage Stories</NavLink></li>
        </>
    );

    return (
        <div className="drawer lg:drawer-open">
            
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center p-4 md:p-8 bg-base-200">
                <Outlet />
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden absolute top-4 right-4">Menu</label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-100 text-base-content">
                    <div className="p-4 mb-4 text-center border-b">
                        <h2 className="text-2xl font-bold text-primary">Dashboard</h2>
                        <p className="text-sm capitalize">{role} Panel</p>
                    </div>
                    {isRoleLoading ? <span className="loading loading-spinner mx-auto"></span> : (
                        <>
                            {commonLinks}
                            <div className="divider my-2"></div>
                            {role === 'tourist' && touristLinks}
                            {role === 'tour-guide' && tourGuideLinks}
                            {role === 'admin' && adminLinks}
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;