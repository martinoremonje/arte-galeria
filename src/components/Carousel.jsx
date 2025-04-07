import React, { useState, useRef, useEffect, useReducer } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useSwipeable } from 'react-swipeable';

// Definiciones de constantes
const PREV = 'PREV';
const NEXT = 'NEXT';
const SET_SLIDE = 'SET_SLIDE'; // Nueva acción

const getOrder = (index, pos, numItems) => {
  return index - pos < 0 ? numItems - Math.abs(index - pos) : index - pos;
};

const getInitialState = (numItems) => ({ pos: 0, sliding: false, dir: NEXT });

function reducer(state, action) {
  switch (action.type) {
    case PREV:
      return {
        ...state,
        dir: PREV,
        sliding: true,
        pos: state.pos === 0 ? action.numItems - 1 : state.pos - 1
      };
    case NEXT:
      return {
        ...state,
        dir: NEXT,
        sliding: true,
        pos: state.pos === action.numItems - 1 ? 0 : state.pos + 1
      };
    case 'stopSliding':
      return { ...state, sliding: false };
    case SET_SLIDE:
      return { ...state, pos: action.index, sliding: false };
    default:
      return state;
  }
}

const Carousel = ({ images }) => {
  const numItems = images.length;
  const [state, dispatch] = useReducer(reducer, getInitialState(numItems));
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionDuration = 700; // Debe coincidir con la duración de tu transición CSS

  const slide = (dir) => {
    if (!state.sliding && !isTransitioning) {
      setIsTransitioning(true);
      dispatch({ type: dir, numItems });
      setTimeout(() => {
        setIsTransitioning(false);
      }, transitionDuration);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => slide(NEXT),
    onSwipedRight: () => slide(PREV),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    if (state.sliding) {
      const timer = setTimeout(() => {
        dispatch({ type: 'stopSliding' });
      }, transitionDuration);
      return () => clearTimeout(timer);
    }
  }, [state.sliding, dispatch, transitionDuration]);

  const carouselHeight = `calc(100vh - 7rem)`;

  return (
    <div id="default-carousel" className="relative " style={{ height: carouselHeight }} {...handlers}>
      <div className="absolute top-4 right-0 mr-2 z-50" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="inline-flex items-center rounded-md py-2 px-4 text-white cursor-pointer"
        >
          <svg
            className={`w-4 h-4 transform ${isDropdownOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <div className="relative h-full overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-transform duration-${transitionDuration} ease-in-out ${
              getOrder(index, state.pos, numItems) === 0
                ? 'translate-x-0 z-10'
                : getOrder(index, state.pos, numItems) === 1
                ? 'translate-x-full z-0'
                : getOrder(index, state.pos, numItems) === numItems - 1
                ? '-translate-x-full z-0'
                : 'translate-x-full z-0'
            }`}
            style={{
              transform: state.sliding
                ? `translateX(${state.dir === NEXT ? '-100%' : '100%'})`
                : 'translateX(0%)',
              order: getOrder(index, state.pos, numItems),
              zIndex: getOrder(index, state.pos, numItems) === 0 ? 10 : 0,
            }}
            data-carousel-item={index}
          >
            <img
              src={image}
              className="absolute block w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt={`Imagen ${index + 1}`}
            />
          </div>
        ))}
      </div>

      {/* Flechas de navegación */}
      <div className="absolute top-4/6 left-4 transform -translate-y-1/2 z-20">
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="text-white text-3xl opacity-70 hover:opacity-40 cursor-pointer"
          onClick={() => slide(PREV)}
        />
      </div>
      <div className="absolute top-4/6 right-7 transform -translate-y-1/2 z-20">
        <FontAwesomeIcon
          icon={faChevronRight}
          className="text-white text-3xl opacity-70 hover:opacity-40 cursor-pointer"
          onClick={() => slide(NEXT)}
        />
      </div>
      {/* Botones invisibles para accesibilidad */}
      <button
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={() => slide(PREV)}
      >
        <span className="sr-only">Previous</span>
      </button>
      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={() => slide(NEXT)}
      >
        <span className="sr-only">Next</span>
      </button>

      {/* Indicadores de navegación (puntos) */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${state.pos === index ? 'bg-white' : 'bg-gray-300 hover:bg-white'}`}
            aria-current={state.pos === index}
            aria-label={`Slide ${index + 1}`}
            onClick={() => dispatch({ type: SET_SLIDE, index: index })}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;

// Componente viejo del carousel

// import React, { useState, useRef, useEffect, useReducer } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import { useSwipeable } from 'react-swipeable';

// Definiciones de constantes (similar al ejemplo que encontraste)
// const PREV = 'PREV';
// const NEXT = 'NEXT';

// const getOrder = (index, pos, numItems) => {
//   return index - pos < 0 ? numItems - Math.abs(index - pos) : index - pos;
// };

// const getInitialState = (numItems) => ({ pos: 0, sliding: false, dir: NEXT }); // Cambiado pos inicial a 0

// function reducer(state, action) {
//   switch (action.type) {
//     case PREV:
//       return {
//         ...state,
//         dir: PREV,
//         sliding: true,
//         pos: state.pos === 0 ? action.numItems - 1 : state.pos - 1
//       };
//     case NEXT:
//       return {
//         ...state,
//         dir: NEXT,
//         sliding: true,
//         pos: state.pos === action.numItems - 1 ? 0 : state.pos + 1
//       };
//     case 'stopSliding':
//       return { ...state, sliding: false };
//     default:
//       return state;
//   }
// }

// const Carousel = ({ images }) => {
//   const numItems = images.length;
//   const [state, dispatch] = useReducer(reducer, getInitialState(numItems));
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   const slide = (dir) => {
//     dispatch({ type: dir, numItems });
//      No necesitamos el timeout para detener el sliding inmediatamente
//      ya que la transición CSS se encargará de la animación.
//   };

//   const handlers = useSwipeable({
//     onSwipedLeft: () => slide(NEXT),
//     onSwipedRight: () => slide(PREV),
//     swipeDuration: 500,
//     preventScrollOnSwipe: true,
//     trackMouse: true
//   });

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const handleClickOutside = (event) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//       setIsDropdownOpen(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   Calcular la altura del carrusel
//   const carouselHeight = `calc(100vh - 7rem)`;

//   return (
//     <div id="default-carousel" className="relative " style={{ height: carouselHeight }} {...handlers}>
//       <div className="absolute top-4 right-0 mr-2 z-50" ref={dropdownRef}>
//         <button
//           onClick={toggleDropdown}
//           className="inline-flex items-center rounded-md py-2 px-4 text-white cursor-pointer"
//         >
//           <svg
//             className={`w-4 h-4 transform ${isDropdownOpen ? 'rotate-180' : ''}`}
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//           </svg>
//         </button>
//       </div>

//       <div className="relative h-full overflow-hidden">
//         {images.map((image, index) => (
//           <div
//             key={index}
//             className={`duration-700 ease-in-out absolute w-full h-full transition-transform ${
//               getOrder(index, state.pos, numItems) === 0
//                 ? 'translate-x-0 z-10'
//                 : getOrder(index, state.pos, numItems) === 1
//                 ? 'translate-x-full z-0'
//                 : getOrder(index, state.pos, numItems) === numItems - 1
//                 ? '-translate-x-full z-0'
//                 : 'translate-x-full z-0' // Ocultar otros elementos
//             }`}
//             style={{
//                Estilos basados en el estado para la animación (puedes ajustarlos)
//               transform: state.sliding
//                 ? `translateX(${state.dir === NEXT ? '-100%' : '100%'})`
//                 : 'translateX(0%)',
//               transition: state.sliding ? 'transform 0.5s ease-in-out' : 'none',
//               order: getOrder(index, state.pos, numItems), // Usar order para el layout
//             }}
//             data-carousel-item={index}
//           >
//             <img
//               src={image}
//               className="absolute block w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
//               alt={`Imagen ${index + 1}`}
//             />
//           </div>
//         ))}
//       </div>

//       {/* Flechas de navegación */}
//       <div className="absolute top-4/6 left-4 transform -translate-y-1/2 z-20">
//         <FontAwesomeIcon
//           icon={faChevronLeft}
//           className="text-white text-3xl opacity-70 hover:opacity-40 cursor-pointer"
//           onClick={() => slide(PREV)}
//         />
//       </div>
//       <div className="absolute top-4/6 right-7 transform -translate-y-1/2 z-20">
//         <FontAwesomeIcon
//           icon={faChevronRight}
//           className="text-white text-3xl opacity-70 hover:opacity-40 cursor-pointer"
//           onClick={() => slide(NEXT)}
//         />
//       </div>
//       {/* Botones invisibles para accesibilidad (mantener) */}
//       <button
//         type="button"
//         className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
//         onClick={() => slide(PREV)}
//       >
//         <span className="sr-only">Previous</span>
//       </button>
//       <button
//         type="button"
//         className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
//         onClick={() => slide(NEXT)}
//       >
//         <span className="sr-only">Next</span>
//       </button>

//       {/* Indicadores de navegación (puntos) */}
//       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex space-x-3">
//         {images.map((_, index) => (
//           <button
//             key={index}
//             type="button"
//             className={`w-3 h-3 rounded-full ${state.pos === index ? 'bg-white' : 'bg-gray-300 hover:bg-white'}`}
//             aria-current={state.pos === index}
//             aria-label={`Slide ${index + 1}`}
//             onClick={() => dispatch({ type: NEXT, numItems: numItems, pos: index })} // Ajustar el dispatch para ir directamente al índice
//           ></button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Carousel;