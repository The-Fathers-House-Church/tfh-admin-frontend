import React from 'react';

function Card({
	className,
	children,
	style,
	...rest
}: {
	className?: string;
	style?: {};
	children: React.ReactNode;
	[x: string]: any;
}) {
	return (
		<div
			className={
				'w-full shadow-md p-7 rounded-lg max-w-screen-md dark:bg-lightDark ' + className
			}
			{...rest}
		>
			{children}
		</div>
	);
}

export default Card;
