import React, { useEffect, useState } from 'react';
import './Planes.css';
import { getPlanes } from '@/services/Planes/planes.service';
import { Planes } from '@/models/planes';
import Suscripciones from '@/app/components/Suscripciones/Suscripciones';

export type PlanesProps = {
}

const ViewPlanes: React.FC<PlanesProps> = () => {
	const [planes, setPlanes] = useState<Planes[]>([]);

	const [backgroundImage, setBackgroundImage] = useState(1);
	const totalImages = 2;

	const wordColors: Record<string, string> = {
		"Week": "orange",
		"2Week": "orange",
		"Fit": "#E8D045",
		"Year": "red",
		"Plus": "red",
		"Medium": "red",
	};

	useEffect(() => {
		const intervalId = setInterval(() => {
			setBackgroundImage((prevImage) => (prevImage === totalImages ? 1 : prevImage + 1));
		}, 5000);

		return () => clearInterval(intervalId);
	}, []);

	const obtainPlanes = async () => {
		try {
			const response = await getPlanes();
			if (response && response.data) {
				setPlanes(response.data);
			}
		} catch (error) {
			console.error("Error:", error);
		}
	}

	useEffect(() => {
		obtainPlanes();
	}, []);

	return (
		<>
			<div className={`justify-center lg:h-[40rem] md:h-[25rem] h-[15rem] items-center container-inscript bg-image-${backgroundImage} transition-all duration-1000`}>
				<div className='justify-start flex flex-col gap-2 ml-0'>
					<div className='lg:text-8xl md:text-5xl text-3xl text-center font-bold animated-bg-text'>
						<h1>PLA</h1>
					</div>
					<div className='lg:text-8xl md:text-5xl text-3xl text-center font-bold animated-bg-text'>
						<h1>NES</h1>
					</div>
				</div>
			</div>
			<div className="mb-4 text-center mt-10">
				<p className="lg:text-4xl md:text-2xl text-xl font-semibold">¡INSCRIPCIÓN GRATUITA!</p>
			</div>
			<div className="mb-4 text-center mt-10 p-2">
				<p className="lg:text-2xl md:text-xl text-lg font-semibold">Sin costo de inscripción, <p className='text-red-600'>¡elije el plan perfecto para tu cuerpo ideal!</p></p>
			</div>
			<div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-2 p-10 gap-6 m-10">
				{planes.map((plan) => {
					const words = plan.namePlanes.split(" ");
					const firstWord = words.shift();

					return (
						<div key={plan.idPlanes} className="plan-card lg:text-2xl md:text-xl text-base">
							<h2 className='bg-white'>
								<span className='text-black'>{firstWord} </span>
								{words.map((word, index) => (
									<span key={index} style={{ color: wordColors[word] || 'defaultColor' }}>
										{word + (index < words.length - 1 ? ' ' : '')}
									</span>
								))}
							</h2>
							<p className='p-2'>{plan.descriptionPlanes} x ${plan.pricePlanes}.00</p>
						</div>
					);
				})}
			</div>
			<div>
				<Suscripciones />
			</div>
			<div className='flex justify-center align-middle p-4'>
				<a href='https://wa.me/529616603718' className='btn bg-red-600 lg:btn-lg text-white rounded-full'>¡Empieza hoy mismo!</a>
			</div>
		</>
	);
};

export default ViewPlanes;
