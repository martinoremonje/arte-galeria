import React from 'react';
import { Art } from '../data/Art.js'; // Ajusta la ruta si es necesario
import backgroundImg from '../assets/background-art.jpg';

function Card({ artwork, index }) {
  const baseDelay = 500;
  const incrementalDelay = index * 100; // Ejemplo de incremento de 200ms

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={baseDelay + incrementalDelay}
      className="card-container bg-gray-200 rounded-lg shadow-md p-1 mt-3" // Agregamos la clase card-container
    >
      <div className="image-container relative">
        <img
          src={artwork.img}
          alt={artwork.name}
          className="w-full h-auto rounded-md mb-2"
        />
        <div className="overlay absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 text-white text-2xl font-bold rounded-md opacity-0 transition-opacity duration-300">
          Disponible
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-1 text-center underline">{artwork.name}</h3>
      <div className='mr-2'>
        <p className="text-gray-600 mb-1 text-right">Precio: ${artwork.price}</p>
        <p className="text-gray-600 text-right">Marco: {artwork.marco ? 'Sí' : 'No'}</p>
      </div>
    </div>
  );
}

function Cards() {
  return (
    <div style={{
      backgroundImage: `url('${backgroundImg}')`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
      {Art.map((artwork, index) => (
        <Card key={artwork.name} artwork={artwork} index={index} />
      ))}
    </div>
  );
}

export default Cards;