import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const sliderContent = [
  {
    image: "https://i.ibb.co/d4jLqtGN/pngtree-nice-deer-standing-water.webp",
    title: "Explore the Mystical Sundarbans",
    description: "Journey into the world's largest mangrove forest, home of the Royal Bengal Tiger.",
    
  },
  {
    image: "https://i.ibb.co/xtDjbbK1/sajek.webp",
    title: "Discover the Kingdom of Clouds",
    description: "Witness the breathtaking beauty of Sajek Valley, where clouds touch the hills.",
    
  },
  {
    image: "https://i.ibb.co/Qjr8R41K/Cox-s-Bazar-Sea-Beach-6772e5838c.webp",
    title: "Relax on the World's Longest Beach",
    description: "Unwind on the sandy shores of Cox's Bazar, stretching over 120 km.",
    
  }
];

const Banner = () => {
  return (
    <section className="relative h-[60vh] md:h-[90vh] w-full overflow-hidden">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        effect={'fade'}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={1000}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className="h-full w-full"
      >
        {sliderContent.map((slide, index) => (
          <SwiperSlide key={index} className="relative">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end pb-10 md:items-center md:pb-0">
              <div className="container mx-auto px-4">
                <div className="text-white max-w-2xl">
                  <motion.h1
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-6 leading-tight"
                  >
                    {slide.title}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-lg md:text-xl mb-6 md:mb-8 max-w-lg"
                  >
                    {slide.description}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <button className="btn btn-primary text-white shadow-lg">
                      {slide.cta}
                    </button>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Banner;