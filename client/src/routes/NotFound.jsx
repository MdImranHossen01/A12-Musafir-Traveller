import React from 'react';
import { Link } from 'react-router';
import { FaHome } from 'react-icons/fa';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-center px-4">
            <h1 className="text-8xl md:text-9xl font-bold text-primary">404</h1>
            <h2 className="text-3xl md:text-4xl font-semibold mt-4">Page Not Found</h2>
            <p className="text-lg text-gray-600 mt-2 max-w-md">
                Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or maybe you just mistyped the URL.
            </p>
            <Link to="/" className="btn btn-primary mt-8">
                <FaHome className="mr-2" />
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFound;