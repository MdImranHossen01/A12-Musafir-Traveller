import React from 'react';

const ImageGallery = ({ images }) => {
    if (!images || images.length === 0) {
        return <p>No images available for this tour.</p>;
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="grid gap-4 col-span-2 md:col-span-2">
                <div>
                    <img className="h-auto max-w-full rounded-lg shadow-md hover:scale-105 transition-transform duration-300" src={images[0]} alt="Tour Image 1" />
                </div>
            </div>
            <div className="grid gap-4 col-span-2 md:col-span-2">
                <div className="grid grid-cols-2 gap-4">
                    {images.slice(1, 5).map((image, index) => (
                         <div key={index}>
                             <img className="h-auto max-w-full rounded-lg shadow-md hover:scale-105 transition-transform duration-300" src={image} alt={`Tour Image ${index + 2}`} />
                         </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImageGallery;