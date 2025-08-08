import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';
import useAxiosSecure from '../../../api/axiosSecure';

const AddStory = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        setLoading(true);

        try {
            const imageFiles = Array.from(data.images);
            const uploadedImageUrls = [];

            const uploadPromises = imageFiles.map(file => {
                const formData = new FormData();
                formData.append('image', file);
                return axiosSecure.post('/upload', formData);
            });

            const uploadResults = await Promise.allSettled(uploadPromises);
            
            let uploadFailed = false;
            uploadResults.forEach(result => {
                if (result.status === 'fulfilled' && result.value.data.success) {
                    uploadedImageUrls.push(result.value.data.url);
                } else {
                    console.error('An image upload failed:', result.reason || result.value.data);
                    uploadFailed = true;
                }
            });

            if (uploadFailed) {
                toast.error("One or more images failed to upload. Please try again.");
                setLoading(false);
                return;
            }

            const storyData = {
                title: data.title,
                content: data.content,
                images: uploadedImageUrls,
                authorName: user?.displayName,
                authorEmail: user?.email,
                authorImage: user?.photoURL,
                createdAt: new Date(),
            };

            const serverRes = await axiosSecure.post('/stories', storyData);
            
            if (serverRes.data.insertedId) {
                toast.success('Story published successfully!');
                reset();
                navigate('/dashboard/manage-stories');
            }

        } catch (error) {
            toast.error('Failed to publish story. Please check the console.');
            console.error("Submission error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-center text-gray-800">Add Your Story</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="label">
                        <span className="label-text">Story Title</span>
                    </label>
                    <input 
                        type="text" 
                        {...register("title", { required: "Title is required" })} 
                        className="input input-bordered w-full" 
                    />
                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                </div>
                <div>
                    <label className="label">
                        <span className="label-text">Your Experience</span>
                    </label>
                    <textarea 
                        {...register("content", { required: "Story content is required" })} 
                        className="textarea textarea-bordered w-full h-32"
                    ></textarea>
                    {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>}
                </div>
                <div>
                    <label className="label">
                        <span className="label-text">Upload Images (you can select multiple)</span>
                    </label>
                    <input 
                        type="file" 
                        {...register("images", { required: "At least one image is required" })} 
                        multiple 
                        accept="image/*"
                        className="file-input file-input-bordered w-full" 
                    />
                    {errors.images && <p className="text-red-500 text-xs mt-1">{errors.images.message}</p>}
                </div>
                <button type="submit" disabled={loading} className="btn btn-primary w-full">
                    {loading ? <span className="loading loading-spinner"></span> : "Publish Story"}
                </button>
            </form>
        </div>
    );
};

export default AddStory;