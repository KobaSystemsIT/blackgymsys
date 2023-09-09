import React, { useEffect, useState } from 'react';
import { getClubes } from '@/services/Clubes/clubes.service';
import { Clubes } from '@/models/clubes';
import backgroundImage from '@/assets/mapTuxPng.png'
import './Clubes.css'

const ClubesDropdown = () => {
  const [clubes, setClubes] = useState<Clubes[]>([]);
  const [selectedClub, setSelectedClub] = useState<string>("");
  const [mapUrl, setMapUrl] = useState<string | null>(null);

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showIframe, setShowIframe] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const [iframeOpacity, setIframeOpacity] = useState(0);

  const tolerance = 0.05;

  const coordinateToClubMap: { [key: string]: number } = {
    '0.2,0.56': 4,
    '0.4,0.47': 2,
    '0.46,0.43': 1,
    '0.58,0.57': 3,
    '0.44,0.63': 5,
  };

  const relativeCoordinateToClubMap = Object.fromEntries(
    Object.entries(coordinateToClubMap).map(([key, value]) => {
      const [x, y] = key.split(',').map(Number);
      return [`${x},${y}`, value];
    })
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - container.left;
    const y = e.clientY - container.top;

    const relativeX = x / container.width;
    const relativeY = y / container.height;

    //console.log("x: " + relativeX + " y: " + relativeY);

    const clubKey = Object.keys(relativeCoordinateToClubMap).find(key => {
      const [clubRelativeX, clubRelativeY] = key.split(',').map(Number);
      console.log(clubRelativeX, clubRelativeY);
      return Math.abs(clubRelativeX - relativeX) <= tolerance &&
        Math.abs(clubRelativeY - relativeY) <= tolerance;
    });

    if (clubKey) {
      console.log(clubKey);
      const clubId = coordinateToClubMap[clubKey];
      const club = clubes.find(c => c.idClub === clubId);
      if (club) {
        setShowIframe(true);
        setIframeOpacity(1);
        setMapUrl(club.dataIFrame);
        setCursorPosition({ x, y });
      }
    } else {
      setShowIframe(false);
      setIframeOpacity(0);
    }
  };

  useEffect(() => {
    const fetchClubes = async () => {
      try {
        const { data } = await getClubes();
        setClubes(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchClubes();
  }, []);

  useEffect(() => {
    if (selectedClub) {
      const club = clubes.find(c => c.idClub === Number(selectedClub));

      if (club) {
        setMapUrl(club.dataIFrame);
      }
    }
  }, [selectedClub, clubes]);


  const handleClubChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedClub(selectedValue);

    const selectedClubData = clubes.find((c => c.idClub === Number(selectedValue)));
    if (selectedClubData) {
      setMapUrl(selectedClubData.dataIFrame);
      setShowMap(true);
    }
  };


  return (
    <>
      <div onMouseMove={handleMouseMove} className="justify-end lg:h-[40rem] md:h-[25rem] h-[15rem] items-center container-inscript-map" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className='flex flex-col gap-2 mr-10'>
          <div className='lg:text-8xl md:text-5xl text-3xl text-start font-bold animated-bg-text-club title-up-c'>
            <h1>CLU</h1>
          </div>
          <div className='lg:text-8xl md:text-5xl text-3xl text-start font-bold animated-bg-text-club title-bottom-c'>
            <h1>BES</h1>
          </div>
        </div>
        {showIframe && mapUrl && (
          <div style={{
            position: 'absolute',
            top: cursorPosition.y,
            left: cursorPosition.x,
            opacity: iframeOpacity,
            transition: 'opacity 3s ease-in-out'
          }}>
            <div className='card rounded-xl bg-white top-10 right-20'>
              <div>
                <iframe className='rounded-lg lg:h-36 lg:w-60 md:h-36 h-28 w-40'
                  src={mapUrl}
                  allowFullScreen={true}
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center justify-center pt-10 pb-10 mx-4" style={{ transition: 'opacity 3s ease-in-out'}}>
        {/* {'Dropdown de clubes'} */}
        <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 justify-center">
          <h1 className='lg:text-4xl md:text-xl text-lg font-semibold'>ESTAMOS DONDE TÚ ESTÁS...</h1>
          <select onChange={handleClubChange} value={selectedClub} className='rounded-xl pl-4'>
            <option value="" disabled>
              Selecciona un club
            </option>
            {clubes.map((club) => (
              <option key={club.idClub} value={club.idClub}>
                {club.nameClub}
              </option>
            ))}
          </select>
        </div>
        {/* {'Contenido de los clubes'} */}
        <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 justify-center align-middle items-center pt-10 gap-8">
          {selectedClub && (
            <div>
              {(() => {
                const clubSeleccionado = clubes.find(club => club.idClub === Number(selectedClub));
                if (clubSeleccionado) {
                  const [firstPart, secondPart, ...rest] = clubSeleccionado.nameClub.split(' ');
                  const restOfName = rest.join(' ');
                  return (
                    <div className='lg:text-right md:text-right text-center'>
                      <div>
                        <h2 className='lg:text-7xl md:text-2xl text-2xl font-bold mb-4'>{`${firstPart} ${secondPart}`}</h2>
                        <h3 className='lg:text-7xl md:text-2xl text-2xl font-bold mb-4' style={{ color: 'red' }}>{restOfName}</h3>
                        <p className='lg:text-2xl md:text-xl text-lg font-bold lg:mb-4 mb-2'>{clubSeleccionado.addressClub}</p>
                      </div>
                      <div>
                        <h3 className='lg:text-xl md:text-lg text-lg font-bold lg:mt-8'>Horarios:</h3>
                        <p className='lg:text-xl md:text-lg text-lg font-bold'>Lunes a viernes:</p>
                        <p className='lg:text-xl md:text-lg text-lg font-bold'>8:00AM - 10:00PM</p>
                        <p className='lg:text-xl md:text-lg text-lg font-bold'>Fin de Semana:</p>
                        <p className='lg:text-xl md:text-lg text-lg font-bold'>8:00Am - 2:00PM</p>
                      </div>
                    </div>
                  );
                }
              })()}
            </div>
          )}
          {mapUrl && showMap && (
            <div className="flex justify-center align-middle lg:pt-0">
              <iframe className='lg:h-96 lg:w-full md:h-80 md:w-full h-72 w-80'
                src={mapUrl}
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
              ></iframe>
            </div>
          )}
          {!mapUrl && showMap && (
            <div className='flex lg:h-96 lg:w-full md:h-80 md:w-full h-72 w-80 bg-white justify-center items-center p-4'>
              <h1 className='text-black'>Esta sucursal aún no cuenta con una ubicación en Google Maps.</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ClubesDropdown;