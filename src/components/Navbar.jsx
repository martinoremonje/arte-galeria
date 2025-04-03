import React from 'react';
import logo from '../assets/logoArtGallery.png'
import backgroundImg from '../assets/artBannernavbar.png'

function Navbar() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // O 'auto' si prefieres un scroll instantáneo
    });
  };

  return (
    <nav data-aos="fade-up" style={{
      backgroundImage: `url('${backgroundImg}')`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }} className="fixed top-0 left-0 w-full bg-white shadow-md z-51 ">
      <div className="container mx-auto py-4 px-6">
        <div className="flex items-center justify-between">

          <div className="flex items-center">
            <button onClick={scrollToTop} className="cursor-pointer focus:outline-none">
              <img src={logo} alt="logo img" className="h-12" /> {/* Ejemplo: altura más grande */}
            </button>
          </div>

          {/* Espacio vacío a la derecha (puedes quitarlo si no necesitas nada allí) */}
          <div></div>
        </div>
      </div>
      {/* Sección de información adicional */}
      <div className="bg-gray-100 py-2 text-center text-sm">
  ¡Encuentra las obras que deseas y a un excelente precio! 
  <span className="sm:block">family@oremonje.cl  ||  +56 9 44011200 || Envíos a todo Chile.</span>
</div>
    </nav>
  );
}


export default Navbar;