import React, { useState } from 'react';
import './Home.css';
import Suscripciones from '@/app/components/Suscripciones/Suscripciones';
import imagen1 from '@/assets/imageLogo5ta.jpeg';
import imagen2 from '@/assets/imagePink.jpeg';
import imagen3 from '@/assets/imageVilla.jpeg';

export type HomeProps = {
}

const Home: React.FC<HomeProps> = ({ }) => {
  const [showModal, setShowModal] = useState(false);


  return <>
    <div>
      <div className='justify-center lg:h-[35rem] md:h-[25rem] h-[15rem] items-center container-inscript'>
        <div className='flex flex-col gap-2'>
          <div className='lg:text-5xl md:text-xl text-sm text-center animated-bg-text p-2 rounded'>
            <h1>INSCRIPCIÓN</h1>
          </div>
          <div className='lg:text-5xl md:text-xl text-sm text-center animated-bg-text p-2 rounded'>
            <h1>GRATUITA</h1>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-4 mt-14">
        <div>
          <div className="mb-4 text-center">
            <p className="lg:text-4xl md:text-2xl text-xl text-start">ESTAMOS DONDE TÚ ESTÁS...</p>
          </div>
          <div className='grid  grid-cols-2 lg:gap-8 justify-center align-middle items-center pt-5'>
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
            <div className='flex flex-col justify-center text-center gap-8'>
              <p className='clu lg:text-5xl md:text-4xl sm:text-4xl '>6 <a href="/clubes"><span className='redtitle'>Clubes</span></a></p>
              <p className='clu lg:text-5xl md:text-4xl sm:text-4xl '><a href="/planes">Suscripciones</a></p>
              <p className='adq lg:text-lg md:text-base sm:text-sm '>Adquiere una suscripción <span className='redtitle'>Black Plus</span> y obtén acceso a todos los clubes</p>
            </div>
          </div>
        </div>

      </div>

      {/* <div className='section2'>
      <div className='places mt-20'>
        <h2 className='estamos lg:text-5xl md:text-3xl sm:text-4xl'>ESTAMOS DONDE TÚ ESTÁS...</h2>
        <div className='container image-stack'>
          <div className='grid-container'>
            <div className='image image1'>
              <img src={imagen1} />
            </div>
            <div className='image image2'>
              <img src={imagen2} />
            </div>
            <div className='image image3'>
              <img src={imagen3} />
            </div>
          </div>
        </div>
      </div>
      <div className='titles-places'>
        <p className='clu lg:text-5xl md:text-4xl sm:text-4xl '>6 <a href="/clubes"><span className='redtitle'>Clubes</span></a></p>
        <p className='clu lg:text-5xl md:text-4xl sm:text-4xl '><a href="/planes">Suscripciones</a></p>
        <p className='adq lg:text-lg md:text-base sm:text-sm '>Adquiere una suscripción <span className='redtitle'>Black Plus</span> y obtén acceso a todos los clubes</p>
      </div>
    </div> */}

      {/* <Suscripciones /> */}
      {/* <button className='comienza flex items-center justify-center' onClick={() => setShowModal(true)}>¡Comienza ya!</button> */}
      {showModal ? (
        <>
          <div className=" mod justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-black outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Contactános
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form>
                    <div className="mb-4">
                      <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
                        Nombre
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
                        Correo
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-white text-sm font-bold mb-2" htmlFor="phone">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>
                    <div className="flex items-center justify-end">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-20 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Cerrar
                      </button>
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Enviar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

    </div>
  </>
};

export default Home;

