import React from 'react';

function PageHeader({ title, action }: { title: string; action?: React.ReactNode }) {
	return (
		<header className='flex items-center justify-between mb-10 mt-5 dark:text-white gap-5'>
			<h1 className='font-medium text-2xl'>{title}</h1>
			{action}
		</header>
	);
}

export default PageHeader;
