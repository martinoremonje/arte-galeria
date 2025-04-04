import React from 'react'
import { Art } from '../data/Art';



const TituloObras = () => {



  return (
      
      <>
      <div data-aos="fade-up" className='text-center cointeiner h-22 font-light w-full bg-amber-50'>

        <h2 className=' text-3xl mb-2'>Obras de Arte </h2>
        <p>Cantidad de obras disponibles: <span className='text-green-400'>{Art.length}</span></p>
      </div>
      </>
  )
}

export default TituloObras