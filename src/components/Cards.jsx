import React from 'react';
import { Art } from '../data/Art.js'; // Ajusta la ruta si es necesario
import backgroundImg from '../assets/background-art.jpg'

function Card({ artwork, index }) {
  const baseDelay = 500;
  const incrementalDelay = index * 200; // Ejemplo de incremento de 200ms

  return (
    <div
    
      data-aos="fade-up"
      data-aos-delay={baseDelay + incrementalDelay}
      className="bg-white rounded-lg shadow-md p-4 mt-3"

    >
      <img
        src={artwork.img}
        alt={artwork.name}
        className="w-full h-auto rounded-md mb-2"
      />
      <h3 className="text-xl font-semibold text-gray-800 mb-1 text-center underline">{artwork.name}</h3>
      <p className="text-gray-600 mb-1 text-right">Precio: ${artwork.price}</p>
      <p className="text-gray-600 text-right">Marco: {artwork.marco ? 'Sí' : 'No'}</p>
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
    }} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Art.map((artwork, index) => (
        <Card key={artwork.name} artwork={artwork} index={index} />
      ))}
    </div>
  );
}

export default Cards;