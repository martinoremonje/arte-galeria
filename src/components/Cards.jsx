import React, { useState } from 'react';
import { Art } from '../data/Art.js';

function Card({ artwork, index }) {
  const [isOpen, setIsOpen] = useState(false);
  const baseDelay = 200;
  const incrementalDelay = index * 100;

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div
        data-aos="fade-up"
        data-aos-delay={baseDelay + incrementalDelay}
        className="card-container bg-gray-200 rounded-lg shadow-md p-1 mt-3 cursor-pointer" // Agregamos cursor-pointer
        onClick={openModal} // Abrir modal al hacer clic
      >
        <div className="image-container relative">
          <img
            src={artwork.img}
            alt={artwork.name}
            className="w-full h-auto rounded-md mb-2"
          />
          <div className="overlay absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 text-white text-2xl font-bold rounded-md opacity-0 transition-opacity duration-300 hover:opacity-100">
            Ver más
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-1 text-center underline">{artwork.name}</h3>
        <div className='mr-2'>
          <p className="text-gray-600 mb-1 text-right">Precio: ${artwork.price}</p>
          <p className="text-gray-600 text-right">Marco: {artwork.marco ? 'Sí' : 'No'}</p>
        </div>
      </div>

      {/* Modal de Flowbite - Responsive más pequeño en celulares */}
      {isOpen && (
        <div
          id={`modal-${artwork.name.replace(/\s+/g, '-')}`}
          tabIndex="-1"
          className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full bg-opacity-50 flex justify-center items-center"
        >
          <div
            data-aos="fade-up"
            className="relative w-full max-w-sm md:max-w-2xl max-h-full mt-25" // max-w-sm para móviles, md:max-w-2xl para pantallas medianas y grandes
          >
            {/* Modal content */}
            <div className="relative bg-gray-100 rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <div className='flex-grow text-center uppercase'>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {artwork.name}
                  </h3>
                </div>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={closeModal}
                >
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <div className="p-4 md:p-5 grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Volvemos a dos columnas en pantallas medianas y grandes */}
                <img
                  src={artwork.img}
                  alt={artwork.name}
                  className="w-full h-auto rounded-md mb-2 md:mb-0"
                />
                <div>
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 mb-2">
                    Precio: ${artwork.price}
                  </p>
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 mb-2">
                    Marco: {artwork.marco ? 'Sí' : 'No'}
                  </p>
                  <p className="text-base font-semibold text-green-500 dark:text-green-400 mb-2">
                    Disponible
                  </p>
                  {artwork.description && (
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 mt-2">
                      {artwork.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Cards() {
  return (
    <div  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
      {Art.map((artwork, index) => (
        <Card key={artwork.name} artwork={artwork} index={index} />
      ))}
    </div>
  );
}

export default Cards;