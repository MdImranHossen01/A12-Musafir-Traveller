import React from 'react';
import { FaUserShield, FaMapMarkedAlt, FaWallet } from 'react-icons/fa';

const features = [
    {
        icon: <FaUserShield className="text-4xl text-primary" />,
        title: "Expert Local Guides",
        description: "Our guides are passionate locals who provide deep insights and authentic experiences."
    },
    {
        icon: <FaMapMarkedAlt className="text-4xl text-primary" />,
        title: "Tailor-Made Itineraries",
        description: "We craft personalized journeys that match your interests, budget, and travel style."
    },
    {
        icon: <FaWallet className="text-4xl text-primary" />,
        title: "Best Price Guarantee",
        description: "Enjoy competitive pricing and transparent costs with no hidden fees, ensuring value for your money."
    }
];

const WhyChooseUs = () => {
    return (
        <div className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Why Travel With Us?</h2>
                    <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">We are dedicated to making your travel experience in Bangladesh seamless and memorable.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {features.map((feature, index) => (
                        <div key={index} className="p-8 bg-base-100 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <div className="flex justify-center mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;