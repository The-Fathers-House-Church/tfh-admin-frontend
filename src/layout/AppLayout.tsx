import Navbar from './Navbar/Navbar';
import React from 'react';
import LoadingIndicator from '../common/LoadingIndicator/LoadingIndicator';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './Sidebar/Sidebar';

function AppLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='max-h-screen'>
			<Navbar />
			<div className='flex flex-row flex-nowrap'>
				<aside>
					<Sidebar />
				</aside>
				<main className='w-full dark:bg-mediumDark min-h-main p-5 mt-[50px]'>
					{children}
				</main>
			</div>
			<LoadingIndicator />
			<ToastContainer
				style={{
					fontSize: 16,
					zIndex: 30,
				}}
				theme='colored'
				autoClose={5000}
				position='top-right'
				hideProgressBar={true}
				closeOnClick={true}
			/>
		</div>
	);
}

export default AppLayout;
