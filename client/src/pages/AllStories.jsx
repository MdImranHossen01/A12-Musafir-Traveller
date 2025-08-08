import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { AuthContext } from '../providers/AuthProvider';
import toast from 'react-hot-toast';

const AllStories = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const { data: stories = [], isLoading } = useQuery({
        queryKey: ['allStories'],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/stories`);
            return data;
        }
    });

    const handleShareClick = (e) => {
        if (!user) {
            e.preventDefault();
            toast.error("You must be logged in to share a story.");
            navigate('/login', { state: { from: location } });
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-lg loading-spinner text-primary"></span>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold text-center mb-12">All Tourist Stories</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {stories.map(story => (
                    <div key={story._id} className="card bg-base-100 shadow-xl">
                        <figure className="h-56">
                            <img
                                src={story.images?.[0] || 'https://placehold.co/400x225'}
                                alt={story.title}
                                className="w-full h-full object-cover"
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{story.title}</h2>
                            <p>{story.content?.substring(0, 100)}...</p>
                            <div className="card-actions justify-end items-center mt-4">
                                <div onClickCapture={handleShareClick}>
                                    <FacebookShareButton
                                        url={window.location.href}
                                        quote={`Check out this amazing story: "${story.title}"`}
                                        hashtag="#TouristGuideBD"
                                    >
                                        <FacebookIcon size={32} round />
                                    </FacebookShareButton>
                                </div>
                                <Link to={`/story/${story._id}`} className="btn btn-primary">
                                    Read Full Story
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllStories;
