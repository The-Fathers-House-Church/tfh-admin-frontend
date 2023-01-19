import React from 'react';

function SectionHeader({ title }: { title: string }) {
	return (
		<div className='flex items-center justify-center p-5 mb-5 bg-primaryAccent2 md:w-1/4'>
			<h3 className='font-bold'>{title}</h3>
		</div>
	);
}

export default SectionHeader;
