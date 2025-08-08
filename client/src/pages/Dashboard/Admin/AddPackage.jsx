import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaPlus, FaTrash } from 'react-icons/fa';
import useAxiosSecure from '../../../api/axiosSecure'; // Use the secure instance

const AddPackage = () => {
    const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues: {
            tourPlan: [{ day: 1, title: '', description: '' }]
        }
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "tourPlan"
    });
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const imageFiles = Array.from(data.images);
            const uploadedImageUrls = [];

            for (const file of imageFiles) {
                const formData = new FormData();
                formData.append('image', file);
                // Use the secure axios instance for the upload
                const res = await axiosSecure.post('/upload', formData);
                
                // FIX: Changed from res.data.data.display_url to res.data.url
                if (res.data.success) {
                    uploadedImageUrls.push(res.data.url); 
                } else {
                    throw new Error('An image upload failed');
                }
            }

            const packageData = {
                ...data,
                images: uploadedImageUrls,
                price: parseFloat(data.price)
            };

            const serverRes = await axiosSecure.post('/packages', packageData);
            if (serverRes.data.insertedId) {
                toast.success("Package added successfully!");
                reset();
            }
        } catch (error) {
            toast.error("Failed to add package.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-center mb-8">Add a New Tour Package</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input {...register("tripTitle", { required: true })} placeholder="Trip Title" className="input input-bordered w-full" />
                    <input {...register("tourType", { required: true })} placeholder="Tour Type (e.g., Adventure)" className="input input-bordered w-full" />
                    <input {...register("price", { required: true, valueAsNumber: true })} type="number" placeholder="Price ($)" className="input input-bordered w-full" />
                </div>
                
                <div>
                    <label className="label"><span className="label-text">Tour Images (Select Multiple)</span></label>
                    <input type="file" {...register("images", { required: true })} multiple className="file-input file-input-bordered w-full" />
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-2">Tour Plan</h3>
                    {fields.map((item, index) => (
                        <div key={item.id} className="flex items-center gap-2 mb-2">
                            <input {...register(`tourPlan.${index}.title`)} placeholder={`Day ${index + 1} Title`} className="input input-bordered w-full" />
                            <textarea {...register(`tourPlan.${index}.description`)} placeholder="Description" className="textarea textarea-bordered w-full"></textarea>
                            <button type="button" onClick={() => remove(index)} className="btn btn-error btn-square"><FaTrash /></button>
                        </div>
                    ))}
                    <button type="button" onClick={() => append({ day: fields.length + 1, title: '', description: '' })} className="btn btn-sm btn-outline btn-primary mt-2"><FaPlus /> Add Day</button>
                </div>
                
                <button type="submit" disabled={loading} className="btn btn-primary w-full">
                    {loading ? <span className="loading loading-spinner"></span> : "Add Package"}
                </button>
            </form>
        </div>
    );
};

export default AddPackage;