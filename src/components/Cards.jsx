import React from 'react';
import { Art } from '../data/Art.js'; // Ajusta la ruta si es necesario

function Card({ artwork }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <img
        src={artwork.img}
        alt={artwork.name}
        className="w-full h-auto rounded-md mb-2"
      />
      <h3 className="text-xl font-semibold text-gray-800 mb-1">{artwork.name}</h3>
      <p className="text-gray-600 mb-1">Precio: ${artwork.price}</p>
      <p className="text-gray-600">Marco: {artwork.marco ? 'Sí' : 'No'}</p>
    </div>
  );
}

function Cards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Art.map((artwork) => (
        <Card key={artwork.name} artwork={artwork} />
      ))}
    </div>
  );
}

export default Cards;