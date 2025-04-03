import React from 'react';
import logo from '../assets/logoArtGallery.png'
import backgroundImg from '../assets/artBannernavbar.png'

function Navbar() {
  return (
    <nav style={{
        backgroundImage: `url('${backgroundImg}')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} className="fixed top-0 left-0 w-full bg-white shadow-md z-50 ">
      <div className="container mx-auto py-4 px-6">
        <div className="flex items-center justify-between">
    
          <div className="flex items-center">
           
          <img src={logo} alt="logo img" className="h-12" /> {/* Ejemplo: altura más grande */}
         
          </div>

          {/* Espacio vacío a la derecha (puedes quitarlo si no necesitas nada allí) */}
          <div></div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;