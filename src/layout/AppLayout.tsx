import Navbar from './Navbar/Navbar';
import React from 'react';
import LoadingIndicator from '../common/LoadingIndicator/LoadingIndicator';
import Sidebar from './Sidebar/Sidebar';
import { useLocation } from 'react-router-dom';
import PageHeader from '../common/PageHeader/PageHeader';
import { capitalize } from 'lodash';

function AppLayout({
	showPageHeader = true,
	pageAction,
	pageTitle,
	childrenStyle,
	children,
}: {
	childrenStyle?: React.CSSProperties;
	showPageHeader?: boolean;
	pageTitle?: string;
	pageAction?: React.ReactNode;
	children: React.ReactNode;
}) {
	const location = useLocation();
	let CURRENT_LOCATION = location?.pathname?.includes('details')
		? 'Details'
		: // For nested routes that have IDs attached
		  location?.pathname?.substring(
				location?.pathname?.lastIndexOf('/') + 1,
				location?.pathname?.length
		  );
	return (
		<div className='max-h-screen'>
			<Navbar />
			<div className='flex flex-row flex-nowrap'>
				<aside>
					<Sidebar />
				</aside>
				<main
					className='md:w-[calc(100vw-15vw)] md:absolute md:left-[15vw] dark:bg-mediumDark min-h-main mt-[40px] w-full'
					style={childrenStyle}
				>
					{showPageHeader && (
						<PageHeader
							title={pageTitle || capitalize(CURRENT_LOCATION)}
							action={pageAction}
						/>
					)}
					<div className='p-5'>{children}</div>
				</main>
			</div>
			<LoadingIndicator />
		</div>
	);
}

export default AppLayout;
