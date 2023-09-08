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

  const tolerance = 50;


  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const x = e.clientX + window.scrollX;
    const y = e.clientY + window.scrollY;

    const coordinateToClubMap: { [key: string]: number } = {
      '350,520': 4,
      '750,440': 2,
      '870,420': 1,
      '840,600': 5,
      '1086,494': 3,
    };

    const clubKey = Object.keys(coordinateToClubMap).find(key => {
      const [clubX, clubY] = key.split(',').map(Number);
      return Math.abs(clubX - x) <= tolerance && Math.abs(clubY - y) <= tolerance;
    });

    if (clubKey) {
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
        className={`justify-center lg:h-[35rem] md:h-[25rem] h-[15rem] items-center container-inscript`}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
      </div>
      <div className="flex flex-col items-center justify-center h-screen">
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
        <div className="flex flex-row items-start justify-center">
          {selectedClub && (
            <div className="club-info mr-4">
              {(() => {
                const clubSeleccionado = clubes.find(club => club.idClub === Number(selectedClub));
                if (clubSeleccionado) {
                  const [firstPart, secondPart, ...rest] = clubSeleccionado.nameClub.split(' ');
                  const restOfName = rest.join(' ');
                  return (
                    <>
                      <h2 className='lg:text-8xl md:text-5xl text-3xl text-right font-bold mb-4'>{`${firstPart} ${secondPart}`}</h2>
                      <h3 className='lg:text-8xl md:text-5xl text-3xl text-right font-bold mb-4' style={{ color: 'red' }}>{restOfName}</h3>
                      <p className='lg:text-2xl md:text-2xl text-3xl text-right font-bold mb-4'>{clubSeleccionado.addressClub}</p>
                      <h3 className='lg:text-2xl md:text-2xl text-3xl text-right font-bold mb-4'>Horarios:</h3>
                      <p className='lg:text-2xl md:text-2xl text-3xl text-right font-bold mb-4'>Lunes a viernes:</p>
                      <p className='lg:text-2xl md:text-2xl text-3xl text-right font-bold mb-4'>8:00AM - 10:00PM</p>
                      <p className='lg:text-2xl md:text-2xl text-3xl text-right font-bold mb-4'>Fin de Semana:</p>
                      <p className='lg:text-2xl md:text-2xl text-3xl text-right font-bold mb-4'>8:00Am - 2:00PM</p>
                    </>
                  );
                }
              })()}
            </div>
          )}
          {mapUrl && (
            <div className="map-container">
              <iframe
                src={mapUrl}
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
              ></iframe>
            </div>
          )}
        </div>
        {showIframe && mapUrl && (
          <div style={{ 
            position: 'fixed', 
            top: cursorPosition.y, 
            left: cursorPosition.x, 
            opacity: iframeOpacity, 
            transition: 'opacity 0.3s ease-in-out'
          }}>
            <div className='card rounded-xl'>
              <div className='card-body'>
                <iframe
                  src={mapUrl}
                  width="500"
                  height="400"
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
