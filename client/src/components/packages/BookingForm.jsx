import React, { useState, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../api/axiosSecure';
import { AuthContext } from '../../providers/AuthProvider';
import toast from 'react-hot-toast';

const BookingForm = ({ tourPackage }) => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, control, reset } = useForm();
    const [loading, setLoading] = useState(false);

    // Fetch all tour guides to populate the dropdown
    const { data: guides = [] } = useQuery({
        queryKey: ['allGuides'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/all-guides');
            return data;
        }
    });

    const onSubmit = async (data) => {
        setLoading(true);
        const bookingData = {
            packageName: tourPackage.tripTitle,
            packageId: tourPackage._id,
            touristName: user.displayName,
            touristEmail: user.email,
            touristImage: user.photoURL,
            price: tourPackage.price,
            tourDate: data.tourDate,
            guideName: data.guideName,
            status: 'Pending'
        };

        try {
            const res = await axiosSecure.post('/bookings', bookingData);
            if (res.data.insertedId) {
                toast.success('Booking successful! Please check "My Bookings" for payment.');
                reset();
            }
        } catch (error) {
            toast.error("Booking failed. Please try again.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 bg-base-200 rounded-lg shadow-lg">
            <h3 className="text-3xl font-bold mb-6 text-center">Book This Tour</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input type="text" readOnly defaultValue={tourPackage.tripTitle} className="input input-bordered w-full" />
                <input type="text" readOnly defaultValue={user?.displayName} className="input input-bordered w-full" />
                <input type="email" readOnly defaultValue={user?.email} className="input input-bordered w-full" />
                <input type="text" readOnly defaultValue={`$${tourPackage.price}`} className="input input-bordered w-full" />

                <Controller
                    name="tourDate"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <DatePicker {...field} selected={field.value} placeholderText="Select Tour Date" className="input input-bordered w-full" minDate={new Date()} />}
                />
                
                {/* FIX: Changed to use defaultValue on the select element */}
                <select 
                    {...register("guideName", { required: true })} 
                    className="select select-bordered w-full"
                    defaultValue=""
                >
                    <option disabled value="">Select a Tour Guide</option>
                    {guides.map(guide => (
                        <option key={guide._id} value={guide.name}>{guide.name}</option>
                    ))}
                </select>

                <button type="submit" disabled={loading || !user} className="btn btn-primary w-full">
                    {loading ? <span className="loading loading-spinner"></span> : "Book Now"}
                </button>
                {!user && <p className="text-center text-red-500 text-sm">You must be logged in to book a tour.</p>}
            </form>
        </div>
    );
};

export default BookingForm;