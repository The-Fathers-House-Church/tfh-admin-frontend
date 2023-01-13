import React from 'react';

function Card({
	className,
	children,
	style,
}: {
	className?: string;
	style?: {};
	children: React.ReactNode;
}) {
	return (
		<div
			className={
				'md:w-2/3 shadow-md p-7 rounded-lg max-w-screen-sm dark:bg-lightDark ' +
				className
			}
		>
			{children}
		</div>
	);
}

export default Card;
