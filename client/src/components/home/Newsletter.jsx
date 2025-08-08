import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const Newsletter = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        e.target.reset();
    };

    return (
        <div className="bg-primary text-white py-16 md:py-20">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Subscribe to Our Newsletter</h2>
                <p className="max-w-2xl mx-auto mb-8">
                    Get the latest travel deals, tour packages, and destination inspiration delivered straight to your inbox.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-lg mx-auto">
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        className="input input-bordered w-full text-gray-800"
                        required
                    />
                    <button type="submit" className="btn btn-secondary w-full sm:w-auto">
                        Subscribe <FaPaperPlane />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Newsletter;