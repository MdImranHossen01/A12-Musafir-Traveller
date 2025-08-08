import React from 'react';
import { FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa';

const AboutUs = () => {
    return (
        <div className="bg-base-100 py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
                    <div className="avatar">
                        <div className="w-40 md:w-52 rounded-full shadow-2xl">
                            {/* Replace with your image */}
                            <img src="https://placehold.co/200x200/F97316/FFFFFF?text=IMRAN" alt="Md. Imran Hossen" />
                        </div>
                    </div>
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-bold">Md. Imran Hossen</h1>
                        <p className="text-xl text-primary font-semibold mt-2">Full Stack Web Developer</p>
                        <p className="mt-4 text-gray-600 leading-relaxed">
                            I am a passionate developer from Bangladesh, dedicated to building modern, responsive, and user-friendly web applications. This Tourist Guide platform is one of my key projects, designed to showcase the beauty of my country through technology. I specialize in the MERN stack (MongoDB, Express, React, Node.js) and am always excited to learn new things.
                        </p>
                        <div className="flex justify-center md:justify-start gap-6 mt-6">
                            <a href="https://github.com/MdImranHossen01" target="_blank" rel="noopener noreferrer" className="text-3xl hover:text-primary transition-colors"><FaGithub /></a>
                            <a href="#" target="_blank" rel="noopener noreferrer" className="text-3xl hover:text-primary transition-colors"><FaLinkedin /></a>
                            <a href="#" target="_blank" rel="noopener noreferrer" className="text-3xl hover:text-primary transition-colors"><FaGlobe /></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;