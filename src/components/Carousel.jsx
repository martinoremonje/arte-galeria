import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Asegúrate de tener esto en tu proyecto

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Calcular la altura del carrusel
  const carouselHeight = `calc(100vh - 7rem)`; // 7rem es equivalente a h-28 (4 * 7 = 28 / 4 = 7 rem)

  return (
    <div  id="default-carousel" className="relative mx-3 " style={{ height: carouselHeight }}>


      <div className="absolute top-4 right-0 mr-2 z-50" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="inline-flex items-center rounded-md py-2 px-4 text-white cursor-pointer"
        >
          <svg
            className={`w-4 h-4 transform ${isDropdownOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

      </div>

      <div className="relative h-full overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`duration-700 ease-in-out absolute w-full h-full transition-transform ${
              index === currentIndex
                ? 'translate-x-0'
                : index < currentIndex
                ? '-translate-x-full'
                : 'translate-x-full'
            }`}
            data-carousel-item={index}
          >
            <img
              src={image}
              className="absolute block w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt={`Imagen ${index + 1}`}
            />
          </div>
        ))}
      </div>
      {/* Flecha izquierda visual */}
      <div className="absolute top-4/6 left-4 transform -translate-y-1/2 z-20"> {/* Cambiado a top-2/3 */}
        <FontAwesomeIcon icon={faChevronLeft} className="text-white text-3xl opacity-70 hover:opacity-40" />
      </div>
      {/* Flecha derecha visual */}
      <div className="absolute top-4/6 right-4 transform -translate-y-1/2 z-20"> {/* Cambiado a top-2/3 */}
        <FontAwesomeIcon icon={faChevronRight} className="text-white text-3xl opacity-70 hover:opacity-40" />
      </div>
      <button
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={prevSlide}
      >
        <span className="sr-only">Previous</span> {/* Para accesibilidad */}
      </button>
      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={nextSlide}
      >
        <span className="sr-only">Next</span> {/* Para accesibilidad */}
      </button>

      {/* Indicadores de navegación (puntos) */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-gray-300 hover:bg-white'}`}
            aria-current={currentIndex === index}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>


    </div>
  );
};

export default Carousel;