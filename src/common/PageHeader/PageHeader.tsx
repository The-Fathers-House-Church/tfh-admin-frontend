import React from 'react';

function PageHeader({ title, action }: { title: string; action?: React.ReactNode }) {
	return (
		<header className='flex items-center justify-between mt-5 dark:text-white gap-5 bg-primaryAccent2 shadow p-4'>
			<h1 className='font-medium text-md'>{title}</h1>
			{action}
		</header>
	);
}

export default PageHeader;
