import React, { useEffect, useState } from 'react';
import { getClubes } from '@/services/Clubes/clubes.service';
import { Clubes } from '@/models/clubes';
import backgroundImage from '@/assets/mapTuxPng.png'

const ClubesDropdown = () => {
  const [clubes, setClubes] = useState<Clubes[]>([]);
  const [selectedClub, setSelectedClub] = useState<string>("");
  const [mapUrl, setMapUrl] = useState<string | null>(null);

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showIframe, setShowIframe] = useState(false);

  const [iframeOpacity, setIframeOpacity] = useState(0);

  const tolerance = 0.05;
  
  const coordinateToClubMap: { [key: string]: number } = {
    '0.2,0.65': 4,
    '0.4,0.47': 2,
    '0.46,0.43': 1,
    '0.58,0.57': 3,
    '0.44,0.75': 5,
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

    console.log("x: " + relativeX + " y: " + relativeY)

    

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
    }
  };


  return (
    <>
      <div
        onMouseMove={handleMouseMove}
        className="justify-center lg:h-[37rem] md:h-[25rem] h-[15rem] items-center container-inscript"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
      </div>
      <div className="flex flex-col items-center justify-center pt-10">
        {/* {'Dropdown de clubes'} */}
        <div className="dropdown-container mb-4">
          <select onChange={handleClubChange} value={selectedClub}>
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
        <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 justify-center align-middle items-center pt-10 gap-6">
          {selectedClub && (
            <div className="club-info">
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
          {mapUrl && !showIframe && (
            <div className="flex justify-center align-middle lg:pt-0 md:pt-10 pt-10 pr-5">
              <iframe className='lg:h-96 lg:w-full h-72 w-80'
                src={mapUrl}
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
              ></iframe>
            </div>
          )}
        </div>
        {showIframe && mapUrl && (
          <div style={{
            position: 'absolute',
            top: cursorPosition.y,
            left: cursorPosition.x,
            opacity: iframeOpacity,
            transition: 'opacity 0.3s ease-in-out'
          }}>
            <div className='card rounded-xl bg-white'>
              <div>
                <iframe className='lg:h-46 lg:w-46 rounded-lg'
                  src={mapUrl}
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ClubesDropdown;