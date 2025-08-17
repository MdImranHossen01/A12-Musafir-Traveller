import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

// ✅ Use environment variable for API URL
const fetchRandomPackages = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/packages/random`);
    return data;
};

const PackagesTab = () => {
    const { data: packages, isLoading, isError } = useQuery({
        queryKey: ['randomPackages'],
        queryFn: fetchRandomPackages,
        staleTime: 1000 * 60 * 5 // 5 minutes cache
    });

    if (isLoading) return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="card bg-base-200 animate-pulse">
                    <div className="h-60 bg-base-300 rounded-t-xl"></div>
                    <div className="card-body space-y-4">
                        <div className="h-4 bg-base-300 rounded w-1/4"></div>
                        <div className="h-6 bg-base-300 rounded w-3/4"></div>
                        <div className="flex justify-between items-center mt-4">
                            <div className="h-6 bg-base-300 rounded w-1/4"></div>
                            <div className="h-10 bg-base-300 rounded w-1/3"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    if (isError) return (
        <div className="text-center py-12">
            <div className="alert alert-error max-w-md mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Failed to load packages. Please try again later.</span>
            </div>
            <button 
                className="btn btn-primary mt-4"
                onClick={() => window.location.reload()}
            >
                Retry
            </button>
        </div>
    );

    if (!packages || packages.length === 0) return (
        <div className="text-center py-12">
            <div className="alert alert-info max-w-md mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>No packages available at the moment. Check back later!</span>
            </div>
        </div>
    );

    return (
        <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {packages.map(pkg => (
                    <div key={pkg._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 group">
                        <figure className="relative overflow-hidden h-60">
                            <img 
                                src={pkg.images[0] || 'https://placehold.co/600x400?text=Travel+Bangladesh'} 
                                alt={pkg.tripTitle} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            <div className="absolute top-4 right-4">
                                <span className="badge badge-primary">{pkg.tourType}</span>
                            </div>
                            <div className="absolute bottom-4 left-4 right-4">
                                <h3 className="text-xl font-bold text-white">{pkg.tripTitle}</h3>
                                <p className="text-primary font-semibold">${pkg.price} <span className="text-sm text-white/70">per person</span></p>
                            </div>
                        </figure>
                        <div className="card-body p-4">
                               
                            <div className="card-actions mt-4">
                                <Link 
                                    to={`/package/${pkg._id}`} 
                                    className="btn btn-primary btn-block"
                                >
                                    Explore Package
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="text-center">
                <Link to="/all-trips" className="btn btn-primary px-8">
                    View All Packages <span className="ml-2">→</span>
                </Link>
            </div>
        </div>
    );
};

export default PackagesTab;
