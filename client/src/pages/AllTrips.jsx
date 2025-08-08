import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllTrips = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    // Fetch total package count for pagination
    const { data: packageCount = { count: 0 } } = useQuery({
        queryKey: ['packageCount'],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/packages/count`);
            return data;
        }
    });

    const totalPages = Math.ceil(packageCount.count / itemsPerPage);

    // Fetch paginated packages
    const { data: packages = [], isLoading } = useQuery({
        queryKey: ['allPackages', currentPage],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/packages`, {
                params: { page: currentPage, size: itemsPerPage }
            });
            return data;
        }
    });

    if (isLoading) return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-lg loading-spinner text-primary"></span></div>;

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold text-center mb-12">Explore All Our Packages</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {packages.map(pkg => (
                    <div key={pkg._id} className="card bg-base-100 shadow-xl transition-transform duration-300 hover:-translate-y-2">
                        <figure className="h-56"><img src={pkg.images[0]} alt={pkg.tripTitle} className="w-full h-full object-cover" /></figure>
                        <div className="card-body">
                            <div className="badge badge-primary">{pkg.tourType}</div>
                            <h2 className="card-title mt-2">{pkg.tripTitle}</h2>
                            <p className="text-xl font-bold text-secondary">${pkg.price}</p>
                            <div className="card-actions justify-end">
                                <Link to={`/package/${pkg._id}`} className="btn btn-primary">View Details</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-12">
                <div className="join">
                    <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="join-item btn">«</button>
                    <button className="join-item btn">Page {currentPage}</button>
                    <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage >= totalPages} className="join-item btn">»</button>
                </div>
            </div>
        </div>
    );
};

export default AllTrips;