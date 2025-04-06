import  { useEffect } from 'react';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel'; // Asegúrate de que la ruta sea correcta
import Cards from './components/Cards';
import imagen1 from './assets/Creation.jpeg';
import imagen2 from './assets/Town1.jpeg';
import imagen3 from './assets/women.jpeg';

import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from './components/Footer';
import SeccionArte from './components/SectionArt';
import SeccionResena from './components/SectionReseña';
import TituloObras from './components/TituloObras';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out-sine',
      once: true,
    });
  }, []);
  

  const images = [ imagen2,imagen1, imagen3];
  return (
    <>
      <Navbar />
  
      <Carousel images={images}/>
      
      <TituloObras/>
      <Cards />

      <SeccionArte/>

      <SeccionResena/>
    <Footer/>
    </>
  );
}

export default App;