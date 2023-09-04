import React from 'react';
import './Navbar.css';
import { useState } from "react";
import logo from '@/assets/icons/LogoWhiteBlackGym.svg'

export type NavbarProps = {
}

const Navbar: React.FC<NavbarProps> = ({ }) => {

	const [showMenu, setShowMenu] = useState(false);

	const toggleMenu = () => {
		setShowMenu(!showMenu);
	};

	return <div>
		<div className="mx-auto lg:px-8 p-4 lg:text-sm md:text-xs text-xs">
			<div className="flex items-end justify-between text-center ">
				<div className="lg:flex lg:w-[13%] md:flex md:w-[15%] w-[30%]">
					<a href="/"><img src={logo} /></a>
				</div>
				<div className="hidden sm:block">
					<div className="space-x-12">
						<a href="/" className='hover:border-b-2'>INICIO</a>
						<a href="/clubes" className='hover:border-b-2'>CLUBES</a>
						<a href="/planes" className='hover:border-b-2'>PLANES</a>
					</div>
				</div>
				<div className="hidden sm:block">
					<div>
						<a href="https://crm.blackgymfitclub.com/login" className='hover:border-b-2'>INGRESAR</a>
					</div>
				</div>
				<div className="sm:hidden">
					<button
						type="button"
						className="hover:bg-gray-700 hover:text-white block px-2 py-2 rounded-md text-base font-medium"
						onClick={toggleMenu}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="icon icon-tabler icon-tabler-menu"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" />
							<line x1="4" y1="6" x2="20" y2="6" />
							<line x1="4" y1="12" x2="20" y2="12" />
							<line x1="4" y1="18" x2="20" y2="18" />
						</svg>
					</button>
				</div>
			</div>
		</div>
		<div className={`sm:hidden overflow-hidden text-xs text-center ${showMenu ? ' max-h-52 transition-max-h' : 'max-h-0 transition-min-h'}`}>
			<div className="px-2 pt-2 pb-3 space-y-1">
				<ul className='p-4'>
					<li className='p-2 m-1'>
						<a href="/" className='hover:text-gray-700 active hover:border-b-2'>INICIO</a>
					</li>
					<li className='p-2 m-1'>
						<a href="/clubes" className='hover:text-gray-700 hover:border-b-2'>CLUBES</a>
					</li>
					<li className='p-2 m-1'>
						<a href="/planes" className='hover:text-gray-700 hover:border-b-2'>PLANES</a>
					</li>
					<li className='p-2 m-1'>
						<a href="https://crm.blackgymfitclub.com" className='hover:text-gray-700 hover:border-b-2'>INGRESAR</a>
					</li>
				</ul>
			</div>
		</div>
	</div>;
};

export default Navbar;
