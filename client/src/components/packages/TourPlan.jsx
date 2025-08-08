import React from 'react';

const TourPlan = ({ plan }) => {
    if (!plan || plan.length === 0) return null;

    return (
        <div className="my-12">
            <h3 className="text-3xl font-bold mb-6 border-l-4 border-primary pl-4">Tour Plan</h3>
            <ul className="space-y-6">
                {plan.map((day, index) => (
                    <li key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                            <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">{day.day}</div>
                            {index < plan.length - 1 && <div className="border-l-2 border-dashed border-primary h-full mt-2"></div>}
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold">{day.title}</h4>
                            <p className="text-gray-600 mt-1">{day.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TourPlan;