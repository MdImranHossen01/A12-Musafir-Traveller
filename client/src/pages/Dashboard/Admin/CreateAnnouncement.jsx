import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../api/axiosSecure';

const CreateAnnouncement = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        setLoading(true);
        const announcementData = {
            title: data.title,
            description: data.description,
            createdAt: new Date(),
        };

        try {
            const res = await axiosSecure.post('/announcements', announcementData);
            if (res.data.insertedId) {
                toast.success("Announcement posted successfully!");
                reset();
            }
        } catch (error) {
            toast.error("Failed to post announcement.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-center text-gray-800">Create a New Announcement</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="label">
                        <span className="label-text">Announcement Title</span>
                    </label>
                    <input
                        type="text"
                        {...register("title", { required: "Title is required" })}
                        className="input input-bordered w-full"
                        placeholder="e.g., Monsoon Discount Offer!"
                    />
                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                </div>
                <div>
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <textarea
                        {...register("description", { required: "Description is required" })}
                        className="textarea textarea-bordered w-full h-32"
                        placeholder="Describe the offer or announcement..."
                    ></textarea>
                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                </div>
                <button type="submit" disabled={loading} className="btn btn-primary w-full">
                    {loading ? <span className="loading loading-spinner"></span> : "Post Announcement"}
                </button>
            </form>
        </div>
    );
};

export default CreateAnnouncement;