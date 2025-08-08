import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaUsers, FaBoxOpen, FaDollarSign, FaFileAlt, FaUserShield } from 'react-icons/fa';
import useAxiosSecure from '../../../api/axiosSecure'; // 1. Import useAxiosSecure

const AdminProfile = () => {
    const axiosSecure = useAxiosSecure(); // 2. Use the hook

    // Fetch admin statistics from the server using the secure instance
    const { data: stats, isLoading } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            // 3. Use axiosSecure instead of axios
            const { data } = await axiosSecure.get('/admin-stats');
            return data;
        }
    });

    if (isLoading) return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-spinner loading-lg text-primary"></span></div>;

    return (
        <div className="w-full p-4 md:p-8">
            <h2 className="text-3xl font-bold text-center mb-8">Admin Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                <div className="stat bg-base-100 shadow-lg rounded-lg">
                    <div className="stat-figure text-secondary"><FaDollarSign className="text-3xl" /></div>
                    <div className="stat-title">Total Revenue</div>
                    <div className="stat-value text-secondary">${stats?.totalRevenue || 0}</div>
                </div>
                <div className="stat bg-base-100 shadow-lg rounded-lg">
                    <div className="stat-figure text-primary"><FaUsers className="text-3xl" /></div>
                    <div className="stat-title">Total Tourists</div>
                    <div className="stat-value text-primary">{stats?.totalTourists || 0}</div>
                </div>
                <div className="stat bg-base-100 shadow-lg rounded-lg">
                    <div className="stat-figure text-accent"><FaUserShield className="text-3xl" /></div>
                    <div className="stat-title">Total Guides</div>
                    <div className="stat-value text-accent">{stats?.totalGuides || 0}</div>
                </div>
                <div className="stat bg-base-100 shadow-lg rounded-lg">
                    <div className="stat-figure text-info"><FaBoxOpen className="text-3xl" /></div>
                    <div className="stat-title">Total Packages</div>
                    <div className="stat-value text-info">{stats?.totalPackages || 0}</div>
                </div>
                 <div className="stat bg-base-100 shadow-lg rounded-lg">
                    <div className="stat-figure text-warning"><FaFileAlt className="text-3xl" /></div>
                    <div className="stat-title">Total Stories</div>
                    <div className="stat-value text-warning">{stats?.totalStories || 0}</div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;