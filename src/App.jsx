import Navbar from './components/Navbar'
import ImageSlider from './components/Carousel'
import backgroundImg from './assets/background-art.jpg'
import Cards from './components/Cards'

function App() {
 

  return (
    <>

      <Navbar/>
      <div style={{
    backgroundImage: `url('${backgroundImg}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh', // Ejemplo de altura mínima
  }} >
  <ImageSlider/>
</div>

  <Cards/>
    </>
  )
}

export default App
