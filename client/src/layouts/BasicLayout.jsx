import React from 'react';
import Navbar from '../components/shared/Navbar';
import { Outlet } from 'react-router-dom'; // Corrected import
import Footer from '../components/shared/Footer';

const BasicLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            {/* FIX: Removed the container. The main content area now takes up the remaining space. */}
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default BasicLayout;