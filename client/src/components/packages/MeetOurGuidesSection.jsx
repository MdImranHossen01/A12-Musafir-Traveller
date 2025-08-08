import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MeetOurGuidesSection = () => {
    const { data: guides = [], isLoading } = useQuery({
        queryKey: ['all-guides'],
        queryFn: async () => {
            // This is a public route, so standard axios is fine
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/all-guides`);
            return data;
        }
    });

    if (isLoading) return <div className="text-center"><span className="loading loading-spinner text-primary"></span></div>;

    return (
        <div className="my-12">
            <h3 className="text-3xl font-bold mb-6 border-l-4 border-primary pl-4">Our Tour Guides</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {guides.map(guide => (
                    <Link to={`/guide/${guide._id}`} key={guide._id} className="text-center group">
                        <div className="avatar">
                            <div className="w-24 rounded-full ring ring-primary group-hover:ring-secondary ring-offset-base-100 ring-offset-2 transition-all">
                                <img src={guide.photoURL} alt={guide.name} />
                            </div>
                        </div>
                        <p className="mt-2 font-semibold group-hover:text-secondary transition-colors">{guide.name}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default MeetOurGuidesSection;