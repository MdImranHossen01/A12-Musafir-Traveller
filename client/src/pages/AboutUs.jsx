import React from 'react';
import { FaRegCompass, FaUsers, FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Demo data for the team section
const teamMembers = [
    { name: 'Rahim Ahmed', image: 'https://i.ibb.co/20WKsRNL/professional-beautiful-attractiv.webp' },
    { name: 'Fatima Khan', image: 'https://i.ibb.co/JRcysvTN/young-business-woman-52137-13749.webp' },
    { name: 'Anika Chowdhury', image: 'https://i.ibb.co/nqjCggXS/low-angle-businesswoman-posing-w.webp' },
    { name: 'Jamal Islam', image: 'https://i.ibb.co/j0513kd/pexels-photo-1036622.webp' }
];

const AboutUs = () => {
    return (
        <div>
            {/* Hero Section */}
            <div className="bg-base-200" style={{ backgroundImage: 'url(https://i.ibb.co/VYGz3BjY/15506763969-8d63212aa3-b.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="container mx-auto px-4 py-32 text-center text-white bg-black bg-opacity-50">
                    <motion.h1 
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-5xl font-bold"
                    >
                        Connecting You to the Heart of Bangladesh
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-lg mt-4 max-w-2xl mx-auto"
                    >
                        Musafir Traveller was born from a passion for showcasing the authentic, vibrant soul of Bangladesh to the world.
                    </motion.p>
                </div>
            </div>

            {/* Our Story Section */}
            <div className="py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-4">Our Story</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We are a team of passionate travelers and local experts who believe that the best way to experience a country is through its stories, its people, and its hidden gems. Frustrated by generic tours, we set out to create a platform that offers authentic, immersive, and unforgettable journeys. From the bustling streets of Old Dhaka to the serene mangrove forests of the Sundarbans, our mission is to guide you through the real Bangladesh.
                        </p>
                    </div>
                </div>
            </div>

            {/* Our Values Section */}
            <div className="bg-base-200 py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">What We Stand For</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto text-center">
                        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                            <FaRegCompass className="text-5xl text-primary mx-auto mb-4" />
                            <h3 className="text-2xl font-bold mb-2">Authenticity</h3>
                            <p className="text-gray-600">We connect you with local guides and experiences for a genuine taste of Bangladeshi culture.</p>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
                            <FaUsers className="text-5xl text-primary mx-auto mb-4" />
                            <h3 className="text-2xl font-bold mb-2">Community</h3>
                            <p className="text-gray-600">We foster a community of travelers who share stories and inspire one another to explore.</p>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}>
                            <FaHeart className="text-5xl text-primary mx-auto mb-4" />
                            <h3 className="text-2xl font-bold mb-2">Passion</h3>
                            <p className="text-gray-600">Our love for travel and for Bangladesh is at the heart of every tour we design.</p>
                        </motion.div>
                    </div>
                </div>
            </div>

             {/* Meet The Team Section */}
             <div className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Meet Some of Our Expert Guides</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                        {teamMembers.map((member, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="avatar">
                                    <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
                                        <img src={member.image} alt={member.name} />
                                    </div>
                                </div>
                                <h4 className="mt-4 font-bold text-lg">{member.name}</h4>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;