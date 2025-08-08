import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../api/axiosSecure';
import toast from 'react-hot-toast';
import { FaTrash } from 'react-icons/fa';

const EditStory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);

    // Fetch the specific story to edit
    const { data: story, isLoading } = useQuery({
        queryKey: ['story', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/story/${id}`);
            return data;
        }
    });

    // Pre-fill the form once the story data is loaded
    useEffect(() => {
        if (story) {
            reset({
                title: story.title,
                content: story.content
            });
        }
    }, [story, reset]);

    // Mutation for updating the story
    const updateMutation = useMutation({
        mutationFn: async (updatedData) => {
            return axiosSecure.patch(`/story/${id}`, updatedData);
        },
        onSuccess: () => {
            toast.success("Story updated successfully!");
            queryClient.invalidateQueries({ queryKey: ['my-stories'] });
            navigate('/dashboard/manage-stories');
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || "Failed to update story.");
        }
    });

    const onSubmit = async (data) => {
        setLoading(true);
        // For now, we are just updating text. Image updates can be added later.
        const updatedStoryData = {
            title: data.title,
            content: data.content,
        };
        updateMutation.mutate(updatedStoryData);
        setLoading(false);
    };

    if (isLoading) return <div className="flex justify-center items-center min-h-[60vh]"><span className="loading loading-lg loading-spinner text-primary"></span></div>;

    return (
        <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-center text-gray-800">Edit Your Story</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="label"><span className="label-text">Story Title</span></label>
                    <input type="text" {...register("title", { required: true })} className="input input-bordered w-full" />
                </div>
                <div>
                    <label className="label"><span className="label-text">Your Experience</span></label>
                    <textarea {...register("content", { required: true })} className="textarea textarea-bordered w-full h-48"></textarea>
                </div>
                {/* Image management can be added here as a future enhancement */}
                <button type="submit" disabled={updateMutation.isLoading || loading} className="btn btn-primary w-full">
                    {updateMutation.isLoading ? <span className="loading loading-spinner"></span> : "Save Changes"}
                </button>
            </form>
        </div>
    );
};

export default EditStory;