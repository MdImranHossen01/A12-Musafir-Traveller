import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FaUserCircle, FaCalendarAlt } from 'react-icons/fa';

const StoryDetails = () => {
  const { id } = useParams();

  const { data: story, isLoading, error } = useQuery({
    queryKey: ['storyDetails', id],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/story-details/${id}`);
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-lg loading-spinner text-primary"></span>
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="text-center py-20 text-red-600 text-xl font-semibold">
        Error loading story details.
      </div>
    );
  }

  return (
    <div className="bg-base-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">

          {/* Title & Author Info */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">{story.title || 'Untitled Story'}</h1>
            <div className="flex items-center gap-6 text-gray-500 text-sm">
              <div className="flex items-center gap-2">
                <img
                  src={story.authorImage || 'https://placehold.co/100x100?text=User'}
                  alt={story.authorName || 'Author'}
                  className="w-8 h-8 rounded-full"
                />
                <span>By {story.authorName || 'Unknown Author'}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCalendarAlt />
                <span>{story.createdAt ? new Date(story.createdAt).toLocaleDateString() : 'Unknown Date'}</span>
              </div>
            </div>
          </div>

          {/* Main Story Image */}
          {story.images?.length > 0 && (
            <figure className="mb-8">
              <img
                src={story.images[0]}
                alt={story.title}
                className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg"
              />
            </figure>
          )}

          {/* Content */}
          <div className="prose lg:prose-xl max-w-none">
            <p>{story.content || 'No story content available.'}</p>
          </div>

          {/* Optional Image Gallery */}
          {story.images?.length > 1 && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-4">More Photos</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {story.images.slice(1).map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Story image ${index + 2}`}
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryDetails;
