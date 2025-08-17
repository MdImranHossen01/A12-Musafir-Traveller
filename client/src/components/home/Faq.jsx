import React from 'react';
import Lottie from 'lottie-react';
// You can download a suitable animation from LottieFiles, like this one:
// https://lottiefiles.com/animations/faq-Ci420371qB
import faqAnimation from '../../assets/faq-animation.json';

const faqData = [
    {
        question: "How do I book a tour package?",
        answer: "Booking a tour is easy! Simply navigate to the package you're interested in, fill out the booking form with your desired date and selected guide, and click 'Book Now'. You will then be guided to the payment process."
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit and debit cards through our secure payment gateway, powered by Stripe. Your payment information is always encrypted and safe with us."
    },
    {
        question: "Can I customize a tour package?",
        answer: "Absolutely! While we offer curated packages, we understand that every traveller is unique. Please contact our support team with your requirements, and we will be happy to create a custom itinerary for you."
    },
    {
        question: "What is your cancellation policy?",
        answer: "You can cancel any booking with a 'Pending' status directly from your dashboard for a full refund. For bookings that are 'In Review' or 'Accepted', please contact our support team to inquire about cancellation options."
    }
];

const Faq = () => {
    return (
        <div className="py-16 md:py-24 bg-base-100">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Frequently Asked Questions</h2>
                    <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
                        Have questions? We've got answers. Here are some of the most common queries from our travellers.
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Accordion Section */}
                    <div className="space-y-4">
                        {faqData.map((faq, index) => (
                            <div key={index} className="collapse collapse-plus bg-base-200">
                                <input type="radio" name="my-accordion-3" defaultChecked={index === 0} /> 
                                <div className="collapse-title text-xl font-medium">
                                    {faq.question}
                                </div>
                                <div className="collapse-content"> 
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Lottie Animation Section */}
                    <div>
                        <Lottie animationData={faqAnimation} loop={true} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faq;