import Dashboard from '../../pages/Dashboard';
import { checkPrivateRoute } from '../utils';

export const dashboardRoutes = [
	{
		path: '/dashboard',
		element: <Dashboard />,
		loader: checkPrivateRoute,
	},
];
