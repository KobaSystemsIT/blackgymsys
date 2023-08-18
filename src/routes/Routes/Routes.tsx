import { NotFound } from '@/app/common/NotFound';
import { Clubes } from '@/app/pages/Clubes';
import { Home } from '@/app/pages/Home';
import { Login } from '@/app/pages/Login';
import { Planes } from '@/app/pages/Planes';
import React from 'react';
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";

export type RoutesProps = {
}

const Rutas: React.FC<RoutesProps> = ({ }) => {
	return <>
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Outlet />}>
					<Route index element={<Home />}></Route>
					<Route path='/clubes' element={<Clubes />}></Route>
					<Route path='/planes' element={<Planes />}></Route>
					<Route path='/login' element={<Login />}></Route>

				</Route>
				<Route path='*' element={<NotFound />}></Route>
			</Routes>
		</BrowserRouter>
	</>;
};

export default Rutas;
