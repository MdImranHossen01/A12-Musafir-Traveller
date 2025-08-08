import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

const ManageCandidates = () => {
    const queryClient = useQueryClient();

    // Fetch all applications
    const { data: applications = [], isLoading } = useQuery({
        queryKey: ['applications'],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/applications`);
            return data;
        }
    });

    // Mutation for accepting a candidate
    const acceptMutation = useMutation({
        mutationFn: async (application) => {
            return axios.patch(`${import.meta.env.VITE_API_URL}/applications/accept/${application._id}`, { email: application.applicantEmail });
        },
        onSuccess: () => {
            toast.success("Candidate accepted!");
            queryClient.invalidateQueries(['applications']);
        }
    });

    // Mutation for rejecting a candidate
    const rejectMutation = useMutation({
        mutationFn: async (id) => {
            return axios.delete(`${import.meta.env.VITE_API_URL}/applications/${id}`);
        },
        onSuccess: () => {
            toast.success("Candidate rejected.");
            queryClient.invalidateQueries(['applications']);
        }
    });

    const handleAccept = (application) => acceptMutation.mutate(application);
    const handleReject = (id) => rejectMutation.mutate(id);
    
    if (isLoading) return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-spinner loading-lg text-primary"></span></div>;

    return (
        <div className="w-full bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Manage Guide Applications</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Applicant</th>
                            <th>Application Title</th>
                            <th>CV/Resume</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map(app => (
                            <tr key={app._id}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={app.applicantImage} alt={app.applicantName} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{app.applicantName}</div>
                                            <div className="text-sm opacity-50">{app.applicantEmail}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{app.title}</td>
                                <td><a href={app.cvLink} target="_blank" rel="noopener noreferrer" className="link link-primary">View CV</a></td>
                                <td className="flex gap-2">
                                    <button onClick={() => handleAccept(app)} className="btn btn-sm btn-success">Accept</button>
                                    <button onClick={() => handleReject(app._id)} className="btn btn-sm btn-error">Reject</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageCandidates;