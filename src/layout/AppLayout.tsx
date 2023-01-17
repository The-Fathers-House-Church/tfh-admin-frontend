import Navbar from './Navbar/Navbar';
import React from 'react';
import LoadingIndicator from '../common/LoadingIndicator/LoadingIndicator';
import Sidebar from './Sidebar/Sidebar';

function AppLayout({
	childrenStyle,
	children,
}: {
	childrenStyle?: React.CSSProperties;
	children: React.ReactNode;
}) {
	return (
		<div className='max-h-screen'>
			<Navbar />
			<div className='flex flex-row flex-nowrap'>
				<aside>
					<Sidebar />
				</aside>
				<main
					className='md:w-[calc(100vw-15vw)] md:absolute md:left-[15vw] dark:bg-mediumDark min-h-main p-5 mt-[50px]'
					style={childrenStyle}
				>
					{children}
				</main>
			</div>
			<LoadingIndicator />
		</div>
	);
}

export default AppLayout;
