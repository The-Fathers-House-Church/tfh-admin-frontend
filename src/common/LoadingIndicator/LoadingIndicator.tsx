import React from 'react';
import styles from './style.module.css';
import { useAppSelector } from '../../store/hooks';

function LoadingIndicator() {
	const loadingState = useAppSelector((state) => state.loadingIndicator);

	React.useEffect(() => {
		// Check if indicator is open and prevent body from scrolling
		if (typeof window !== 'undefined') {
			const body = document.body;

			if (loadingState.open) {
				// Disable scroll
				body.style.overflow = 'hidden';
				body.style.height = '100vh';
			} else {
				body.style.overflowY = 'auto';
				body.style.height = 'auto';
			}
		}
	}, [loadingState]);
	return (
		<div
			className={styles.container}
			style={{
				display: loadingState.open ? 'flex' : 'none',
			}}
		>
			<div className={styles.loader}></div>
			<span>{loadingState.text}</span>
		</div>
	);
}

export default LoadingIndicator;
