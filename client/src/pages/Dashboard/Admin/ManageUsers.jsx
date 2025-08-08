import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Select from 'react-select';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../api/axiosSecure';

const roleOptions = [
    { value: 'tourist', label: 'Tourist' },
    { value: 'tour-guide', label: 'Tour Guide' },
    { value: 'admin', label: 'Admin' }
];

const pageSizeOptions = [
    { value: 5, label: '5 per page' },
    { value: 10, label: '10 per page' },
    { value: 20, label: '20 per page' },
];

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const queryClient = useQueryClient();

    // Fetch total user count
    const { data: countData } = useQuery({
        queryKey: ['usersCount', search, roleFilter],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users/count`, {
                params: { search, role: roleFilter?.value }
            });
            return data;
        }
    });

    // FIX 1: Directly expect an array and provide a default empty array `[]`
    const { data: users = [], isLoading } = useQuery({
        queryKey: ['users', search, roleFilter, currentPage, pageSize],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users`, {
                params: { 
                    search, 
                    role: roleFilter?.value,
                    page: currentPage,
                    size: pageSize
                }
            });
            return data;
        }
    });

    // Mutation to update user role
    const mutation = useMutation({
        mutationFn: async ({ id, role }) => {
            return axiosSecure.patch(`/user/role/${id}`, { role });
        },
        onSuccess: () => {
            toast.success("User role updated!");
            queryClient.invalidateQueries({ queryKey: ['users'] });
            queryClient.invalidateQueries({ queryKey: ['usersCount'] });
        },
        onError: (error) => {
            console.error('Update role error:', error);
            toast.error("Failed to update role.");
        }
    });

    const handleMakeAdmin = (id) => mutation.mutate({ id, role: 'admin' });
    const handleMakeGuide = (id) => mutation.mutate({ id, role: 'tour-guide' });

    const totalUsers = countData?.count || 0;
    const totalPages = Math.ceil(totalUsers / pageSize);

    // FIX 2: The confusing data handling line has been removed.

    const goToPage = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handlePageSizeChange = (option) => {
        setPageSize(option.value);
        setCurrentPage(1);
    };

    const handleFilterChange = (option) => {
        setRoleFilter(option);
        setCurrentPage(1);
    };

    return (
        <div className="w-full bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Manage Users</h2>
            
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <input 
                    type="text" 
                    placeholder="Search by name or email..." 
                    value={search} 
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }} 
                    className="input input-bordered w-full md:w-1/2" 
                />
                <Select 
                    options={roleOptions} 
                    isClearable 
                    placeholder="Filter by role..." 
                    onChange={handleFilterChange} 
                    className="w-full md:w-1/2" 
                />
            </div>

            <div className="flex justify-end mb-4">
                <Select
                    options={pageSizeOptions}
                    defaultValue={pageSizeOptions.find(opt => opt.value === 10)}
                    onChange={handlePageSizeChange}
                    className="w-40"
                />
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="4" className="text-center py-4">
                                    <span className="loading loading-spinner loading-lg"></span>
                                </td>
                            </tr>
                        ) : users.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center py-4">No users found.</td>
                            </tr>
                        ) : (
                            // FIX 3: This now maps directly over the 'users' array from useQuery
                            users.map(user => (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td className="capitalize">{user.role}</td>
                                    <td className="flex gap-2">
                                        {user.role !== 'admin' && <button onClick={() => handleMakeAdmin(user._id)} className="btn btn-sm btn-accent">Make Admin</button>}
                                        {user.role === 'tourist' && <button onClick={() => handleMakeGuide(user._id)} className="btn btn-sm btn-secondary">Make Guide</button>}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
                <div>
                    Showing {users.length > 0 ? ((currentPage - 1) * pageSize + 1) : 0}-
                    {Math.min(currentPage * pageSize, totalUsers)} of {totalUsers} users
                </div>
                
                <div className="join">
                    <button 
                        className="join-item btn" 
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >«</button>
                    
                    <button className="join-item btn">Page {currentPage}</button>
                    
                    <button 
                        className="join-item btn" 
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage >= totalPages}
                    >»</button>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;