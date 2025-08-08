import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';
import { AuthContext } from '../../../providers/AuthProvider';
import { useNavigate } from 'react-router';

const JoinAsGuide = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setLoading(true);
        const applicationData = {
            ...data,
            applicantName: user?.displayName,
            applicantEmail: user?.email,
            applicantImage: user?.photoURL,
            status: 'pending' // Default status
        };

        try {
            // Post the application data to your server
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/applications`, applicationData);
            if (res.data.insertedId) {
                toast.success("Your application has been submitted successfully!");
                navigate('/dashboard/my-bookings'); // Redirect to another dashboard page
            }
        } catch (error) {
            toast.error("Failed to submit application.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-center text-gray-800">Join Our Team as a Tour Guide</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="label"><span className="label-text">Application Title</span></label>
                    <input type="text" {...register("title", { required: true })} placeholder="e.g., Expert Guide for Historical Sites" className="input input-bordered w-full" />
                </div>
                <div>
                    <label className="label"><span className="label-text">Why do you want to be a guide?</span></label>
                    <textarea {...register("reason", { required: true })} className="textarea textarea-bordered w-full h-32"></textarea>
                </div>
                <div>
                    <label className="label"><span className="label-text">CV / Resume Link</span></label>
                    <input type="url" {...register("cvLink", { required: true })} placeholder="https://linkedin.com/in/your-profile" className="input input-bordered w-full" />
                </div>
                <button type="submit" disabled={loading} className="btn btn-primary w-full">
                    {loading ? <span className="loading loading-spinner"></span> : "Submit Application"}
                </button>
            </form>
        </div>
    );
};

export default JoinAsGuide;