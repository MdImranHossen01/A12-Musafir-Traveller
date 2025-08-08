import React, { useContext, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../../../providers/AuthProvider';
import useAxiosSecure from '../../../api/axiosSecure';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const MyBookings = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { width, height } = useWindowSize();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const queryClient = useQueryClient();

    // --- Data Fetching ---
    const { data: bookingStats = { count: 0 } } = useQuery({
        enabled: !!user?.email,
        queryKey: ['bookingCount', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/bookings/count/${user.email}`);
            return data;
        }
    });

    const { data: bookings = [], isLoading } = useQuery({
        enabled: !!user?.email,
        queryKey: ['my-bookings', user?.email, currentPage],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/my-bookings/${user.email}`, {
                params: { page: currentPage, size: itemsPerPage }
            });
            return data;
        }
    });

    // --- Mutation for Cancelling a Booking ---
    const cancelMutation = useMutation({
        mutationFn: async (bookingId) => {
            return axiosSecure.delete(`/booking/${bookingId}`);
        },
        onSuccess: () => {
            toast.success("Booking cancelled successfully!");
            // Refetch queries to update the list and confetti count
            queryClient.invalidateQueries({ queryKey: ['my-bookings'] });
            queryClient.invalidateQueries({ queryKey: ['bookingCount'] });
        },
        onError: () => {
            toast.error("Failed to cancel booking.");
        }
    });

    const handleCancelBooking = (bookingId) => {
        // Using a simple confirmation dialog for now
        if (window.confirm("Are you sure you want to cancel this booking? This action cannot be undone.")) {
            cancelMutation.mutate(bookingId);
        }
    };

    const totalPages = Math.ceil(bookingStats.count / itemsPerPage);

    const getStatusClass = (status) => {
        switch (status) {
            case 'Accepted': return 'badge-success';
            case 'In Review': return 'badge-warning';
            case 'Rejected': return 'badge-error';
            default: return 'badge-ghost';
        }
    };

    if (isLoading) return <div className="text-center"><span className="loading loading-lg loading-spinner text-primary"></span></div>;

    return (
        <div className="w-full bg-white rounded-lg shadow-md p-6 relative">
            {bookingStats.count > 3 && <Confetti width={width} height={height} />}
            
            <h2 className="text-2xl font-bold mb-6 text-center">My Bookings</h2>

            {bookingStats.count > 3 && (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-lg" role="alert">
                    <p className="font-bold">Congratulations!</p>
                    <p>You've booked more than 3 trips with us! Thank you for being a loyal traveler.</p>
                </div>
            )}
            
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Package Name</th>
                            <th>Tour Guide</th>
                            <th>Tour Date</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id}>
                                <td>{booking.packageName}</td>
                                <td>{booking.guideName}</td>
                                <td>{new Date(booking.tourDate).toLocaleDateString()}</td>
                                <td>${booking.price}</td>
                                <td><span className={`badge ${getStatusClass(booking.status)}`}>{booking.status}</span></td>
                                <td>
                                    {booking.status === 'Pending' && (
                                        <div className="flex gap-2">
                                            <Link to={`/payment/${booking._id}`} className="btn btn-sm btn-primary">Pay</Link>
                                            <button onClick={() => handleCancelBooking(booking._id)} className="btn btn-sm btn-error">Cancel</button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center mt-8">
                <div className="join">
                    <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="join-item btn">«</button>
                    <button className="join-item btn">Page {currentPage}</button>
                    <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage >= totalPages} className="join-item btn">»</button>
                </div>
            </div>
        </div>
    );
};

export default MyBookings;