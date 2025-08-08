import React, { useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';
import useAxiosSecure from '../../../api/axiosSecure';
import toast from 'react-hot-toast';

const ManageStories = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Fetch stories created by the current user
    const { data: stories = [], isLoading, error } = useQuery({
        // Only run the query if the user's email is available
        enabled: !!user?.email,
        queryKey: ['my-stories', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/stories/my-stories/${user.email}`);
            return data;
        }
    });

    // Mutation for deleting a story
    const deleteMutation = useMutation({
        mutationFn: async (storyId) => {
            return axiosSecure.delete(`/stories/${storyId}`);
        },
        onSuccess: () => {
            toast.success("Story deleted successfully!");
            // Refetch the stories list to show the change immediately
            queryClient.invalidateQueries({ queryKey: ['my-stories'] });
        },
        onError: () => {
            toast.error("Failed to delete story.");
        }
    });

    const handleDelete = (id) => {
        // You could add a confirmation modal here for better UX
        // For example: if (window.confirm("Are you sure you want to delete this story?")) { ... }
        deleteMutation.mutate(id);
    };

    if (isLoading) return <div className="flex justify-center items-center min-h-[60vh]"><span className="loading loading-lg loading-spinner text-primary"></span></div>;
    if (error) return <div className="text-center text-red-500">Failed to load your stories.</div>;

    return (
        <div className="w-full">
            <h2 className="text-3xl font-bold text-center mb-8">Manage My Stories</h2>
            {stories.length === 0 ? (
                <p className="text-center text-gray-500">You haven't posted any stories yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {stories.map(story => (
                        <div key={story._id} className="card bg-base-100 shadow-xl">
                            <figure className="h-56">
                                <img src={story.images[0] || 'https://placehold.co/400x225'} alt={story.title} className="w-full h-full object-cover" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{story.title}</h2>
                                <div className="card-actions justify-end">
                                    <Link to={`/dashboard/edit-story/${story._id}`} className="btn btn-sm btn-info">Edit</Link>
                                    <button onClick={() => handleDelete(story._id)} className="btn btn-sm btn-error">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageStories;