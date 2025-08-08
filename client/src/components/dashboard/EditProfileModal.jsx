import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../api/axiosSecure';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const EditProfileModal = ({ user, closeModal }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Pre-fill the form with the user's current data
    useEffect(() => {
        if (user) {
            reset({
                name: user.displayName,
                photoURL: user.photoURL
            });
        }
    }, [user, reset]);

    // Mutation for updating the profile
    const mutation = useMutation({
        mutationFn: async (updatedData) => {
            // The server will handle updating both MongoDB and Firebase
            return axiosSecure.patch(`/user/profile`, updatedData);
        },
        onSuccess: () => {
            toast.success("Profile updated successfully!");
            // Invalidate user-related queries to refetch fresh data
            queryClient.invalidateQueries({ queryKey: ['role'] });
            closeModal(); // Close the modal on success
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update profile.");
        }
    });

    const onSubmit = (data) => {
        mutation.mutate(data);
    };

    return (
        <dialog id="edit_profile_modal" className="modal modal-open">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Edit Your Profile</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                    <div>
                        <label className="label"><span className="label-text">Full Name</span></label>
                        <input
                            type="text"
                            {...register("name", { required: "Name is required" })}
                            className="input input-bordered w-full"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                        <label className="label"><span className="label-text">Photo URL</span></label>
                        <input
                            type="url"
                            {...register("photoURL", { required: "Photo URL is required" })}
                            className="input input-bordered w-full"
                        />
                        {errors.photoURL && <p className="text-red-500 text-xs mt-1">{errors.photoURL.message}</p>}
                    </div>
                    <div className="modal-action">
                        <button type="button" className="btn" onClick={closeModal}>Cancel</button>
                        <button type="submit" className="btn btn-primary" disabled={mutation.isLoading}>
                            {mutation.isLoading ? <span className="loading loading-spinner"></span> : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
};

export default EditProfileModal;