import React from "react";
import Banner from "../../components/home/Banner";
import Overview from "../../components/home/Overview";
import TravelGuideSection from "../../components/home/TravelGuideSection";
import TouristStorySection from "../../components/home/TouristStorySection";
import WhyChooseUs from "../../components/home/WhyChooseUs";
import Newsletter from "../../components/home/Newsletter"; // <-- Import the new component
import TourGuidesTab from "../../components/home/TourGuidesTab";
import PackagesTab from "../../components/home/PackagesTab";
import Testimonial from "../../components/home/Testimonial";
import Faq from "../../components/home/Faq";

const Home = () => {
  return (
    <div>
      <Banner />
      <Overview />
      <TravelGuideSection />
      <TouristStorySection />
      <WhyChooseUs />
      <Testimonial></Testimonial>
      <Faq></Faq>
      <Newsletter /> {/* <-- Add it here */}
    </div>
  );
};

export default Home;
