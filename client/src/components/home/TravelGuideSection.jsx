import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Default style
import PackagesTab from './PackagesTab';
import TourGuidesTab from './TourGuidesTab';

// Custom CSS for react-tabs. You can add this to your index.css file.
/*
.react-tabs__tab-list {
    border-bottom: 2px solid #e5e7eb;
    margin: 0 0 20px;
    padding: 0;
}
.react-tabs__tab {
    display: inline-block;
    border: none;
    border-bottom: 2px solid transparent;
    bottom: -2px;
    position: relative;
    list-style: none;
    padding: 12px 24px;
    cursor: pointer;
    font-size: 1.125rem;
    font-weight: 600;
    color: #4b5563;
    transition: all 0.3s;
}
.react-tabs__tab--selected {
    background: #fff;
    border-color: #F97316; // Use your primary color
    color: #F97316; // Use your primary color
    border-radius: 5px 5px 0 0;
}
.react-tabs__tab:focus {
    box-shadow: none;
    border-color: #F97316; // Use your primary color
    outline: none;
}
.react-tabs__tab-panel {
    display: none;
}
.react-tabs__tab-panel--selected {
    display: block;
}
*/


const TravelGuideSection = () => {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Tourism & Travel Guide</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">Explore our curated packages or meet the expert guides who will make your trip unforgettable.</p>
        </div>
        <Tabs>
          <TabList>
            <Tab>Our Packages</Tab>
            <Tab>Meet Our Tour Guides</Tab>
          </TabList>

          <TabPanel>
            <PackagesTab />
          </TabPanel>
          <TabPanel>
            <TourGuidesTab />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default TravelGuideSection;