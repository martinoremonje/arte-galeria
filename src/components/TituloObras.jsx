import React from 'react'
import { Art } from '../data/Art';
import backgroundImg2 from '../assets/lightsArt3.png';



const TituloObras = () => {



  return (
      
      <>
      <div style={{
              backgroundImage: `url('${backgroundImg2}')`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}  className='text-center cointeiner h-22  font-light w-full bg-gray-900'>

        <h2 className=' text-3xl pt-3 '>Obras de Arte </h2>
        <p>Cantidad de obras disponibles: <span className='text-green-700'>{Art.length}</span></p>
      </div>
      </>
  )
}

export default TituloObras