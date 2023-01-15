import { useAppDispatch } from './store/hooks';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { updateUser } from './store/slices/user';
import { useEffect } from 'react';
import { routes } from './routes';

function App() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

		if (currentUser && Object.keys(currentUser).length) {
			dispatch(updateUser({ user: currentUser || null }));
		}
	}, [dispatch]);

	const router = createBrowserRouter(routes);

	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
