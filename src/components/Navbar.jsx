import React from 'react';
import logo from '../assets/logoArtGallery.png';
import backgroundImg from '../assets/artBannernavbar.png';

function Navbar() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    } else {
      console.error(`No se encontró el elemento con el ID: ${id}`);
    }
  };

  const handleScrollToArte = () => {
    scrollToSection('arte');
  };

  const handleScrollToResena = () => {
    scrollToSection('resena');
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <nav
      data-aos="fade-up"
      style={{
        backgroundImage: `url('${backgroundImg}')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="fixed top-0 left-0 w-full bg-white shadow-md z-51 "
    >
      <div className="container mx-auto py-4 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={scrollToTop} className="cursor-pointer focus:outline-none">
              <img src={logo} alt="logo img" className="h-12" />
            </button>
          </div>

          {/* Enlaces a la derecha */}
          <div className="flex items-center space-x-4">
            <button onClick={handleScrollToArte} className="sm:text-gray-700 text-gray-300 hover:text-gray-900 focus:outline-none cursor-pointer ">
              Hablemos de Arte
            </button>
            <button onClick={handleScrollToResena} className="sm:text-gray-700 text-gray-300 hover:text-gray-900 focus:outline-none cursor-pointer ">
              Reseñas
            </button>
          </div>
        </div>
      </div>
      {/* Sección de información adicional - Ocultar en dispositivos pequeños */}
      <div className="bg-gray-100 py-2 text-center text-sm ">
        ¡Encuentra las obras que deseas y a un excelente precio! || family@oremonje.cl || +56 9 44011200 || Envíos a todo Chile.
      </div>
    </nav>
  );
}

export default Navbar;