import Dashboard from '../../pages/Dashboard';
import ErrorPage from '../../pages/ErrorPage';
import Login from '../../pages/Login';
import { store } from '../../store/store';
import { checkProtectedRoute } from '../utils';

const appStore = store.getState();
const currentUser: any = appStore.user.user;

export const authenticationRoutes = [
	{
		path: '/',
		element: currentUser ? <Dashboard /> : <Login />,
		errorElement: <ErrorPage />,
		loader: checkProtectedRoute,
	},
	{
		path: '/login',
		element: <Login />,
		loader: checkProtectedRoute,
	},
];
