import React, { useState, useEffect, useRef } from 'react';
import { Art } from '../data/Art'; //

function ImageSlider({ interval = 3000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const carouselImages = Art.map(artwork => artwork.img);
  console.log(carouselImages)

  useEffect(() => {
    if (!carouselImages || carouselImages.length === 0) {
      return;
    }

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, interval);

    return () => clearInterval(timer); // Limpiar el intervalo al desmontar el componente
  }, [carouselImages, interval]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + carouselImages.length) % carouselImages.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (!carouselImages || carouselImages.length === 0) {
    return <div>No hay imágenes para mostrar.</div>;
  }

  return (
    <div ref={sliderRef} className="relative w-full overflow-hidden rounded">
      <div
        className="relative h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {carouselImages.map((image, index) => (
          <div key={index} className="absolute top-0 left-0 w-full h-full flex-shrink-0">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      {carouselImages.length > 1 && (
        <>
          <button
            type="button"
            className="absolute top-1/2 left-4 z-30 flex items-center justify-center h-10 w-10 cursor-pointer -translate-y-1/2 bg-white/20 rounded-full focus:outline-none focus:ring-2 focus:ring-white text-white hover:bg-white/30"
            onClick={goToPrevious}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            <span className="sr-only">Previous</span>
          </button>
          <button
            type="button"
            className="absolute top-1/2 right-4 z-30 flex items-center justify-center h-10 w-10 cursor-pointer -translate-y-1/2 bg-white/20 rounded-full focus:outline-none focus:ring-2 focus:ring-white text-white hover:bg-white/30"
            onClick={goToNext}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            <span className="sr-only">Next</span>
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  currentIndex === index ? 'bg-blue-500' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-current={currentIndex === index}
                aria-label={`Slide ${index + 1}`}
                onClick={() => goToSlide(index)}
              ></button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ImageSlider;