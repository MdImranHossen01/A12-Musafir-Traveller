import React, { useState } from 'react';
import { FaPlay } from 'react-icons/fa';

const Overview = () => {
  const [showVideo, setShowVideo] = useState(false);
  const videoId = "c_Jne3SKW88"; // Your YouTube video ID

  return (
    <section className="py-16 md:py-24 bg-base-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Text Content - Left Side */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Discover Bangladesh's Hidden Gems
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Immerse yourself in the breathtaking beauty of Bangladesh through our exclusive travel experiences.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Explore the world's longest natural sea beach</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Discover the mystical Sundarbans mangrove forest</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Experience vibrant local cultures and traditions</span>
              </li>
            </ul>
            <button className="btn btn-primary px-8 py-3">
              Explore Tours
            </button>
          </div>

          {/* Video - Right Side */}
          <div className="lg:w-1/2 w-full">
            <div className="rounded-xl overflow-hidden shadow-2xl bg-gray-900">
              <div className="relative pt-[56.25%]"> {/* 16:9 Aspect Ratio */}
                {!showVideo ? (
                  <div className="absolute inset-0">
                    <img
                      src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                      alt="Video thumbnail"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => setShowVideo(true)}
                      className="absolute inset-0 w-full h-full flex items-center justify-center group"
                      aria-label="Play video"
                    >
                      <div className="bg-primary hover:bg-primary-dark text-white rounded-full p-5 md:p-6 text-xl md:text-2xl transition-all duration-300 transform group-hover:scale-110">
                        <FaPlay />
                      </div>
                    </button>
                  </div>
                ) : (
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                    title="Bangladesh Travel Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;