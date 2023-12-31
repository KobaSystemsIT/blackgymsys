import React, { useEffect, useState } from 'react';
import './Home.css';
import imagen1 from '@/assets/imageLogo5ta.jpeg';
import imagen2 from '@/assets/imagePink.jpeg';
import imagen3 from '@/assets/imageVilla.jpeg';
import Suscripciones from '@/app/components/Suscripciones/Suscripciones';

export type HomeProps = {
}

const Home: React.FC<HomeProps> = ({ }) => {

  const [backgroundImage, setBackgroundImage] = useState(1);
  const totalImages = 3; // Número total de imágenes disponibles

  useEffect(() => {
    // Función para cambiar la imagen de fondo cada 5 segundos y reiniciar en bucle
    const intervalId = setInterval(() => {
      setBackgroundImage((prevImage) => (prevImage === totalImages ? 1 : prevImage + 1));
    }, 5000); // 5000 milisegundos (5 segundos)

    // Limpia el intervalo al desmontar el componente para evitar fugas de memoria
    return () => clearInterval(intervalId);
  }, []);


  return <>
    <div>
      <div className={`justify-center lg:h-[40rem] md:h-[25rem] h-[15rem] items-center container-inscript bg-image-${backgroundImage} transition-all duration-1000`}>
        <div className='flex flex-col gap-2'>
          <div className='lg:text-6xl md:text-4xl text-2xl text-start animated-bg-text title-up font-bold'>
            <h1>INSCRIPCIÓN</h1>
          </div>
          <div className='lg:text-6xl md:text-4xl text-2xl text-center animated-bg-text title-bottom font-bold' >
            <h1>GRATUITA</h1>
          </div>
        </div>
      </div>
      <div className="mx-4 p-6 mt-14">
        <div>
          <div className="mb-4 text-center">
            <p className="lg:text-6xl md:text-2xl text-xl lg:text-center font-semibold">#SOMOSBLACK</p>
          </div>
          <div className='grid lg:grid-cols-2 lg:gap-8 justify-center align-middle items-center pt-5'>
            <div className="grid aspect-auto grid-container p-4">
              <div className='image left-image'>
                <img src={imagen1} />
              </div>
              <div className='image center-image'>
                <img src={imagen2} />
              </div>
              <div className='image right-image'>
                <img src={imagen3} />
              </div>
            </div>
            <div className='flex flex-col justify-center text-center gap-12'>
              <p className='clu lg:text-5xl md:text-4xl text-4xl font-semibold'>6 <a href="/clubes"><span className='lg:text-white text-red-600 hover:text-red-600 font-semibold'>Clubes</span></a></p>
              <p className='clu lg:text-5xl md:text-4xl text-4xl font-semibold'><a href="/planes" className='lg:text-white hover:text-red-600'>Suscripciones y beneficios</a></p>
              <p className='adq lg:text-lg md:text-base text-sm'>Adquiere una suscripción <span className='text-red-600'>Black Plus</span> y obtén acceso a todos los clubes</p>
            </div>
          </div>
        </div>
        <div className='pt-10'>
          <Suscripciones />
        </div>
        <div className='flex justify-center align-middle p-4'>
          <a href='https://wa.me/529616603718' className='btn bg-red-600 lg:btn-lg text-white rounded-full'>¡Comienza ya!</a>
        </div>
      </div>

    </div>
  </>
};

export default Home;

