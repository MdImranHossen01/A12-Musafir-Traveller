import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import { FaQuoteLeft } from 'react-icons/fa';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Demo testimonial data
const testimonials = [
    {
        quote: "The Sundarbans trip was a once-in-a-lifetime experience! Our guide was incredibly knowledgeable, and the entire tour was perfectly organized. Seeing the wildlife up close was magical.",
        name: "Sabila Nur",
        tour: "Sundarbans Wildlife Expedition",
        image: "https://i.ibb.co/k25JRtKR/ai-generated-caucasian-successfu.webp"
    },
    {
        quote: "I never thought I'd see clouds beneath my feet, but Sajek Valley made it possible. Musafir Traveller handled everything flawlessly. Highly recommended for any adventurer!",
        name: "Nusrat Faria",
        tour: "Sajek Valley Cloud Experience",
        image: "https://i.ibb.co/JRcysvTN/young-business-woman-52137-13749.webp"
    },
    {
        quote: "Our family had an amazing time at Cox's Bazar. The booking process was so easy, and the team was very supportive. We created memories that will last forever.",
        name: "Deepika Padukone",
        tour: "Cox's Bazar Beach Trip",
        image: "https://i.ibb.co/gM2BMDrB/A49-min.webp"
    },
    {
        quote: "The historical tour of Old Dhaka was fascinating. Our guide's stories brought the ancient city to life. It felt like stepping back in time. Thank you, Musafir Traveller!",
        name: "Katrina Kaif",
        tour: "Old Dhaka Heritage Walk",
        image: "https://i.ibb.co/nqjCggXS/low-angle-businesswoman-posing-w.webp"
    }
];

const Testimonial = () => {
    return (
        <div className="py-16 md:py-24 bg-base-100">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">What Our Travellers Say</h2>
                    <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
                        Real stories from real adventurers who have journeyed with us.
                    </p>
                </div>

                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    loop={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Pagination, Autoplay, Navigation]}
                    className="mySwiper max-w-3xl mx-auto"
                >
                    {testimonials.map((testimonial, index) => (
                        <SwiperSlide key={index} className="text-center p-8">
                            <div className="bg-base-200 p-8 rounded-lg shadow-lg">
                                <FaQuoteLeft className="text-4xl text-primary mx-auto mb-6" />
                                <p className="text-gray-600 italic text-lg mb-6">"{testimonial.quote}"</p>
                                <div className="avatar mb-4">
                                    <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src={testimonial.image} alt={testimonial.name} />
                                    </div>
                                </div>
                                <h4 className="text-xl font-bold">{testimonial.name}</h4>
                                <p className="text-gray-500">{testimonial.tour}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Testimonial;