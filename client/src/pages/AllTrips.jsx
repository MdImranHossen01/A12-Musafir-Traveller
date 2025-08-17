import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllTrips = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('');
    const itemsPerPage = 9;

    // 1. Fetch ALL packages from the server, not just one page.
    const { data: allPackages = [], isLoading } = useQuery({
        queryKey: ['allPackages'], // This query will run once and cache the result.
        queryFn: async () => {
            // This endpoint needs to return all packages.
            // Assuming your /packages endpoint can do this if no page/size is sent.
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/packages`);
            return data;
        }
    });

    // 2. Perform searching, sorting, and filtering on the client-side.
    const filteredAndSortedPackages = useMemo(() => {
        let packages = [...allPackages];

        // Apply search filter
        if (searchQuery) {
            packages = packages.filter(pkg =>
                pkg.tripTitle.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply sorting
        if (sortOption === 'price-asc') {
            packages.sort((a, b) => a.price - b.price);
        } else if (sortOption === 'price-desc') {
            packages.sort((a, b) => b.price - a.price);
        }

        return packages;
    }, [allPackages, searchQuery, sortOption]);

    // 3. Apply pagination to the result of the filtered/sorted data.
    const totalPages = Math.ceil(filteredAndSortedPackages.length / itemsPerPage);
    const currentPackages = filteredAndSortedPackages.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleSearch = (e) => {
        e.preventDefault();
        const search = e.target.search.value;
        setSearchQuery(search);
        setCurrentPage(1); // Reset to first page on new search
    };

    if (isLoading) return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-lg loading-spinner text-primary"></span></div>;

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold text-center mb-4">Explore All Our Packages</h1>
            <p className="text-center text-gray-600 mb-12">Find your next adventure from our collection of curated tours.</p>
            
            {/* Search and Sort Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 p-4 bg-base-200 rounded-lg">
                <form onSubmit={handleSearch} className="flex-grow w-full md:w-auto">
                    <div className="join w-full">
                        <input name="search" type="text" placeholder="Search by trip title..." className="input input-bordered join-item w-full" />
                        <button type="submit" className="btn btn-primary join-item">Search</button>
                    </div>
                </form>
                <select 
                    value={sortOption} 
                    onChange={(e) => {
                        setSortOption(e.target.value);
                        setCurrentPage(1); // Reset to first page on sort change
                    }} 
                    className="select select-bordered w-full md:w-auto"
                >
                    <option value="">Sort By</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentPackages.map(pkg => (
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