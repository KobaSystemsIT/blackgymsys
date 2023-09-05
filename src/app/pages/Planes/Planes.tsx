import React, { useEffect, useState } from 'react';
import './Planes.css';
import { getPlanes } from '@/services/Planes/planes.service';
import { Planes } from '@/models/planes';
import Suscripciones from '@/app/components/Suscripciones/Suscripciones';

export type PlanesProps = {
}

const ViewPlanes: React.FC<PlanesProps> = () => {
	const [showModal, setShowModal] = useState(false);
	const [planes, setPlanes] = useState<Planes[]>([]);

	const [backgroundImage, setBackgroundImage] = useState(1);
	const totalImages = 2;

	const wordColors = {
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
			<div className="mb-4 text-center">
				<p className="lg:text-4xl md:text-2xl text-xl font-semibold">¡INSCRIPCIÓN GRATUITA!</p>
			</div>
			<div className="planes-container">
				{planes.map((plan) => {
					const words = plan.namePlanes.split(" ");
					const firstWord = words.shift();

					return (
						<div key={plan.idPlanes} className="plan-card">
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
	);
};

export default ViewPlanes;
