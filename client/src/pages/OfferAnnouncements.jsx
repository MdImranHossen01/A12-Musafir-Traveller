import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios'; // Public route, so standard axios is fine
import { FaBullhorn } from 'react-icons/fa';

const OfferAnnouncements = () => {
    const { data: announcements = [], isLoading } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            // This is a public endpoint, so we don't need axiosSecure
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/announcements`);
            return data;
        }
    });

    if (isLoading) return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-spinner loading-lg text-primary"></span></div>;

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold text-center mb-12">Offer Announcements</h1>
            <div className="space-y-8 max-w-3xl mx-auto">
                {announcements.length > 0 ? (
                    announcements.map(announcement => (
                        <div key={announcement._id} className="card bg-base-100 shadow-xl border-l-4 border-primary">
                            <div className="card-body">
                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/10 p-3 rounded-full">
                                        <FaBullhorn className="text-primary text-2xl" />
                                    </div>
                                    <div>
                                        <h2 className="card-title">{announcement.title}</h2>
                                        <p className="text-gray-600 mt-2">{announcement.description}</p>
                                        <p className="text-xs text-gray-400 mt-4">
                                            Posted on: {new Date(announcement.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No announcements at the moment. Please check back later!</p>
                )}
            </div>
        </div>
    );
};

export default OfferAnnouncements;