import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ImageGallery from '../components/packages/ImageGallery';
import TourPlan from '../components/packages/TourPlan';
import BookingForm from '../components/packages/BookingForm';
import MeetOurGuidesSection from '../components/packages/MeetOurGuidesSection'; // <-- Import the new component

const PackageDetails = () => {
    const { id } = useParams();

    const { data: tourPackage, isLoading, error } = useQuery({
        queryKey: ['package', id],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/package/${id}`);
            return data;
        }
    });

    if (isLoading) return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-lg loading-spinner text-primary"></span></div>;
    if (error) return <div className="text-center py-20">Error loading package details.</div>;

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{tourPackage.tripTitle}</h1>
            <p className="text-lg text-gray-500 mb-8">{tourPackage.tourType}</p>

            <ImageGallery images={tourPackage.images} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
                <div className="lg:col-span-2">
                    <div className="mb-12">
                        <h3 className="text-3xl font-bold mb-4 border-l-4 border-primary pl-4">About The Tour</h3>
                        <p className="text-gray-600 leading-relaxed">{tourPackage.aboutTour || "Detailed information about this fantastic tour will be provided here, highlighting the key attractions and unique experiences."}</p>
                    </div>
                    <TourPlan plan={tourPackage.tourPlan} />
                    
                    {/* Add the new section here */}
                    <MeetOurGuidesSection /> 
                </div>
                <div>
                    <BookingForm tourPackage={tourPackage} />
                </div>
            </div>
        </div>
    );
};

export default PackageDetails;