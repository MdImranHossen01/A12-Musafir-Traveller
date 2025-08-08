import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../api/axiosSecure'; // 1. Import useAxiosSecure

const MyAssignedTours = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure(); // 2. Use the hook
    const queryClient = useQueryClient();

    const { data: assignedTours = [], isLoading } = useQuery({
        enabled: !!user?.email,
        queryKey: ['assignedTours', user?.email],
        queryFn: async () => {
            // 3. Use axiosSecure for fetching
            const { data } = await axiosSecure.get(`/my-assigned-tours/${user.email}`);
            return data;
        },
    });

    const mutation = useMutation({
        mutationFn: async ({ id, status }) => {
            // 3. Use axiosSecure for updating
            return axiosSecure.patch(`/booking/status/${id}`, { status });
        },
        onSuccess: () => {
            toast.success("Booking status updated!");
            queryClient.invalidateQueries({ queryKey: ['assignedTours'] });
        },
        onError: () => {
            toast.error("Failed to update status.");
        }
    });

    const handleAccept = (id) => mutation.mutate({ id, status: 'Accepted' });
    const handleReject = (id) => mutation.mutate({ id, status: 'Rejected' });

    if (isLoading) return <div className="text-center"><span className="loading loading-lg loading-spinner text-primary"></span></div>;

    return (
        <div className="w-full bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">My Assigned Tours</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Package Name</th>
                            <th>Tourist Name</th>
                            <th>Tour Date</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignedTours.map((tour) => (
                            <tr key={tour._id}>
                                <td>{tour.packageName}</td>
                                <td>{tour.touristName}</td>
                                <td>{new Date(tour.tourDate).toLocaleDateString()}</td>
                                <td>${tour.price}</td>
                                <td><span className={`badge badge-outline ${tour.status === 'Accepted' ? 'badge-success' : tour.status === 'Rejected' ? 'badge-error' : 'badge-warning'}`}>{tour.status}</span></td>
                                <td>
                                    {tour.status === 'In Review' && (
                                        <div className="flex gap-2">
                                            <button onClick={() => handleAccept(tour._id)} className="btn btn-sm btn-success">Accept</button>
                                            <button onClick={() => handleReject(tour._id)} className="btn btn-sm btn-error">Reject</button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAssignedTours;