import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaUsers, FaBoxOpen, FaDollarSign, FaFileAlt, FaUserShield } from 'react-icons/fa';
import useAxiosSecure from '../../../api/axiosSecure';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const AdminOverview = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch admin statistics from the server
    const { data: stats, isLoading } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/admin-stats');
            return data;
        }
    });

    // Data for the charts, derived from the stats
    const userRoleData = [
        { name: 'Users', Tourists: stats?.totalTourists || 0, Guides: stats?.totalGuides || 0 },
    ];

    const contentData = [
        { name: 'Packages', value: stats?.totalPackages || 0 },
        { name: 'Stories', value: stats?.totalStories || 0 },
    ];

    const COLORS = ['#0088FE', '#00C49F']; // Colors for the Pie Chart

    if (isLoading) return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-spinner loading-lg text-primary"></span></div>;

    return (
        <div className="w-full p-4 md:p-8">
            <h2 className="text-3xl font-bold text-center mb-8">Admin Dashboard Overview</h2>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
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

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                {/* User Roles Bar Chart */}
                <div className="bg-base-100 p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold mb-4">User Roles Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={userRoleData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Tourists" fill="#8884d8" />
                            <Bar dataKey="Guides" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Content Distribution Pie Chart */}
                <div className="bg-base-100 p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold mb-4">Content Overview</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={contentData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {contentData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminOverview;