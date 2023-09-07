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
		"Fit": "yellow",
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
			<div className={`justify-center lg:h-[35rem] md:h-[25rem] h-[15rem] items-center container-inscript bg-image-${backgroundImage} transition-all duration-1000`}>
				<div className='justify-start flex flex-col gap-2 ml-0'>
					<div className='lg:text-8xl md:text-xl text-sm text-center font-bold animated-bg-text'>
						<h1>PLA</h1>
					</div>
					<div className='lg:text-8xl md:text-xl text-sm text-center font-bold animated-bg-text'>
						<h1>NES</h1>
					</div>
				</div>
			</div>
			<div className="mb-4 text-center mt-10">
				<p className="lg:text-4xl md:text-2xl text-xl font-semibold">¡INSCRIPCIÓN GRATUITA!</p>
			</div>
			<div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1">
				{planes.map((plan) => {
					const words = plan.namePlanes.split(" ");
					const firstWord = words.shift();

					return (
						<div key={plan.idPlanes} className="plan-card lg:text-2xl md:text-xl text-lg">
							<h2>
								<span>{firstWord} </span>
								{words.map((word, index) => (
									<span key={index} style={{ color: wordColors[word] || 'defaultColor' }}>
										{word + (index < words.length - 1 ? ' ' : '')}
									</span>
								))}
							</h2>
							<p>{plan.descriptionPlanes} x ${plan.pricePlanes}</p>
						</div>
					);
				})}
			</div>
			<div>
				<Suscripciones />				
			</div>
		</>
	);
};

export default ViewPlanes;
