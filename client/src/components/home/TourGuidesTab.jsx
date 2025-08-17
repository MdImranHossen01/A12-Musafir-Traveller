import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

const fetchRandomGuides = async () => {
    const token = localStorage.getItem('access-token');
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/guides/random`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return data;
};

const TourGuidesTab = () => {
    const { data: guides, isLoading, isError } = useQuery({
        queryKey: ['randomGuides'],
        queryFn: fetchRandomGuides,
        staleTime: 1000 * 60 * 5 // Cache for 5 minutes
    });

    // Skeleton Loading State
    if (isLoading) return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="flex flex-col items-center space-y-3">
                    <div className="w-20 h-20 rounded-full bg-gray-200 animate-pulse"></div>
                    <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
                </div>
            ))}
        </div>
    );

    // Error State
    if (isError) return (
        <div className="text-center py-8">
            <div className="alert alert-error max-w-md mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Failed to load guides. Please try again.</span>
            </div>
            <button 
                className="btn btn-primary mt-4"
                onClick={() => window.location.reload()}
            >
                Retry
            </button>
        </div>
    );

    // Empty State
    if (!guides || guides.length === 0) return (
        <div className="text-center py-8">
            <div className="alert alert-info max-w-md mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>No tour guides available at the moment.</span>
            </div>
        </div>
    );

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {guides.map(guide => (
                    <div key={guide._id} className="flex flex-col items-center text-center group">
                        <div className="relative mb-3">
                            <img 
                                src={guide.photoURL || 'https://via.placeholder.com/150?text=Guide'} 
                                alt={guide.name} 
                                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-white shadow-lg group-hover:border-primary transition-all duration-300"
                            />
                            {guide.experienceYears > 0 && (
                                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap">
                                    {guide.experienceYears}+ years
                                </div>
                            )}
                        </div>
                        <h3 className="font-semibold text-gray-800">{guide.name}</h3>
                        {guide.specializations && (
                            <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                                {guide.specializations.join(', ')}
                            </p>
                        )}
                        <Link 
                            to={`/guide/${guide._id}`} 
                            className="btn btn-primary btn-sm mt-2 group-hover:btn-secondary transition-colors"
                        >
                            View Profile
                        </Link>
                    </div>
                ))}
            </div>
            
           
        </div>
    );
};

export default TourGuidesTab;