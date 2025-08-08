import React from 'react';
import { Link } from 'react-router';

import { FaGithub, FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa6';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto p-10">
        <div className="footer grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Brand and Logo Section */}
          <nav>
            <header className="footer-title text-white opacity-100 mb-4">
               <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white">
                  <Logo></Logo>
               </Link>
            </header>
            <p className="max-w-xs">Your ultimate guide to exploring the wonders of Bangladesh. Plan your trip with us!</p>
          </nav>

          {/* Quick Links Section */}
          <nav>
            <header className="footer-title text-white opacity-100">Quick Links</header>
            <Link to="/all-trips" className="link link-hover">Trips</Link>
            <Link to="/community" className="link link-hover">Community</Link>
            <Link to="/about-us" className="link link-hover">About Us</Link>
            <Link to="/contact" className="link link-hover">Contact</Link>
          </nav>

          {/* Legal Section */}
          <nav>
            <header className="footer-title text-white opacity-100">Legal</header>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </nav>
          
          {/* Developer's Social Links */}
          <nav>
            <header className="footer-title text-white opacity-100">Connect with the Developer</header>
            <div className="flex items-center gap-4 text-2xl">
              <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer" className="link link-hover hover:text-primary transition-colors duration-300">
                <FaGithub />
              </a>
              <a href="https://linkedin.com/in/your-username" target="_blank" rel="noopener noreferrer" className="link link-hover hover:text-primary transition-colors duration-300">
                <FaLinkedin />
              </a>
              <a href="https://twitter.com/your-username" target="_blank" rel="noopener noreferrer" className="link link-hover hover:text-primary transition-colors duration-300">
                <FaTwitter />
              </a>
               <a href="https://facebook.com/your-username" target="_blank" rel="noopener noreferrer" className="link link-hover hover:text-primary transition-colors duration-300">
                <FaFacebook />
              </a>
            </div>
          </nav>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer footer-center p-4 bg-gray-900 text-base-content">
        <aside>
          <p className="text-gray-400">Copyright © {new Date().getFullYear()} - All right reserved by TouristGuide Inc.</p>
        </aside>
      </div>
    </footer>
  );
};

export default Footer;