import { redirect } from 'react-router';
// import { sendFeedback } from '../functions/feedback';
// import { store } from '../store/store';

export const checkPrivateRoute = () => {
	// const appStore = store.getState();
	// const currentUser: any = appStore.user.user;
	const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

	if (!Object.keys(currentUser).length) {
		// sendFeedback('Login to continue');
		throw redirect('/login');
	}
};

export const checkProtectedRoute = () => {
	// const appStore = store.getState();
	// const currentUser: any = appStore.user.user;
	const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

	if (Object.keys(currentUser).length) {
		// sendFeedback('You are already logged in');
		throw redirect('/dashboard');
	}
};
