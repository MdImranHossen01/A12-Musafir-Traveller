import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share';
import { AuthContext } from '../../providers/AuthProvider';
import toast from 'react-hot-toast';
import { FaRegClock, FaMapMarkerAlt } from 'react-icons/fa';

const TouristStorySection = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const { data: stories = [], isLoading, isError } = useQuery({
        queryKey: ['randomStories'],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/stories/random`);
            return data;
        },
        staleTime: 1000 * 60 * 5 // Cache for 5 minutes
    });

    const handleShareClick = (e) => {
        if (!user) {
            e.preventDefault();
            toast.error("Please login to share stories");
            navigate('/login', { state: { from: location } });
        }
    };

    if (isLoading) return (
        <div className="py-16 md:py-24 bg-base-200">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="card bg-base-100 shadow-xl animate-pulse">
                            <div className="h-48 bg-gray-300 rounded-t-xl"></div>
                            <div className="card-body space-y-4">
                                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                                    <div className="h-8 bg-gray-300 rounded w-24"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    if (isError) return (
        <div className="py-16 md:py-24 bg-base-200 text-center">
            <div className="alert alert-error max-w-md mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Failed to load stories. Please try again later.</span>
            </div>
        </div>
    );

    return (
        <section className="py-16 md:py-24 bg-base-200">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Traveler's Tales & Experiences
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Discover authentic stories from fellow adventurers who explored Bangladesh
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stories.map(story => (
                        <article key={story._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow group">
                            <figure className="relative h-48 overflow-hidden">
                                <img 
                                    src={story.images[0] || 'https://placehold.co/600x400?text=Travel+Bangladesh'} 
                                    alt={story.title} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                    <h3 className="text-xl font-bold text-white">{story.title}</h3>
                                </div>
                            </figure>
                            <div className="card-body p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="avatar">
                                        <div className="w-10 rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-2">
                                            <img src={story.authorImage || 'https://placehold.co/100?text=User'} alt={story.authorName} />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-semibold">{story.authorName}</p>
                                        <p className="text-sm text-gray-500">{new Date(story.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                
                                <div className="flex gap-4 text-sm mb-4">
                                    {story.destination && (
                                        <span className="flex items-center gap-1 text-gray-600">
                                            <FaMapMarkerAlt className="text-primary" />
                                            {story.destination}
                                        </span>
                                    )}
                                    {story.tripDuration && (
                                        <span className="flex items-center gap-1 text-gray-600">
                                            <FaRegClock className="text-primary" />
                                            {story.tripDuration} days
                                        </span>
                                    )}
                                </div>

                                <div className="card-actions justify-between items-center">
                                    <div className="flex gap-2">
                                        <div onClickCapture={handleShareClick}>
                                            <FacebookShareButton
                                                url={`${window.location.origin}/story/${story._id}`}
                                                quote={`${story.title} - Read this travel story`}
                                                hashtag="#TravelBangladesh"
                                            >
                                                <FacebookIcon size={28} round />
                                            </FacebookShareButton>
                                        </div>
                                        <div onClickCapture={handleShareClick}>
                                            <TwitterShareButton
                                                url={`${window.location.origin}/story/${story._id}`}
                                                title={`${story.title} - Amazing travel experience`}
                                                hashtags={["TravelBangladesh"]}
                                            >
                                                <TwitterIcon size={28} round />
                                            </TwitterShareButton>
                                        </div>
                                    </div>
                                    <Link 
                                        to={`/story/${story._id}`} 
                                        className="btn btn-primary btn-sm md:btn-md"
                                    >
                                        Read Story
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link to="/community" className="btn btn-primary px-8">
                        Explore More Stories <span className="ml-2">→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default TouristStorySection;