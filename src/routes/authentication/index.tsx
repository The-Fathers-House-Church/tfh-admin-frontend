import Dashboard from '../../pages/Dashboard';
import ErrorPage from '../../pages/ErrorPage';
import Login from '../../pages/authentication/Login';
import { store } from '../../store/store';
import { checkProtectedRoute } from '../utils';
import ResetPassword from '../../pages/authentication/ResetPassword';
import ResetPasswordUpdate from '../../pages/authentication/ResetPasswordUpdate';
import ResetPasswordSuccess from '../../pages/authentication/ResetPasswordSuccess';

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
	{
		path: '/reset-password',
		element: <ResetPassword />,
		loader: checkProtectedRoute,
	},
	{
		path: '/reset-password/success',
		element: <ResetPasswordSuccess />,
		loader: checkProtectedRoute,
	},
	{
		path: '/reset-password/update/:verificationCode',
		element: <ResetPasswordUpdate />,
		loader: checkProtectedRoute,
	},
];
