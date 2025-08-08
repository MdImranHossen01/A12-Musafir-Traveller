import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FaEnvelope, FaUserShield } from 'react-icons/fa';

const TourGuideProfile = () => {
    const { id } = useParams();

    // Fetch guide details
    const { data: guide, isLoading: isLoadingGuide } = useQuery({
        queryKey: ['guide', id],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/guide/${id}`);
            return data;
        }
    });

    // Fetch stories by this guide
    const { data: stories = [], isLoading: isLoadingStories } = useQuery({
        // Only run this query after we have the guide's email
        enabled: !!guide?.email,
        queryKey: ['storiesByGuide', guide?.email],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/stories/by-guide/${guide.email}`);
            return data;
        }
    });

    if (isLoadingGuide || isLoadingStories) return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-lg loading-spinner text-primary"></span></div>;

    return (
        <div className="container mx-auto px-4 py-16">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-base-200 rounded-lg shadow-md mb-12">
                <div className="avatar">
                    <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
                        <img src={guide.photoURL} alt={guide.name} />
                    </div>
                </div>
                <div>
                    <h1 className="text-4xl font-bold">{guide.name}</h1>
                    <p className="text-lg text-gray-600 flex items-center gap-2 mt-2"><FaUserShield /> Tour Guide</p>
                    <p className="text-lg text-gray-600 flex items-center gap-2 mt-1"><FaEnvelope /> {guide.email}</p>
                </div>
            </div>

            {/* Stories by this Guide */}
            <div>
                <h2 className="text-3xl font-bold mb-8">Stories by {guide.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {stories.length > 0 ? stories.map(story => (
                        <div key={story._id} className="card bg-base-100 shadow-xl">
                            <figure className="h-56"><img src={story.images[0]} alt={story.title} className="w-full h-full object-cover" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{story.title}</h2>
                                <div className="card-actions justify-end">
                                    <Link to={`/story/${story._id}`} className="btn btn-primary btn-outline">Read More</Link>
                                </div>
                            </div>
                        </div>
                    )) : <p>{guide.name} has not posted any stories yet.</p>}
                </div>
            </div>
        </div>
    );
};

export default TourGuideProfile;