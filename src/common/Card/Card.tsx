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
				'w-full shadow-md p-7 rounded-lg max-w-screen-md dark:bg-lightDark ' + className
			}
		>
			{children}
		</div>
	);
}

export default Card;
