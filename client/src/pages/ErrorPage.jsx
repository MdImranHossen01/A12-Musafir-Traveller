import React from 'react';
import { useRouteError, Link } from 'react-router-dom';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center px-4">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
            >
                <FaExclamationTriangle className="text-8xl text-red-500 mx-auto" />
            </motion.div>

            <motion.h1 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-6xl md:text-8xl font-bold text-gray-800 mt-8"
            >
                {error.status || 'Oops!'}
            </motion.h1>

            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-2xl font-semibold text-gray-700 mt-4"
            >
                {error.statusText || 'Something went wrong'}
            </motion.p>

            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-lg text-gray-500 mt-2 max-w-md"
            >
                It seems you've taken a wrong turn on your journey. The page you are looking for does not exist or has been moved.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8 }}
                className="mt-10"
            >
                <Link to="/" className="btn btn-primary text-white">
                    <FaHome className="mr-2" />
                    Go Back Home
                </Link>
            </motion.div>
        </div>
    );
};

export default ErrorPage;